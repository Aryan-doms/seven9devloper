'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Philosophy() {
  return (
    <section className="py-32 px-8 md:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 md:order-1 relative w-full aspect-[4/5]"
        >
          <Image 
            alt="Architectural Detail" 
            fill 
            className="object-cover rounded-custom shadow-sm" 
            src="/Cam03-scaled.webp" 
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 md:order-2 md:pl-16"
        >
          <p className="uppercase tracking-[0.3em] text-xs text-brand-secondary mb-10">Our Essence</p>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-primary leading-snug mb-10">
            We don’t construct spaces. We shape environments that feel grounded, open, and alive.
          </h2>
          <p className="text-brand-secondary leading-loose max-w-lg font-light">
            Our philosophy is simple: architecture should be a silent partner to your daily rituals, enhancing the natural light and the quiet moments between. Every material is chosen with intention to age gracefully alongside you.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
