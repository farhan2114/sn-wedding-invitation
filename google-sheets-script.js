/**
 * ============================================================================
 * GOOGLE APPS SCRIPT FOR SREEJA & NIKHIL'S WEDDING RSVP
 * ============================================================================
 * 
 * INSTRUCTIONS TO SET UP:
 * 1. Open a new Google Sheet (e.g., name it "Sreeja & Nikhil RSVP").
 * 2. In the top menu, click: Extensions > Apps Script.
 * 3. Delete any code in the editor and paste THIS ENTIRE FILE.
 * 4. In the Apps Script toolbar, click "Run" with `setupSheet` selected to initialize the sheet design.
 *    (Google may ask for permission on first run; click "Advanced" -> "Go to project (unsafe)").
 * 5. Click the blue "Deploy" button (top right) > "New deployment".
 * 6. Click the gear icon next to "Select type" and choose "Web app".
 *    - Description: "RSVP Webhook"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"  <-- IMPORTANT!
 * 7. Click "Deploy", copy the "Web app URL", and paste it into:
 *    `src/services/rsvpService.js` (or your .env file as VITE_GOOGLE_SHEETS_URL).
 * ============================================================================
 */

var SHEET_NAME = "RSVP Responses";

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    
    // Auto-initialize sheet if it does not exist yet
    if (!sheet) {
      sheet = setupSheet();
    }

    var data = {};
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    }

    var timestamp = data.timestamp || new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
    var fullName = data.fullName || ((data.firstName || '') + ' ' + (data.lastName || '')).trim();
    var email = data.email || '';
    var attending = (data.attending === 'yes' || data.attending === 'Yes') ? 'Yes' : 'No';
    var adults = attending === 'Yes' ? Number(data.adults || data.guests || 1) : 0;
    var children = attending === 'Yes' ? Number(data.children || 0) : 0;
    var totalGuests = attending === 'Yes' ? (adults + children) : 0;
    var dietary = attending === 'Yes' ? (data.dietary === 'non-veg' || data.dietary === 'Non-Veg' ? 'Non-Veg' : 'Vegetarian') : 'N/A';
    var wishes = data.wishes || '';

    // Append new row
    var nextRow = sheet.getLastRow() + 1;
    if (nextRow < 8) nextRow = 8; // Row 7 is header

    var rowValues = [
      timestamp,
      fullName,
      email,
      attending,
      adults,
      children,
      totalGuests,
      dietary,
      wishes
    ];

    sheet.getRange(nextRow, 1, 1, rowValues.length).setValues([rowValues]);

    // Format new row
    var rowRange = sheet.getRange(nextRow, 1, 1, rowValues.length);
    rowRange.setFontFamily("Montserrat");
    rowRange.setFontSize(10);
    rowRange.setVerticalAlignment("middle");
    rowRange.setBorder(true, true, true, true, true, true, "#D9D9D9", SpreadsheetApp.BorderStyle.SOLID);
    
    // Center numbers and status
    sheet.getRange(nextRow, 4, 1, 4).setHorizontalAlignment("center");

    // Color code attending status
    var statusCell = sheet.getRange(nextRow, 4);
    if (attending === 'Yes') {
      statusCell.setBackground("#E6F4EA").setFontColor("#137333").setFontWeight("bold");
    } else {
      statusCell.setBackground("#FCE8E6").setFontColor("#C5221F").setFontWeight("bold");
    }

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", row: nextRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("Sreeja & Nikhil Wedding RSVP Webhook is active and running!")
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * One-click Sheet Setup: Formats sections, colors, dashboard stat cards & formulas
 */
