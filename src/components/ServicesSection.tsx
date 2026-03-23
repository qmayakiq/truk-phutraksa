import { Wrench, Settings, Clock, Shield, Phone, CheckCircle } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "บริการซ่อมบำรุง",
    description: "ซ่อมบำรุงตัวถังรถบรรทุกขยะทุกรุ่นและทุกยี่ห้อ โดยช่างผู้เชี่ยวชาญ",
    features: ["ซ่อมระบบไฮดรอลิก", "ซ่อมตัวถัง", "ซ่อมระบบอัดขยะ", "ซ่อมระบบเท"],
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Settings,
    title: "บริการตรวจเช็คสภาพ",
    description: "ตรวจเช็คสภาพรถอย่างละเอียดเพื่อให้มั่นใจในความปลอดภัยและประสิทธิภาพ",
    features: ["ตรวจเช็ครายเดือน", "ตรวจเช็ครายปี", "ตรวจก่อนใช้งาน", "ออกรายงาน"],
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Clock,
    title: "บริการด่วน 24 ชม.",
    description: "บริการซ่อมฉุกเฉิน 24 ชั่วโมง พร้อมเข้าไปแก้ไขปัญหาที่หน้างาน",
    features: ["ซ่อมฉุกเฉิน", "บริการ 24 ชม.", "เข้าถึงทุกพื้นที่", "รถบริการพร้อม"],
    color: "bg-red-50 text-red-600",
  },
  {
    icon: Shield,
    title: "บริการรับประกัน",
    description: "รับประกันงานซ่อมและอะไหล่ทุกชิ้น พร้อมให้คำแนะนำดูแลรักษา",
    features: ["รับประกัน 6 เดือน", "อะไหล่ของแท้", "ปรึกษาฟรี", "ดูแลตลอดอายุการใช้งาน"],
    color: "bg-purple-50 text-purple-600",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-3">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            บริการ/ซ่อมบำรุง
          </h2>
          <p className="text-lg text-gray-medium max-w-2xl mx-auto">
            บริการครบวงจรสำหรับรถบรรทุกขยะ ตั้งแต่การตรวจเช็ค ซ่อมบำรุง
            ไปจนถึงการดูแลรักษาระยะยาว
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group p-8 rounded-2xl border border-gray-light hover:border-primary/20 bg-white hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${service.color} mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-medium leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm text-gray-dark"
                    >
                      <CheckCircle className="w-4 h-4 text-accent-green flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-8 lg:p-12 text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            ต้องการบริการซ่อมบำรุงหรือตรวจเช็ครถ?
          </h3>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            ทีมช่างผู้เชี่ยวชาญของเราพร้อมให้บริการคุณ
            ติดต่อเราได้ทันทีเพื่อรับคำปรึกษาและนัดวันเข้ารับบริการ
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+66828800878"
              className="flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              <Phone className="w-5 h-5" />
              082-880-0878
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors"
            >
              จองบริการออนไลน์
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
