'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function ProjectHero({ project }) {
  const imageUrl =
    project?.acf?.project_image?.url ||
    project?.acf?.hero_image?.url ||
    '/fallback.jpg'

  const status    = project?.acf?.project_status || 'New Launch'
  const name      = project?.title?.rendered || ''
  const location  = project?.acf?.project_location || ''
  const type      = project?.acf?.project_type || ''

  return (
    <section id="project-hero" className="relative h-screen w-full overflow-hidden flex items-end">
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt={name}
        fill
        priority
        className="object-cover object-center"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content — bottom left */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 pb-20 md:pb-28">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <span className="inline-block bg-brand-clay text-white uppercase text-[10px] tracking-[0.25em] font-semibold px-4 py-2">
            {status}
          </span>
        </motion.div>

        {/* Project Name */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif italic font-light text-brand-sand leading-none mb-5"
          dangerouslySetInnerHTML={{ __html: name }}
        />

        {/* Location */}
        {location && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="uppercase tracking-widest text-xs text-brand-clay font-medium mb-3"
          >
            {location}
          </motion.p>
        )}

        {/* Type */}
        {type && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm text-white/70 font-light tracking-wide"
          >
            {type}
          </motion.p>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1.2 }}
        className="absolute bottom-10 right-10 md:right-16 flex flex-col items-center gap-3 pointer-events-none"
      >
        <span className="uppercase tracking-[0.2em] text-[9px] text-brand-sand/50 font-light writing-mode-vertical" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-[1px] h-12 bg-brand-sand/30"
        />
      </motion.div>
    </section>
  )
}
