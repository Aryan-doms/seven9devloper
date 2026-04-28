'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [projectsHovered, setProjectsHovered] = useState(false)
  const [projects, setProjects] = useState([])
  const [mobileExpanded, setMobileExpanded] = useState({
    projects: false,
    categories: {} // stores which category is open on mobile
  })

  // Fallback projects if API fetch fails or is slow
  const fallbackProjects = [
    { id: 'f1', slug: 'palladium-highstreet', title: { rendered: 'Palladium Highstreet' }, acf: { project_status: 'Coming Soon' } },
    { id: 'f2', slug: 'palladium-park', title: { rendered: 'Palladium Park' }, acf: { project_status: 'On Going' } },
    { id: 'f3', slug: 'grandeur-bungalow', title: { rendered: 'The Grandeur' }, acf: { project_status: 'On Going' } },
    { id: 'f4', slug: 'palladium-alcove', title: { rendered: 'Palladium Alcove' }, acf: { project_status: 'On Going' } },
    { id: 'f5', slug: 'palladium-square', title: { rendered: 'Palladium Square' }, acf: { project_status: 'Completed' } },
    { id: 'f6', slug: 'the-market-pallete', title: { rendered: 'The Market Pallete' }, acf: { project_status: 'Completed' } },
    { id: 'f7', slug: 'premaldeep-square', title: { rendered: 'Premaldeep Square' }, acf: { project_status: 'Completed' } }
  ]

  const [globalContact, setGlobalContact] = useState({
    phone: "+91 77790 02147",
    email: "seven9devconllp@gmail.com"
  })

  const closeTimeoutRef = useRef(null)

  // Triggered when hovering the actual 'Projects' link
  const handleLinkMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setProjectsHovered(true);
  };

  // Triggered when hovering the expanded menu
  const handleMenuMouseEnter = () => {
    // Only cancel the close timer; do not reopen if already fading out
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setProjectsHovered(false);
    }, 150); // 150ms bridge/delay
  };

  // Handle scroll state for navbar reveal
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fetch Projects and Global Data from WordPress
  useEffect(() => {
    async function fetchData() {
      try {
        const [projRes, pageRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/projects?per_page=100`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/pages?slug=global-settings&_embed`)
        ])
        
        if (projRes.ok) {
          const data = await projRes.json()
          setProjects(data)
        }

        if (pageRes.ok) {
          const data = await pageRes.json()
          const acf = data[0]?.acf
          if (acf?.contact_phone || acf?.contact_email) {
            setGlobalContact({
              phone: acf.contact_phone || "+91 77790 02147",
              email: acf.contact_email || "seven9devconllp@gmail.com"
            })
          }
        }
      } catch (err) {
        console.error("Navbar Data Error:", err)
      }
    }
    fetchData()
  }, [])

  // Close mobile menu when screen size increases past mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  // Precise Framer Motion easing from brand guidelines
  const easing = [0.16, 1, 0.3, 1]

  // Grouping projects by status - use fallback if no projects fetched yet
  const statuses = ['New Launch', 'Coming Soon', 'On Going', 'Completed']
  const displayProjects = projects.length > 0 ? projects : fallbackProjects
  
  const groupedProjects = displayProjects.reduce((acc, p) => {
    const status = p?.acf?.project_status || 'On Going' // Match WP "On Going"
    if (!acc[status]) acc[status] = []
    acc[status].push(p)
    return acc
  }, {})

  const navLinks = [
    { name: 'Projects', href: '/projects', hasDropdown: true },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ]

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-700 ease-[0.16,1,0.3,1] ${
          scrolled 
            ? 'bg-brand-sand shadow-sm py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        {/* Centered container for links and mega-menu alignment */}
        <div className="max-w-7xl mx-auto px-8 md:px-16 flex justify-between items-center w-full relative">
          
          {/* Logo (Left, flex-1) */}
          <div className="flex-1 flex justify-start">
            <Link href="/" className="hover:opacity-80 transition-opacity flex items-center">
              <Image 
                src="/logo.webp" 
                alt="Seven9 Developers Logo" 
                width={140} 
                height={40} 
                className={`object-contain transition-all duration-500 ${scrolled ? 'h-8 md:h-10' : 'h-10 md:h-12 brightness-0 invert'}`}
                priority
              />
            </Link>
          </div>

          {/* Desktop Nav Options (Center) */}
          <div className={`hidden md:flex justify-center items-center space-x-12 text-xs uppercase tracking-[0.2em] font-sans shrink-0 transition-colors duration-500 ${scrolled ? 'text-brand-secondary' : 'text-white'}`}>
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="py-4 flex items-center relative"
                onMouseEnter={link.hasDropdown ? handleLinkMouseEnter : undefined}
                onMouseLeave={link.hasDropdown ? handleMouseLeave : undefined}
              >
                <Link 
                  href={link.href} 
                  onClick={() => setProjectsHovered(false)}
                  className="hover:text-brand-clay transition-colors duration-700 whitespace-nowrap"
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Desktop Mega-Menu (Hoisted outside map to prevent layout-triggered ghost hover) */}
          <AnimatePresence>
            {projectsHovered && (
              <motion.div 
                onMouseEnter={handleMenuMouseEnter}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5, ease: easing }}
                className="absolute top-full left-0 w-full px-8 md:px-16 pb-6 pt-2 z-50 pointer-events-auto"
              >
                <div className="bg-brand-sand shadow-2xl border border-brand-stone/30 p-10 grid grid-cols-4 gap-8 rounded-sm overflow-hidden backdrop-blur-md">
                   {statuses.map((status) => (
                     <div key={status} className="flex flex-col gap-5">
                       <h4 className="text-[9px] uppercase tracking-[0.25em] text-brand-clay font-bold border-b border-brand-stone/50 pb-3">
                         {status}
                       </h4>
                       <div className="flex flex-col gap-2.5">
                         {groupedProjects[status]?.length > 0 ? (
                            groupedProjects[status].map((proj) => (
                              <div key={proj.id} className="flex items-center gap-2">
                                <Link 
                                  href={`/projects/${proj.slug}`}
                                  className="text-[10px] uppercase tracking-widest text-brand-primary hover:text-brand-clay transition-colors duration-500 font-medium leading-relaxed"
                                  onClick={() => setProjectsHovered(false)}
                                >
                                  {proj.title.rendered}
                                </Link>
                                {status === 'New Launch' && (
                                  <span className="bg-brand-clay text-white text-[7px] uppercase tracking-wider px-1 py-0.5 font-bold leading-none rounded-[1px]">NEW</span>
                                )}
                              </div>
                            ))
                         ) : (
                            <span className="text-[9px] text-brand-secondary/60 italic font-light">No projects yet</span>
                         )}
                        </div>
                     </div>
                   ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Right Side CTA (flex-1) */}
          <div className="hidden md:flex flex-1 justify-end items-center space-x-6 relative z-50">
             <Link 
               href="/contact" 
               className="bg-brand-clay text-white px-6 py-2.5 text-[10px] uppercase tracking-widest font-semibold hover:bg-[#c4b18f] transition-all duration-300 shadow-sm"
             >
               Book Visit
             </Link>
             <a 
               href={`tel:${globalContact.phone.replace(/\s+/g, '')}`} 
               className={`flex items-center justify-center w-10 h-10 rounded-full border transition-colors duration-700 ${scrolled ? 'border-brand-primary text-brand-primary hover:text-brand-clay hover:border-brand-clay' : 'border-white text-white hover:text-brand-clay hover:border-brand-clay'}`}
               aria-label="Call Us"
               title={`Call Us: ${globalContact.phone}`}
             >
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
               </svg>
             </a>
          </div>

          {/* Mobile Hamburger (flex-1) */}
          <div className="md:hidden flex-1 flex justify-end items-center relative z-50">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className={`p-2 -mr-2 outline-none transition-colors duration-700 ${scrolled ? 'text-brand-primary hover:text-brand-clay' : 'text-white hover:text-brand-clay'}`}
              aria-label="Open menu"
            >
              <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-brand-primary/80 z-[60] backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.8, ease: easing }}
              className="fixed inset-y-0 right-0 w-full sm:w-[400px] bg-brand-sand z-[70] flex flex-col md:hidden shadow-2xl"
            >
              <div className="flex justify-between items-center px-8 h-24 border-b border-brand-stone/30 flex-shrink-0">
                <Link href="/" className="hover:opacity-80 transition-opacity" onClick={() => setMobileMenuOpen(false)}>
                  <Image src="/logo.webp" alt="Seven9 Logo" width={120} height={34} className="object-contain h-8 w-auto" />
                 </Link>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-brand-primary hover:text-brand-clay transition-colors duration-700 outline-none"
                  aria-label="Close menu"
                >
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 flex flex-col py-12 px-8 overflow-y-auto">
                <ul className="flex flex-col space-y-8">
                  {navLinks.map((link, i) => (
                    <li key={link.name} className="flex flex-col">
                      <div className="flex justify-between items-center group">
                        <Link 
                          href={link.href} 
                          className="text-4xl font-serif text-brand-primary group-hover:text-brand-clay transition-colors duration-500" 
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                        {link.hasDropdown && (
                          <button 
                            onClick={() => setMobileExpanded(prev => ({ ...prev, projects: !prev.projects }))}
                            className={`p-2 transition-transform duration-500 ${mobileExpanded.projects ? 'rotate-180' : ''}`}
                          >
                            <svg className="w-6 h-6 text-brand-clay" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        )}
                      </div>

                      {/* Mobile Expandable Project Categories */}
                      {link.hasDropdown && (
                        <AnimatePresence>
                          {mobileExpanded.projects && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-6 pl-4 pt-6 mt-2 border-l border-brand-stone/40">
                                {statuses.map(status => (
                                  <div key={status} className="flex flex-col gap-4">
                                    <button 
                                      onClick={() => setMobileExpanded(prev => ({ 
                                        ...prev, 
                                        categories: { ...prev.categories, [status]: !prev.categories[status] } 
                                      }))}
                                      className="flex justify-between items-center"
                                    >
                                      <span className="text-xs uppercase tracking-[0.25em] text-brand-clay font-bold">{status}</span>
                                      <svg className={`w-4 h-4 transition-transform ${mobileExpanded.categories[status] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 9l-7 7-7-7" />
                                      </svg>
                                    </button>
                                    
                                    <AnimatePresence>
                                      {mobileExpanded.categories[status] && (
                                        <motion.div 
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: 'auto', opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          className="flex flex-col gap-3 pl-4 border-l border-brand-stone/20 overflow-hidden"
                                        >
                                          {groupedProjects[status]?.map(proj => (
                                            <div key={proj.id} className="flex items-center gap-2">
                                              <Link 
                                                href={`/projects/${proj.slug}`}
                                                className="text-sm font-light text-brand-secondary py-1"
                                                onClick={() => setMobileMenuOpen(false)}
                                              >
                                                {proj.title.rendered}
                                              </Link>
                                              {status === 'New Launch' && (
                                                <span className="bg-brand-clay text-white text-[7px] uppercase tracking-wider px-1.5 py-0.5 font-bold leading-none rounded-[1px]">NEW</span>
                                              )}
                                            </div>
                                          ))}
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: easing }}
                className="p-10 border-t border-brand-stone/30 mt-auto bg-white/50 flex-shrink-0"
              >
                <div className="flex flex-col gap-6">
                  <Link 
                    href="/contact" 
                    className="w-full bg-brand-clay text-white py-5 text-xs text-center uppercase tracking-[0.2em] font-semibold hover:bg-[#c4b18f] transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Book Visit
                  </Link>
                  <a href={`tel:${globalContact.phone.replace(/\s+/g, '')}`} className="w-full flex items-center justify-center gap-3 py-4 text-brand-primary hover:text-brand-clay transition-colors duration-700 border border-brand-stone">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <span className="text-sm tracking-widest font-medium uppercase mt-0.5">{globalContact.phone}</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
