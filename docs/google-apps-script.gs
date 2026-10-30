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
 * 3. Tiêu đề hàng 1 tab "Votes" (tự tạo khi chạy hàm setupHeaders):
 *    [A: Thời gian (giờ VN) | B: Vai trò | C: Mã giải thưởng | D: Tên giải thưởng | E: Mã cơ sở | F: Tên cơ sở
 *     | G: Người được bình chọn | H: Lời nhắn | I: Tên học viên | J: Mã số học viên]
 *    Cột I, J được thêm vào CUỐI nên dữ liệu cũ (A–H) giữ nguyên vị trí.
 * 4. Tiêu đề hàng 1 tab "EchoMessages" (tự tạo khi chạy hàm setupHeaders):
 *    [A: Thời gian | B: Người gửi | C: Vai trò người nhận | D: Mã cơ sở | E: Tên cơ sở | F: Người nhận | G: Lời nhắn | H: Trạng thái]
 *    >> Chạy hàm setupHeaders() một lần trong Apps Script để tự thêm tiêu đề tiếng Việt vào 2 tab.
 * 5. Trên menu Google Sheet, chọn: Tiện ích mở rộng (Extensions) > Apps Script
 * 6. Xóa toàn bộ mã cũ và dán toàn bộ đoạn mã bên dưới vào.
 * 7. Nhấn "Triển khai" (Deploy) > "Triển khai mới" (New deployment).
 *    - Chọn loại: Ứng dụng web (Web app).
 *    - Thực thi dưới dạng (Execute as): Tôi (Me).
 *    - Ai có quyền truy cập (Who has access): Bất kỳ ai (Anyone).
 * 8. Nhấn Triển khai và cấp quyền. Sao chép "URL ứng dụng web" (Web App URL).
 * 9. Dán URL vào file `.env.local` của website:
 *    GOOGLE_SHEET_WEBAPP_URL="https://script.google.com/macros/s/.../exec"
 *    (Khi sửa mã: Deploy > Manage deployments > Edit > Version: New version để giữ nguyên URL.)
 * Xem hướng dẫn chi tiết: docs/GOOGLE_SHEET_SETUP.md
 * =========================================================================
 */

var TIMEZONE = "Asia/Ho_Chi_Minh";

var VOTES_HEADERS = [
  "Thời gian", "Vai trò", "Mã giải thưởng", "Tên giải thưởng",
  "Mã cơ sở", "Tên cơ sở", "Người được bình chọn", "Lời nhắn",
  "Tên học viên", "Mã số học viên"
];
// Vị trí cột (0-based) dùng cho kiểm tra trùng
var COL_ROLE = 1, COL_AWARD_ID = 2, COL_CAMPUS_ID = 4, COL_NOMINEE = 6, COL_STUDENT_CODE = 9;
var MESSAGES_HEADERS = [
  "Thời gian", "Người gửi", "Vai trò người nhận", "Mã cơ sở",
  "Tên cơ sở", "Người nhận", "Lời nhắn", "Trạng thái"
];

/**
 * Đảm bảo hàng 1 của sheet là tiêu đề tiếng Việt.
 * Nếu sheet đã có dữ liệu mà chưa có tiêu đề thì chèn thêm 1 hàng ở trên cùng.
 * Nếu đã có tiêu đề cũ (ít cột hơn) thì ghi đè hàng 1 để bổ sung các cột mới ở cuối.
 */
function ensureHeaders_(sheet, headers) {
  var lastRow = sheet.getLastRow();
  var first = lastRow > 0 ? String(sheet.getRange(1, 1).getValue()) : "";
  if (first !== headers[0] && lastRow > 0) {
    sheet.insertRowBefore(1);
  }
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight("bold")
    .setBackground("#fde9d9");
  sheet.setFrozenRows(1);
}

/** Chạy thủ công 1 lần để đổi tiêu đề 2 tab sang tiếng Việt */
function setupHeaders() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var v = ss.getSheetByName("Votes") || ss.insertSheet("Votes");
  var m = ss.getSheetByName("EchoMessages") || ss.insertSheet("EchoMessages");
  ensureHeaders_(v, VOTES_HEADERS);
  ensureHeaders_(m, MESSAGES_HEADERS);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Chống trùng: 1 mã học viên chỉ bình chọn 1 lần cho mỗi ứng viên ở mỗi giải
 * (cùng khóa role|awardId|campusId|nomineeName mà website đang dùng).
 * Các dòng cũ chưa có mã học viên (cột J trống) được bỏ qua.
 */
function isDuplicateVote_(sheet, data, studentCode) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;
  var rows = sheet.getRange(2, 1, lastRow - 1, VOTES_HEADERS.length).getValues();
  for (var i = 0; i < rows.length; i++) {
    var r = rows[i];
    if (String(r[COL_STUDENT_CODE]).trim().toUpperCase() === studentCode &&
        String(r[COL_ROLE]) === String(data.role) &&
        String(r[COL_AWARD_ID]) === String(data.awardId) &&
        String(r[COL_CAMPUS_ID]) === String(data.campusId) &&
        String(r[COL_NOMINEE]) === String(data.nomineeName)) {
      return true;
    }
  }
  return false;
}

function doPost(e) {
  try {
    var contents = JSON.parse(e.postData.contents);
    var action = contents.action;
    var data = contents.data;
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (action === "appendVote") {
      var studentCode = String(data.studentCode || "").trim().toUpperCase();
      var studentName = String(data.studentName || "").trim();
      if (!studentCode || !studentName) {
        return json_({ success: false, code: "INVALID", message: "Thiếu tên hoặc mã số học viên" });
      }

      // Khóa để 2 request đồng thời không cùng vượt qua bước kiểm tra trùng
      var lock = LockService.getScriptLock();
      lock.waitLock(20000);
      try {
        var sheetVotes = ss.getSheetByName("Votes") || ss.insertSheet("Votes");
        ensureHeaders_(sheetVotes, VOTES_HEADERS);

        if (isDuplicateVote_(sheetVotes, data, studentCode)) {
          return json_({
            success: false,
            code: "DUPLICATE",
            message: "Mã học viên đã bình chọn cho ứng viên này ở giải này"
          });
        }

        var ts = data.timestamp ? new Date(data.timestamp) : new Date();
        sheetVotes.appendRow([
          Utilities.formatDate(ts, TIMEZONE, "yyyy-MM-dd HH:mm:ss"),
          data.role,
          data.awardId,
          data.awardName,
          data.campusId,
          data.campusName,
          data.nomineeName,
          data.voterMessage,
          studentName,
          // Ghi dạng chuỗi để Sheet không tự đổi mã số (VD: 00123) thành số
          "'" + studentCode
        ]);
      } finally {
        lock.releaseLock();
      }

      return json_({ success: true, message: "Vote appended successfully" });
    }

    if (action === "appendEchoMessage") {
      var sheetMsgs = ss.getSheetByName("EchoMessages") || ss.insertSheet("EchoMessages");
      ensureHeaders_(sheetMsgs, MESSAGES_HEADERS);
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
