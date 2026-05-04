import Hero from '@/components/Hero'
import Philosophy from '@/components/Philosophy'
import ProjectsShowcase from '@/components/ProjectsShowcase'
import Lifestyle from '@/components/Lifestyle'
import Metrics from '@/components/Metrics'
import CallToAction from '@/components/CallToAction'

async function getPageData() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/pages?slug=home&_embed&v=${Date.now()}`);

        if (!res.ok) return {};

        const response = await res.json();
        console.log(`✅ CMS Sync: ${new Date().toLocaleTimeString()} | Home Page Data Loaded`);
        return response[0]?.acf || null;
    } catch (error) {
        console.error("❌ CMS Sync Error:", error);
        return null;
    }
}

async function getProjects() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/projects?per_page=100&v=${Date.now()}`,
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
            slug: "palladium-highstreet",
            title: "Palladium Highstreet",
            type: "ResiCommercial Building | 3BHK/4BHK",
            location: "Silvassa DNH",
            category: ["Residential", "Commercial"],
            status: "Coming Soon",
            image: "/Cam04-entrance-zoom-scaled.webp"
        },
        {
            slug: "palladium-park",
            title: "Palladium Park",
            type: "Residential Development | 1/1.5/2 BHK",
            location: "Naroli, Silvassa",
            category: ["Residential"],
            status: "Under Construction",
            image: "/Cam09-1-scaled.webp"
        },
        {
            slug: "the-grandeur",
            title: "The Grandeur",
            type: "Residences / Villas | 4BHK/5BHK",
            location: "Village Silvassa",
            category: ["Residential"],
            status: "Under Construction",
            image: "/Cam09-1-scaled.webp"
        },
        {
            slug: "palladium-alcove",
            title: "Palladium Alcove",
            type: "ResiCommercial Building | 1BHK/2BHK",
            location: "Village Silvassa",
            category: ["Residential", "Commercial"],
            status: "Under Construction",
            image: "/Palladium-Highstreet-Club_Cam-v01-scaled.webp"
        },
        {
            slug: "palladium-square",
            title: "Palladium Square",
            type: "ResiCommercial Building | 1BHK",
            location: "Silvassa DNH",
            category: ["Residential", "Commercial"],
            status: "Completed",
            image: "/Cam09-1-scaled.webp"
        },
        {
            slug: "the-market-pallete",
            title: "The Market Pallete",
            type: "ResiCommercial Building | 1BHK",
            location: "Village Amli, Silvassa DNH",
            category: ["Residential", "Commercial"],
            status: "Completed",
            image: "/Cam04-entrance-zoom-scaled.webp"
        },
        {
            slug: "premaldeep-square",
            title: "Premaldeep Square",
            type: "Commercial Building / Shops | 2000 sq.m",
            location: "Village Silvassa DNH",
            category: ["Commercial"],
            status: "Completed",
            image: "/Cam01-scaled.webp"
        }
    ];

    // Sort projects by priority
    const statusPriority = {
        "New Launch": 1,
        "Coming Soon": 2,
        "Under Construction": 3,
        "Completed": 4
    };

    const sortProjects = (projs) => {
        return [...projs].sort((a, b) => {
            const pA = statusPriority[a.status] || 99;
            const pB = statusPriority[b.status] || 99;
            return pA - pB;
        });
    }

    const sortedProjects = sortProjects(dynamicProjects.length > 0 ? dynamicProjects : fallbackProjects);

    return (
        <main>
            <Hero
                data={{
                    video: acf?.hero_video_url || "https://res.cloudinary.com/dg7x2vzqx/video/upload/v1774694401/Palladium_Highstreet_Realestate_Palladiuminnovations_Home_Architecture_Palladium_Luxury_1080P_fj8rrx.mp4",
                    slides: acf?.hero_slides || [],
                    heading: acf?.hero_heading || "Built with intention.",
                    italic: acf?.hero_heading_italic || "Designed for a slower life.",
                    scroll: acf?.hero_scroll_text || "Scroll to Explore"
                }}
            />

            <Philosophy
                data={{
                    eyebrow: acf?.about_eyebrow || "About Seven9",
                    heading: acf?.about_heading || "More than architecture. We build the backdrop for your life.",
                    description: acf?.about_description || "Welcome to Seven9 Devcon. For over a decade, we have been transforming the Silvassa region by blending innovative architecture with sustainable building practices. We believe that every project begins with your vision, and our mission is to craft inspiring, functional spaces that serve as the backdrop for life’s most important moments. At Seven9, we don’t just construct buildings—we build lasting legacies for families and our community.",
                    image: {
                        url: acf?.about_image?.url || "/Cam03-scaled.webp",
                        alt: acf?.about_image?.alt || "About Us"
                    }
                }}
            />

            <ProjectsShowcase
                data={{
                    title: acf?.projects_title || "Our Projects",
                    projects: sortedProjects
                }}
            />

            <Lifestyle
                data={{
                    eyebrow: acf?.lifestyle_eyebrow || "Our Lifestyle",
                    heading: acf?.lifestyle_heading || "A sanctuary for the modern soul.",
                    text: acf?.lifestyle_text || "Every detail is curated to enhance your daily rituals and bring a sense of peace.",
                    items: (acf?.pillar_features?.length > 0)
                        ? acf.pillar_features.map(p => ({
                            src: p?.pillar_image?.url || "",
                            alt: p?.pillar_title || "Lifestyle",
                            title: p?.pillar_title || "Feature",
                            description: p?.pillar_description || "",
                            features: p?.pillar_features ? p.pillar_features.split("\r\n") : []
                        }))
                        : [
                            {
                                src: "/Cam03-scaled.webp",
                                alt: "Community",
                                title: "Community",
                                description: "Spaces that bring people together."
                            },
                            {
                                src: "/Cam09-1-scaled.webp",
                                alt: "Nature",
                                title: "Nature",
                                description: "Green living, every single day."
                            },
                            {
                                src: "/Cam01-scaled.webp",
                                alt: "Wellbeing",
                                title: "Wellbeing",
                                description: "Designed for every generation."
                            },
                            {
                                src: "/Palladium-Highstreet-Club_Cam-v01-scaled.webp",
                                alt: "Craft",
                                title: "Craft",
                                description: "Premium finish in every detail."
                            }
                        ]
                }}
            />

            <Metrics
                data={{
                    eyebrow: acf?.metrics_eyebrow || "By The Numbers",
                    stats: (acf?.metrics_stats?.length > 0)
                        ? acf.metrics_stats.map(s => ({
                            value: s?.stat_value || "",
                            suffix: s?.stat_suffix || "",
                            sub: s?.stat_subtext || ""
                        }))
                        : [
                            { value: '4+', suffix: 'Years Young', sub: 'Est. 2021' },
                            { value: '20+', suffix: 'Teammates', sub: 'And Growing' },
                            { value: '5+', suffix: 'Industry Awards', sub: 'Nationally Recognised' },
                            { value: '400+', suffix: 'Happy Customers', sub: 'Across Silvassa' },
                            { value: '3 Lakh+', suffix: 'Sq.ft Under Construction', sub: 'Across Ongoing Sites' },
                            { value: '67k+', suffix: 'Sq.ft Delivered', sub: 'Successfully Completed' },
                        ]
                }}
            />

            <CallToAction
                data={{
                    eyebrow: "Your Next Chapter",
                    heading: "Come experience it",
                    italic: "in person.",
                    btn1: { text: "Book Visit", link: "/contact" },
                    btn2: { text: "Contact", link: "/contact#office" }
                }}
            />

            <div id="cms-sync-marker" style={{ display: 'none' }} data-last-sync={syncTime} />
        </main>
    )
}
