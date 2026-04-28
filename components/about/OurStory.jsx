'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function OurStory({ data }) {
  return (
    <section className="py-24 md:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] w-full bg-brand-stone/20 overflow-hidden group rounded-sm"
          >
            <Image
              src={data.image}
              alt="Seven9 Developers Legacy"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-[0.16,1,0.3,1]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="uppercase tracking-[0.2em] text-[10px] text-brand-secondary font-bold mb-8 block">
              About Company
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-brand-primary leading-tight mb-10">
              {data.heading}
            </h2>
            <div className="text-brand-secondary font-light leading-relaxed text-base md:text-lg space-y-6">
              <p>At Seven9 Developers, we believe that every project begins with a vision—yours. Our core values of integrity, excellence, and client satisfaction guide every decision we make. We understand that the spaces we build become the backdrop for life’s most important moments, and we take that responsibility seriously. Our ultimate goal is to not only meet your expectations but to exceed them, forging lasting relationships based on trust and collaboration.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
