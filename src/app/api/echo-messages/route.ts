import { NextResponse } from 'next/server';
import { GoogleSheetsService } from '@/modules/google-sheets/googleSheetsService';
import { EchoMessagePayload } from '@/types/echo';

export async function GET() {
  try {
    const messages = await GoogleSheetsService.getEchoMessages();
    return NextResponse.json({
      success: true,
      total: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error('Error in /api/echo-messages GET:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi máy chủ khi lấy danh sách lời nhắn' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: EchoMessagePayload = await request.json();

    if (!body.voterName || !body.recipientRole || !body.campusId || !body.recipientName || !body.message) {
      return NextResponse.json(
        { success: false, message: 'Dữ liệu lời nhắn không đầy đủ' },
        { status: 400 }
      );
    }

    const result = await GoogleSheetsService.appendEchoMessage(body);

    return NextResponse.json({
      success: true,
      message: 'Gửi Echo Message thành công!',
      data: result.data,
      mode: result.mode,
    });
  } catch (error) {
    console.error('Error in /api/echo-messages POST:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi máy chủ khi gửi lời nhắn' },
      { status: 500 }
    );
  }
}
