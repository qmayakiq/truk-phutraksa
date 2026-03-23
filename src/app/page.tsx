import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServicesSection from "@/components/ServicesSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Portfolio from "@/components/Portfolio";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

async function getWebsiteData() {
  try {
    // In server components, we need to use an absolute URL or directly read from DB
    // To avoid complex URL resolution in Vercel, we'll try to fetch from our API
    // Note: In a real production app, it's better to read directly from DB in Server Components
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
      
    const res = await fetch(`${baseUrl}/admin/api/save-data`, { next: { revalidate: 0 } }); // No cache
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch website data:", error);
    return null;
  }
}

export default async function Home() {
  const data = await getWebsiteData();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <WhyChooseUs />
        <ServicesSection />
        <FeaturedProducts data={data?.products} />
        <Portfolio data={data} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
