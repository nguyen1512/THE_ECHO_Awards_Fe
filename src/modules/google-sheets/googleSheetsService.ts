import { VotePayload, VoteRecord } from '@/types/voting';
import { EchoMessageItem, EchoMessagePayload } from '@/types/echo';
import { INITIAL_ECHO_NOTES } from '@/constants/initialNotes';

// Bộ nhớ đệm In-Memory fallback khi chưa có kết nối Google Sheets
const memoryVotes: VoteRecord[] = [];
const memoryEchoMessages: EchoMessageItem[] = [...INITIAL_ECHO_NOTES];

export class GoogleSheetsService {
  /**
   * Kiểm tra xem cấu hình Webapp URL hay Service Account được kích hoạt
   */
  private static getWebappUrl(): string | undefined {
    return process.env.GOOGLE_SHEET_WEBAPP_URL;
  }

  /**
   * Lưu lượt bình chọn mới vào Google Sheet (Tab: Votes)
   */
  public static async appendVote(vote: VotePayload): Promise<{ success: boolean; mode: string }> {
    const webappUrl = this.getWebappUrl();
    const timestamp = new Date().toISOString();

    const record: VoteRecord = {
      ...vote,
      id: `vote-${Date.now()}`,
      createdAt: timestamp,
    };

    if (webappUrl) {
      try {
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
            },
          }),
        });

        if (response.ok) {
          memoryVotes.unshift(record);
          return { success: true, mode: 'google-sheets-webapp' };
        }
      } catch (err) {
        console.error('Lỗi gửi vote tới Google Sheets WebApp:', err);
      }
    }

    // Fallback in-memory
    memoryVotes.unshift(record);
    return { success: true, mode: 'in-memory-fallback' };
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
