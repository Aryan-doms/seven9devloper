import { notFound } from 'next/navigation'
import ProjectHero from '@/components/project/ProjectHero'
import ProjectStats from '@/components/project/ProjectStats'
import ProjectOverview from '@/components/project/ProjectOverview'
import ProjectGallery from '@/components/project/ProjectGallery'
import ProjectAmenities from '@/components/project/ProjectAmenities'
import ProjectFloorPlans from '@/components/project/ProjectFloorPlans'
import ProjectLocation from '@/components/project/ProjectLocation'
import ProjectStickyBar from '@/components/project/ProjectStickyBar'

export const revalidate = 60

async function getProject(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/projects?slug=${slug}&_embed&v=${Date.now()}`
    )
    if (!res.ok) return null
    const data = await res.json()
    return data[0] || null
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/projects?per_page=100`
    )
    const projects = await res.json()
    return (projects || []).map(p => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return {}
  return {
    title: `${project.title?.rendered || 'Project'} | Seven9 Developers`,
    description: project.acf?.project_tagline || project.acf?.project_description?.slice(0, 160) || 'Luxury real estate by Seven9 Developers, Silvassa.',
  }
}

export default async function ProjectPage({ params }) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()

  return (
    <main>
      <ProjectHero project={project} />
      <ProjectStats project={project} />
      <ProjectOverview project={project} />
      <ProjectGallery project={project} />
      <ProjectAmenities project={project} />
      <ProjectFloorPlans project={project} />
      <ProjectLocation project={project} />
      <ProjectStickyBar project={project} />
    </main>
  )
}
