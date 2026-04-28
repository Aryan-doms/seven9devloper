'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  }
}

function LifestyleItem({ src, alt, title, description, features }) {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col gap-6 w-[75vw] sm:w-full shrink-0 snap-center sm:snap-align-none cursor-pointer group/item"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-white shadow-sm transition-shadow duration-500 group-hover/item:shadow-md">
        {src && (
          <Image
            alt={alt}
            fill
            className="object-cover grayscale group-hover/item:grayscale-0 transition-all duration-[1.5s] ease-[0.16,1,0.3,1] group-hover/item:scale-105"
            src={src}
          />
        )}
      </div>
      <div>
        <h4 className="font-serif text-2xl mb-2 text-brand-primary transition-colors duration-500 group-hover/item:text-brand-clay">{title}</h4>
        <p className="text-xs text-brand-secondary tracking-wide font-light">{description}</p>

        {features && features.length > 0 && (
          <motion.ul
            variants={itemVariants}
            className="mt-4 flex flex-col gap-1"
          >
            {features.map((feature, i) => (
              <li key={i} className="text-xs text-brand-secondary font-light tracking-wide leading-relaxed flex items-start gap-2">
                <span className="text-brand-clay">✦</span>
                {feature}
              </li>
            ))}
          </motion.ul>
        )}
      </div>
    </motion.div>
  )
}

export default function Lifestyle({ data }) {
  const { eyebrow, heading = "", items = [] } = data;

  return (
    <section className="py-24 md:py-32 bg-brand-sand overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-12 md:mb-16 text-center"
        >
          <p className="text-brand-secondary uppercase tracking-[0.3em] text-[10px] md:text-xs mb-6 font-semibold">{eyebrow}</p>
          <h2 className="text-3xl md:text-5xl font-serif text-brand-primary max-w-2xl mx-auto leading-tight">
            {(heading || "").split('<br/>').map((line, i) => (
              <span key={i}>
                {line}
                {i === 0 && (heading || "").includes('<br/>') && <br />}
              </span>
            ))}
          </h2>
        </motion.div>
      </div>

      {/* Edge-to-edge scroll container purely for mobile */}
      <div className="w-full pl-8 md:pl-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto md:px-24 flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-x-8 gap-y-12 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory sm:snap-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-12 sm:pb-0 pr-8 sm:pr-0"
        >
          {(items || []).map((item, index) => (
            <LifestyleItem key={index} {...item} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}