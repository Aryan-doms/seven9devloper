import ExhibitionScroller from '@/components/project/ExhibitionScroller'

export const metadata = {
  title: 'Our Projects | Seven9 Developers',
  description: 'Explore the portfolio of Seven9 Developers, featuring residential, commercial, and mixed-use landmarks in Silvassa.',
}

export const revalidate = 60;

async function getProjects() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/projects?per_page=100`
    )
    if (!res.ok) return []
    console.log(`✅ CMS Sync: ${new Date().toLocaleTimeString()} | Projects Data Loaded`);
    return await res.json()
  } catch (error) {
    console.error("❌ CMS Sync Error (Projects):", error);
    return []
  }
}

export default async function ProjectsPage() {
  const projectsData = await getProjects();
  const syncTime = new Date().toLocaleTimeString();

  // Map CPT projects data
  const dynamicProjects = (projectsData || []).map(p => ({
    slug: p?.slug || "",
    title: p?.title?.rendered || "",
    type: p?.acf?.project_type || "",
    location: p?.acf?.project_location || "",
    status: p?.acf?.project_status === "On Going" ? "Under Construction" : (p?.acf?.project_status || ""),
    category: p?.acf?.project_categories || [],
    image: p?.acf?.project_image?.url || "/fallback.jpg"
  }));

  // Fallback static array if dynamic fetch returns empty
  const fallbackProjects = [
    {
      title: "Palladium Highstreet",
      slug: "palladium-highstreet",
      type: "ResiCommercial Building | 3BHK/4BHK",
      location: "Silvassa DNH",
      category: ["Residential", "Commercial"],
      status: "Coming Soon",
      image: "/Cam04-entrance-zoom-scaled.webp"
    },
    {
      title: "Palladium Park",
      slug: "palladium-park",
      type: "Residential Development | 1/1.5/2 BHK",
      location: "Naroli, Silvassa",
      category: ["Residential"],
      status: "Under Construction",
      image: "/Cam09-1-scaled.webp"
    },
    {
      title: "The Grandeur",
      slug: "grandeur-bungalow",
      type: "Residences / Villas | 4BHK/5BHK",
      location: "Village Silvassa",
      category: ["Residential"],
      status: "Under Construction",
      image: "/Cam09-1-scaled.webp"
    },
    {
      title: "Palladium Alcove",
      slug: "palladium-alcove",
      type: "ResiCommercial Building | 1BHK/2BHK",
      location: "Village Silvassa",
      category: ["Residential", "Commercial"],
      status: "Under Construction",
      image: "/Palladium-Highstreet-Club_Cam-v01-scaled.webp"
    },
    {
      title: "Palladium Square",
      slug: "palladium-square",
      type: "ResiCommercial Building | 1BHK",
      location: "Silvassa DNH",
      category: ["Residential", "Commercial"],
      status: "Completed",
      image: "/Cam09-1-scaled.webp"
    },
    {
      title: "The Market Pallete",
      slug: "the-market-pallete",
      type: "ResiCommercial Building | 1BHK",
      location: "Village Amli, Silvassa DNH",
      category: ["Residential", "Commercial"],
      status: "Completed",
      image: "/Cam04-entrance-zoom-scaled.webp"
    },
    {
      title: "Premaldeep Square",
      slug: "premaldeep-square",
      type: "Commercial Building / Shops | 2000 sq.m",
      location: "Village Silvassa DNH",
      category: ["Commercial"],
      status: "Completed",
      image: "/Cam01-scaled.webp"
    }
  ];

  const projects = dynamicProjects.length > 0 ? dynamicProjects : fallbackProjects;

  return (
    <main className="bg-brand-primary min-h-screen">
      <ExhibitionScroller projects={projects} />
      <div id="cms-sync-marker" style={{ display: 'none' }} data-last-sync={syncTime} />
    </main>
  )
}
