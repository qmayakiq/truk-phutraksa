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
  stats: [
    { id: 1, label: "รถที่จำหน่าย", value: "150+" },
    { id: 2, label: "ลูกค้าทั่วประเทศ", value: "20+" },
    { id: 3, label: "ประสบการณ์", value: "10+" },
  ],
  products: [
    {
      id: 1,
      name: "รถบรรทุกขยะแบบอัดท้าย 6 ล้อ",
      specs: ["ความจุ 6 ลูกบาศก์เมตร", "ระบบไฮดรอลิก", "ตัวถังแข็งแรง"],
      price: "ติดต่อ",
    },
    {
      id: 2,
      name: "รถบรรทุกขยะแบบเทท้าย 8 ล้อ",
      specs: ["ความจุ 8 ลูกบาศก์เมตร", "ระบบเทอัตโนมัติ", "เหมาะกับขยะอ่อน"],
      price: "ติดต่อ",
    },
  ],
  portfolio: [
    {
      id: 1,
      title: "รถบรรทุกขยะ 6 ล้อ",
      client: "เทศบาลนครหาดใหญ่",
      image: "/images/portfolio/project1.jpg",
    },
    {
      id: 2,
      title: "รถอัดขยะ 10 ล้อ",
      client: "บริษัท ขยะสะอาด จำกัด",
      image: "/images/portfolio/project2.jpg",
    },
  ],
  clients: [
    "เทศบาลนครเชียงใหม่",
    "อบต.บางพลี",
    "เทศบาลเมืองภูเก็ต",
    "เทศบาลนครขอนแก่น",
    "อบจ.สุราษฎร์ธานี",
    "เทศบาลนครนครราชสีมา",
  ],
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
