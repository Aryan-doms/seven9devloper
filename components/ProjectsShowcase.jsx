'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function ProjectsShowcase() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-8 md:px-24 mb-16 md:mb-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl font-serif text-brand-primary"
        >
          Featured Projects
        </motion.h2>
      </div>

      <div className="flex flex-col gap-12 md:gap-24 px-4 md:px-12 max-w-[1400px] mx-auto">
        {/* Project 1 */}
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="group relative overflow-hidden h-[70vh] md:h-[85vh] w-full cursor-pointer project-reveal rounded-custom"
        >
          <Image
            alt="Palladium Highstreet"
            fill
            className="object-cover transition-gentle duration-1000"
            src="/Cam04-entrance-zoom-scaled.webp"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/60 via-brand-primary/10 to-transparent transition-gentle group-hover:from-brand-primary/80"></div>

          <div className="absolute bottom-10 left-8 md:bottom-16 md:left-16 text-brand-sand">
            <h3 className="text-4xl md:text-6xl font-serif mb-4 transform translate-y-4 group-hover:translate-y-0 transition-gentle">Palladium Highstreet</h3>
            <div className="overflow-hidden">
              <p className="text-xs md:text-sm uppercase tracking-widest text-brand-sand/90 font-light transform translate-y-full group-hover:translate-y-0 transition-gentle opacity-0 group-hover:opacity-100">
                ResiCommercial | 3BHK/4BHK | Silvassa
              </p>
            </div>
          </div>
        </motion.article>

        {/* Project 2 */}
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="group relative overflow-hidden h-[70vh] md:h-[85vh] w-full cursor-pointer project-reveal rounded-custom"
        >
          <Image
            alt="Grandeur Bungalow"
            fill
            className="object-cover transition-gentle duration-1000"
            src="/Cam09-1-scaled.webp"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/60 via-brand-primary/10 to-transparent transition-gentle group-hover:from-brand-primary/80"></div>

          <div className="absolute bottom-10 left-8 md:bottom-16 md:left-16 text-brand-sand">
            <h3 className="text-4xl md:text-6xl font-serif mb-4 transform translate-y-4 group-hover:translate-y-0 transition-gentle">Grandeur Bungalow</h3>
            <div className="overflow-hidden">
              <p className="text-xs md:text-sm uppercase tracking-widest text-brand-sand/90 font-light transform translate-y-full group-hover:translate-y-0 transition-gentle opacity-0 group-hover:opacity-100">
                Residences/Villas | 4BHK/5BHK | Silvassa
              </p>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  )
}
