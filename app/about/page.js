import AboutHero from '@/components/about/AboutHero'
import OurStory from '@/components/about/OurStory'
import MissionVision from '@/components/about/MissionVision'
import Awards from '@/components/about/Awards'
import CallToAction from '@/components/CallToAction'

export const metadata = {
  title: 'About Us | Seven9 Developers',
  description: 'Learn about Seven9 Developers, our journey, philosophy, and our commitment to building landmarks in Silvassa.',
}

async function getPageData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/pages?slug=about&_embed`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return {};
    const response = await res.json();
    return response[0]?.acf || {};
  } catch (error) {
    console.error("Fetch About Page Error:", error);
    return {};
  }
}

export default async function AboutPage() {
  const acf = await getPageData();

  return (
    <main>
      <AboutHero 
        data={{
          heading: acf?.hero_heading || "Architects of",
          italic: acf?.hero_heading_italic || "Human Experience.",
          description: acf?.hero_description || "At Seven9 Developers, we don’t just build structures. We craft environments that feel grounded, open, and alive."
        }}
      />

      <OurStory 
        data={{
          heading: acf?.story_heading || "Building landmarks that feel grounded.",
          content: acf?.story_content || "",
          image: acf?.story_image?.url || "/Cam03-scaled.webp"
        }}
      />

      <MissionVision />

      <Awards />

      <CallToAction 
        data={{
          eyebrow: "Your Next Chapter",
          heading: "Join the Seven9 Developers Family",
          italic: "Family Today.",
          btn1: { text: "Our Projects", link: "/projects" },
          btn2: { text: "Contact Us", link: "/contact" }
        }}
      />
    </main>
  )
}
