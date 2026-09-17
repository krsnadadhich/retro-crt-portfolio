import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#120d06",
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,140,0,0.04) 0px, rgba(255,140,0,0.04) 1px, transparent 1px, transparent 3px)",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: 4,
            color: "#ffb545",
            textShadow: "0 0 24px rgba(255,140,0,0.6)",
            display: "flex",
          }}
        >
          KRISHNA DADHICH
        </div>
        <div
          style={{
            fontSize: 40,
            letterSpacing: 12,
            color: "#e0932e",
            marginTop: 24,
            display: "flex",
          }}
        >
          AI ENGINEER
        </div>
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            color: "#a8701f",
            marginTop: 40,
            display: "flex",
          }}
        >
          RAG PIPELINES • LLM APPLICATIONS • ML/DL SOLUTIONS
        </div>
      </div>
    ),
    { ...size }
  )
}
