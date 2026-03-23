import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServicesSection from "@/components/ServicesSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Portfolio from "@/components/Portfolio";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <WhyChooseUs />
        <ServicesSection />
        <FeaturedProducts />
        <Portfolio />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