function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  
  sheet.clear();

  // Set column widths
  sheet.setColumnWidth(1, 170); // Timestamp
  sheet.setColumnWidth(2, 190); // Name
  sheet.setColumnWidth(3, 220); // Email
  sheet.setColumnWidth(4, 110); // Attending
  sheet.setColumnWidth(5, 100); // Adults
  sheet.setColumnWidth(6, 100); // Children
  sheet.setColumnWidth(7, 130); // Total in Party
  sheet.setColumnWidth(8, 150); // Dietary
  sheet.setColumnWidth(9, 320); // Wishes

  // ==========================================
  // SECTION 1: EXECUTIVE DASHBOARD & TOTALS
  // ==========================================
  
  // Row 1: Title Banner
  sheet.getRange("A1:I1").merge()
    .setValue("✨ SREEJA & NIKHIL — SANGEET & COCKTAILS RSVP SUMMARY ✨")
    .setBackground("#12141C")
    .setFontColor("#D2A85C")
    .setFontFamily("Playfair Display")
    .setFontSize(13)
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle");
  sheet.setRowHeight(1, 38);

  // Row 2-3: Metric Card Labels
  sheet.getRange("A2:B2").merge().setValue("TOTAL SUBMISSIONS").setHorizontalAlignment("center");
  sheet.getRange("C2:C2").setValue("ATTENDING (YES)").setHorizontalAlignment("center");
  sheet.getRange("D2:D2").setValue("DECLINED (NO)").setHorizontalAlignment("center");
  sheet.getRange("E2:E2").setValue("TOTAL ADULTS").setHorizontalAlignment("center");
  sheet.getRange("F2:F2").setValue("TOTAL CHILDREN").setHorizontalAlignment("center");
  sheet.getRange("G2:G2").setValue("TOTAL GUESTS").setHorizontalAlignment("center");
  sheet.getRange("H2:I2").merge().setValue("DIETARY BREAKDOWN").setHorizontalAlignment("center");

  var metricHeader = sheet.getRange("A2:I2");
  metricHeader.setBackground("#1B1F2B")
    .setFontColor("#E7CE9C")
    .setFontFamily("Montserrat")
    .setFontSize(9)
    .setFontWeight("bold")
    .setVerticalAlignment("middle");
  sheet.setRowHeight(2, 24);

  // Row 3: Live Formulas for Totals
  sheet.getRange("A3:B3").merge().setFormula('=COUNTA(B8:B)');
  sheet.getRange("C3").setFormula('=COUNTIF(D8:D, "Yes")');
  sheet.getRange("D3").setFormula('=COUNTIF(D8:D, "No")');
  sheet.getRange("E3").setFormula('=SUM(E8:E)');
  sheet.getRange("F3").setFormula('=SUM(F8:F)');
  sheet.getRange("G3").setFormula('=SUM(G8:G)'); // GRAND TOTAL GUESTS!
  sheet.getRange("H3:I3").merge().setFormula('="Veg: " & COUNTIF(H8:H, "Vegetarian") & " | Non-Veg: " & COUNTIF(H8:H, "Non-Veg")');

  var metricValues = sheet.getRange("A3:I3");
  metricValues.setBackground("#F8F9FA")
    .setFontColor("#12141C")
    .setFontFamily("Montserrat")
    .setFontSize(14)
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")
    .setBorder(true, true, true, true, true, true, "#333A4D", SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(3, 34);

  // Highlight Grand Total Guests cell
  sheet.getRange("G2").setBackground("#D2A85C").setFontColor("#12141C");
  sheet.getRange("G3").setBackground("#FFF3D6").setFontColor("#B68A3E").setFontSize(16);

  // Row 4-5: Empty separator
  sheet.setRowHeight(4, 10);
  sheet.setRowHeight(5, 10);

  // ==========================================
  // SECTION 2: GUEST RSVP LOG TABLE
  // ==========================================
  sheet.getRange("A6:I6").merge()
    .setValue("📋 DETAILED GUEST RESPONSES")
    .setBackground("#F1E9D7")
    .setFontColor("#12141C")
    .setFontFamily("Montserrat")
    .setFontSize(10)
    .setFontWeight("bold")
    .setVerticalAlignment("middle")
    .setIndent(1);
  sheet.setRowHeight(6, 24);

  var headers = [
    "Timestamp",
    "Guest Name",
    "Email Address",
    "Attending?",
    "Adults",
    "Children",
    "Total in Party",
    "Dietary Preference",
    "Warm Wishes / Notes"
  ];

  sheet.getRange(7, 1, 1, headers.length).setValues([headers]);
  var headerRange = sheet.getRange("A7:I7");
  headerRange.setBackground("#12141C")
    .setFontColor("#F3EFE4")
    .setFontFamily("Montserrat")
    .setFontSize(10)
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")
    .setBorder(true, true, true, true, true, true, "#D2A85C", SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(7, 28);

  // Freeze top 7 rows so dashboard & headers are always visible while scrolling
  sheet.setFrozenRows(7);

  SpreadsheetApp.flush();
  return sheet;
}
