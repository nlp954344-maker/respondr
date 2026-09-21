import React, { useState } from 'react';
import { X, Code2, Copy, Check, ExternalLink, Play, Database, FileSpreadsheet, Sparkles, AlertTriangle } from 'lucide-react';
import { getWebhookUrl, setCustomWebhookUrl, getLocalQueuedPayloads } from '../utils/submission';

interface BackendGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const APPS_SCRIPT_CODE = `/**
 * RespondR – Assam Campus Merch Survey
 * Google Apps Script Web App Endpoint (Code.gs)
 */

const SHEET_NAME = "Responses";
const SUMMARY_SHEET_NAME = "Summary Analytics";

const HEADERS = [
  "Timestamp", "Session ID", "District", "College", "Custom College?",
  "Q1 Would Buy College Tee", "Q2 Bought Merch Before", "Q3 Interested Merch Types",
  "Q3 Other Concept", "Q4 Style Aesthetic", "Q4 Other Style", "Q5 Preferred Silhouette",
  "Q6 Price Willing To Pay", "Q7 Most Important Factors (Max 3)", "Q8 Fabric Weight & Feel",
  "Q9 Preferred Colorways", "Q10 Graphic Placement", "Q11 Streetwear Vibe Feedback",
  "Q12 Delivery Preference", "Q12 Other Delivery", "Q13 Merch Purchases Per Year",
  "Q14 Campus Ambassador Interest", "Device Type", "User Agent", "Honeypot Triggered"
];

function doGet() {
  return ContentService
    .createTextOutput("Survey endpoint is live! Ready to accept POST requests.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: "Server busy. Please retry." }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: "error", message: "No data received." }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const data = JSON.parse(e.postData.contents);

    // Anti-spam honeypot check
    if (data.honeypot && String(data.honeypot).trim() !== "") {
      return ContentService
        .createTextOutput(JSON.stringify({ status: "success", message: "Honeypot filtered." }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      formatHeaderRow(sheet);
    } else if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      formatHeaderRow(sheet);
    }

    const row = [
      data.timestamp || new Date().toISOString(),
      data.sessionId || "",
      data.district || "",
      data.college || "",
      data.collegeIsCustom ? "YES" : "NO",
      data.q1 || "", data.q2 || "", data.q3 || "", data.q3Other || "",
      data.q4 || "", data.q4Other || "", data.q5 || "", data.q6 || "",
      data.q7 || "", data.q8 || "", data.q9 || "", data.q10 || "",
      data.q11Text || data.q11 || "",
      data.q12 || "", data.q12Other || "", data.q13 || "", data.q14 || "",
      data.deviceType || "mobile", data.userAgent || "", data.honeypot || ""
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Vote recorded in Google Sheets!",
        rowNumber: sheet.getLastRow()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function formatHeaderRow(sheet) {
  const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setBackground("#B70011");
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setFontFamily("Plus Jakarta Sans");
  sheet.setFrozenRows(1);
}`;

const SUMMARY_FORMULAS = `// Live Analytics Formulas for "Summary" Sheet:
// 1. Total Submissions:
=COUNTA(Responses!A2:A)

// 2. Votes per District (paste in A5):
=QUERY(Responses!C2:C, "SELECT C, count(C) WHERE C IS NOT NULL GROUP BY C ORDER BY count(C) DESC LABEL C 'District', count(C) 'Votes'", 0)

// 3. Top Voting Colleges (paste in D5):
=QUERY(Responses!D2:D, "SELECT D, count(D) WHERE D IS NOT NULL GROUP BY D ORDER BY count(D) DESC LIMIT 20 LABEL D 'College', count(D) 'Votes'", 0)

// 4. Q1 Purchase Intent Breakdown (paste in G5):
=QUERY(Responses!F2:F, "SELECT F, count(F) WHERE F IS NOT NULL GROUP BY F ORDER BY count(F) DESC LABEL F 'Intent', count(F) 'Count'", 0)

// 5. Price Tier Breakdown (paste in J5):
=QUERY(Responses!M2:M, "SELECT M, count(M) WHERE M IS NOT NULL GROUP BY M ORDER BY count(M) DESC LABEL M 'Price Bucket', count(M) 'Votes'", 0)`;

