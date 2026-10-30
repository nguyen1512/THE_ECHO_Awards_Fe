import { NextResponse } from 'next/server';
import { GoogleSheetsService } from '@/modules/google-sheets/googleSheetsService';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'votes';

    // UTF-8 BOM để Excel hiển thị tiếng Việt có dấu chuẩn 100%
    const BOM = '\uFEFF';

    if (type === 'messages') {
      const messages = await GoogleSheetsService.getEchoMessages();
      const headers = ['Thời gian', 'Người gửi', 'Gửi tới', 'Cơ sở', 'Người nhận', 'Nội dung lời nhắn', 'Trạng thái'];
      
      const rows = messages.map((m) => [
        `"${m.createdAt || ''}"`,
        `"${(m.senderName || '').replace(/"/g, '""')}"`,
        `"${(m.recipientRole || '').replace(/"/g, '""')}"`,
        `"${(m.campusName || '').replace(/"/g, '""')}"`,
        `"${(m.recipientName || '').replace(/"/g, '""')}"`,
        `"${(m.message || '').replace(/"/g, '""')}"`,
        `"${m.status || 'approved'}"`,
      ]);

      const csvContent = BOM + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="the-echo-messages.csv"',
        },
      });
    }

    // Mặc định xuất Votes
    const votes = await GoogleSheetsService.getVotes();
    const headers = [
      'Thời gian',
      'Đối tượng',
      'Mã giải thưởng',
      'Tên giải thưởng',
      'Mã cơ sở',
      'Tên cơ sở',
      'Người được bình chọn',
      'Lời nhắn kèm theo',
      'Tên học viên',
      'Mã số học viên',
      'Số điện thoại',
    ];

    const rows = votes.map((v) => [
      `"${v.createdAt || ''}"`,
      `"${v.role === 'gv' ? 'Giáo viên' : 'Class Manager'}"`,
      `"${v.awardId || ''}"`,
      `"${(v.awardName || '').replace(/"/g, '""')}"`,
      `"${v.campusId || ''}"`,
      `"${(v.campusName || '').replace(/"/g, '""')}"`,
      `"${(v.nomineeName || '').replace(/"/g, '""')}"`,
      `"${(v.voterMessage || '').replace(/"/g, '""')}"`,
      `"${(v.studentName || '').replace(/"/g, '""')}"`,
      `"${(v.studentCode || '').replace(/"/g, '""')}"`,
      `"${(v.studentPhone || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = BOM + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="the-echo-votes.csv"',
      },
    });
  } catch (error) {
    console.error('Error in /api/export:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi xuất dữ liệu Excel' },
      { status: 500 }
    );
  }
}
