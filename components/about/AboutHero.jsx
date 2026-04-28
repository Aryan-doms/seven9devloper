'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function AboutHero({ data }) {
  return (
    <section className="relative pt-32 pb-32 md:pt-64 md:pb-48 bg-brand-sand overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/30 skew-x-[-12deg] translate-x-1/4 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          
          {/* Logo Container - Order 1 on mobile, Order 2 on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:justify-end order-1 lg:order-2 lg:col-span-2"
          >
            <div className="relative w-28 h-28 md:w-56 md:h-56 lg:w-64 lg:h-64">
              <Image 
                src="/logo.webp" 
                alt="Seven9 Logo" 
                fill 
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Text Container - Order 2 on mobile, Order 1 on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1 lg:col-span-3 text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-serif text-brand-primary leading-[1.1] mb-8 md:mb-10">
              <span className="block">{data.heading}</span>
              <span className="italic font-light block">{data.italic}</span>
            </h1>
            <div className="max-w-xl mx-auto lg:mx-0">
              <p className="text-base md:text-lg lg:text-xl text-brand-secondary font-light leading-relaxed mb-10 md:mb-12">
                {data.description}
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href="/contact"
                  className="w-full md:w-auto px-10 py-5 bg-brand-clay text-white text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-[#c4b18f] transition-all duration-300 text-center"
                >
                  Contact Us
                </Link>
                <a 
                  href="tel:+917779002147"
                  className="w-full md:w-auto px-10 py-5 border border-brand-primary text-brand-primary text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-brand-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  Call Now
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator line */}
      <motion.div 
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-0 left-1/2 w-[1px] h-24 bg-brand-primary/20 origin-top"
      />
    </section>
  )
}
