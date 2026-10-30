import { NextResponse } from 'next/server';
import { GoogleSheetsService } from '@/modules/google-sheets/googleSheetsService';
import { VotePayload } from '@/types/voting';
import {
  normalizeStudentName,
  normalizeStudentCode,
  validateStudentName,
  validateStudentCode,
} from '@/utils/student';

export async function POST(request: Request) {
  try {
    const body: VotePayload | null = await request.json().catch(() => null);

    if (!body || !body.role || !body.awardId || !body.campusId || !body.nomineeName) {
      return NextResponse.json(
        { success: false, message: 'Dữ liệu bình chọn không đầy đủ' },
        { status: 400 }
      );
    }

    const studentName = String(body.studentName ?? '');
    const studentCode = String(body.studentCode ?? '');
    const studentError = validateStudentName(studentName) || validateStudentCode(studentCode);
    if (studentError) {
      return NextResponse.json({ success: false, message: studentError }, { status: 400 });
    }

    const vote: VotePayload = {
      ...body,
      studentName: normalizeStudentName(studentName),
      studentCode: normalizeStudentCode(studentCode),
    };

    const result = await GoogleSheetsService.appendVote(vote);

    if (result.status === 'duplicate') {
      return NextResponse.json(
        {
          success: false,
          code: 'DUPLICATE',
          message: 'Học viên này đã bình chọn một người khác',
        },
        { status: 409 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Bình chọn thành công!',
      mode: result.mode,
    });
  } catch (error) {
    console.error('Error in /api/votes POST:', error);
    return NextResponse.json(
      { success: false, message: 'Chưa ghi nhận được bình chọn do lỗi kết nối Google Sheet. Vui lòng thử lại sau ít phút.' },
      { status: 502 }
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
