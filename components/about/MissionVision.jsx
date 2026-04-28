'use client'
import { motion } from 'framer-motion'

export default function MissionVision({ data }) {
  return (
    <section className="py-24 md:py-40 bg-brand-stone/10">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8"
          >
            <div className="w-12 h-[1px] bg-brand-clay/40" />
            <h3 className="text-3xl md:text-4xl font-serif italic text-brand-primary">
              Why Seven9 Developers
            </h3>
            <p className="text-brand-secondary font-light leading-relaxed text-lg">
              We are deeply committed to sustainability, using eco-friendly materials and advanced techniques to reduce waste and energy consumption. Each project is more than just a building—it’s a meaningful contribution to the community and a legacy for future generations, designed to stand the test of time both physically and socially.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8"
          >
            <div className="w-12 h-[1px] bg-brand-clay/40" />
            <h3 className="text-3xl md:text-4xl font-serif italic text-brand-primary">
              Our Client-Centric Approach
            </h3>
            <p className="text-brand-secondary font-light leading-relaxed text-lg">
              At Seven9 Developers, client satisfaction drives everything we do. We prioritize understanding your unique needs, goals, and budget while maintaining clear communication and transparency. Our team of architects, engineers, and project managers collaborates to bring your vision to life, ensuring exceptional craftsmanship within timelines and budgets.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
