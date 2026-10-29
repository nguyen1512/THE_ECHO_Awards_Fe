import { NextResponse } from 'next/server';
import { GoogleSheetsService } from '@/modules/google-sheets/googleSheetsService';
import { VotePayload } from '@/types/voting';

export async function POST(request: Request) {
  try {
    const body: VotePayload = await request.json();

    if (!body.role || !body.awardId || !body.campusId || !body.nomineeName) {
      return NextResponse.json(
        { success: false, message: 'Dữ liệu bình chọn không đầy đủ' },
        { status: 400 }
      );
    }

    const result = await GoogleSheetsService.appendVote(body);

    return NextResponse.json({
      success: true,
      message: 'Bình chọn thành công!',
      mode: result.mode,
    });
  } catch (error) {
    console.error('Error in /api/votes POST:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi máy chủ khi ghi nhận bình chọn' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const votes = await GoogleSheetsService.getVotes();
    return NextResponse.json({
      success: true,
      total: votes.length,
      data: votes,
    });
  } catch (error) {
    console.error('Error in /api/votes GET:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi máy chủ khi lấy dữ liệu bình chọn' },
      { status: 500 }
    );
  }
}
