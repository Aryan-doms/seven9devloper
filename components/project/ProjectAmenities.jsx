'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import amenityIcons from './amenityIcons'

export default function ProjectAmenities({ project }) {
  const amenities = project?.acf?.amenities || []
  if (amenities.length === 0) return null

  return (
    <section className="pt-10 md:pt-16 pb-24 md:pb-40 bg-brand-sand border-b border-brand-primary/10">
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
            const name = item?.amenity_name || ''
            const amenity_key = item?.amenity_key || ''
            const iconPath = amenityIcons[amenity_key]

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
                  {iconPath ? (
                    <Image
                      src={iconPath}
                      alt={name}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-brand-secondary/20" />
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
