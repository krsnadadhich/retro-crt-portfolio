import { useCallback, useEffect, useRef, useState } from 'react'

const NOTE = {
  A2: 110.0, C2: 65.41, F2: 87.31, G2: 98.0,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.0, B5: 987.77,
  C6: 1046.5, D6: 1174.66, E6: 1318.51,
}

type Waveform = OscillatorType

interface EnvelopeShape {
  attack: number
  release: number
  peakGain: number
}

type Step =
  | { kind: 'chord'; freqs: number[] }
  | { kind: 'note'; freq: number }
  | { kind: 'rest' }

interface StepEvent {
  step: Step
  duration: number
}

interface Layer {
  name: 'pad' | 'bass' | 'arp'
  waveform: Waveform
  envelope: EnvelopeShape
  steps: StepEvent[]
}

interface Track {
  name: string
  layers: Layer[]
  loopDuration: number
}

function chordStep(notes: (keyof typeof NOTE)[], duration: number): StepEvent {
  return { step: { kind: 'chord', freqs: notes.map((n) => NOTE[n]) }, duration }
}

function noteStep(note: keyof typeof NOTE, duration: number): StepEvent {
  return { step: { kind: 'note', freq: NOTE[note] }, duration }
}

const LOOP_DURATION = 16

const PAD_LAYER: Layer = {
  name: 'pad',
  waveform: 'sine',
  envelope: { attack: 1.2, release: 1.2, peakGain: 0.05 },
  steps: [
    chordStep(['A4', 'C5', 'E5'], 4),
    chordStep(['F5', 'A4', 'C5'], 4),
    chordStep(['G4', 'C5', 'E5'], 4),
    chordStep(['G4', 'B4', 'D5'], 4),
  ],
}

const BASS_LAYER: Layer = {
  name: 'bass',
  waveform: 'triangle',
  envelope: { attack: 0.3, release: 0.6, peakGain: 0.12 },
  steps: [
    noteStep('A2', 4),
    noteStep('F2', 4),
    noteStep('C2', 4),
    noteStep('G2', 4),
  ],
}

const ARP_LAYER: Layer = {
  name: 'arp',
  waveform: 'triangle',
  envelope: { attack: 0.02, release: 0.4, peakGain: 0.06 },
  steps: [
    // Am
    noteStep('A5', 0.5), noteStep('C6', 0.5), noteStep('E6', 0.5), noteStep('C6', 0.5),
    noteStep('A5', 0.5), noteStep('C6', 0.5), noteStep('E6', 0.5), noteStep('C6', 0.5),
    // F
    noteStep('F5', 0.5), noteStep('A5', 0.5), noteStep('C6', 0.5), noteStep('A5', 0.5),
    noteStep('F5', 0.5), noteStep('A5', 0.5), noteStep('C6', 0.5), noteStep('A5', 0.5),
    // C
    noteStep('C5', 0.5), noteStep('E5', 0.5), noteStep('G5', 0.5), noteStep('E5', 0.5),
    noteStep('C5', 0.5), noteStep('E5', 0.5), noteStep('G5', 0.5), noteStep('E5', 0.5),
    // G
    noteStep('G5', 0.5), noteStep('B5', 0.5), noteStep('D6', 0.5), noteStep('B5', 0.5),
    noteStep('G5', 0.5), noteStep('B5', 0.5), noteStep('D6', 0.5), noteStep('B5', 0.5),
  ],
}

const TRACK: Track = {
  name: 'AMBER_HAZE.WAV',
  layers: [PAD_LAYER, BASS_LAYER, ARP_LAYER],
  loopDuration: LOOP_DURATION,
}

if (process.env.NODE_ENV !== 'production') {
  for (const layer of TRACK.layers) {
    const total = layer.steps.reduce((sum, s) => sum + s.duration, 0)
    console.assert(
      Math.abs(total - TRACK.loopDuration) < 1e-6,
      `[use-chiptune-player] layer "${layer.name}" duration ${total}s does not match loopDuration ${TRACK.loopDuration}s`
    )
  }
}

function scheduleLayer(
  ctx: AudioContext,
  masterGain: GainNode,
  layer: Layer,
  startTime: number,
  sink: { osc: OscillatorNode; gain: GainNode }[]
) {
  let t = startTime
  for (const { step, duration } of layer.steps) {
    if (step.kind !== 'rest') {
      const freqs = step.kind === 'chord' ? step.freqs : [step.freq]
      for (const freq of freqs) {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = layer.waveform
        osc.frequency.value = freq
        const { attack, release, peakGain } = layer.envelope
        const a = Math.min(attack, duration * 0.4)
        const r = Math.min(release, duration * 0.4)
        gain.gain.setValueAtTime(0, t)
        gain.gain.linearRampToValueAtTime(peakGain, t + a)
        gain.gain.setValueAtTime(peakGain, t + duration - r)
        gain.gain.linearRampToValueAtTime(0, t + duration)
        osc.connect(gain)
        gain.connect(masterGain)
        osc.start(t)
        osc.stop(t + duration)
        sink.push({ osc, gain })
      }
    }
    t += duration
  }
}

export function useChiptunePlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)

  const ctxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const activeNodesRef = useRef<{ osc: OscillatorNode; gain: GainNode }[]>([])
  const loopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rafRef = useRef<number | null>(null)
  const loopStartRef = useRef(0)

  const getContext = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext()
    }
    return ctxRef.current
  }, [])

  const getMasterGain = useCallback((ctx: AudioContext) => {
    if (!masterGainRef.current) {
      const gain = ctx.createGain()
      gain.gain.value = 0.8
      gain.connect(ctx.destination)
      masterGainRef.current = gain
    }
    return masterGainRef.current
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
    const masterGain = getMasterGain(ctx)
    const startTime = ctx.currentTime
    loopStartRef.current = startTime

    for (const layer of TRACK.layers) {
      scheduleLayer(ctx, masterGain, layer, startTime, activeNodesRef.current)
    }

    loopTimeoutRef.current = setTimeout(() => {
      activeNodesRef.current = []
      scheduleLoop()
    }, TRACK.loopDuration * 1000)

    const tick = () => {
      const currentCtx = ctxRef.current
      if (!currentCtx) return
      setElapsed((currentCtx.currentTime - loopStartRef.current) % TRACK.loopDuration)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [getContext, getMasterGain])

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

  const stop = useCallback(() => {
    clearScheduled()
    setIsPlaying(false)
    setElapsed(0)
    if (ctxRef.current) {
      ctxRef.current.close().catch(() => {})
      ctxRef.current = null
      masterGainRef.current = null
    }
  }, [clearScheduled])

  useEffect(() => stop, [stop])

  return {
    trackName: TRACK.name,
    loopDuration: TRACK.loopDuration,
    elapsed,
    isPlaying,
    play,
    pause,
    stop,
  }
}
