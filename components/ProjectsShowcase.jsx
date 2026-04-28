'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProjectsShowcase({ data }) {
  const [filter, setFilter] = useState('All')
  const { title: sectionTitle, projects } = data;

  const safeProjects = projects || [];
  const categories = ['All', ...new Set(safeProjects.flatMap(p => p?.category || []))];

  const filteredProjects = safeProjects.filter(project => 
    filter === 'All' ? true : project?.category?.includes(filter)
  )

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-brand-stone text-brand-primary'
      case 'New Launch': return 'bg-brand-clay text-white'
      case 'Coming Soon': return 'bg-black/80 text-brand-sand'
      case 'Under Construction': return 'bg-brand-primary text-brand-sand'
      default: return 'bg-brand-primary text-brand-sand'
    }
  }

  return (
    <section className="py-24 md:py-32 bg-brand-stone/30 border-y border-brand-primary/10 min-h-screen">
      <div className="max-w-7xl mx-auto px-8 md:px-24 mb-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl font-serif text-brand-primary mb-12"
        >
          {sectionTitle}
        </motion.h2>

        {/* Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 md:gap-8"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`text-xs uppercase tracking-[0.2em] font-semibold pb-2 border-b-2 transition-colors duration-300 ${
                filter === category 
                  ? 'border-brand-primary text-brand-primary' 
                  : 'border-transparent text-brand-secondary hover:text-brand-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
      </div>

      <motion.div 
        layout 
        className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-x-8 lg:gap-x-12 gap-y-12 px-6 md:px-12 max-w-[1400px] mx-auto mt-12 md:mt-16 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-8 md:pb-0"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <Link key={project.slug || project.title} href={`/projects/${project.slug}`}>
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col w-[85vw] md:w-full shrink-0 snap-center md:snap-align-none cursor-pointer"
              >
                {/* Image & Text Container */}
                <div className="relative overflow-hidden aspect-[4/5] w-full bg-brand-stone/20 rounded-sm shadow-sm group-hover:shadow-lg transition-shadow duration-500">
                  {project.image && (
                    <Image
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-105"
                      src={project.image}
                    />
                  )}

                  {/* Status Badge */}
                  {project.status && (
                    <div className="absolute top-4 right-4 z-20">
                      <span className={`text-[10px] uppercase font-semibold tracking-wider px-3 py-1.5 rounded-sm ${getStatusColor(project.status)} shadow-sm`}>
                        {project.status}
                      </span>
                    </div>
                  )}
                  
                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-700"></div>

                  {/* The Typography (Inside the Image) */}
                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-start transform translate-y-[3.5rem] group-hover:translate-y-0 transition-transform duration-[0.6s] ease-[0.16,1,0.3,1]">
                    <h3 className="text-xl lg:text-2xl font-serif text-brand-sand mb-2 leading-tight">
                      {project.title}
                    </h3>
                    
                    <div className="flex flex-col items-start w-full">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-brand-sand/70 font-light mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-[0.6s]">
                        {project.type}
                      </p>
                      <p className="text-[9px] uppercase tracking-widest text-brand-sand/50 font-light mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-[0.6s] delay-75">
                        {project.location}
                      </p>
                      
                      {/* High-end hover reveal "VIEW" indicator */}
                      <div className="overflow-hidden">
                        <span className="block text-[10px] uppercase tracking-[0.2em] text-brand-clay transform translate-y-full group-hover:translate-y-0 transition-transform duration-[0.6s] delay-100 font-semibold">
                          View Project
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
