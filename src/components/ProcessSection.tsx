import { MessageSquare, PenTool, Factory, TruckIcon, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "ปรึกษาและวางแผน",
    description: "พูดคุยรับฟังความต้องการ วิเคราะห์การใช้งานจริง และเสนอแนวทางที่เหมาะสมที่สุด พร้อมเสนอราคา",
    color: "bg-blue-50 text-blue-600",
    borderColor: "border-blue-200",
  },
  {
    icon: PenTool,
    step: "02",
    title: "ออกแบบและอนุมัติ",
    description: "ทีมวิศวกรออกแบบตัวถังตามสเปค จัดทำแบบร่าง 3D เพื่อให้ลูกค้าอนุมัติก่อนเริ่มผลิต",
    color: "bg-amber-50 text-amber-600",
    borderColor: "border-amber-200",
  },
  {
    icon: Factory,
    step: "03",
    title: "ผลิตและตรวจสอบ",
    description: "ดำเนินการผลิตด้วยเครื่องจักรที่ทันสมัย ตรวจสอบคุณภาพทุกขั้นตอน มีรายงานความคืบหน้าตลอด",
    color: "bg-green-50 text-green-600",
    borderColor: "border-green-200",
  },
  {
    icon: TruckIcon,
    step: "04",
    title: "ส่งมอบและดูแล",
    description: "ส่งมอบพร้อมสอนการใช้งาน รับประกันคุณภาพ พร้อมบริการหลังการขายตลอดอายุการใช้งาน",
    color: "bg-purple-50 text-purple-600",
    borderColor: "border-purple-200",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-20 lg:py-28 bg-gray-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-3">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            ขั้นตอนการสั่งประกอบ
          </h2>
          <p className="text-lg text-gray-medium max-w-2xl mx-auto">
            กระบวนการทำงานที่โปร่งใส ชัดเจน ทุกขั้นตอน
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[calc(50%+40px)] w-[calc(100%-40px)]">
                    <ArrowRight className="w-6 h-6 text-gray-300 absolute -right-3 -top-3" />
                    <div className="border-t-2 border-dashed border-gray-300 w-full" />
                  </div>
                )}

                <div className={`relative p-8 rounded-2xl bg-white border ${item.borderColor} hover:shadow-xl transition-all duration-300 text-center h-full`}>
                  {/* Step number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-sm font-bold px-4 py-1 rounded-full">
                    STEP {item.step}
                  </div>

                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${item.color} mb-6 mt-2`}>
                    <Icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-medium text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
