import { CRTHero } from "@/components/crt-hero"
import { CRTExperience } from "@/components/crt-experience"
import { CRTAbout } from "@/components/crt-about"
import { CRTContact } from "@/components/crt-contact"

export default function Home() {
  return (
    <>
      <CRTHero />
      <CRTExperience />
      <CRTAbout />
      <CRTContact />
    </>
  )
}
