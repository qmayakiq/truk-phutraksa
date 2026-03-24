import { Shield, Lightbulb, Wrench, Award, Clock, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "วัสดุคุณภาพสูง",
    description:
      "เลือกใช้เหล็กเกรดพรีเมียม ผ่านกระบวนการตรวจสอบคุณภาพทุกขั้นตอน เพื่อความทนทานที่เหนือกว่า",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Lightbulb,
    title: "ออกแบบตามการใช้งาน",
    description:
      "ทีมวิศวกรออกแบบเฉพาะตามความต้องการ เพื่อให้ได้ประสิทธิภาพสูงสุดในทุกสภาพการทำงาน",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Wrench,
    title: "ดูแลตลอดอายุการใช้งาน",
    description:
      "ทีมช่างพร้อมให้บริการซ่อมบำรุงตลอดอายุการใช้งาน พร้อมอะไหล่สำรองครบครัน",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Award,
    title: "มาตรฐานการผลิต",
    description:
      "ผ่านการรับรองมาตรฐานอุตสาหกรรม มั่นใจในคุณภาพและความปลอดภัยทุกคัน",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Clock,
    title: "ส่งมอบตรงเวลา",
    description:
      "วางแผนการผลิตอย่างเป็นระบบ ส่งมอบงานตรงเวลาตามกำหนด ไม่ล่าช้า",
    color: "bg-red-50 text-red-600",
  },
  {
    icon: Users,
    title: "ทีมผู้เชี่ยวชาญ",
    description:
      "ช่างผู้ชำนาญงานกว่า 20 ปี พร้อมวิศวกรที่ปรึกษาให้คำแนะนำตลอดโครงการ",
    color: "bg-cyan-50 text-cyan-600",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 lg:py-28 bg-gray-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-3">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            ทำไมต้องเลือกเรา?
          </h2>
          <p className="text-lg text-gray-medium max-w-2xl mx-auto">
            ด้วยประสบการณ์กว่า 20 ปี เราคือผู้นำด้านการผลิตและประกอบตัวถังรถบรรทุกขยะ
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-8 rounded-2xl border border-gray-light hover:border-primary/20 bg-white hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${feature.color} mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
