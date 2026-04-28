import Hero from '@/components/Hero'
import Philosophy from '@/components/Philosophy'
import ProjectsShowcase from '@/components/ProjectsShowcase'
import Lifestyle from '@/components/Lifestyle'
import Metrics from '@/components/Metrics'
import CallToAction from '@/components/CallToAction'

export const revalidate = 60;

async function getPageData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/pages?slug=home&_embed`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) return {};

    const response = await res.json();
    return response[0]?.acf || {};
  } catch (error) {
    console.error("Fetch Page Error:", error);
    return {};
  }
}

async function getProjects() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/projects?per_page=100`,
      { next: { revalidate: 60 } }
    )
    if (!res.ok) return []
    return await res.json()
  } catch (error) {
    console.error("Fetch Projects Error:", error);
    return []
  }
}

export default async function Home() {
  const [acf, projectsData] = await Promise.all([
    getPageData(),
    getProjects()
  ]);

  // Map CPT projects data
  const dynamicProjects = projectsData.map(p => ({
    title: p?.title?.rendered || "",
    type: p?.acf?.project_type || "",
    location: p?.acf?.project_location || "",
    status: p?.acf?.project_status || "",
    category: p?.acf?.project_categories || [],
    image: p?.acf?.project_image?.url || "/fallback.jpg"
  }));

  // Fallback static array if dynamic fetch returns empty
  const fallbackProjects = [
    {
      title: "Palladium Highstreet",
      type: "ResiCommercial Building | 3BHK/4BHK",
      location: "Silvassa DNH",
      category: ["Residential", "Commercial"],
      status: "Coming Soon",
      image: "/Cam04-entrance-zoom-scaled.webp"
    },
    {
      title: "Palladium Park",
      type: "Residential Development | 1/1.5/2 BHK",
      location: "Naroli, Silvassa",
      category: ["Residential"],
      status: "On Going",
      image: "/Cam09-1-scaled.webp"
    },
    {
      title: "The Grandeur",
      type: "Residences / Villas | 4BHK/5BHK",
      location: "Village Silvassa",
      category: ["Residential"],
      status: "On Going",
      image: "/Cam09-1-scaled.webp"
    },
    {
      title: "Palladium Alcove",
      type: "ResiCommercial Building | 1BHK/2BHK",
      location: "Village Silvassa",
      category: ["Residential", "Commercial"],
      status: "On Going",
      image: "/Palladium-Highstreet-Club_Cam-v01-scaled.webp"
    },
    {
      title: "Palladium Square",
      type: "ResiCommercial Building | 1BHK",
      location: "Silvassa DNH",
      category: ["Residential", "Commercial"],
      status: "Completed",
      image: "/Cam09-1-scaled.webp"
    },
    {
      title: "The Market Pallete",
      type: "ResiCommercial Building | 1BHK",
      location: "Village Amli, Silvassa DNH",
      category: ["Residential", "Commercial"],
      status: "Completed",
      image: "/Cam04-entrance-zoom-scaled.webp"
    },
    {
      title: "Premaldeep Square",
      type: "Commercial Building / Shops | 2000 sq.m",
      location: "Village Silvassa DNH",
      category: ["Commercial"],
      status: "Completed",
      image: "/Cam01-scaled.webp"
    }
  ];

  return (
    <main>
      <Hero
        data={{
          video: acf?.hero_video_url || "https://res.cloudinary.com/dg7x2vzqx/video/upload/v1774694401/Palladium_Highstreet_Realestate_Palladiuminnovations_Home_Architecture_Palladium_Luxury_1080P_fj8rrx.mp4",
          eyebrow: acf?.hero_eyebrow || "A New Era of Living",
          heading: acf?.hero_heading || "Built with intention.",
          italic: acf?.hero_heading_italic || "Designed for a slower life.",
          scroll: acf?.hero_scroll_text || "Scroll to Explore"
        }}
      />

      <Philosophy
        data={{
          eyebrow: acf?.about_eyebrow || "About Us",
          heading: acf?.about_heading || "We don’t just construct spaces. We shape landmarks that feel grounded, open, and alive.",
          description: acf?.about_description || "With over a decade of experience dedicated to transforming Silvassa through innovative building practices, our mission transcends traditional construction. We are committed to creating safe, functional, and inspiring environments that enhance the lives of families and communities.",
          image: {
            url: acf?.about_image?.url || "/Cam03-scaled.webp",
            alt: acf?.about_image?.alt || "About Us"
          }
        }}
      />

      <ProjectsShowcase
        data={{
          title: acf?.projects_title || "Our Projects",
          projects: dynamicProjects.length > 0 ? dynamicProjects : fallbackProjects
        }}
      />

      <Lifestyle
        data={{
          eyebrow: acf?.lifestyle_eyebrow || "Four pillars of quiet living",
          heading: acf?.lifestyle_heading || "Spaces that breathe with you.",
          items: acf?.pillar_features?.map(item => ({
            src: item?.pillar_image?.url || "",
            alt: item?.pillar_image?.alt || "",
            title: item?.pillar_title || "",
            description: item?.pillar_description || "",
            features: item?.pillar_features
              ? item.pillar_features.split(/\r?\n/).filter(Boolean)
              : []
          })) || [
              {
                src: '/79_mrg.webp',
                alt: 'Community spaces at Seven9 Developers',
                title: 'Community',
                description: 'Spaces that bring people together.',
                features: [
                  'Curated clubhouse for residents',
                  'Banquet hall for celebrations',
                  'Double height private theatre',
                  'Waiting lounge for guests'
                ]
              },
              {
                src: '/79_wellness.webp',
                alt: 'Nature at Seven9 Developers',
                title: 'Nature',
                description: 'Green living, every single day.',
                features: [
                  'Private garden on every floor',
                  'Scenic walkway through the complex',
                  'Terrace seating with open sky views',
                  'Gazebo seating for quiet mornings'
                ]
              },
              {
                src: '/79_social.webp',
                alt: 'Wellbeing at Seven9 Developers',
                title: 'Wellbeing',
                description: 'Designed for every generation.',
                features: [
                  'Swimming pool with deck area',
                  'Fully equipped fitness centre',
                  'Dedicated kids play area',
                  'Senior citizen seating and temple'
                ]
              },
              {
                src: '/79_privacacy.webp',
                alt: 'Craft and quality at Seven9 Developers',
                title: 'Craft',
                description: 'Premium finish in every detail.',
                features: [
                  '24/7 CCTV surveillance',
                  'Sculpture garden promenade',
                  'Secured gated community',
                  'Premium materials throughout'
                ]
              }
            ]
        }}
      />

      <Metrics
        data={{
          eyebrow: acf?.metrics_eyebrow || "By The Numbers",
          stats: acf?.metrics_stats?.map(s => ({
            value: s?.stat_value || "",
            suffix: s?.stat_suffix || "",
            sub: s?.stat_subtext || ""
          })) || [
              { value: '4+', suffix: 'Years Young', sub: 'Est. 2021' },
              { value: '20+', suffix: 'Teammates', sub: 'And Growing' },
              { value: '5+', suffix: 'Industry Awards', sub: 'Nationally Recognised' },
              { value: '400+', suffix: 'Happy Customers', sub: 'Across Silvassa' },
              { value: '3 Lakh+', suffix: 'Sq.ft Ongoing', sub: 'Under Construction' },
              { value: '7k+', suffix: 'Sq.ft Delivered', sub: 'Successfully Completed' },
            ]
        }}
      />

      <CallToAction
        data={{
          eyebrow: acf?.cta_eyebrow || "Your Next Chapter",
          heading: acf?.cta_heading || "Come experience it",
          italic: acf?.cta_heading_italic || "in person.",
          btn1: { text: acf?.btn_1_text || "Book Visit", link: acf?.btn_1_link || "#" },
          btn2: { text: acf?.btn_2_text || "Contact", link: acf?.btn_2_link || "#" }
        }}
      />
    </main>
  )
}
