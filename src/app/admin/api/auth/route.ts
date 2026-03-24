import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || "admin1234";
    
    if (password === adminPassword) {
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json(
      { success: false, message: "รหัสผ่านไม่ถูกต้อง" },
      { status: 401 }
    );
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { success: false, message: "เกิดข้อผิดพลาด" },
      { status: 500 }
    );
  }
}
