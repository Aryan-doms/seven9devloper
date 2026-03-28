'use client'
import { motion } from 'framer-motion'

export default function CallToAction() {
  return (
    <section className="py-32 text-center px-8 flex flex-col items-center justify-center min-h-[60vh] bg-brand-sand border-y border-brand-primary/10">
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="uppercase tracking-[0.3em] text-xs text-brand-clay mb-8 font-semibold"
      >
        Your Next Chapter
      </motion.p>
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.1 }}
        className="text-5xl md:text-7xl font-serif text-brand-primary mb-16 leading-tight"
      >
        Come experience it<br/><span className="italic font-light">in person.</span>
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="flex flex-col md:flex-row gap-6 justify-center items-center w-full max-w-xl"
      >
        <a className="w-full md:w-auto px-14 py-5 bg-brand-clay text-brand-primary rounded-none uppercase tracking-[0.2em] text-xs font-semibold hover:bg-[#c4b18f] transition-gentle text-center" href="#">
          Book Visit
        </a>
        <a className="w-full md:w-auto px-14 py-5 border border-brand-primary/20 text-brand-primary rounded-none uppercase tracking-[0.2em] text-xs font-semibold hover:bg-brand-primary/5 transition-gentle text-center" href="#">
          Contact
        </a>
      </motion.div>
    </section>
  )
}
