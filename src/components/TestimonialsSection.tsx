"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "นายสมชาย วงศ์ประเสริฐ",
    role: "ผู้อำนวยการกองสาธารณสุข",
    org: "เทศบาลนครเชียงใหม่",
    content: "ใช้บริการมากว่า 5 ปี สั่งประกอบรถบรรทุกขยะไปแล้วกว่า 10 คัน คุณภาพดี ทนทาน บริการหลังการขายดีเยี่ยม ทีมช่างพร้อมเข้าซ่อมทันทีเมื่อเรียก",
    rating: 5,
  },
  {
    name: "นางสาวพิมพ์ใจ รักษ์ถิ่น",
    role: "ปลัดองค์การบริหารส่วนตำบล",
    org: "อบต.บางพลี",
    content: "ประทับใจตั้งแต่ขั้นตอนการให้คำปรึกษา ทีมงานมีความเชี่ยวชาญสูง ส่งมอบงานตรงเวลา รถมีคุณภาพดีมาก คุ้มค่ากับราคา แนะนำเลยครับ",
    rating: 5,
  },
  {
    name: "นายวิทยา สะอาดเจริญ",
    role: "กรรมการผู้จัดการ",
    org: "บริษัท คลีนเซอร์วิส จำกัด",
    content: "เปรียบเทียบหลายเจ้าแล้ว TRUK พุทธรักษาให้ราคาที่เป็นธรรม งานคุณภาพดี เหล็กหนา ระบบไฮดรอลิกทำงานได้ดีมาก ใช้มา 3 ปียังไม่มีปัญหาเลย",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-gray-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-3">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            ลูกค้าพูดถึงเรา
          </h2>
          <p className="text-lg text-gray-medium max-w-2xl mx-auto">
            ความไว้วางใจจากหน่วยงานทั่วประเทศ คือความภาคภูมิใจของเรา
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-light hover:shadow-xl transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 right-6">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                  <Quote className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-medium leading-relaxed mb-6">
                &ldquo;{item.content}&rdquo;
              </p>

              {/* Author */}
              <div className="border-t border-gray-light pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">
                      {item.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{item.name}</div>
                    <div className="text-xs text-gray-medium">{item.role}</div>
                    <div className="text-xs text-primary font-medium">{item.org}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
