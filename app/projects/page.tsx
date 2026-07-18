import type { Metadata } from 'next'
import { CRTProjects } from '@/components/crt-projects'

export const metadata: Metadata = {
  title: 'Projects — Krishna Dadhich',
  description: 'AI systems, NLP chatbots, computer vision, mobile apps, and ML models built and shipped by Krishna Dadhich.',
}

export default function ProjectsPage() {
  return <CRTProjects />
}
