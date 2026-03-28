'use client'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 flex justify-between items-center px-8 py-6 md:px-16 transition-all duration-700 ${scrolled ? 'bg-brand-sand shadow-sm py-4 pointer-events-auto' : 'bg-transparent pointer-events-none'}`}>
      <div className={`text-2xl font-serif font-semibold tracking-tighter transition-all duration-700 ${scrolled ? 'opacity-100 text-brand-primary' : 'opacity-0 -translate-y-2'}`}>
        Seven9<span className="font-light">Developers</span>
      </div>
      <div className={`hidden md:flex space-x-12 text-xs uppercase tracking-[0.2em] transition-all duration-700 ${scrolled ? 'opacity-100 text-brand-secondary pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <a className="hover:text-brand-clay transition-colors" href="#">Philosophy</a>
        <a className="hover:text-brand-clay transition-colors" href="#">Projects</a>
        <a className="hover:text-brand-clay transition-colors" href="#">Experience</a>
        <a className="hover:text-brand-clay transition-colors" href="#">Contact</a>
      </div>
      <div className={`md:hidden transition-all duration-700 ${scrolled ? 'opacity-100 text-brand-primary pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </div>
    </nav>
  )
}
