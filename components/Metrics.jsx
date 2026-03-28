'use client'
import { motion, useInView } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

function AnimatedNumber({ value, inView }) {
  const [display, setDisplay] = useState(0)
  const numericEnd = parseInt(value.replace(/\D/g, ''))

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2200
    const steps = 80
    const stepVal = numericEnd / steps
    const interval = duration / steps

    const timer = setInterval(() => {
      start += stepVal
      if (start >= numericEnd) {
        setDisplay(numericEnd)
        clearInterval(timer)
      } else {
        setDisplay(Math.floor(start))
      }
    }, interval)

    return () => clearInterval(timer)
  }, [inView, numericEnd])

  const format = () => {
    if (value.includes('Lakh')) return `${display} L+`
    if (value.includes('k')) return `${display}k`
    return `${display}+`
  }

  return <>{format()}</>
}

export default function Metrics() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { value: '4+', suffix: 'Years Young', sub: 'Est. 2021' },
    { value: '20+', suffix: 'Teammates', sub: 'And Growing' },
    { value: '5+', suffix: 'Industry Awards', sub: 'Nationally Recognised' },
    { value: '400+', suffix: 'Happy Customers', sub: 'Across Silvassa' },
    { value: '3 Lakh+', suffix: 'Sq.ft Ongoing', sub: 'Under Construction' },
    { value: '7k+', suffix: 'Sq.ft Delivered', sub: 'Successfully Completed' },
  ]

  return (
    <section
      ref={ref}
      className="relative bg-brand-primary overflow-hidden"
    >
      {/* Top decorative border with a clay accent line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-clay/60 to-transparent" />

      {/* Eyebrow label */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 pt-16 pb-4">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-[10px] uppercase tracking-[0.35em] text-brand-clay font-semibold"
        >
          By The Numbers
        </motion.p>
      </div>

      {/* The hero number strip */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 pb-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group flex flex-col items-center text-center py-10 md:py-14 px-4 first:pl-0 relative"
          >
            {/* Separator — visibility is precisely mapped per grid state:
                mobile=2col, tablet=3col, desktop=6col */}
            {(() => {
              // i=0 → never  
              // i=1 → all grids (always between 2 items)
              // i=2 → hide mobile (new row), show md+ 
              // i=3 → show mobile, hide md (new row), show lg
              // i=4 → hide mobile (new row), show md+
              // i=5 → all grids
              let cls = null
              if (i === 1 || i === 5) cls = 'block'
              else if (i === 2 || i === 4) cls = 'hidden md:block'
              else if (i === 3) cls = 'block md:hidden lg:block'

              return cls ? (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.08 }}
                  style={{ transformOrigin: 'top' }}
                  className={`${cls} absolute left-0 top-10 bottom-10 w-[1px] bg-white/10`}
                />
              ) : null
            })()}

            {/* The big number — Barlow lining numerals for perfect baseline alignment */}
            <div className="relative">
              <span
                className="block leading-none tracking-tight text-brand-sand"
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
                  fontVariantNumeric: 'lining-nums tabular-nums',
                }}
              >
                <AnimatedNumber value={stat.value} inView={inView} />
              </span>
              {/* Animated underline that sweeps in */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + i * 0.1, ease: 'circOut' }}
                style={{ transformOrigin: 'left' }}
                className="mt-3 h-[2px] w-8 bg-brand-clay rounded-full mx-auto"
              />
            </div>

            {/* Labels */}
            <div className="mt-5 flex flex-col gap-1">
              <span className="text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-white/80 font-semibold leading-snug">
                {stat.suffix}
              </span>
              <span className="text-[9px] uppercase tracking-[0.15em] text-white/30 font-light">
                {stat.sub}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom decorative border */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-clay/60 to-transparent" />
    </section>
  )
}
