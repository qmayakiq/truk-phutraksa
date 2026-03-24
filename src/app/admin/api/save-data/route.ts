import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Initialize Redis client only if environment variables are available
const getRedisClient = () => {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    return new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });
  }
  return null;
};

const defaultData = {
  settings: {
    heroBackground: "",
  },
  about: {
    companyHistory: "TRUK พุทธรักษา ก่อตั้งขึ้นด้วยความมุ่งมั่นในการเป็นผู้ผลิตและประกอบตัวถังรถบรรทุกขยะที่มีคุณภาพสูงสุดในประเทศไทย ด้วยประสบการณ์กว่า 20 ปี ทำให้เราเข้าใจถึงความต้องการที่แท้จริงของลูกค้าในทุกๆ ด้าน",
    vision: "เป็นผู้นำด้านการผลิตตัวถังรถบรรทุกขยะอันดับ 1 ของประเทศไทย ด้วยมาตรฐานการผลิตระดับสากลและนวัตกรรมที่ทันสมัย",
    mission: "มุ่งมั่นพัฒนาคุณภาพสินค้าอย่างต่อเนื่อง สร้างความพึงพอใจสูงสุดแก่ลูกค้า และเป็นส่วนหนึ่งในการพัฒนาระบบจัดการขยะของประเทศไทย",
    certifications: ["มาตรฐานอุตสาหกรรมการผลิต", "ใบอนุญาตประกอบกิจการโรงงาน", "มาตรฐานความปลอดภัยยานยนต์", "รับรองจากกรมการขนส่งทางบก"],
  },
  stats: [
    { id: 1, label: "รถที่จำหน่าย", value: "150+" },
    { id: 2, label: "ลูกค้าทั่วประเทศ", value: "20+" },
    { id: 3, label: "ประสบการณ์", value: "10+" },
  ],
  products: [
    { id: 1, name: "รถบรรทุกขยะแบบอัดท้าย 6 ล้อ", specs: ["ความจุ 6 ลูกบาศก์เมตร", "ระบบไฮดรอลิก", "ตัวถังแข็งแรง"], price: "ติดต่อ", image: null },
    { id: 2, name: "รถบรรทุกขยะแบบเทท้าย 8 ล้อ", specs: ["ความจุ 8 ลูกบาศก์เมตร", "ระบบเทอัตโนมัติ", "เหมาะกับขยะอ่อน"], price: "ติดต่อ", image: null },
  ],
  portfolio: [
    { id: 1, title: "รถบรรทุกขยะ 6 ล้อ", client: "เทศบาลนครหาดใหญ่", image: "/images/portfolio/project1.jpg" },
    { id: 2, title: "รถอัดขยะ 10 ล้อ", client: "บริษัท ขยะสะอาด จำกัด", image: "/images/portfolio/project2.jpg" },
  ],
  clients: ["เทศบาลนครเชียงใหม่", "อบต.บางพลี", "เทศบาลเมืองภูเก็ต", "เทศบาลนครขอนแก่น", "อบจ.สุราษฎร์ธานี", "เทศบาลนครนครราชสีมา"],
  testimonials: [
    { id: 1, name: "นายสมชาย วงศ์ประเสริฐ", role: "ผู้อำนวยการกองสาธารณสุข", org: "เทศบาลนครเชียงใหม่", content: "ใช้บริการมากว่า 5 ปี สั่งประกอบรถบรรทุกขยะไปแล้วกว่า 10 คัน คุณภาพดี ทนทาน บริการหลังการขายดีเยี่ยม", rating: 5 },
    { id: 2, name: "นางสาวพิมพ์ใจ รักษ์ถิ่น", role: "ปลัดองค์การบริหารส่วนตำบล", org: "อบต.บางพลี", content: "ประทับใจตั้งแต่ขั้นตอนการให้คำปรึกษา ทีมงานมีความเชี่ยวชาญสูง ส่งมอบงานตรงเวลา", rating: 5 },
    { id: 3, name: "นายวิทยา สะอาดเจริญ", role: "กรรมการผู้จัดการ", org: "บริษัท คลีนเซอร์วิส จำกัด", content: "TRUK พุทธรักษาให้ราคาที่เป็นธรรม งานคุณภาพดี เหล็กหนา ระบบไฮดรอลิกทำงานได้ดีมาก", rating: 5 },
  ],
  contactInfo: {
    phone: "082-880-0878",
    line: "@truk",
    email: "info@truk.co.th",
    address: "123/45 ถ.พระราม 2 แขวงแสมดำ เขตบางขุนเทียน กรุงเทพฯ 10150",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.048!2d100.4!3d13.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDM5JzAwLjAiTiAxMDDCsDI0JzAwLjAiRQ!5e0!3m2!1sth!2sth!4v1",
    businessHours: { weekday: "08:00 - 17:00", saturday: "08:00 - 12:00", sunday: "หยุดทำการ" },
    facebook: "",
    youtube: "",
  },
};

export async function GET() {
  try {
    const redis = getRedisClient();
    
    // ถ้ายังไม่ได้ตั้งค่า Redis (ตอนพัฒนาก่อน deploy) ให้ส่งค่า default
    if (!redis) {
      console.log('Redis not configured yet, returning default data');
      return NextResponse.json(defaultData);
    }

    const data = await redis.get('website_data');
    
    if (!data) {
      // ถ้ายังไม่มีข้อมูลใน Redis ให้ใช้ค่าเริ่มต้นและบันทึก
      await redis.set('website_data', defaultData);
      return NextResponse.json(defaultData);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Redis error:', error);
    return NextResponse.json(defaultData);
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const redis = getRedisClient();
    
    if (!redis) {
      return NextResponse.json(
        { success: false, message: "กรุณาตั้งค่า Database (Redis) ก่อน" },
        { status: 500 }
      );
    }

    await redis.set('website_data', data);
    
    return NextResponse.json({ success: true, message: "บันทึกข้อมูลสำเร็จ" });
  } catch (error) {
    console.error('Save data error:', error);
    return NextResponse.json(
      { success: false, message: "บันทึกข้อมูลไม่สำเร็จ" },
      { status: 500 }
    );
  }
}
