'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ContactStickyBar() {
  const [visible, setVisible] = useState(false)
  const [phone, setPhone] = useState("+91 77790 02147")

  useEffect(() => {
    const handleScroll = () => {
      // Show bar after scrolling past 800px (roughly past the hero and form)
      setVisible(window.scrollY > 800)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Fetch dynamic phone number
    async function fetchPhone() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/pages?slug=global-settings&_embed`)
        if (res.ok) {
          const data = await res.json()
          const acf = data[0]?.acf
          if (acf?.contact_phone) setPhone(acf.contact_phone)
        }
      } catch (err) {
        console.error("Sticky Bar Phone Error:", err)
      }
    }
    fetchPhone()

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
            <p className="text-white/90 text-[11px] uppercase tracking-[0.2em] font-bold flex-1 truncate">
              Connect With Us
            </p>

            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="px-5 py-2.5 border border-white/30 text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white/10 transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call
              </a>
              <button
                onClick={handleEnquire}
                className="px-5 py-2.5 bg-brand-sand text-brand-primary text-[10px] uppercase tracking-[0.2em] font-bold shadow-lg active:scale-95 transition-all duration-200"
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
