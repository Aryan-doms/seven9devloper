'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProjectFloorPlans({ project }) {
  const floorPlans = project?.acf?.floor_plans || []
  const sitePlans  = project?.acf?.site_plans  || []

  const floorScrollRef = useRef(null)
  const siteScrollRef = useRef(null)

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -500 : 500
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  // Group floor plans by their label (e.g., "4 BHK", "5 BHK")
  const groupedFloorPlans = floorPlans.reduce((acc, plan) => {
    const label = plan?.plan_label || 'Floor Plan'
    if (!acc[label]) acc[label] = []
    acc[label].push(plan)
    return acc
  }, {})

  const categories = Object.keys(groupedFloorPlans)
  const [activeCategory, setActiveCategory] = useState(categories[0] || '')
  const [lightbox, setLightbox] = useState({ isOpen: false, index: 0, type: 'floor', list: [] })

  const openLightbox = (index, type, list) => setLightbox({ isOpen: true, index, type, list })
  const closeLightbox = () => setLightbox(prev => ({ ...prev, isOpen: false }))

  const goNext = useCallback(() => {
    setLightbox(prev => ({ ...prev, index: (prev.index + 1) % prev.list.length }))
  }, [])

  const goPrev = useCallback(() => {
    setLightbox(prev => ({ ...prev, index: (prev.index - 1 + prev.list.length) % prev.list.length }))
  }, [])

  useEffect(() => {
    const handleKey = (e) => {
      if (!lightbox.isOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox.isOpen, goNext, goPrev])

  useEffect(() => {
    document.body.style.overflow = lightbox.isOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [lightbox.isOpen])

  if (categories.length === 0 && sitePlans.length === 0) return null

  const activePlans = groupedFloorPlans[activeCategory] || []

  return (
    <section className="py-24 md:py-40 bg-white border-b border-brand-primary/10">
      <div className="max-w-7xl mx-auto px-8 md:px-16">

        {/* Header & Tabs Row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="uppercase tracking-[0.25em] text-[10px] text-brand-secondary font-semibold mb-4">
              Configuration Maps
            </p>
            <h2 className="text-4xl md:text-5xl font-serif italic text-brand-primary leading-none">
              Floor Plans
            </h2>
          </motion.div>

          {/* Tabs - Unique Labels */}
          {categories.length > 0 && (
            <div className="flex flex-wrap md:justify-end gap-3">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 text-[10px] uppercase tracking-[0.15em] font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-brand-clay text-white'
                      : 'bg-transparent text-brand-secondary border border-brand-stone hover:text-brand-primary hover:border-brand-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Grouped Floor Plan Display (Horizontal Scroll) */}
        {activePlans.length > 0 && (
          <div className="mb-24 relative group/scroller">
            {/* Navigation Arrows */}
            {activePlans.length > 1 && (
              <div className="hidden md:flex absolute inset-y-0 left-6 right-6 items-center justify-between pointer-events-none z-10">
                <button 
                  onClick={() => scroll(floorScrollRef, 'left')}
                  className="w-10 h-10 rounded-full border border-brand-primary/10 bg-white shadow-sm flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all pointer-events-auto"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={() => scroll(floorScrollRef, 'right')}
                  className="w-10 h-10 rounded-full border border-brand-primary/10 bg-white shadow-sm flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all pointer-events-auto"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}

            <div 
              ref={floorScrollRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-8"
            >
              {activePlans.map((plan, i) => {
                const imgUrl = plan?.plan_image?.url || ''
                const imgAlt = `${activeCategory} - Plan ${i + 1}`
                return (
                  <div key={i} className="flex-none w-[80vw] sm:w-[500px] snap-center">
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="group relative w-full aspect-[4/5] md:aspect-[3/4] bg-brand-stone/10 rounded-sm overflow-hidden cursor-zoom-in shadow-sm border border-brand-stone/20"
                      onClick={() => openLightbox(i, 'floor', activePlans)}
                    >
                      {imgUrl ? (
                        <>
                          <Image
                            src={imgUrl}
                            alt={imgAlt}
                            fill
                            className="object-contain p-4 md:p-8 group-hover:scale-[1.02] transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 flex items-center justify-center">
                            <div className="bg-white/90 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100 shadow-xl">
                              <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-brand-secondary text-sm font-light">
                          Plan unavailable
                        </div>
                      )}
                    </motion.div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Site Plans Section */}
        {sitePlans.length > 0 && (
          <>
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl font-serif italic text-brand-primary mb-10"
            >
              Site Plans
            </motion.h3>

            {/* Horizontal scroll of site plans */}
            <div className="relative group/scroller">
              {/* Navigation Arrows */}
              {sitePlans.length > 1 && (
                <div className="hidden md:flex absolute inset-y-0 left-6 right-6 items-center justify-between pointer-events-none z-10">
                  <button 
                    onClick={() => scroll(siteScrollRef, 'left')}
                    className="w-10 h-10 rounded-full border border-brand-primary/10 bg-white shadow-sm flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all pointer-events-auto"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => scroll(siteScrollRef, 'right')}
                    className="w-10 h-10 rounded-full border border-brand-primary/10 bg-white shadow-sm flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all pointer-events-auto"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}

              <div 
                ref={siteScrollRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4"
              >
                {sitePlans.map((plan, i) => {
                  const imgUrl = plan?.site_plan_image?.url || ''
                  const imgAlt = plan?.site_plan_label || `Site Plan ${i + 1}`
                  return (
                    <div key={i} className="flex-none w-[80vw] sm:w-[500px] snap-center">
                      <button 
                        onClick={() => openLightbox(i, 'site', sitePlans)}
                        className="group relative w-full aspect-[4/3] bg-brand-stone/20 rounded-sm overflow-hidden block text-left"
                      >
                        {imgUrl ? (
                          <>
                            <Image src={imgUrl} alt={imgAlt} fill className="object-contain p-4 group-hover:scale-[1.02] transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 flex items-center justify-center">
                              <div className="bg-white/90 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100 shadow-xl">
                                <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-brand-secondary text-sm font-light">
                            {imgAlt}
                          </div>
                        )}
                      </button>
                      {plan?.site_plan_label && (
                        <p className="mt-4 uppercase text-[10px] tracking-[0.15em] text-brand-secondary font-semibold">
                          {plan.site_plan_label}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      {(() => {
        const currentList = lightbox.type === 'floor' ? lightbox.list : sitePlans
        const currentItem = currentList[lightbox.index]
        
        return (
          <AnimatePresence>
            {lightbox.isOpen && currentItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6 md:p-12"
                onClick={closeLightbox}
              >
                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors z-[110]"
                >
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Navigation Info */}
                <div className="absolute top-8 left-8 text-white/40 text-[10px] uppercase tracking-[0.3em]">
                  {lightbox.type === 'floor' ? 'Floor Plan' : 'Site Plan'} • {lightbox.index + 1} / {currentList.length}
                </div>

                <div className="absolute bottom-8 left-8 text-white font-serif italic text-2xl md:text-3xl max-w-lg">
                  {lightbox.type === 'floor' ? currentItem.plan_label : currentItem.site_plan_label}
                </div>

                {/* Main Image Container */}
                <motion.div
                  key={`${lightbox.type}-${lightbox.index}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative w-full h-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={lightbox.type === 'floor' ? currentItem.plan_image?.url : currentItem.site_plan_image?.url}
                    alt="Enlarged Plan"
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>

                {/* Navigation Buttons (Desktop only) */}
                {currentList.length > 1 && (
                  <div className="hidden md:flex absolute inset-x-8 top-1/2 -translate-y-1/2 justify-between pointer-events-none">
                    <button
                      onClick={(e) => { e.stopPropagation(); goPrev(); }}
                      className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white transition-all pointer-events-auto"
                    >
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); goNext(); }}
                      className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white transition-all pointer-events-auto"
                    >
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )
      })()}
    </section>
  )
}
