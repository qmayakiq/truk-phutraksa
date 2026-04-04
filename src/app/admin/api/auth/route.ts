import { NextRequest, NextResponse } from "next/server";
import {
  getAdminCookieName,
  getAdminSessionToken,
  isAdminPasswordConfigured,
  isAdminAuthenticated,
} from "@/lib/admin-auth";

const cookieName = getAdminCookieName();

function getCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  };
}

export async function GET(request: NextRequest) {
  const cookieValue = request.cookies.get(cookieName)?.value;
  return NextResponse.json({
    authenticated: isAdminAuthenticated(cookieValue),
    configured: isAdminPasswordConfigured(),
  });
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin password is not configured",
          code: "ADMIN_PASSWORD_NOT_CONFIGURED",
        },
        { status: 503 }
      );
    }

    if (password !== adminPassword) {
      return NextResponse.json(
        { success: false, message: "รหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });
    const token = getAdminSessionToken();
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin session could not be created",
          code: "ADMIN_SESSION_NOT_CONFIGURED",
        },
        { status: 503 }
      );
    }
    response.cookies.set(cookieName, token, getCookieOptions());
    return response;
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { success: false, message: "เกิดข้อผิดพลาด" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(cookieName, "", {
    ...getCookieOptions(),
    maxAge: 0,
  });
  return response;
}
