'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Philosophy({ data }) {
  const { eyebrow, heading, description, image } = data;

  return (
    <section className="py-32 px-8 md:px-24 bg-white border-b border-brand-primary/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 md:order-1 relative w-full aspect-square md:aspect-[4/5] bg-brand-stone/30 rounded-sm overflow-hidden shadow-sm"
        >
          <Image 
            alt={image.alt} 
            fill 
            className="object-cover" 
            src={image.url} 
          />
          {/* Option 1: Premium overlay with directors' names */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[10px] md:text-xs font-sans font-bold tracking-[0.25em] text-brand-sand uppercase leading-tight">
                VISHAL PANCHAL
              </span>
              <span className="text-[8px] md:text-[9px] tracking-[0.15em] text-brand-sand/60 mt-1 uppercase font-light">
                Director
              </span>
            </div>
            <div className="flex flex-col items-end text-right">
              <span className="text-[10px] md:text-xs font-sans font-bold tracking-[0.25em] text-brand-sand uppercase leading-tight">
                AR. HARDIK PANCHAL
              </span>
              <span className="text-[8px] md:text-[9px] tracking-[0.15em] text-brand-sand/60 mt-1 uppercase font-light">
                Managing Director
              </span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 md:order-2 md:pl-16"
        >
          <p className="uppercase tracking-[0.3em] text-xs text-brand-secondary mb-10">{eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-primary leading-snug mb-10">
            {heading}
          </h2>
          <p className="text-brand-secondary leading-loose max-w-lg font-light">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
