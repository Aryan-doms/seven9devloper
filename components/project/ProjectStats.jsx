'use client'
import { motion } from 'framer-motion'

const getStats = (project) => {
  return [
    { label: 'Floors', value: project?.acf?.project_floors || 'G+13 Storeys' },
    { label: 'Configuration', value: project?.acf?.project_bhk || '3 & 4 BHK' },
    { label: 'Unit Size', value: project?.acf?.project_unit_size || '1200 - 1800 sq.ft' },
    { label: 'Project Area', value: project?.acf?.project_area || '2 Acres' },
    { label: 'Possession', value: project?.acf?.project_possession || 'Dec 2026' },
    {
      label: project?.acf?.highlight_label || 'Highlight',
      value: project?.acf?.highlight_value || 'Eco-Friendly'
    },
  ]
}

export default function ProjectStats({ project }) {
  const items = getStats(project)

  return (
    <section className="bg-brand-sand border-b border-brand-primary/10 w-full">
      <div className="max-w-7xl mx-auto px-8 md:px-16 overflow-x-auto no-scrollbar snap-x snap-mandatory">
        <div className="flex flex-nowrap lg:justify-between items-start py-10 md:py-14 min-w-max lg:min-w-0">
          {items.map((stat, i) => (
            <motion.div
              key={stat.label + i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col items-center text-center px-8 md:px-12 lg:px-4 snap-center border-l border-brand-primary/5 first:border-l-0 first:pl-0 last:pr-0 flex-1 min-w-[200px] md:min-w-[220px] lg:min-w-0`}
            >
              {/* Labels stay perfectly aligned at the top */}
              <span className="uppercase tracking-[0.35em] text-[10px] text-brand-secondary font-bold mb-4 whitespace-nowrap">
                {stat.label}
              </span>

              <div className="relative group flex flex-col items-center gap-1.5">
                <span
                  className="block text-base md:text-lg lg:text-xl text-brand-primary leading-none tracking-tight whitespace-nowrap"
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontWeight: 700,
                    fontVariantNumeric: 'lining-nums',
                  }}
                >
                  {stat.value}
                </span>

                {/* Minimalist clay underline as seen on homepage metrics */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                  className="mt-3 h-[1.5px] w-5 bg-brand-clay/60 mx-auto rounded-full origin-center"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
