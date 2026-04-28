import ContactHero from '@/components/contact/ContactHero'
import { StudioLegend, StudioPhilosophy, FullMapSection } from '@/components/contact/ContactInfo'
import ContactStickyBar from '@/components/contact/ContactStickyBar'

export const metadata = {
  title: 'Contact Us | Seven9 Developers',
  description: 'Connect with Seven9 Developers Studio. Initiate your project brief and explore our architectural studio location in Silvassa.',
}

async function getContactData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/pages?slug=global-settings&_embed`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    const response = await res.json();
    return response[0]?.acf || null;
  } catch (error) {
    return null;
  }
}

export default async function ContactPage() {
  const acf = await getContactData();
  const globalContact = {
    phone: acf?.contact_phone || "+91 77790 02147",
    email: acf?.contact_email || "seven9devconllp@gmail.com"
  };

  return (
    <main className="bg-brand-sand min-h-screen relative">
      {/* Immersive Split Hero & Form */}
      <ContactHero />
      
      {/* The Legend Grid */}
      <StudioLegend contact={globalContact} />

      {/* The Studio Creed (Dark Break) */}
      <StudioPhilosophy />

      {/* Full Bleed Map with Floating Card */}
      <FullMapSection />

      <ContactStickyBar />
    </main>
  )
}
