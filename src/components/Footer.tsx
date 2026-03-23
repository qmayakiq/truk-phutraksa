import { MapPin, Phone, Mail, Facebook, Linkedin, Youtube } from "lucide-react";

const quickLinks = [
  { label: "หน้าแรก", href: "#hero" },
  { label: "สินค้าของเรา", href: "#products" },
  { label: "ผลงานที่ผ่านมา", href: "#portfolio" },
  { label: "เกี่ยวกับเรา", href: "#about" },
  { label: "ติดต่อเรา", href: "#contact" },
];

const productLinks = [
  { label: "รถบรรทุกขยะแบบอัดท้าย", href: "#products" },
  { label: "รถบรรทุกขยะแบบเทท้าย", href: "#products" },
  { label: "รถบรรทุกขยะแบบอัดข้าง", href: "#products" },
  { label: "บริการซ่อมบำรุง", href: "#services" },
];

export default function Footer() {
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
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4">
              ลิงก์ด่วน
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
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
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
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
                  href="tel:+66812345678"
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
