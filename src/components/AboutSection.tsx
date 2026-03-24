import { Building2, Target, Eye, Award, CheckCircle } from "lucide-react";

const defaultCertifications = [
  "มาตรฐานอุตสาหกรรมการผลิต",
  "ใบอนุญาตประกอบกิจการโรงงาน",
  "มาตรฐานความปลอดภัยยานยนต์",
  "รับรองจากกรมการขนส่งทางบก",
];

const defaultAbout = {
  companyHistory: "",
  vision: "",
  mission: "",
  certifications: defaultCertifications,
};

export default function AboutSection({ data }: { data?: any }) {
  const about = data?.about || defaultAbout;
  const certifications = about.certifications?.length ? about.certifications : defaultCertifications;
  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-3">
            About Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            เกี่ยวกับเรา
          </h2>
          <p className="text-lg text-gray-medium max-w-2xl mx-auto">
            ผู้นำด้านการผลิตและประกอบตัวถังรถบรรทุกขยะมากว่า 20 ปี
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left - Company Story */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">ประวัติบริษัท</h3>
            </div>
            <div className="space-y-4 text-gray-medium leading-relaxed whitespace-pre-line">
              {about.companyHistory || (
                <>
                  <p>
                    <strong className="text-foreground">TRUK พุทธรักษา</strong> ก่อตั้งขึ้นด้วยความมุ่งมั่นในการเป็นผู้ผลิต
                    และประกอบตัวถังรถบรรทุกขยะที่มีคุณภาพสูงสุดในประเทศไทย ด้วยประสบการณ์กว่า 20 ปี
                    ทำให้เราเข้าใจถึงความต้องการที่แท้จริงของลูกค้าในทุกๆ ด้าน
                  </p>
                  <p>
                    เราเลือกใช้วัสดุคุณภาพสูง กระบวนการผลิตที่ทันสมัย
                    และทีมช่างผู้เชี่ยวชาญที่ผ่านการฝึกอบรมอย่างเข้มงวด
                    เพื่อให้ทุกคันรถที่ส่งมอบมีความทนทานและประสิทธิภาพสูงสุด
                  </p>
                  <p>
                    ปัจจุบันเราได้ส่งมอบรถบรรทุกขยะกว่า <strong className="text-primary">500 คัน</strong> ให้กับหน่วยงานราชการ
                    และเอกชนทั่วประเทศ พร้อมบริการหลังการขายที่ครบวงจร
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Right - Vision & Mission */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-bold text-foreground">วิสัยทัศน์</h4>
              </div>
              <p className="text-gray-medium leading-relaxed">
                {about.vision || "เป็นผู้นำด้านการผลิตตัวถังรถบรรทุกขยะอันดับ 1 ของประเทศไทย ด้วยมาตรฐานการผลิตระดับสากลและนวัตกรรมที่ทันสมัย"}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-accent/5 border border-accent/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-bold text-foreground">พันธกิจ</h4>
              </div>
              <p className="text-gray-medium leading-relaxed">
                {about.mission || "มุ่งมั่นพัฒนาคุณภาพสินค้าอย่างต่อเนื่อง สร้างความพึงพอใจสูงสุดแก่ลูกค้า และเป็นส่วนหนึ่งในการพัฒนาระบบจัดการขยะของประเทศไทย"}
              </p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-gradient-to-r from-primary-dark to-primary rounded-2xl p-8 lg:p-12">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Award className="w-8 h-8 text-accent" />
            <h3 className="text-2xl font-bold text-white">มาตรฐานและการรับรอง</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10"
              >
                <CheckCircle className="w-5 h-5 text-accent-green flex-shrink-0" />
                <span className="text-white text-sm font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
