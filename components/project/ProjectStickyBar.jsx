'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProjectStickyBar({ project }) {
  const [visible, setVisible] = useState(false)

  const projectName = project?.title?.rendered || 'Project'
  const brochureUrl = project?.acf?.brochure_url || '#'

  useEffect(() => {
    const handleScroll = () => {
      // Show bar after scrolling past 100vh
      setVisible(window.scrollY > window.innerHeight)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleEnquire = (e) => {
    e.preventDefault()
    const target = document.getElementById('enquiry-form')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[80] md:hidden bg-brand-clay shadow-[0_-2px_20px_rgba(0,0,0,0.15)]"
        >
          <div className="flex items-center justify-between px-6 py-4 gap-4">
            {/* Project name — truncated */}
            <p
              className="text-white/90 text-sm font-light font-serif italic flex-1 truncate"
              dangerouslySetInnerHTML={{ __html: projectName }}
            />

            {/* Action buttons */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href={brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-white/40 text-white text-[10px] uppercase tracking-[0.15em] font-semibold hover:bg-white/10 transition-colors duration-200"
              >
                Brochure
              </a>
              <button
                onClick={handleEnquire}
                className="px-5 py-2.5 bg-white text-brand-primary text-[10px] uppercase tracking-[0.15em] font-semibold hover:bg-brand-sand transition-colors duration-200"
              >
                Enquire
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
