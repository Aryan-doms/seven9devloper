'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import LeadForm from '@/components/common/LeadForm'

export default function ContactHero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col lg:flex-row bg-brand-primary overflow-hidden">
      {/* Left Side: Immersive Image & Intro */}
      <div className="relative w-full lg:w-3/5 min-h-[40vh] lg:min-h-full">
        <Image 
          src="/Cam03-scaled.webp" 
          alt="Seven9 Studio" 
          fill 
          className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-brand-primary" />
        
        <div className="absolute inset-0 flex flex-col justify-end lg:justify-center p-6 md:p-16 lg:p-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <span className="text-[10px] uppercase tracking-[0.2em] text-brand-clay font-bold">
                Connect With Us
              </span>
              <div className="h-px w-12 bg-brand-clay/20" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif text-brand-sand leading-none mb-8">
              Get <span className="italic font-light">in Touch.</span>
            </h1>

            <p className="text-base md:text-lg text-brand-sand/70 font-light leading-relaxed">
              We're here to help you bring your vision to life. Whether you have a question about a project or want to visit our studio, our team is ready to assist you.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side: The Form */}
      <div className="relative w-full lg:w-2/5 bg-white p-8 md:p-16 lg:p-20 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="uppercase tracking-[0.2em] text-[10px] text-brand-secondary font-bold mb-8 block">
            Online Enquiry
          </span>
          <h2 className="text-3xl md:text-4xl font-serif italic text-brand-primary mb-12">
            Send a Message
          </h2>
          <LeadForm />
        </motion.div>
      </div>
    </section>
  )
}
