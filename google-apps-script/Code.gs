/**
 * RespondR – Assam Campus Merch Survey
 * Google Apps Script Web App Endpoint (Code.gs)
 *
 * Stores student responses in Google Sheets with concurrent write locking,
 * automatic sheet/headers initialization, honeypot spam protection,
 * and live analytics formulas.
 *
 * Setup Instructions:
 * 1. Open your Google Sheet (or create a new one at sheets.new)
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code and paste this entire file
 * 4. Click Deploy > New deployment
 * 5. Select type: "Web app"
 * 6. Set Description: "RespondR Assam Survey Webhook v1"
 * 7. Set Execute as: "Me" (your Google account)
 * 8. Set Who has access: "Anyone"
 * 9. Click Deploy, Authorize access, and copy the Web App URL
 * 10. Set VITE_SHEETS_WEBHOOK_URL in your app or .env
 */

const SHEET_NAME = "Responses";
const SUMMARY_SHEET_NAME = "Summary Analytics";

// Canonical ordered column definitions matching frontend payload
const HEADERS = [
  "Timestamp",
  "Session ID",
  "District",
  "College",
  "Custom College?",
  "Q1 Would Buy College Tee",
  "Q2 Bought Merch Before",
  "Q3 Interested Merch Types",
  "Q3 Other Concept",
  "Q4 Style Aesthetic",
  "Q4 Other Style",
  "Q5 Preferred Silhouette",
  "Q6 Price Willing To Pay",
  "Q7 Most Important Factors (Max 3)",
  "Q8 Fabric Weight & Feel",
  "Q9 Preferred Colorways",
  "Q10 Graphic Placement",
  "Q11 Streetwear Vibe Feedback",
  "Q12 Delivery Preference",
  "Q12 Other Delivery",
  "Q13 Merch Purchases Per Year",
  "Q14 Campus Ambassador Interest",
  "Device Type",
  "User Agent",
  "Honeypot Triggered"
];

/**
 * Health check endpoint for testing in browser or curl
 */
function doGet() {
  return ContentService
    .createTextOutput("Survey endpoint is live! Ready to accept POST requests.")
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Handles incoming POST submissions from the React frontend
 */
function doPost(e) {
  const lock = LockService.getScriptLock();

  // Wait up to 30 seconds for concurrent write locks to resolve
  try {
    lock.waitLock(30000);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: "Server is busy recording another drop vote. Please retry."
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: "error",
          message: "No POST data received."
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const data = JSON.parse(e.postData.contents);

    // Anti-spam honeypot check: silently accept but do NOT write to database
    if (data.honeypot && String(data.honeypot).trim() !== "") {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: "success",
          message: "Response recorded (honeypot filtered)."
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Auto-create "Responses" sheet and write header row if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      formatHeaderRow(sheet);
    } else if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      formatHeaderRow(sheet);
    }

    // Map payload into row values matching the exact header column order
    const row = [
      data.timestamp || new Date().toISOString(),
      data.sessionId || "",
      data.district || "",
      data.college || "",
      data.collegeIsCustom ? "YES" : "NO",
      data.q1 || "",
      data.q2 || "",
      data.q3 || "",
      data.q3Other || "",
      data.q4 || "",
      data.q4Other || "",
      data.q5 || "",
      data.q6 || "",
      data.q7 || "",
      data.q8 || "",
      data.q9 || "",
      data.q10 || "",
      data.q11Text || data.q11 || "",
      data.q12 || "",
      data.q12Other || "",
      data.q13 || "",
      data.q14 || "",
      data.deviceType || "mobile",
      data.userAgent || "",
      data.honeypot || ""
    ];

    sheet.appendRow(row);

    // Auto-setup or verify Summary analytics sheet if requested
    ensureSummarySheet(ss);

    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Vote recorded successfully in Google Sheets!",
        timestamp: new Date().toISOString(),
        rowNumber: sheet.getLastRow()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

/**
 * Format headers with high-contrast crimson/gold streetwear styling
 */
function formatHeaderRow(sheet) {
  const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setBackground("#B70011"); // Gamosa Crimson Red
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setFontFamily("Plus Jakarta Sans");
  headerRange.setFontSize(10);
  headerRange.setWrap(true);
  sheet.setFrozenRows(1);
}

/**
 * Auto-creates the "Summary Analytics" sheet with live COUNTIF & QUERY formulas
 */
function ensureSummarySheet(ss) {
  let summarySheet = ss.getSheetByName(SUMMARY_SHEET_NAME);
  if (summarySheet) return; // Already exists

  summarySheet = ss.insertSheet(SUMMARY_SHEET_NAME);

  summarySheet.getRange("A1:E1").merge();
  summarySheet.getRange("A1").setValue("RESPOND-R ASSAM CAMPUS MERCH - LIVE ANALYTICS")
    .setBackground("#131B2E")
    .setFontColor("#FE932C")
    .setFontWeight("bold")
    .setFontSize(13);

  // Total votes counter
  summarySheet.getRange("A3").setValue("Total Submissions:");
  summarySheet.getRange("B3").setFormula('=COUNTA(Responses!A2:A)');
  summarySheet.getRange("A3:B3").setFontWeight("bold");

  // Top Districts formula using QUERY
  summarySheet.getRange("A5").setValue("Votes per District").setFontWeight("bold").setBackground("#EAEDFF");
  summarySheet.getRange("A6").setFormula(
    '=QUERY(Responses!C2:C, "SELECT C, count(C) WHERE C IS NOT NULL GROUP BY C ORDER BY count(C) DESC LABEL C \'District\', count(C) \'Votes\'", 0)'
  );

  // Top Colleges formula using QUERY
  summarySheet.getRange("D5").setValue("Top Voting Colleges").setFontWeight("bold").setBackground("#EAEDFF");
  summarySheet.getRange("D6").setFormula(
    '=QUERY(Responses!D2:D, "SELECT D, count(D) WHERE D IS NOT NULL GROUP BY D ORDER BY count(D) DESC LIMIT 20 LABEL D \'College\', count(D) \'Votes\'", 0)'
  );

  // Q1 Intent Breakdown
  summarySheet.getRange("G5").setValue("Q1 Purchase Intent").setFontWeight("bold").setBackground("#EAEDFF");
  summarySheet.getRange("G6").setFormula(
    '=QUERY(Responses!F2:F, "SELECT F, count(F) WHERE F IS NOT NULL GROUP BY F ORDER BY count(F) DESC LABEL F \'Response\', count(F) \'Count\'", 0)'
  );

  // Q6 Price Sensitivity Breakdown
  summarySheet.getRange("J5").setValue("Price Tier Breakdown").setFontWeight("bold").setBackground("#EAEDFF");
  summarySheet.getRange("J6").setFormula(
    '=QUERY(Responses!M2:M, "SELECT M, count(M) WHERE M IS NOT NULL GROUP BY M ORDER BY count(M) DESC LABEL M \'Price Range\', count(M) \'Votes\'", 0)'
  );
}
