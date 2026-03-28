import Hero from '@/components/Hero'
import Philosophy from '@/components/Philosophy'
import ProjectsShowcase from '@/components/ProjectsShowcase'
import Lifestyle from '@/components/Lifestyle'
import Materials from '@/components/Materials'
import CallToAction from '@/components/CallToAction'

export default function Home() {
  return (
    <main>
      <Hero />
      <Philosophy />
      <ProjectsShowcase />
      <Lifestyle />
      <Materials />
      <CallToAction />
    </main>
  )
}
