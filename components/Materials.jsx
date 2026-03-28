'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Materials() {
  return (
    <section className="py-32 md:py-32">
      <div className="max-w-5xl mx-auto px-8 flex flex-col items-center text-center">
        <div className="flex justify-center items-end gap-6 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="relative w-24 md:w-32 aspect-[3/4] bg-white shadow-md overflow-hidden rounded-sm"
          >
            <Image alt="White Stone" fill className="object-cover opacity-90" src="/Cam09-1-scaled.webp" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative w-32 md:w-40 aspect-[4/5] bg-white shadow-xl overflow-hidden z-10 rounded-sm mb-8"
          >
            <Image alt="Natural Oak" fill className="object-cover" src="/Palladium-Highstreet-Club_Cam-v01-scaled.webp" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative w-24 md:w-32 aspect-[3/4] bg-white shadow-md overflow-hidden rounded-sm"
          >
            <Image alt="Light and Shadow" fill className="object-cover opacity-90" src="/Cam01-scaled.webp" />
          </motion.div>
        </div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-4xl md:text-5xl font-serif mb-8 text-brand-primary leading-tight"
        >
          <span className="italic font-light">Crafted with materials</span><br/>that age beautifully.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-brand-secondary max-w-xl leading-loose font-light"
        >
          We source ethically, prioritizing natural stone, rich timber, and lime plaster—elements that gather character with time and weather, anchoring each home in its environment.
        </motion.p>
      </div>
    </section>
  )
}
