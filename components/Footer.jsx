export default function Footer() {
  return (
    <footer className="py-24 px-8 md:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 items-start pb-16 border-b border-brand-primary/10">
        {/* About/Brand */}
        <div className="flex flex-col gap-6">
          <div className="text-2xl font-serif font-semibold tracking-tighter text-brand-primary">
            Seven9<span className="font-light">Developers</span>
          </div>
          <div className="text-brand-secondary text-sm leading-loose max-w-sm font-light">
            Transforming the Silvassa region through innovative, sustainable, and intentionally slow building practices since our inception.
          </div>
          <div className="mt-2">
            <div className="font-medium text-brand-primary text-xs uppercase tracking-widest mb-4">Firm Milestones</div>
            <ul className="text-brand-secondary text-sm space-y-2 font-light">
              <li><span className="font-medium text-brand-primary">20+</span> Teammates</li>
              <li><span className="font-medium text-brand-primary">400+</span> Customers</li>
              <li><span className="font-medium text-brand-primary">3 Lakh+ sq.ft</span> Ongoing</li>
            </ul>
          </div>
        </div>
        
        {/* Contact & Social */}
        <div className="flex flex-col md:items-center gap-6">
          <div className="w-full md:text-center">
            <div className="font-medium text-brand-primary text-xs uppercase tracking-widest mb-4">Direct Contact</div>
            <a href="tel:+917779002147" className="text-brand-secondary text-lg hover:text-brand-clay transition-colors">+91 77790 02147</a>
          </div>
          <div className="w-full md:text-center mt-4">
             <div className="font-medium text-brand-primary text-xs uppercase tracking-widest mb-4">Social</div>
             <div className="flex flex-col md:items-center gap-3 text-brand-secondary text-sm font-light">
               <a href="https://www.facebook.com/share/19bR8TmrtD/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-clay transition-colors">Facebook</a>
               <a href="https://www.instagram.com/seven9_developers/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-clay transition-colors">Instagram</a>
               <a href="http://www.youtube.com/@Seven9_Developers" target="_blank" rel="noopener noreferrer" className="hover:text-brand-clay transition-colors">YouTube</a>
             </div>
          </div>
        </div>

        {/* Legal/Links */}
        <div className="flex flex-col md:items-end gap-6 w-full">
          <div className="font-medium text-brand-primary text-xs uppercase tracking-widest mb-2 md:text-right w-full">Navigation</div>
          <div className="flex flex-col gap-3 text-sm text-brand-secondary font-light md:text-right w-full">
            <a className="hover:text-brand-clay transition-colors" href="https://seven9developers.in/projects/">Projects</a>
            <a className="hover:text-brand-clay transition-colors" href="https://seven9developers.in/about-us/">About Us</a>
            <a className="hover:text-brand-clay transition-colors" href="https://seven9developers.in/careers/">Careers</a>
            <a className="hover:text-brand-clay transition-colors" href="https://seven9developers.in/contact-us/">Contact Us</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
        <div className="text-[10px] uppercase tracking-[0.2em] text-brand-primary/40 text-center md:text-left w-full">
          © 2026 Seven9Developers. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
