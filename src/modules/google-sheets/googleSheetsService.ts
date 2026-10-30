import { VotePayload, VoteRecord } from '@/types/voting';
import { EchoMessageItem, EchoMessagePayload } from '@/types/echo';
import { INITIAL_ECHO_NOTES } from '@/constants/initialNotes';

// Bộ nhớ đệm In-Memory fallback khi chưa có kết nối Google Sheets
const memoryVotes: VoteRecord[] = [];
const memoryEchoMessages: EchoMessageItem[] = [...INITIAL_ECHO_NOTES];

export type AppendVoteResult = { status: 'ok'; mode: string } | { status: 'duplicate' };

export class GoogleSheetsService {
  /**
   * Kiểm tra xem cấu hình Webapp URL hay Service Account được kích hoạt
   */
  private static getWebappUrl(): string {
    return (
      process.env.GOOGLE_SHEET_WEBAPP_URL ||
      'https://script.google.com/macros/s/AKfycbyre9y2tQfIAeMOKLBdX5a5JLpUs8dFrVin7hk7i3ElDE2tJDKnLdnZAgU97mNqFxvmCg/exec'
    );
  }

  /**
   * Lưu lượt bình chọn mới vào Google Sheet (Tab: Votes).
   * Ném lỗi nếu Google Sheet không ghi được — không báo thành công giả.
   */
  public static async appendVote(vote: VotePayload): Promise<AppendVoteResult> {
    const webappUrl = this.getWebappUrl();
    const timestamp = new Date().toISOString();

    const record: VoteRecord = {
      ...vote,
      id: `vote-${Date.now()}`,
      createdAt: timestamp,
    };

    // Chỉ dùng in-memory khi chưa cấu hình Google Sheet (môi trường dev)
    if (!webappUrl) {
      const incomingRole = String(vote.role).toLowerCase();
      const incomingCode = String(vote.studentCode || '').trim().toUpperCase();
      const incomingPhone = String(vote.studentPhone || '').trim();

      if (incomingCode || incomingPhone) {
        const alreadyVoted = memoryVotes.some((v) => {
          const sameRole = String(v.role).toLowerCase() === incomingRole;
          const sameCode = incomingCode && String(v.studentCode || '').trim().toUpperCase() === incomingCode;
          const samePhone = incomingPhone && String(v.studentPhone || '').trim() === incomingPhone;
          return sameRole && (sameCode || samePhone);
        });
        if (alreadyVoted) {
          return { status: 'duplicate' };
        }
      }
      memoryVotes.unshift(record);
      return { status: 'ok', mode: 'in-memory-fallback' };
    }

    const response = await fetch(webappUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'appendVote',
        data: {
          timestamp,
          role: vote.role,
          awardId: vote.awardId,
          awardName: vote.awardName,
          campusId: vote.campusId,
          campusName: vote.campusName,
          nomineeName: vote.nomineeName,
          voterMessage: vote.voterMessage,
          studentName: vote.studentName,
          studentCode: vote.studentCode || '',
          studentPhone: vote.studentPhone || '',
        },
      }),
      signal: AbortSignal.timeout(20000),
    });

    if (!response.ok) {
      throw new Error(`Google Sheets WebApp trả về HTTP ${response.status}`);
    }

    // Apps Script luôn trả HTTP 200, kết quả thật nằm trong JSON body
    const json = await response.json().catch(() => null);
    if (json?.code === 'DUPLICATE') {
      return { status: 'duplicate' };
    }
    if (!json?.success) {
      throw new Error(`Google Sheets WebApp báo lỗi: ${json?.error || json?.message || 'phản hồi không hợp lệ'}`);
    }

    memoryVotes.unshift(record);
    return { status: 'ok', mode: 'google-sheets-webapp' };
  }

  /**
   * Lưu Echo Message mới vào Google Sheet (Tab: EchoMessages)
   */
  public static async appendEchoMessage(
    payload: EchoMessagePayload
  ): Promise<{ success: boolean; data: EchoMessageItem; mode: string }> {
    const webappUrl = this.getWebappUrl();
    const timestamp = new Date().toISOString();
    const roleLabel = payload.recipientRole === 'gv' ? 'Giáo viên' : 'Class Manager';

    const newNote: EchoMessageItem = {
      id: `msg-${Date.now()}`,
      senderName: payload.voterName,
      campusName: payload.campusName,
      campusId: payload.campusId,
      recipientRole: roleLabel,
      recipientName: payload.recipientName,
      message: payload.message,
      createdAt: timestamp,
    };

    if (webappUrl) {
      try {
        const response = await fetch(webappUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'appendEchoMessage',
            data: {
              timestamp,
              voterName: payload.voterName,
              recipientRole: roleLabel,
              campusId: payload.campusId,
              campusName: payload.campusName,
              recipientName: payload.recipientName,
              message: payload.message,
              status: 'approved',
            },
          }),
        });

        if (response.ok) {
          memoryEchoMessages.unshift(newNote);
          return { success: true, data: newNote, mode: 'google-sheets-webapp' };
        }
      } catch (err) {
        console.error('Lỗi gửi message tới Google Sheets WebApp:', err);
      }
    }

    // Fallback in-memory
    memoryEchoMessages.unshift(newNote);
    return { success: true, data: newNote, mode: 'in-memory-fallback' };
  }

  /**
   * Lấy danh sách Echo Messages để hiển thị trên Echo Wall
   */
  public static async getEchoMessages(): Promise<EchoMessageItem[]> {
    const webappUrl = this.getWebappUrl();

    if (webappUrl) {
      try {
        const response = await fetch(`${webappUrl}?action=getEchoMessages`, {
          method: 'GET',
          next: { revalidate: 60 }, // Cache 60s
        });

        if (response.ok) {
          const json = await response.json();
          if (json && Array.isArray(json.data) && json.data.length > 0) {
            return json.data;
          }
        }
      } catch (err) {
        console.error('Lỗi nạp tin nhắn từ Google Sheets WebApp:', err);
      }
    }

    return memoryEchoMessages;
  }

  /**
   * Lấy tổng hợp danh sách phiếu bầu
   */
  public static async getVotes(): Promise<VoteRecord[]> {
    return memoryVotes;
  }
}
