'use client'
import { motion } from 'framer-motion'

export default function Hero({ data }) {
  const { video, eyebrow, heading, italic, scroll } = data;

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <video
        src={video}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Darkening overlay so the light text pops against the sun and silhouettes */}
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 mix-blend-multiply flex pointer-events-none"></div>

      {/* The cinematic fadeout wrapper for the text */}
      <motion.div 
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 7, times: [0, 0.15, 0.85, 1], ease: "easeInOut" }}
        className="relative z-10 text-center px-4 max-w-5xl pointer-events-none flex flex-col items-center justify-center w-full h-full pt-16"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="uppercase tracking-[0.3em] text-xs text-brand-sand/80 mb-8"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl text-brand-sand font-serif mb-10 leading-tight"
        >
          {heading}<br />
          <span className="italic font-light text-brand-sand/90">{italic}</span>
        </motion.h1>
      </motion.div>

      {/* Subtle, permanently visible scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-none"
      >
        <span className="uppercase tracking-[0.2em] text-[10px] text-brand-sand/60 font-light drop-shadow-md">{scroll}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-brand-sand/40"
        />
      </motion.div>
    </section>
  )
}
