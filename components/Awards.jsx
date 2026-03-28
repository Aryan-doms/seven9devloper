'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const awards = [
  {
    title: "Indian ICON Award",
    description: "For successful revitalization of urban areas.",
    icon: "/award_icon.webp" // Placeholder or generic icon
  },
  {
    title: "Enterpreneur",
    description: "For Contributor in Growth of Union Territory D.N.H",
    icon: "/award_icon.webp"
  },
  {
    title: "Sapphire Award",
    description: "For successful revitalization of urban areas.",
    icon: "/award_icon.webp"
  },
  {
    title: "Pinnacle Award",
    description: "Recognizing affordable and sustainable housing projects.",
    icon: "/award_icon.webp"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
}

export default function Awards() {
  return (
    <section className="py-24 md:py-32 bg-brand-sand overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-24 mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-serif text-brand-primary leading-tight"
        >
          <span className="relative">
            Awards
            <span className="absolute inset-x-0 -bottom-1 h-3 bg-brand-clay/30 -z-10"></span>
          </span> & Certification
        </motion.h2>
      </div>

      <div className="w-full">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-8 md:px-24 max-w-7xl mx-auto overflow-x-auto md:overflow-x-visible snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        >
          {awards.map((award, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="min-w-[280px] flex-shrink-0 snap-center bg-white/50 p-8 md:p-10 flex flex-col items-center text-center rounded-sm border border-brand-primary/5 hover:bg-white hover:shadow-xl transition-all duration-500 group"
            >
              <div className="w-24 h-24 mb-8 relative">
                {/* Image placeholder - normally you'd use the trophy image here */}
                <div className="absolute inset-0 bg-brand-stone/10 rounded-full flex items-center justify-center group-hover:bg-brand-clay/10 transition-colors">
                   <svg className="w-10 h-10 text-brand-clay opacity-60" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M18 2h-1c0-1.1-.9-2-2-2h-6c-1.1 0-2 .9-2 2h-1c-1.1 0-2 .9-2 2v2c0 2.2 1.8 4 4 4v2c-2.2 0-4 1.8-4 4v2h10v-2c0-2.2-1.8-4-4-4v-2c2.2 0 4-1.8 4-4v-2c0-1.1-.9-2-2-2zm-9 4V4h1v2c0 .6-.4 1-1 1s-1-.4-1-1zm6 0v-2h1v2c0 .6-.4 1-1 1s-1-.4-1-1z"/>
                   </svg>
                </div>
              </div>
              <h3 className="text-xl font-serif text-brand-primary mb-3 leading-snug">{award.title}</h3>
              <p className="text-sm text-brand-secondary font-light leading-relaxed">{award.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
