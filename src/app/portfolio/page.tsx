import { Redis } from '@upstash/redis';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioGallery from "@/components/PortfolioGallery";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const defaultPortfolio = [
  { id: 1, title: "รถบรรทุกขยะ 6 ล้อ", client: "เทศบาลนครหาดใหญ่", image: "/images/portfolio/project1.jpg" },
  { id: 2, title: "รถอัดขยะ 10 ล้อ", client: "บริษัท ขยะสะอาด จำกัด", image: "/images/portfolio/project2.jpg" },
];

async function getPortfolioData() {
  try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const redis = new Redis({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
      });
      const data = await redis.get('website_data') as any;
      if (data && data.portfolio) {
        return data.portfolio;
      }
    }
    return defaultPortfolio;
  } catch (error) {
    console.error("Failed to fetch portfolio data:", error);
    return defaultPortfolio;
  }
}

export default async function PortfolioPage() {
  const portfolio = await getPortfolioData();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-16 lg:pt-20">
        {/* Header */}
        <section className="bg-primary-dark py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              Our Portfolio
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              ผลงานของเรา
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              รวมผลงานการประกอบและส่งมอบรถบรรทุกขยะให้กับลูกค้าทั่วประเทศ
            </p>
          </div>
        </section>

        {/* Gallery */}
        <PortfolioGallery portfolio={portfolio} />
      </main>
      <Footer />
    </div>
  );
}
