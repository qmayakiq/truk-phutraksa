import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedProducts from "@/components/FeaturedProducts";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import Portfolio from "@/components/Portfolio";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { Redis } from '@upstash/redis';

// Force dynamic rendering to ensure fresh data is always fetched
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const defaultData = {
  stats: [
    { id: 1, label: "รถที่จำหน่าย", value: "150+" },
    { id: 2, label: "ลูกค้าทั่วประเทศ", value: "20+" },
    { id: 3, label: "ประสบการณ์", value: "10+" },
  ],
  products: [
    {
      id: 1,
      name: "รถบรรทุกขยะแบบอัดท้าย 6 ล้อ",
      specs: ["ความจุ 6 ลูกบาศก์เมตร", "ระบบไฮดรอลิก", "ตัวถังแข็งแรง"],
      price: "ติดต่อ",
    },
    {
      id: 2,
      name: "รถบรรทุกขยะแบบเทท้าย 8 ล้อ",
      specs: ["ความจุ 8 ลูกบาศก์เมตร", "ระบบเทอัตโนมัติ", "เหมาะกับขยะอ่อน"],
      price: "ติดต่อ",
    },
  ],
  portfolio: [
    {
      id: 1,
      title: "รถบรรทุกขยะ 6 ล้อ",
      client: "เทศบาลนครหาดใหญ่",
      image: "/images/portfolio/project1.jpg",
    },
    {
      id: 2,
      title: "รถอัดขยะ 10 ล้อ",
      client: "บริษัท ขยะสะอาด จำกัด",
      image: "/images/portfolio/project2.jpg",
    },
  ],
  clients: [
    "เทศบาลนครเชียงใหม่",
    "อบต.บางพลี",
    "เทศบาลเมืองภูเก็ต",
    "เทศบาลนครขอนแก่น",
    "อบจ.สุราษฎร์ธานี",
    "เทศบาลนครนครราชสีมา",
  ],
};

async function getWebsiteData() {
  try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const redis = new Redis({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
      });
      const data = await redis.get('website_data');
      if (data && typeof data === 'object') {
        // Merge fetched data with default data to ensure no missing arrays/objects
        return {
          ...defaultData,
          ...data,
        };
      }
    }
    return defaultData;
  } catch (error) {
    console.error("Failed to fetch website data:", error);
    return defaultData;
  }
}

export default async function Home() {
  const data = await getWebsiteData() as any;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection data={data} />
        <AboutSection data={data} />
        <WhyChooseUs />
        <FeaturedProducts data={data?.products} />
        <ServicesSection />
        <ProcessSection />
        <Portfolio data={data} />
        <TestimonialsSection data={data?.testimonials} />
        <ContactSection data={data} />
      </main>
      <Footer data={data} />
      <FloatingContact />
    </div>
  );
}
