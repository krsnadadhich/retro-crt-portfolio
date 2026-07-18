import type { Metadata } from 'next'
import { CRTEducation } from '@/components/crt-education'

export const metadata: Metadata = {
  title: 'Education — Krishna Dadhich',
  description: 'Academic background: Master of Computer Applications at CMR University, B.Sc. Mathematics at Subodh PG Autonomous College.',
}

export default function EducationPage() {
  return <CRTEducation />
}
