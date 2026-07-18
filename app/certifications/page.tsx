import type { Metadata } from 'next'
import { CRTCertifications } from '@/components/crt-certifications'

export const metadata: Metadata = {
  title: 'Certifications — Krishna Dadhich',
  description: 'Credentials from Anthropic, IBM, Google Cloud Skills Boost, and NPTEL (IIT Madras).',
}

export default function CertificationsPage() {
  return <CRTCertifications />
}
