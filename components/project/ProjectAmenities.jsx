'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function ProjectAmenities({ project }) {
  const amenities = project?.acf?.amenities || []
  if (amenities.length === 0) return null

  return (
    <section className="py-24 md:py-40 bg-brand-sand border-b border-brand-primary/10">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <p className="uppercase tracking-[0.25em] text-[10px] text-brand-secondary font-semibold mb-4">
            World Class Facilities
          </p>
          <h2 className="text-4xl md:text-5xl font-serif italic text-brand-primary">
            Amenities
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 md:gap-12">
          {amenities.map((item, i) => {
            const name    = item?.amenity_name || ''
            const iconUrl = item?.amenity_icon?.url || ''
            const iconAlt = item?.amenity_icon?.alt || name

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center gap-4 group"
              >
                {/* Circle icon */}
                <div className="w-16 h-16 rounded-full bg-brand-stone/60 group-hover:bg-brand-clay/10 transition-colors duration-500 flex items-center justify-center overflow-hidden relative flex-shrink-0">
                  {iconUrl ? (
                    <Image
                      src={iconUrl}
                      alt={iconAlt}
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  ) : (
                    // Fallback icon if no image
                    <svg className="h-6 w-6 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  )}
                </div>
                {/* Name */}
                {name && (
                  <span className="uppercase text-[10px] tracking-[0.15em] text-brand-secondary font-semibold leading-tight">
                    {name}
                  </span>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
