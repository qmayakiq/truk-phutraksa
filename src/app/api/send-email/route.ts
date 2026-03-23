import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, phone, vehicleType, message } = await request.json();

    // ส่ง email ไปยัง admin
    const { data, error } = await resend.emails.send({
      from: 'TRUK Phutraksa <onboarding@resend.dev>',
      to: ['qmayakiq@gmail.com'], // เปลี่ยนเป็น email ของคุณ
      subject: `🚛 ขอใบเสนอราคา: ${vehicleType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0f3460 0%, #1a5276 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">TRUK Phutraksa</h1>
            <p style="color: #f39c12; margin: 5px 0 0;">ขอใบเสนอราคาใหม่</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #0f3460; margin-top: 0;">รายละเอียดการติดต่อ</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; background: #e9ecef; font-weight: bold; width: 150px;">ชื่อ-นามสกุล:</td>
                <td style="padding: 10px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #e9ecef; font-weight: bold;">เบอร์โทรศัพท์:</td>
                <td style="padding: 10px;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #e9ecef; font-weight: bold;">ประเภทรถ:</td>
                <td style="padding: 10px;">${vehicleType}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #e9ecef; font-weight: bold; vertical-align: top;">ข้อความ:</td>
                <td style="padding: 10px;">${message || '-'}</td>
              </tr>
            </table>
            
            <div style="margin-top: 30px; padding: 20px; background: #fff3cd; border-left: 4px solid #f39c12; border-radius: 5px;">
              <p style="margin: 0; color: #856404;">
                <strong>⏰ เวลา:</strong> ${new Date().toLocaleString('th-TH')}
              </p>
            </div>
            
            <div style="margin-top: 30px; text-align: center;">
              <p style="color: #6c757d; font-size: 14px;">
                อีเมลนี้ส่งจากเว็บไซต์ TRUK Phutraksa
              </p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
