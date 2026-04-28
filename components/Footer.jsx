async function getFooterData() {
  try {
    const [homeRes, globalRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/pages?slug=home&_embed`, { next: { revalidate: 60 } }),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/pages?slug=global-settings&_embed`, { next: { revalidate: 60 } })
    ]);

    const [homeData, globalData] = await Promise.all([
      homeRes.ok ? homeRes.json() : null,
      globalRes.ok ? globalRes.json() : null
    ]);

    return {
      homeAcf: homeData?.[0]?.acf || null,
      globalAcf: globalData?.[0]?.acf || null
    };
  } catch (error) {
    return { homeAcf: null, globalAcf: null };
  }
}

export default async function Footer() {
  const { homeAcf, globalAcf } = await getFooterData();
  
  // Milestones strictly from Home Page
  const milestones = homeAcf?.metrics_stats?.map(s => ({
    value: s?.stat_value || "",
    suffix: s?.stat_suffix || ""
  })) || [
    { value: '4+', suffix: 'Years Young' },
    { value: '5+', suffix: 'Industry Awards' },
    { value: '20+', suffix: 'Teammates' },
    { value: '400+', suffix: 'Customers' },
    { value: '3 Lakh+', suffix: 'sq.ft Ongoing' }
  ];

  const contact = {
    phone: globalAcf?.contact_phone || "+91 77790 02147",
    email: globalAcf?.contact_email || "seven9devconllp@gmail.com",
    tagline: globalAcf?.footer_tagline || "Transforming the Silvassa region through innovative, sustainable, and intentionally slow building practices since our inception."
  };

  const socialLinks = globalAcf?.social_links || [
    { label: 'Facebook', url: 'https://www.facebook.com/share/19bR8TmrtD/' },
    { label: 'Instagram', url: 'https://www.instagram.com/seven9_developers/' },
    { label: 'YouTube', url: 'http://www.youtube.com/@Seven9_Developers' }
  ];

  return (
    <footer className="py-24 px-8 md:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 items-start pb-16 border-b border-brand-primary/10">
        {/* About/Brand */}
        <div className="flex flex-col gap-6">
          <div className="text-2xl font-serif font-semibold tracking-tighter text-brand-primary">
            Seven9<span className="font-light">Developers</span>
          </div>
          <div className="text-brand-secondary text-sm leading-loose max-w-sm font-light">
            {contact.tagline}
          </div>
          <div className="mt-2">
            <div className="font-medium text-brand-primary text-xs uppercase tracking-widest mb-4">Firm Milestones</div>
            <ul className="text-brand-secondary text-sm space-y-2 font-light">
              {milestones.slice(0, 5).map((m, i) => (
                <li key={i}>
                  <span className="font-medium text-brand-primary">{m.value}</span> {m.suffix}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Contact & Social */}
        <div className="flex flex-col md:items-center gap-6">
          <div className="w-full md:text-center">
            <div className="font-medium text-brand-primary text-xs uppercase tracking-widest mb-4">Direct Contact</div>
            <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="text-brand-secondary text-lg hover:text-brand-clay transition-colors">
              {contact.phone}
            </a>
            <div className="mt-2">
              <a href={`mailto:${contact.email}`} className="text-brand-secondary text-sm font-light hover:text-brand-clay transition-colors lowercase">
                {contact.email}
              </a>
            </div>
          </div>
          <div className="w-full md:text-center mt-4">
             <div className="font-medium text-brand-primary text-xs uppercase tracking-widest mb-4">Social</div>
             <div className="flex flex-col md:items-center gap-3 text-brand-secondary text-sm font-light">
               {socialLinks.map((link, i) => (
                 <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-brand-clay transition-colors">
                   {link.label}
                 </a>
               ))}
             </div>
          </div>
        </div>

        {/* Legal/Links */}
        <div className="flex flex-col md:items-end gap-6 w-full">
          <div className="font-medium text-brand-primary text-xs uppercase tracking-widest mb-2 md:text-right w-full">Navigation</div>
          <div className="flex flex-col gap-3 text-sm text-brand-secondary font-light md:text-right w-full">
            <a className="hover:text-brand-clay transition-colors" href="/projects">Projects</a>
            <a className="hover:text-brand-clay transition-colors" href="/about">About Us</a>
            <a className="hover:text-brand-clay transition-colors" href="/careers">Careers</a>
            <a className="hover:text-brand-clay transition-colors" href="/contact">Contact Us</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
        <div className="text-[10px] uppercase tracking-[0.2em] text-brand-primary/40 text-center md:text-left w-full flex flex-col md:flex-row justify-between gap-4">
          <span>© 2026 Seven9 Developers. All Rights Reserved.</span>
          <a 
            href="mailto:acpatel2005@gmail.com" 
            className="hover:text-brand-clay transition-colors duration-300"
          >
            Site by Aryan Patel
          </a>
        </div>
      </div>
    </footer>
  )
}
