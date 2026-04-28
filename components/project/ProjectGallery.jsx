'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProjectGallery({ project }) {
  const gallery = project?.acf?.gallery || []
  const images = gallery
    .map(item => ({
      url: item?.gallery_image?.url || '',
      alt: item?.gallery_image?.alt || project?.title?.rendered || 'Gallery Image',
    }))
    .filter(img => img.url)

  const [lightboxIndex, setLightboxIndex] = useState(null)
  const isOpen = lightboxIndex !== null

  const openLightbox = (i) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)
  const goNext = () => setLightboxIndex(i => (i + 1) % images.length)
  const goPrev = () => setLightboxIndex(i => (i - 1 + images.length) % images.length)

  const handleKey = useCallback((e) => {
    if (!isOpen) return
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowRight') goNext()
    if (e.key === 'ArrowLeft') goPrev()
  }, [isOpen, images.length])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef
      const scrollAmount = 470 // Image width + gap
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  if (images.length === 0) return null

  return (
    <section className="pt-24 md:pt-40 pb-10 md:pb-16 bg-brand-stone/20 border-b border-brand-primary/10 overflow-hidden">
      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between"
        >
          <h2 className="text-4xl md:text-5xl font-serif italic text-brand-primary leading-none">Gallery</h2>
          <span className="uppercase tracking-[0.15em] text-[10px] text-brand-secondary">
            {images.length} Images
          </span>
        </motion.div>
      </div>

      {/* Main Container with Arrows */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 relative group/gallery">
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <div className="hidden md:flex absolute inset-y-0 left-6 right-6 items-center justify-between pointer-events-none z-10">
            <button 
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-brand-primary/10 bg-white shadow-sm flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all pointer-events-auto"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-brand-primary/10 bg-white shadow-sm flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all pointer-events-auto"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Scrollable Strip */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-6"
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => openLightbox(i)}
              className="relative flex-none w-[85vw] sm:w-[450px] h-[380px] md:h-[420px] snap-start overflow-hidden rounded-sm bg-brand-stone/30 cursor-pointer group focus:outline-none"
              aria-label={`Open gallery image ${i + 1}`}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-[0.16,1,0.3,1]"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-end p-6">
                <span className="text-white text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  {img.alt}
                </span>
              </div>
              {/* Counter badge */}
              <div className="absolute top-4 right-4 bg-black/50 text-white text-[10px] uppercase tracking-widest px-3 py-1.5">
                {i + 1} / {images.length}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && images[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 text-white p-2 hover:text-brand-clay transition-colors"
              aria-label="Close lightbox"
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 z-10 text-white/60 uppercase text-[10px] tracking-widest">
              {lightboxIndex + 1} / {images.length}
            </div>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full max-w-5xl max-h-[80vh] mx-auto my-auto px-16"
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={images[lightboxIndex].url}
                alt={images[lightboxIndex].alt}
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Navigation Buttons (Desktop only) */}
            {images.length > 1 && (
              <div className="hidden md:flex absolute inset-x-8 top-1/2 -translate-y-1/2 justify-between pointer-events-none w-[calc(100%-4rem)]">
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
    </section>
  )
}
