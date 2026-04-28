'use client'
import { motion } from 'framer-motion'

export function StudioLegend({ contact }) {
  const phone = contact?.phone || "+91 77790 02147";
  const email = contact?.email || "seven9devconllp@gmail.com";

  const legendItems = [
    {
      label: 'Office Location',
      title: 'Silvassa, DNH',
      value: 'Ring Road, Towards Lions School, Opp. HDFC Bank, Silvassa - 396230',
      link: 'https://maps.app.goo.gl/uUXbEUTf2tXqETni8',
      icon: (
        <svg className="w-5 h-5 text-brand-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        </svg>
      )
    },
    {
      label: 'Email Address',
      title: 'Direct Mail',
      value: email,
      link: `mailto:${email}`,
      icon: (
        <svg className="w-5 h-5 text-brand-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      label: 'Call Us',
      title: 'Office Line',
      value: phone,
      link: `tel:${phone.replace(/\s+/g, '')}`,
      icon: (
        <svg className="w-5 h-5 text-brand-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    }
  ]

  return (
    <section id="office" className="py-32 bg-brand-sand relative">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-brand-primary/5">
          {legendItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="p-8 md:p-12 border-b md:border-b-0 md:border-r last:border-0 border-brand-primary/5 group hover:bg-brand-primary transition-colors duration-500"
            >
              <div className="flex justify-between items-start mb-10">
                <div className="w-10 h-10 rounded-full border border-brand-clay/20 flex items-center justify-center group-hover:bg-brand-clay group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-clay group-hover:text-white/60 transition-colors font-bold">
                  {item.label}
                </span>
              </div>

              <h3 className="text-xl font-serif text-brand-primary group-hover:text-brand-sand mb-4 transition-colors">
                {item.title}
              </h3>

              {item.link ? (
                <a 
                  href={item.link} 
                  target={item.link.startsWith('http') ? "_blank" : undefined}
                  rel={item.link.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="text-lg font-serif text-brand-primary group-hover:text-white transition-colors block leading-snug"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-sm font-light text-brand-secondary group-hover:text-white/80 transition-colors leading-relaxed">
                  {item.value}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function StudioPhilosophy() {
  return (
    <section className="py-20 md:py-32 bg-brand-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 p-12 text-[15vw] font-serif italic text-white/[0.03] leading-none select-none">
        Vision
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-8 bg-brand-clay/40" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-brand-clay font-bold">
              Our Philosophy
            </span>
            <div className="h-px w-8 bg-brand-clay/40" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-brand-sand leading-tight mb-12">
            "Our philosophy is simple; hire great people and give them the resources and support to do their best work."
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-clay" />
            <div className="w-1.5 h-1.5 rounded-full bg-brand-clay/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-brand-clay/20" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function FullMapSection() {
  return (
    <section className="relative h-[70vh] md:h-[80vh] bg-brand-sand overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.9641502881313!2d73.00765270000001!3d20.2603215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0cb00779c1cf1%3A0x66e6ce6a540983f4!2sSeven9%20Devcon%20LLP!5e0!3m2!1sen!2sin!4v1777227076019!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
      ></iframe>

      {/* Floating Partner Card */}
      <div className="absolute inset-0 flex items-center justify-center md:justify-start pointer-events-none p-4 md:p-16 lg:p-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/95 backdrop-blur-md p-6 md:p-12 shadow-2xl border border-brand-primary/10 max-w-[calc(100vw-2rem)] md:max-w-sm pointer-events-auto"
        >
          <span className="text-[10px] uppercase tracking-widest text-brand-clay font-bold mb-6 block">
            Our Location
          </span>
          <h4 className="text-2xl font-serif text-brand-primary mb-6">Find us on Google Maps</h4>
          <p className="text-sm text-brand-secondary font-light leading-relaxed mb-8">
            Seven9 Developers Silvassa Ring Road, Towards Lions School, Opp. HDFC Bank, Silvassa, DNH - 396230
          </p>
          <div className="pt-8 border-t border-brand-primary/10">
            <a
              href="https://maps.app.goo.gl/uUXbEUTf2tXqETni8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold text-brand-clay uppercase tracking-widest hover:underline"
            >
              Get Directions →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
