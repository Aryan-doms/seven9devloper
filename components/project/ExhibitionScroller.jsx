'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function ExhibitionScroller({ projects = [] }) {
  if (!projects || projects.length === 0) return null;

  const getStatusColor = (status) => {
    switch(status) {
      case 'Coming Soon': return 'bg-brand-clay text-white'
      case 'Under Construction': return 'bg-brand-secondary text-white'
      case 'Completed': return 'bg-brand-primary text-brand-sand'
      default: return 'bg-brand-primary text-brand-sand'
    }
  }

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-hide bg-brand-primary">
      {(projects || []).map((project, index) => (
        <section 
          key={project.slug || index} 
          className="relative h-screen w-full snap-start flex items-center justify-center overflow-hidden"
        >
          {/* Background Image with slow zoom effect */}
          <div className="absolute inset-0 w-full h-full">
            <motion.div
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              <Image 
                src={project.image || "/fallback.jpg"} 
                alt={project.title} 
                fill 
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>
          </div>

          {/* Elegant Gradient Overlays - Darkened for better readability */}
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/95 via-transparent to-brand-primary/50 z-10" />

          {/* Content Container */}
          <div className="relative z-20 max-w-7xl w-full mx-auto px-6 md:px-16 flex flex-col md:flex-row md:items-end justify-between gap-12 mt-32 md:mt-0">
            
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="flex items-center gap-4 mb-6 md:mb-8"
              >
                {/* Status Badge */}
                {project.status && (
                  <span className={`text-[10px] uppercase font-semibold tracking-wider px-3 py-1.5 rounded-sm ${getStatusColor(project.status)} shadow-lg`}>
                    {project.status}
                  </span>
                )}
                <div className="h-px w-8 md:w-16 bg-white/40" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/90 font-bold">
                  {(index + 1).toString().padStart(2, '0')} / {projects.length.toString().padStart(2, '0')}
                </span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="text-5xl md:text-7xl lg:text-8xl font-serif text-brand-sand leading-tight mb-6 md:mb-8"
              >
                {project.title}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                className="flex flex-col md:flex-row gap-4 md:gap-12"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">Type</p>
                  <p className="text-sm md:text-base font-light text-white/95">{project.type}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">Location</p>
                  <p className="text-sm md:text-base font-light text-white/95">{project.location}</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              className="mb-8 md:mb-12 shrink-0"
            >
              <Link 
                href={`/projects/${project.slug}`}
                className="group relative inline-flex items-center gap-6 px-8 py-4 border border-brand-sand/30 hover:border-brand-sand/60 transition-colors duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-brand-sand transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                <span className="relative text-[11px] uppercase tracking-[0.2em] font-semibold text-brand-sand group-hover:text-brand-primary transition-colors duration-500 z-10">
                  Explore Project
                </span>
                <svg 
                  className="relative w-4 h-4 text-brand-sand group-hover:text-brand-primary transition-colors duration-500 z-10 transform group-hover:translate-x-2 ease-out" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>

          </div>
          
          {/* Scroll Down Indicator (hidden on last slide) */}
          {index < projects.length - 1 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 pointer-events-none"
            >
              <span className="text-[9px] uppercase tracking-[0.3em] text-brand-sand/50">Scroll</span>
              <div className="w-px h-12 bg-gradient-to-b from-brand-sand/50 to-transparent" />
            </motion.div>
          )}
        </section>
      ))}
    </div>
  )
}
