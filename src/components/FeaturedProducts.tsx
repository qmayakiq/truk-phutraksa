"use client";

import { ArrowRight, Truck } from "lucide-react";

interface Product {
  id: number;
  name: string;
  nameEn?: string;
  description?: string;
  specs: string[];
  image?: string | null;
  price?: string;
}

interface FeaturedProductsProps {
  data?: Product[];
}

const defaultProducts: Product[] = [
  {
    id: 1,
    name: "รถบรรทุกขยะแบบอัดท้าย",
    nameEn: "Rear Loader Compactor",
    description:
      "รถบรรทุกขยะแบบอัดท้าย ออกแบบให้อัดขยะได้ปริมาณมาก ประหยัดเที่ยววิ่ง เหมาะสำหรับเก็บขนขยะในชุมชนและเทศบาล",
    specs: ["ความจุ 6-14 ลบ.ม.", "ระบบอัดไฮดรอลิก", "เหล็กเกรดพรีเมียม"],
    image: null,
  },
  {
    id: 2,
    name: "รถบรรทุกขยะแบบเทท้าย",
    nameEn: "Dump Truck",
    description:
      "รถบรรทุกขยะแบบเทท้าย ใช้งานง่าย บำรุงรักษาสะดวก เหมาะสำหรับงานเก็บขนขยะทั่วไปและงานก่อสร้าง",
    specs: ["ความจุ 5-12 ลบ.ม.", "ระบบเทยกไฮดรอลิก", "โครงสร้างแข็งแรง"],
    image: null,
  },
  {
    id: 3,
    name: "รถบรรทุกขยะแบบอัดข้าง",
    nameEn: "Side Loader Compactor",
    description:
      "รถบรรทุกขยะแบบอัดข้าง สะดวกต่อการเก็บขนในพื้นที่แคบ ทำงานได้รวดเร็ว ลดจำนวนพนักงานในการปฏิบัติงาน",
    specs: ["ความจุ 8-16 ลบ.ม.", "ระบบอัดข้างอัตโนมัติ", "ประหยัดแรงงาน"],
    image: null,
  },
];

export default function FeaturedProducts({ data }: FeaturedProductsProps) {
  const products = data || defaultProducts;

  return (
    <section id="products" className="py-20 lg:py-28 bg-gray-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-3">
            Our Products
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            สินค้าแนะนำ
          </h2>
          <p className="text-lg text-gray-medium max-w-2xl mx-auto">
            แยกตามประเภทสินค้าหลัก เพื่อตอบสนองทุกความต้องการในการจัดเก็บขยะ
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-light hover:shadow-2xl transition-all duration-300"
            >
              {/* Product Image Placeholder or Real Image */}
              <div className="aspect-w-16 aspect-h-10 bg-gradient-to-br from-primary/5 to-primary/10 relative overflow-hidden h-64">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Truck className="w-20 h-20 text-primary/20 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-medium text-sm leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Specs */}
                <div className="space-y-2 mb-6">
                  {product.specs.map((spec) => (
                    <div
                      key={spec}
                      className="flex items-center gap-2 text-sm text-gray-dark"
                    >
                      <div className="w-1.5 h-1.5 bg-accent-green rounded-full flex-shrink-0" />
                      {spec}
                    </div>
                  ))}
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-light">
                  <div className="text-xl font-bold text-primary">
                    {product.price}
                  </div>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 text-accent font-semibold hover:text-accent-hover transition-colors"
                  >
                    ขอใบเสนอราคา
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
