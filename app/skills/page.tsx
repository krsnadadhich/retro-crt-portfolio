import type { Metadata } from 'next'
import { CRTSkills } from '@/components/crt-skills'

export const metadata: Metadata = {
  title: 'Skills — Krishna Dadhich',
  description: 'Disciplines and tools: deep learning, NLP & chatbots, computer vision, data preprocessing, model evaluation, and full stack ML.',
}

export default function SkillsPage() {
  return <CRTSkills />
}
