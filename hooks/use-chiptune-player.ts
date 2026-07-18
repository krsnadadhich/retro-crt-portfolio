import { useCallback, useEffect, useRef, useState } from 'react'

const NOTE = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.0, B5: 987.77,
}

interface Note {
  freq: number
  duration: number
}

interface Track {
  name: string
  notes: Note[]
  loopDuration: number
}

function makeTrack(name: string, sequence: [keyof typeof NOTE, number][]): Track {
  const notes = sequence.map(([note, duration]) => ({ freq: NOTE[note], duration }))
  const loopDuration = notes.reduce((sum, n) => sum + n.duration, 0)
  return { name, notes, loopDuration }
}

const TRACKS: Track[] = [
  makeTrack('SIGNAL_LOOP.WAV', [
    ['C5', 0.18], ['E5', 0.18], ['G5', 0.18], ['B5', 0.18],
    ['A5', 0.18], ['G5', 0.18], ['E5', 0.18], ['D5', 0.18],
    ['C5', 0.18], ['E5', 0.18], ['G5', 0.18], ['B5', 0.18],
    ['A5', 0.18], ['G5', 0.18], ['E5', 0.18], ['D5', 0.18],
  ]),
  makeTrack('BOOT_THEME.WAV', [
    ['C4', 0.25], ['E4', 0.25], ['G4', 0.25], ['C5', 0.5],
    ['G4', 0.25], ['E4', 0.25], ['C4', 0.5],
  ]),
  makeTrack('STATIC_DREAMS.WAV', [
    ['A4', 0.4], ['C5', 0.4], ['E5', 0.4], ['D5', 0.4],
    ['F5', 0.4], ['E5', 0.4], ['C5', 0.4], ['A4', 0.4],
  ]),
]

export function useChiptunePlayer() {
  const [trackIndex, setTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)

  const ctxRef = useRef<AudioContext | null>(null)
  const activeNodesRef = useRef<{ osc: OscillatorNode; gain: GainNode }[]>([])
  const loopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rafRef = useRef<number | null>(null)
  const loopStartRef = useRef(0)
  const trackIndexRef = useRef(0)
  trackIndexRef.current = trackIndex

  const getContext = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext()
    }
    return ctxRef.current
  }, [])

  const clearScheduled = useCallback(() => {
    if (loopTimeoutRef.current !== null) {
      clearTimeout(loopTimeoutRef.current)
      loopTimeoutRef.current = null
    }
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    const ctx = ctxRef.current
    activeNodesRef.current.forEach(({ osc, gain }) => {
      try {
        gain.gain.cancelScheduledValues(ctx ? ctx.currentTime : 0)
        osc.stop()
      } catch {
        // already stopped
      }
    })
    activeNodesRef.current = []
  }, [])

  const scheduleLoop = useCallback(() => {
    const ctx = getContext()
    const track = TRACKS[trackIndexRef.current]
    const startTime = ctx.currentTime
    loopStartRef.current = startTime

    let t = startTime
    for (const note of track.notes) {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'square'
      osc.frequency.value = note.freq
      const attack = 0.01
      const release = Math.min(0.05, note.duration * 0.3)
      gain.gain.setValueAtTime(0, t)
      gain.gain.linearRampToValueAtTime(0.15, t + attack)
      gain.gain.setValueAtTime(0.15, t + note.duration - release)
      gain.gain.linearRampToValueAtTime(0, t + note.duration)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(t)
      osc.stop(t + note.duration)
      activeNodesRef.current.push({ osc, gain })
      t += note.duration
    }

    loopTimeoutRef.current = setTimeout(() => {
      activeNodesRef.current = []
      scheduleLoop()
    }, track.loopDuration * 1000)

    const tick = () => {
      const currentCtx = ctxRef.current
      if (!currentCtx) return
      const loopDuration = TRACKS[trackIndexRef.current].loopDuration
      setElapsed((currentCtx.currentTime - loopStartRef.current) % loopDuration)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [getContext])

  const play = useCallback(() => {
    const ctx = getContext()
    if (ctx.state === 'suspended') ctx.resume()
    clearScheduled()
    scheduleLoop()
    setIsPlaying(true)
  }, [getContext, clearScheduled, scheduleLoop])

  const pause = useCallback(() => {
    clearScheduled()
    setIsPlaying(false)
  }, [clearScheduled])

  const next = useCallback(() => {
    const wasPlaying = isPlaying
    clearScheduled()
    setIsPlaying(false)
    setElapsed(0)
    setTrackIndex((i) => {
      const nextIndex = (i + 1) % TRACKS.length
      trackIndexRef.current = nextIndex
      return nextIndex
    })
    if (wasPlaying) {
      // let state settle before scheduling the new track
      setTimeout(() => play(), 0)
    }
  }, [isPlaying, clearScheduled, play])

  const stop = useCallback(() => {
    clearScheduled()
    setIsPlaying(false)
    setElapsed(0)
    if (ctxRef.current) {
      ctxRef.current.close().catch(() => {})
      ctxRef.current = null
    }
  }, [clearScheduled])

  useEffect(() => stop, [stop])

  const track = TRACKS[trackIndex]

  return {
    trackName: track.name,
    loopDuration: track.loopDuration,
    elapsed,
    isPlaying,
    play,
    pause,
    next,
    stop,
  }
}
