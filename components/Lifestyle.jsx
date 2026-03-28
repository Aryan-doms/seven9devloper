'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

function LifestyleItem({ src, alt, title, description, isOffset, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col gap-6 ${isOffset ? 'lg:mt-24' : 'lg:mt-0'}`}
    >
      <div className="relative aspect-[3/4] w-full group overflow-hidden rounded-custom">
        <Image 
          alt={alt} 
          fill 
          className="object-cover grayscale hover:grayscale-0 transition-gentle duration-1000 group-hover:scale-105" 
          src={src} 
        />
      </div>
      <div>
        <h4 className="font-serif text-2xl mb-2 text-brand-primary">{title}</h4>
        <p className="text-sm text-brand-secondary tracking-wide font-light">{description}</p>
      </div>
    </motion.div>
  )
}

export default function Lifestyle() {
  const items = [
    { src: '/79_mrg.webp', alt: 'Morning ritual', title: 'Morning', description: 'Soft light for first rituals.', isOffset: false, delay: 0.1 },
    { src: '/79_wellness.webp', alt: 'Wellness space', title: 'Wellness', description: 'Quietude for the soul.', isOffset: true, delay: 0.2 },
    { src: '/79_social.webp', alt: 'Social gathering', title: 'Social', description: 'Intentional connection.', isOffset: false, delay: 0.3 },
    { src: '/79_privacacy.webp', alt: 'Private sanctuary', title: 'Privacy', description: 'A sanctuary of your own.', isOffset: true, delay: 0.4 }
  ]

  return (
    <section className="py-24 md:py-32 px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-24 text-center md:text-left"
        >
          <p className="text-brand-secondary uppercase tracking-[0.3em] text-xs mb-6">Four pillars of quiet living</p>
          <h2 className="text-4xl md:text-6xl font-serif text-brand-primary max-w-2xl leading-tight">Spaces that breathe<br/>with you.</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
          {items.map((item, index) => (
            <LifestyleItem key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
