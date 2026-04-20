'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProjectFloorPlans({ project }) {
  const floorPlans = project?.acf?.floor_plans || []
  const sitePlans  = project?.acf?.site_plans  || []

  const [activeTab, setActiveTab] = useState(0)

  if (floorPlans.length === 0 && sitePlans.length === 0) return null

  const activePlan = floorPlans[activeTab]
  const planImgUrl = activePlan?.plan_image?.url || ''
  const planImgAlt = activePlan?.plan_label     || 'Floor Plan'

  return (
    <section className="py-24 md:py-40 bg-white border-b border-brand-primary/10">
      <div className="max-w-7xl mx-auto px-8 md:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <p className="uppercase tracking-[0.25em] text-[10px] text-brand-secondary font-semibold mb-4">
            Configuration Maps
          </p>
          <h2 className="text-4xl md:text-5xl font-serif italic text-brand-primary">
            Floor Plans
          </h2>
        </motion.div>

        {/* Floor Plans Section */}
        {floorPlans.length > 0 && (
          <>
            {/* Tabs */}
            <div className="flex flex-wrap gap-3 mb-10">
              {floorPlans.map((plan, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`px-6 py-3 text-[10px] uppercase tracking-[0.15em] font-semibold transition-all duration-300 ${
                    activeTab === i
                      ? 'bg-brand-clay text-white'
                      : 'bg-transparent text-brand-secondary border border-brand-stone hover:text-brand-primary hover:border-brand-primary'
                  }`}
                >
                  {plan?.plan_label || `Plan ${i + 1}`}
                </button>
              ))}
            </div>

            {/* Plan Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full aspect-[16/9] md:aspect-[2/1] bg-brand-stone/20 rounded-sm overflow-hidden mb-20"
              >
                {planImgUrl ? (
                  <Image
                    src={planImgUrl}
                    alt={planImgAlt}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-brand-secondary text-sm font-light">
                    Floor plan unavailable
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </>
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
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4">
              {sitePlans.map((plan, i) => {
                const imgUrl = plan?.site_plan_image?.url || ''
                const imgAlt = plan?.site_plan_label || `Site Plan ${i + 1}`
                return (
                  <div key={i} className="flex-none w-[80vw] sm:w-[500px] snap-center">
                    <div className="relative aspect-[4/3] bg-brand-stone/20 rounded-sm overflow-hidden">
                      {imgUrl ? (
                        <Image src={imgUrl} alt={imgAlt} fill className="object-contain" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-brand-secondary text-sm font-light">
                          {imgAlt}
                        </div>
                      )}
                    </div>
                    {plan?.site_plan_label && (
                      <p className="mt-4 uppercase text-[10px] tracking-[0.15em] text-brand-secondary font-semibold">
                        {plan.site_plan_label}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </>
        )}

      </div>
    </section>
  )
}
