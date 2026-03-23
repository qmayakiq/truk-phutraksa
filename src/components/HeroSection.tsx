import { ArrowRight, FileText } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center bg-primary-dark overflow-hidden pt-16 lg:pt-20"
    >
      {/* Background overlay pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light opacity-95" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
          <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
          <span className="text-white/90 text-sm font-medium">
            ผู้เชี่ยวชาญด้านรถบรรทุกขยะ กว่า 20 ปี
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
          มาตรฐานงานประกอบ
          <br />
          <span className="text-accent">ระดับมืออาชีพ</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-4 leading-relaxed">
          เพื่อความทนทานและประสิทธิภาพสูงสุด
        </p>
        <p className="text-base sm:text-lg text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
          รับผลิตและออกแบบตัวถังรถบรรทุกขยะทุกประเภท โดยช่างผู้เชี่ยวชาญ
          <br className="hidden sm:block" />
          พร้อมบริการหลังการขายแบบครบวงจร
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="group flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40"
          >
            <FileText className="w-5 h-5" />
            ขอใบเสนอราคา
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#portfolio"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all border border-white/20"
          >
            ดูผลงานทั้งหมด
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-white">500+</div>
            <div className="text-sm text-white/60 mt-1">คันที่ส่งมอบ</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-white">200+</div>
            <div className="text-sm text-white/60 mt-1">ลูกค้าทั่วประเทศ</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-white">20+</div>
            <div className="text-sm text-white/60 mt-1">ปีแห่งประสบการณ์</div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
