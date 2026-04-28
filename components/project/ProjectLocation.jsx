'use client'
import { motion } from 'framer-motion'
import LeadForm from '../common/LeadForm'

export default function ProjectLocation({ project }) {
  const mapEmbedUrl  = project?.acf?.map_embed_url      || ''
  const address      = project?.acf?.project_address    || ''
  const proximity    = project?.acf?.proximity_list     || []
  const projectName  = project?.title?.rendered || 'this project'

  return (
    <section id="location" className="py-24 md:py-40 bg-brand-sand border-b border-brand-primary/10">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <p className="uppercase tracking-[0.25em] text-[10px] text-brand-secondary font-semibold mb-4">
            Find Us
          </p>
          <h2 className="text-4xl md:text-5xl font-serif italic text-brand-primary">
            Location
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Left — Map & Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8"
          >
            {/* Map Continer */}
            <div className="relative w-full overflow-hidden rounded-sm bg-brand-stone/40" style={{ height: '450px' }}>
              {mapEmbedUrl ? (
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="450"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="border-0 w-full h-full"
                  title={`${projectName} location map`}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-brand-secondary gap-3">
                  <svg className="h-8 w-8 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span className="text-sm font-light">Map coming soon</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Address */}
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-primary mb-4">Address</h4>
                {address ? (
                  <p className="text-brand-secondary font-light leading-loose text-sm italic">
                    {address}
                  </p>
                ) : (
                  <p className="text-brand-secondary font-light text-sm italic">Address details pending</p>
                )}
              </div>

              {/* Proximity List */}
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-primary mb-4">Proximity</h4>
                {proximity.length > 0 ? (
                  <div className="flex flex-col border-t border-brand-primary/10">
                    {proximity.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-3 border-b border-brand-primary/10"
                      >
                        <span className="text-xs text-brand-primary font-light">
                          {item?.place_name || ''}
                        </span>
                        <span className="text-[10px] text-brand-clay font-semibold tracking-wide">
                          {item?.distance || ''}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-brand-secondary font-light text-sm italic">Nearby info pending</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right — Enquiry Form */}
          <motion.div
            id="enquiry-form"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-brand-stone/30 p-8 md:p-12 rounded-sm md:sticky md:top-32"
          >
            <h2 className="text-3xl md:text-4xl font-serif italic text-brand-primary mb-8">
              Enquire Now
            </h2>

            <LeadForm 
              projectName={projectName} 
              formAction={project?.acf?.google_form_action_url} 
            />

            <p className="text-[10px] uppercase tracking-[0.15em] text-brand-secondary text-center mt-6 font-light">
              We'll respond within 24 hours
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