export const BackendGuideModal: React.FC<BackendGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'instructions' | 'script' | 'formulas' | 'tester'>('instructions');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedFormulas, setCopiedFormulas] = useState(false);
  const [customUrl, setCustomUrl] = useState(getWebhookUrl());
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  if (!isOpen) return null;

  const currentWebhook = getWebhookUrl();
  const queuedPayloads = getLocalQueuedPayloads();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(APPS_SCRIPT_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyFormulas = () => {
    navigator.clipboard.writeText(SUMMARY_FORMULAS);
    setCopiedFormulas(true);
    setTimeout(() => setCopiedFormulas(false), 2000);
  };

  const handleSaveWebhook = () => {
    setCustomWebhookUrl(customUrl);
    setTestStatus("Webhook URL saved in browser state!");
    setTimeout(() => setTestStatus(null), 3000);
  };

  const handleTestPost = async () => {
    if (!customUrl.trim()) {
      setTestStatus("Please enter a valid Google Apps Script Web App URL first.");
      return;
    }

    setIsTesting(true);
    setTestStatus("Sending sample test payload via no-cors mode...");

    try {
      const samplePayload = {
        timestamp: new Date().toISOString(),
        sessionId: "TEST-PING-" + Date.now(),
        district: "Kamrup Metropolitan",
        college: "Cotton University, Panbazar",
        collegeIsCustom: false,
        q1: "Yes, absolutely! (Waiting for a fire drop)",
        q2: "Yes, official fest/event tee",
        q3: "Oversized T-shirt | Heavyweight Hoodie",
        q3Other: "",
        q4: "Heavy Streetwear",
        q4Other: "",
        q5: "Oversized / Boxy Fit",
        q6: "₹400–499",
        q7: "Aesthetic Streetwear Design | Fabric Quality (GSM & Feel) | College Pride & Identity",
        q8: "Heavyweight 240–280 GSM",
        q9: "Carbon Black | Gamosa Crimson Red",
        q10: "Large statement back graphic + subtle front left chest crest",
        q11: "Clean boxy cut with embroidered Gamosa trim",
        q11Text: "Clean boxy cut with embroidered Gamosa trim",
        q12: "Direct pickup stall at College Gate / Student Common Room",
        q12Other: "",
        q13: "2–3 pieces (Tee + Hoodie/Sweatshirt combo)",
        q14: "Yes! Hook me up with early samples, free merch & drop perks",
        deviceType: "desktop",
        userAgent: navigator.userAgent,
        honeypot: ""
      };

      await fetch(customUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(samplePayload)
      });

      setTestStatus("Success! Sample test ping dispatched to Google Apps Script. Check your 'Responses' sheet in Google Sheets!");
    } catch (err: any) {
      setTestStatus("Error sending test payload: " + err.message);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-[#eaedff] dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-[#f2f3ff] dark:bg-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#dc2626] text-white flex items-center justify-center shadow-sm">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-['Sora',sans-serif] text-base font-bold text-[#131b2e] dark:text-white">
                Google Sheets Backend & Setup Guide
              </h3>
              <p className="text-xs text-slate-500">
                Serverless storage via Google Apps Script Web App
              </p>
            </div>
          </div>
          <button
            id="close-backend-guide-btn"
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-200 flex items-center justify-center hover:bg-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-[#faf8ff] dark:bg-slate-900/60 px-4 text-xs font-bold overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('instructions')}
            className={`py-3 px-3 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'instructions'
                ? 'border-[#dc2626] text-[#dc2626]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            1. Setup Steps
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('script')}
            className={`py-3 px-3 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'script'
                ? 'border-[#dc2626] text-[#dc2626]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>2. Apps Script (Code.gs)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('formulas')}
            className={`py-3 px-3 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'formulas'
                ? 'border-[#dc2626] text-[#dc2626]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            3. Summary Formulas
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tester')}
            className={`py-3 px-3 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'tester'
                ? 'border-[#dc2626] text-[#dc2626]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Play className="w-3.5 h-3.5 text-[#fe932c]" />
            <span>4. Test Webhook</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
          {activeTab === 'instructions' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-[#ffdcc3] dark:bg-amber-950/40 text-[#663500] dark:text-amber-200 border border-[#fe932c]/30 flex items-start gap-2.5">
                <Sparkles className="w-5 h-5 shrink-0 text-[#fe932c]" />
                <div className="text-xs leading-relaxed">
                  <p className="font-bold">Zero Backend Servers Required!</p>
                  <p>All student responses post directly to your personal Google Sheet via a free, lightweight Google Apps Script Web App endpoint with auto-locking and auto-header creation.</p>
                </div>
              </div>

              <h4 className="font-['Sora',sans-serif] font-bold text-sm text-[#131b2e] dark:text-white">
                Step-by-Step Deployment (Takes 2 minutes):
              </h4>

              <ol className="space-y-3 pl-4 list-decimal marker:font-bold marker:text-[#dc2626]">
                <li className="leading-relaxed">
                  <strong>Create your Google Sheet:</strong> Open a new sheet at{' '}
                  <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-[#dc2626] underline font-bold inline-flex items-center gap-0.5">
                    sheets.new <ExternalLink className="w-3 h-3" />
                  </a>{' '}
                  and name it <em>"RespondR - Assam Campus Merch Database"</em>.
                </li>
                <li className="leading-relaxed">
                  <strong>Open Apps Script:</strong> Click <strong>Extensions &gt; Apps Script</strong> in the top Google Sheets menu.
                </li>
                <li className="leading-relaxed">
                  <strong>Paste Script:</strong> Delete existing code in <code>Code.gs</code>, copy the code from Tab 2 above, and paste it.
                </li>
                <li className="leading-relaxed">
                  <strong>Deploy as Web App:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                    <li>Click <strong>Deploy &gt; New deployment</strong> (blue button top right).</li>
                    <li>Select type: <strong>Web app</strong> (gear icon).</li>
                    <li>Execute as: <strong>Me (your email)</strong>.</li>
                    <li>Who has access: <strong>Anyone</strong> (critical so students across colleges can submit without logging into Google).</li>
                  </ul>
                </li>
                <li className="leading-relaxed">
                  <strong>Authorize & Copy URL:</strong> Click Deploy, grant Google permissions, and copy the generated Web App URL (ends with <code>/exec</code>).
                </li>
                <li className="leading-relaxed">
                  <strong>Configure Frontend:</strong> Add <code>VITE_SHEETS_WEBHOOK_URL="your-url"</code> in your <code>.env</code> file or paste it in Tab 4 "Test Webhook" to test right inside this browser!
                </li>
              </ol>

              <div className="p-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 border border-[#eaedff] dark:border-slate-700 text-xs">
                <span className="font-bold text-[#dc2626] block mb-1">CORS Note &amp; no-cors mode:</span>
                Google Apps Script Web Apps do not return standard browser CORS headers for POST requests. The frontend correctly submits via <code>mode: "no-cors"</code> and <code>text/plain;charset=utf-8</code> so browser security policies never block submissions.
              </div>
            </div>
          )}

          {activeTab === 'script' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Complete Code.gs for Google Apps Script
                </span>
                <button
                  id="copy-apps-script-code-btn"
                  type="button"
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 rounded-lg bg-[#dc2626] hover:bg-[#b70011] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? "Copied!" : "Copy Code.gs"}</span>
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto max-h-[50vh] leading-relaxed border border-slate-800">
                {APPS_SCRIPT_CODE}
              </pre>
            </div>
          )}

          {activeTab === 'formulas' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Live Analytics Formulas (COUNTIF / QUERY)
                </span>
                <button
                  id="copy-formulas-btn"
                  type="button"
                  onClick={handleCopyFormulas}
                  className="px-3 py-1.5 rounded-lg bg-[#00825a] hover:bg-[#006646] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
                >
                  {copiedFormulas ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedFormulas ? "Copied!" : "Copy Formulas"}</span>
                </button>
              </div>

              <p className="text-xs text-slate-500">
                Create a second sheet called <strong>"Summary Analytics"</strong> in your Google Sheet and paste these formulas to watch live totals, district rankings, and price sensitivity update in real time:
              </p>

              <pre className="p-4 rounded-2xl bg-slate-950 text-[#85f8c4] text-xs font-mono overflow-x-auto max-h-[50vh] leading-relaxed border border-slate-800">
                {SUMMARY_FORMULAS}
              </pre>
            </div>
          )}

          {activeTab === 'tester' && (
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="webhook-url-input" className="font-bold text-xs uppercase text-slate-500">
                  Google Apps Script Web App URL:
                </label>
                <div className="flex gap-2">
                  <input
                    id="webhook-url-input"
                    type="url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                    className="flex-1 h-12 px-3.5 rounded-xl bg-[#eaedff] dark:bg-slate-800 text-xs font-mono text-[#131b2e] dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
                  />
                  <button
                    id="save-webhook-btn"
                    type="button"
                    onClick={handleSaveWebhook}
                    className="px-4 h-12 rounded-xl bg-[#131b2e] text-white text-xs font-bold hover:bg-slate-800 active:scale-95"
                  >
                    Save URL
                  </button>
                </div>
                <span className="text-[11px] text-slate-500">
                  Active Webhook URL:{' '}
                  <strong className="text-[#dc2626]">
                    {currentWebhook || "(None configured — running in Demo / Simulation Mode)"}
                  </strong>
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  id="send-test-post-btn"
                  type="button"
                  onClick={handleTestPost}
                  disabled={isTesting}
                  className="px-5 h-12 rounded-xl bg-[#dc2626] hover:bg-[#b70011] text-white text-xs font-bold flex items-center gap-2 shadow-sm disabled:opacity-50 active:scale-95"
                >
                  <Play className="w-4 h-4" />
                  <span>{isTesting ? "Testing Ping..." : "Send Test POST Submission"}</span>
                </button>
              </div>

              {testStatus && (
                <div className="p-3 rounded-xl bg-[#ffdcc3] dark:bg-amber-950/60 text-[#663500] dark:text-amber-200 text-xs font-semibold">
                  {testStatus}
                </div>
              )}

              {/* Local simulation queue viewer */}
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs uppercase text-slate-500 flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-[#fe932c]" />
                    <span>Recent Device Submissions ({queuedPayloads.length})</span>
                  </span>
                </div>

                {queuedPayloads.length > 0 ? (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {queuedPayloads.slice(0, 5).map((p, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs flex items-center justify-between">
                        <div>
                          <strong className="text-[#dc2626]">{p.college}</strong>
                          <span className="text-slate-400 ml-1">({p.district})</span>
                          <span className="text-slate-400 text-[10px] block font-mono">{p.sessionId}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {new Date(p.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No submissions recorded on this device yet.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#f2f3ff] dark:bg-slate-800 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Assam Campus Merch • Google Apps Script v1.0
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
