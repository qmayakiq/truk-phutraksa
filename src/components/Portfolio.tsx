"use client";

import { Building2, TrendingUp, MapPin, ArrowRight } from "lucide-react";

export default function Portfolio({ data }: { data?: any }) {
  const clients = data?.clients || [
    "เทศบาลนครเชียงใหม่",
    "อบต.บางพลี",
    "เทศบาลเมืองภูเก็ต",
    "เทศบาลนครขอนแก่น",
    "อบจ.สุราษฎร์ธานี",
    "เทศบาลนครนครราชสีมา",
  ];

  const displayStats = data?.stats || [
    { label: "รถที่จำหน่าย", value: "150+" },
    { label: "ลูกค้าทั่วประเทศ", value: "20+" },
    { label: "ประสบการณ์", value: "10+" },
  ];

  const stats = [
    {
      icon: TrendingUp,
      value: displayStats[0]?.value || "100+",
      label: displayStats[0]?.label || "คันที่ส่งมอบ",
    },
    {
      icon: Building2,
      value: displayStats[1]?.value || "20+",
      label: displayStats[1]?.label || "ลูกค้าทั่วประเทศ",
    },
    {
      icon: MapPin,
      value: displayStats[2]?.value || "77+",
      label: displayStats[2]?.label || "จังหวัดที่ให้บริการ",
    },
  ];

  const projects = data?.portfolio || [
    {
      title: "รถบรรทุกขยะ 6 ล้อ",
      client: "เทศบาลนครหาดใหญ่",
      image: "/images/portfolio/project1.jpg",
    },
    {
      title: "รถอัดขยะ 10 ล้อ",
      client: "บริษัท ขยะสะอาด จำกัด",
      image: "/images/portfolio/project2.jpg",
    },
    {
      title: "รถเทท้าย 8 ล้อ",
      client: "องค์การบริหารส่วนจังหวัด",
      image: "/images/portfolio/project3.jpg",
    },
  ];

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-3">
            Our Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            ความสำเร็จของเรา
          </h2>
          <p className="text-lg text-gray-medium max-w-2xl mx-auto">
            มอบรถกว่า 100 คัน ให้กับลูกค้ากว่า 20 แห่งทั่วประเทศ
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {stats?.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="text-center p-8 rounded-2xl bg-primary/5 border border-primary/10"
              >
                <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-medium font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Portfolio Projects */}
        <div className="mb-12">
          <h3 className="text-center text-xl font-semibold text-gray-dark mb-8">
            ผลงานล่าสุดของเรา
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.map((project: any, index: number) => (
              <div
                key={index}
                className="group overflow-hidden rounded-xl bg-white shadow-sm border border-gray-light hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-w-16 aspect-h-12 bg-gray-bg relative h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/400x300/0f3460/ffffff?text=${encodeURIComponent(project.title || "Project")}`;
                    }}
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-foreground mb-1">
                    {project.title}
                  </h4>
                  <p className="text-sm text-gray-medium">
                    {project.client}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trusted Clients */}
        <div className="mb-12">
          <h3 className="text-center text-lg font-semibold text-gray-dark mb-8">
            ลูกค้าที่ไว้วางใจเรา
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {clients?.map((client: string, index: number) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 h-20 rounded-xl bg-gray-bg border border-gray-light hover:border-primary/20 hover:shadow-md transition-all"
              >
                <span className="text-sm font-medium text-gray-dark text-center">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors"
          >
            สนใจสั่งประกอบรถ ติดต่อเรา
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
