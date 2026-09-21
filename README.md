# RespondR – Assam Campus Merch Survey

A mobile-first, production-ready frontend survey web app (React 19, Vite, Tailwind CSS) styled in a clean modern Gen-Z streetwear aesthetic with **Gamosa Red**, **Muga Gold**, and **Tea Green** accents.

It gathers student preferences and demand metrics for college streetwear merchandise (oversized tees, heavyweight hoodies, caps, and tote bags) from across **all 35 districts of Assam**.

---

## 🚀 Key Features

- **Mobile-First UX**: Responsive max-w 560px flow modeled after Google Stitch streetwear specs, featuring kinetic progress bars, safe-area inset padding (`pb-safe`), and touch-optimized action targets.
- **Config-Driven Survey Flow**:
  - `Landing` → `Step 0 (Campus Setup)` → `Q1–Q14 (One per screen with progress)` → `Review & Confirm` → `Thank-You Celebration`.
  - All questions are defined in `/src/data/questions.ts` for instant customization.
  - Question types: Single-select cards, multi-select chips, multi-select with max limit (Q7: max 3), conditional "Other" concept inputs, and optional 500-char feedback textarea (Q11).
- **All 35 Districts of Assam**:
  - District dropdown covering every verified district of Assam.
  - Searchable autocomplete college input filtered by selected district using `/src/data/colleges.ts`.
  - Always includes `"My college isn't listed"` to allow manual entry with custom validation.
- **State Preservation & Anti-Spam**:
  - Never loses answers when tapping "Back".
  - Jump directly from Review to edit any question and return.
  - Hidden honeypot field (`website_hp_field`).
  - Minimum form-duration verification.
  - Client-generated session ID (`#AS-2026-DISTRICT-XXXX`).
  - Gentle `localStorage` warning if already submitted on that device (without blocking submissions for classmates/friends).
- **Google Sheets Serverless Backend**:
  - **Zero custom backend server required!**
  - Direct submissions to a Google Apps Script Web App using `no-cors` mode.
  - Auto-creates sheet `"Responses"` with formatted headers and column locking (`LockService`).
  - Auto-creates live analytics in `"Summary Analytics"` with `QUERY` and `COUNTIF` formulas.
  - In-app interactive **Setup Guide & Webhook Tester** modal.

---

## 📦 Project Structure

```
/
├── .env.example                     # Documents VITE_SHEETS_WEBHOOK_URL
├── index.html                       # HTML entry point with Sora & Plus Jakarta Sans fonts
├── metadata.json                    # App name, description, and studio capabilities
├── package.json
├── README.md                        # Deployment & Apps Script setup guide
├── google-apps-script/
│   └── Code.gs                      # Ready-to-paste Google Apps Script backend
├── src/
│   ├── main.tsx                     # React root mount
│   ├── App.tsx                      # Primary survey state & step machine
│   ├── index.css                    # Tailwind CSS + safe area & keyframes
│   ├── types.ts                     # TypeScript interfaces & payload structure
│   ├── data/
│   │   ├── colleges.ts              # 35 Assam districts & college directory
│   │   └── questions.ts             # Config-driven questionnaire (Q1 to Q14)
│   ├── utils/
│   │   ├── antiSpam.ts              # Session ID, honeypot, and localStorage helpers
│   │   └── submission.ts            # Flat JSON payload formatter & fetch engine
│   └── components/
│       ├── BrandLogo.tsx            # RespondR cultural emblem & Assamese weave dividers
│       ├── Header.tsx               # Sticky header with live pulse ticker & progress
│       ├── FooterNav.tsx            # Sticky mobile action bar (Back / Continue / Submit)
│       ├── LandingView.tsx          # Lookbook card, trust pills, and campus whispers
│       ├── Step0Campus.tsx          # District picker & searchable college autocomplete
│       ├── QuestionCard.tsx         # Single-question screen with timer & progress
│       ├── ReviewView.tsx           # Full response review with jump-to-edit
│       ├── ThankYouView.tsx         # Confetti celebration, Street Pass ID, & share buttons
│       ├── HeatmapModal.tsx         # Interactive 35-district live vote heatmap
│       └── BackendGuideModal.tsx    # In-app Google Sheets guide & webhook tester
```

---

## ⚡ Quick Start (Local Development)

```bash
# Install dependencies
npm install

# Start development server (port 3000)
npm run dev

# Build for production
npm run build
```

---

## 📊 Google Sheets Setup Guide (Takes 2 minutes)

1. Open [sheets.new](https://sheets.new) in your browser to create a new Google Sheet.
2. Name it **"RespondR - Assam Campus Merch Database"**.
3. In the top menu, click **Extensions > Apps Script**.
4. Delete any code in the editor, and paste the entire content of `/google-apps-script/Code.gs` (also copyable directly inside the app's **Sheets Setup** button).
5. Click **Deploy > New deployment**:
   - Select type: **Web app** (click the gear icon if needed).
   - Description: `RespondR Assam Survey v1`.
   - Execute as: **Me** (your Google account).
   - Who has access: **Anyone** *(Crucial: allows students to submit without Google login)*.
6. Click **Deploy**, authorize access, and copy the **Web App URL** (ends with `/exec`).
7. Add the URL to your `.env`:
   ```env
   VITE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/AKfycb.../exec"
   ```
8. In the app, you can also test the connection immediately in the **Sheets Setup** modal using the **Send Test POST** button!

---

## 🚢 Production Deployment

### 1. Vercel
```bash
npm install -g vercel
vercel
```
Set environment variable in Vercel Project Settings:
- `VITE_SHEETS_WEBHOOK_URL` = your Google Apps Script URL.

### 2. Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```
Set environment variable in Netlify Site Settings > Environment variables:
- `VITE_SHEETS_WEBHOOK_URL` = your Google Apps Script URL.

### 3. Firebase Hosting
```bash
firebase init hosting
# Public directory: dist
# Single-page app: Yes
npm run build
firebase deploy --only hosting
```

---

## 🔧 Troubleshooting & Technical Notes

### 1. CORS and `no-cors` Mode
Google Apps Script Web Apps do not emit standard `Access-Control-Allow-Origin` headers on POST responses. The frontend uses:
```javascript
fetch(WEBHOOK_URL, {
  method: "POST",
  mode: "no-cors",
  headers: { "Content-Type": "text/plain;charset=utf-8" },
  body: JSON.stringify(payload)
});
```
In `no-cors` mode:
- The browser successfully dispatches the POST request with the JSON body to Google's server.
- The browser marks the response as opaque (status 0).
- If there is a true network disconnection, `fetch()` throws an error and the app automatically caches the responses locally and shows a **Retry** button so no student data is ever lost.

### 2. Editing Apps Script (`Code.gs`)
Whenever you edit code in Google Apps Script, you **MUST create a new versioned deployment**:
1. Click **Deploy > Manage deployments**.
2. Click the **Edit (pencil)** icon next to your active Web App deployment.
3. In the **Version** dropdown, select **New version**.
4. Click **Deploy**.
*(If you do not deploy a new version, Apps Script will continue running the old code!)*
