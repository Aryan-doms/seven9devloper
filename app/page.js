import Hero from '@/components/Hero'
import Philosophy from '@/components/Philosophy'
import ProjectsShowcase from '@/components/ProjectsShowcase'
import Lifestyle from '@/components/Lifestyle'
import Metrics from '@/components/Metrics'
import CallToAction from '@/components/CallToAction'

export default function Home() {
  return (
    <main>
      <Hero />
      <Philosophy />
      <ProjectsShowcase />
      <Lifestyle />
      <Metrics />
      <CallToAction />
    </main>
  )
}
