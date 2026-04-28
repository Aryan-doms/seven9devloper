'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Awards() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const awards = [
    { 
      title: 'The Granduer', 
      org: 'For exceptional luxury property development.', 
      icon: (
        <svg className="w-10 h-10 mb-6 text-brand-clay mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      )
    },
    { 
      title: 'Indian ICON Award', 
      org: 'For successful revitalization of urban areas.', 
      icon: (
        <svg className="w-10 h-10 mb-6 text-brand-clay mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    { 
      title: 'Enterpreneur', 
      org: 'For Contributor in Growth of Union Territory D.N.H.', 
      icon: (
        <svg className="w-10 h-10 mb-6 text-brand-clay mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    { 
      title: 'Sapphire Award', 
      org: 'For successful revitalization of urban areas.', 
      icon: (
        <svg className="w-10 h-10 mb-6 text-brand-clay mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 5c1.12-1.32 2.45-2 4-2 1.55 0 2.88.68 4 2l4 5-8 11-8-11 4-5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 3v18" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 5h8" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-4 11-4-11" />
        </svg>
      )
    },
    { 
      title: 'Pinnacle Award', 
      org: 'Recognizing affordable and sustainable housing projects.', 
      icon: (
        <svg className="w-10 h-10 mb-6 text-brand-clay mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21l1.65-4.95A15 15 0 0112 3a15 15 0 017.35 13.05L21 21H3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
        </svg>
      )
    }
  ]

  return (
    <section ref={ref} className="relative bg-brand-primary overflow-hidden">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-clay/60 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-8 md:px-16 pt-16 pb-4">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-[10px] uppercase tracking-[0.35em] text-brand-clay font-semibold"
        >
          Recognition
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 pb-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {awards.map((award, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group flex flex-col items-center text-center py-10 md:py-14 px-4 relative"
          >
            {/* Separator - Hidden at the start of each row based on grid columns */}
            {i % 2 !== 0 && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.08 }}
                style={{ transformOrigin: 'top' }}
                className="absolute left-0 top-10 bottom-10 w-[1px] bg-white/10 md:hidden"
              />
            )}
            {i % 3 !== 0 && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.08 }}
                style={{ transformOrigin: 'top' }}
                className="absolute left-0 top-10 bottom-10 w-[1px] bg-white/10 hidden md:block lg:hidden"
              />
            )}
            {i % 5 !== 0 && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.08 }}
                style={{ transformOrigin: 'top' }}
                className="absolute left-0 top-10 bottom-10 w-[1px] bg-white/10 hidden lg:block"
              />
            )}

            <div className="relative">
              {award.icon}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + i * 0.1, ease: 'circOut' }}
                style={{ transformOrigin: 'left' }}
                className="mt-1 h-[2px] w-8 bg-brand-clay rounded-full mx-auto"
              />
            </div>

            <div className="mt-8 flex flex-col gap-2">
              <span className="text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-white/90 font-semibold leading-tight">
                {award.title}
              </span>
              <span className="text-[9px] uppercase tracking-[0.15em] text-white/30 font-light">
                {award.org}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-clay/60 to-transparent" />
    </section>
  )
}
