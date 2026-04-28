'use client'
import { motion } from 'framer-motion'

export default function WhySeven9() {
  return (
    <section className="py-24 md:py-40 bg-brand-sand">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="uppercase tracking-[0.2em] text-[10px] text-brand-secondary font-bold mb-8 block">
              Why Seven9 Developers
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-brand-primary leading-tight mb-10">
              Our Client-Centric <br /> Approach
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-10"
          >
            <div className="text-brand-secondary font-light leading-relaxed text-lg space-y-8">
              <p>
                At Seven9 Developers, client satisfaction drives everything we do. We prioritize understanding your unique needs, goals, and budget while maintaining clear communication and transparency. Regular updates keep you informed and engaged throughout the process. Our team of architects, engineers, and project managers collaborates to bring your vision to life, ensuring exceptional craftsmanship within timelines and budgets.
              </p>
              <p>
                We are deeply committed to sustainability, using eco-friendly materials and advanced techniques to reduce waste and energy consumption. Each project is more than just a building—it’s a meaningful contribution to the community and a legacy for future generations, designed to stand the test of time both physically and socially.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
