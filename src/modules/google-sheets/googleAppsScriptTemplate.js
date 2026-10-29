/**
 * =========================================================================
 * GOOGLE APPS SCRIPT CHO DỰ ÁN "THE ECHO AWARDS" (A&U ENGLISH)
 * =========================================================================
 * 
 * HƯỚNG DẪN TRIỂN KHAI 1-CLICK:
 * 1. Mở một Google Spreadsheet mới trên Google Drive: https://sheets.new
 * 2. Đổi tên 2 trang tính (Tabs) thành:
 *    - "Votes"
 *    - "EchoMessages"
 * 3. Hàng 1 của tab "Votes" đặt tiêu đề:
 *    [A: Timestamp | B: Role | C: AwardId | D: AwardName | E: CampusId | F: CampusName | G: NomineeName | H: VoterMessage]
 * 4. Hàng 1 của tab "EchoMessages" đặt tiêu đề:
 *    [A: Timestamp | B: VoterName | C: RecipientRole | D: CampusId | E: CampusName | F: RecipientName | G: Message | H: Status]
 * 5. Trên menu Google Sheet, chọn: Tiện ích mở rộng (Extensions) > Apps Script
 * 6. Xóa toàn bộ mã cũ và dán toàn bộ đoạn mã bên dưới vào.
 * 7. Nhấn "Triển khai" (Deploy) > "Triển khai mới" (New deployment).
 *    - Chọn loại: Ứng dụng web (Web app).
 *    - Thực thi dưới dạng (Execute as): Tôi (Me).
 *    - Ai có quyền truy cập (Who has access): Bất kỳ ai (Anyone).
 * 8. Nhấn Triển khai và cấp quyền. Sao chép "URL ứng dụng web" (Web App URL).
 * 9. Dán URL vào file `.env.local` của website:
 *    GOOGLE_SHEET_WEBAPP_URL="https://script.google.com/macros/s/.../exec"
 * =========================================================================
 */

function doPost(e) {
  try {
    var contents = JSON.parse(e.postData.contents);
    var action = contents.action;
    var data = contents.data;
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (action === "appendVote") {
      var sheetVotes = ss.getSheetByName("Votes");
      if (!sheetVotes) {
        sheetVotes = ss.insertSheet("Votes");
        sheetVotes.appendRow([
          "Timestamp", "Role", "AwardId", "AwardName", "CampusId", "CampusName", "NomineeName", "VoterMessage"
        ]);
      }
      sheetVotes.appendRow([
        data.timestamp || new Date().toISOString(),
        data.role,
        data.awardId,
        data.awardName,
        data.campusId,
        data.campusName,
        data.nomineeName,
        data.voterMessage
      ]);

      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: "Vote appended successfully"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    if (action === "appendEchoMessage") {
      var sheetMsgs = ss.getSheetByName("EchoMessages");
      if (!sheetMsgs) {
        sheetMsgs = ss.insertSheet("EchoMessages");
        sheetMsgs.appendRow([
          "Timestamp", "VoterName", "RecipientRole", "CampusId", "CampusName", "RecipientName", "Message", "Status"
        ]);
      }
      sheetMsgs.appendRow([
        data.timestamp || new Date().toISOString(),
        data.voterName,
        data.recipientRole,
        data.campusId,
        data.campusName,
        data.recipientName,
        data.message,
        data.status || "approved"
      ]);

      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: "Echo message appended successfully"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: "Unknown action"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var action = e.parameter.action;
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (action === "getEchoMessages") {
      var sheetMsgs = ss.getSheetByName("EchoMessages");
      if (!sheetMsgs) {
        return ContentService.createTextOutput(JSON.stringify({ success: true, data: [] }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      var rows = sheetMsgs.getDataRange().getValues();
      var result = [];
      // Hàng 0 là tiêu đề, lấy từ hàng 1 trở đi
      for (var i = rows.length - 1; i >= 1; i--) {
        var row = rows[i];
        if (row[0] && row[6]) { // Phải có timestamp và message
          result.push({
            id: "sheet-" + i,
            createdAt: row[0],
            senderName: row[1],
            recipientRole: row[2],
            campusId: row[3],
            campusName: row[4],
            recipientName: row[5],
            message: row[6],
            status: row[7] || "approved"
          });
        }
      }

      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        data: result
      })).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "The Echo Awards Google Sheet Endpoint Ready"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
