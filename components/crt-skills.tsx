"use client"

import { Reveal, StaggerReveal, StaggerItem } from "@/components/reveal"

const SKILLS = [
  {
    id: "01",
    title: "DEEP LEARNING",
    desc: "CNN and RNN architectures for computer vision and sequence modeling. Building and training neural networks with TensorFlow for production deployment.",
    stat: "TOOL: TENSORFLOW + KERAS",
    icon: "◉",
  },
  {
    id: "02",
    title: "NLP & CHATBOTS",
    desc: "Intent recognition, dialog management, and knowledge-base-grounded chatbots. RAG pipelines for offline LLMs and enterprise AI applications.",
    stat: "TOOL: PYTHON + RAG FRAMEWORKS",
    icon: "▓",
  },
  {
    id: "03",
    title: "COMPUTER VISION",
    desc: "Real-time face recognition, object detection, and image processing. Building biometric systems and edge-deployed vision solutions.",
    stat: "TOOL: OPENCV + DLIB + FACE_RECOGNITION",
    icon: "◈",
  },
  {
    id: "04",
    title: "DATA PREPROCESSING",
    desc: "EDA, feature engineering, and data pipeline optimization. Handling missing values, normalization, and dataset preparation at scale.",
    stat: "TOOL: PANDAS + SCIKIT-LEARN",
    icon: "▶",
  },
  {
    id: "05",
    title: "MODEL EVALUATION",
    desc: "Regression and classification with rigorous testing. Metric selection, cross-validation, and performance optimization for production models.",
    stat: "TOOL: SCIKIT-LEARN + METRICS",
    icon: "◆",
  },
  {
    id: "06",
    title: "FULL STACK ML",
    desc: "End-to-end ML pipelines: from data collection to model deployment. Flask backends, database integration, and production-ready systems.",
    stat: "TOOL: PYTHON + FLASK + SQL",
    icon: "◐",
  },
  {
    id: "07",
    title: "PYTHON PROGRAMMING",
    desc: "Expert-level Python development across scientific computing, data analysis, and backend systems, with working proficiency in C and R. Strong OOP principles and functional programming patterns.",
    stat: "TOOL: PYTHON 3.8+ · C · R",
    icon: "◌",
  },
  {
    id: "08",
    title: "SCIKIT-LEARN",
    desc: "Comprehensive ML library expertise for supervised and unsupervised learning, including SVM classifiers. Classification, regression, clustering, and dimensionality reduction pipelines.",
    stat: "TOOL: SCIKIT-LEARN + SVM",
    icon: "◎",
  },
  {
    id: "09",
    title: "DATABASE MANAGEMENT",
    desc: "SQL query optimization, database design, and CRUD operations. Experience with MySQL, schema optimization, and transaction management.",
    stat: "TOOL: MYSQL + SQL",
    icon: "◇",
  },
  {
    id: "10",
    title: "FLASK WEB FRAMEWORK",
    desc: "Building RESTful APIs and web backends for ML applications. Request handling, authentication, and deployment on production servers.",
    stat: "TOOL: FLASK + WERKZEUG",
    icon: "▲",
  },
  {
    id: "11",
    title: "OPENCV IMAGE PROCESSING",
    desc: "Advanced image manipulation, filtering, and transformation. Real-time video processing and edge detection for production vision systems.",
    stat: "TOOL: OPENCV + NUMPY",
    icon: "▼",
  },
  {
    id: "12",
    title: "GIT & VERSION CONTROL",
    desc: "Proficient with Git workflows, branching strategies, and collaborative development. GitHub repository management and commit best practices.",
    stat: "TOOL: GIT + GITHUB",
    icon: "◆",
  },
  {
    id: "13",
    title: "RAG & PROMPT ENGINEERING",
    desc: "Retrieval-Augmented Generation pipelines, prompt engineering, and vector database integration for grounding LLM responses in private knowledge bases. Building offline and on-device LLM systems for enterprise knowledge retrieval.",
    stat: "TOOL: LANGCHAIN + LLAMAINDEX + FAISS/CHROMADB + OLLAMA",
    icon: "▣",
  },
  {
    id: "14",
    title: "BACKEND DEVELOPMENT",
    desc: "REST API design, authentication, and role-based access control for production web applications. MVC architecture and admin tooling for multi-tenant systems.",
    stat: "TOOL: PHP + REST APIs + MVC",
    icon: "▧",
  },
  {
    id: "15",
    title: "AGILE & COLLABORATION",
    desc: "Sprint planning, backlog management, and cross-functional collaboration in Agile teams. Version control workflows and project tracking across the development lifecycle.",
    stat: "TOOL: JIRA + GITHUB + AGILE",
    icon: "▥",
  },
]

export function CRTSkills() {
  return (
    <section
      id="skills"
      className="px-6 py-24 max-w-6xl mx-auto"
    >
      <Reveal className="mb-16">
        <div className="text-xs tracking-[0.3em] glow-dim mb-3">
          -- SKILLS.EXE ------------------------------------------------
        </div>
        <h2
          className="glow"
          style={{ fontFamily: "var(--font-vt323), monospace", fontSize: "clamp(2.5rem,6vw,4.5rem)" }}
        >
          SKILLS.EXE
        </h2>
        <div className="text-xs glow-dim tracking-widest mt-1">
          DISCIPLINES AND TOOLS
        </div>
      </Reveal>

      <StaggerReveal
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
        style={{ border: "1px solid var(--crt-border-col)" }}
      >
        {SKILLS.map((s) => (
          <StaggerItem key={s.id}>
            <SkillCard skill={s} />
          </StaggerItem>
        ))}
      </StaggerReveal>
    </section>
  )
}

function SkillCard({ skill }: { skill: (typeof SKILLS)[0] }) {
  return (
    <div className="p-6 group crt-hover-card h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div
          className="text-3xl glow-sm group-hover:glow"
          style={{ color: "var(--crt-brown-bright)", fontFamily: "var(--font-vt323), monospace" }}
        >
          {skill.icon}
        </div>
        <span className="text-xs" style={{ color: "var(--crt-brown-dim)" }}>
          [{skill.id}]
        </span>
      </div>
      <div
        className="text-lg mb-3 glow-sm group-hover:glow tracking-wider"
        style={{ fontFamily: "var(--font-vt323), monospace", color: "var(--crt-brown-bright)" }}
      >
        {skill.title}
      </div>
      <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--crt-brown)" }}>
        {skill.desc}
      </p>
      <div
        className="text-xs tracking-widest pt-3 mt-auto"
        style={{
          color: "var(--crt-brown-dim)",
          borderTop: "1px solid var(--crt-border-col)",
        }}
      >
        {skill.stat}
      </div>
    </div>
  )
}
