"use client";

import { useState } from "react";
import { Phone, MessageCircle, Send, User, Truck, MessageSquare } from "lucide-react";

const vehicleTypes = [
  "รถบรรทุกขยะแบบอัดท้าย",
  "รถบรรทุกขยะแบบเทท้าย",
  "รถบรรทุกขยะแบบอัดข้าง",
  "อื่นๆ",
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    vehicleType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submitted with:', formData);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (response.ok) {
        alert("ขอบคุณสำหรับข้อมูล ทีมงานจะติดต่อกลับโดยเร็ว");
        setFormData({ name: "", phone: "", vehicleType: "", message: "" });
      } else {
        const errorData = await response.json();
        console.log('Error response:', errorData);
        alert("เกิดข้อผิดพลาด กรุณาลองใหม่");
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่");
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-gray-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-3">
            Contact Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            ขอใบเสนอราคา
          </h2>
          <p className="text-lg text-gray-medium max-w-2xl mx-auto">
            สอบถามข้อมูลเพิ่มเติม หรือแจ้งขอใบเสนอราคาได้ทันที
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-light"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                    <User className="w-4 h-4 text-gray-medium" />
                    ชื่อ-นามสกุล
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-light focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
                    placeholder="กรุณาระบุชื่อ"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                    <Phone className="w-4 h-4 text-gray-medium" />
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-light focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
                    placeholder="08X-XXX-XXXX"
                    required
                  />
                </div>
              </div>

              {/* Vehicle Type */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                  <Truck className="w-4 h-4 text-gray-medium" />
                  ประเภทรถที่สนใจ
                </label>
                <select
                  value={formData.vehicleType}
                  onChange={(e) =>
                    setFormData({ ...formData, vehicleType: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-light focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground bg-white"
                  required
                >
                  <option value="">-- เลือกประเภทรถ --</option>
                  {vehicleTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                  <MessageSquare className="w-4 h-4 text-gray-medium" />
                  ข้อความเพิ่มเติม
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-light focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground resize-none"
                  placeholder="รายละเอียดเพิ่มเติม เช่น ขนาด จำนวน หรือข้อกำหนดพิเศษ"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors shadow-lg shadow-accent/20"
              >
                <Send className="w-5 h-5" />
                ส่งข้อมูล
              </button>
            </form>
          </div>

          {/* Quick Contact */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-light">
              <h3 className="text-xl font-bold text-foreground mb-6">
                หรือติดต่อเราทันที
              </h3>

              {/* Phone */}
              <a
                href="tel:+66812345678"
                className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors mb-4"
              >
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-medium">โทรหาเรา</div>
                  <div className="text-lg font-bold text-primary">
                    082-880-0878
                  </div>
                </div>
              </a>

              {/* LINE */}
              <a
                href="https://line.me/ti/p/@truk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors mb-4"
              >
                <div className="w-12 h-12 bg-accent-green rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-medium">LINE Official</div>
                  <div className="text-lg font-bold text-accent-green">
                    @truk
                  </div>
                </div>
              </a>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-light">
              <h3 className="text-xl font-bold text-foreground mb-4">
                เวลาทำการ
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-medium">จันทร์ - ศุกร์</span>
                  <span className="font-semibold text-foreground">
                    08:00 - 17:00
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-medium">เสาร์</span>
                  <span className="font-semibold text-foreground">
                    08:00 - 12:00
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-medium">อาทิตย์</span>
                  <span className="font-semibold text-secondary">หยุดทำการ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
