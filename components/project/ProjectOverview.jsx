'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function ProjectOverview({ project }) {
  const tagline     = project?.acf?.project_tagline || project?.title?.rendered || ''
  const description = project?.acf?.project_description || ''
  const brochureUrl = project?.acf?.brochure_url || '#'
  const overviewImg = project?.acf?.overview_image?.url || project?.acf?.project_image?.url || '/fallback.jpg'
  const overviewAlt = project?.acf?.overview_image?.alt || project?.title?.rendered || 'Project Overview'

  return (
    <section className="py-24 md:py-40 bg-white border-b border-brand-primary/10">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-16 md:gap-24 items-start">
          
          {/* Left — 60% = 3/5 cols */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-3 flex flex-col"
          >
            <p className="uppercase tracking-[0.2em] text-xs text-brand-secondary font-semibold mb-8">
              About The Project
            </p>

            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic font-light text-brand-primary leading-none mb-10"
              dangerouslySetInnerHTML={{ __html: tagline }}
            />

            {description && (
              <div className="text-brand-secondary font-light leading-relaxed text-base md:text-lg space-y-5 max-w-2xl mb-12">
                {description.split('\n').filter(Boolean).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}

            <a
              href={brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-brand-clay text-brand-primary uppercase tracking-[0.2em] text-xs font-semibold px-10 py-5 hover:bg-brand-stone transition-colors duration-300 self-start"
            >
              {/* Download Icon */}
              <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download Brochure
            </a>
          </motion.div>

          {/* Right — 40% = 2/5 cols */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2 relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-brand-stone/30 group"
          >
            <Image
              src={overviewImg}
              alt={overviewAlt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-[0.16,1,0.3,1]"
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
