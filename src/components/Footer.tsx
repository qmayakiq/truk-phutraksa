import { MapPin, Phone, Mail, Facebook, Linkedin, Youtube, MessageCircle, Instagram, Twitter } from "lucide-react";

const quickLinks = [
  { name: "หน้าแรก", href: "#hero" },
  { name: "เกี่ยวกับเรา", href: "#about" },
  { name: "สินค้า", href: "#products" },
  { name: "ผลงาน", href: "#portfolio" },
  { name: "ติดต่อ", href: "#contact" },
];

const productLinks = [
  { name: "รถอัดขยะท้าย", href: "#products" },
  { name: "รถเทท้าย", href: "#products" },
  { name: "รถอัดข้าง", href: "#products" },
  { name: "บริการซ่อม", href: "#services" },
];

const iconMap: { [key: string]: any } = {
  Facebook,
  MessageCircle,
  Youtube,
  Instagram,
  Twitter,
  Linkedin,
};

export default function Footer({ data }: { data?: any }) {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold">TRUK PHUTRAKSA</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              ผู้เชี่ยวชาญด้านการผลิตและประกอบตัวถังรถบรรทุกขยะ
              มาตรฐานระดับมืออาชีพ
            </p>
            <div className="flex items-center gap-3">
              {(data?.socialLinks || []).map((social: any, index: number) => {
                const IconComponent = iconMap[social.icon] || Facebook;
                return (
                  <a
                    key={index}
                    href={social.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4">
              ลิงก์ด่วน
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4">
              สินค้าและบริการ
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4">
              ข้อมูลติดต่อ
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-white/60">
                  123/45 ถ.พระราม 2 แขวงแสมดำ
                  <br />
                  เขตบางขุนเทียน กรุงเทพฯ 10150
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="tel:+66828800878"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  082-880-0878
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="mailto:info@truk.co.th"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  info@truk.co.th
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © 2026 TRUK Co., Ltd. สงวนลิขสิทธิ์
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              นโยบายความเป็นส่วนตัว
            </a>
            <a
              href="#"
              className="text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              เงื่อนไขการใช้งาน
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
