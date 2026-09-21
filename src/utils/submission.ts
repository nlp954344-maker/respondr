/**
 * RespondR – Assam Campus Merch Survey
 * Payload formatting and Google Sheets submission engine
 */

import { SurveyPayload, SurveyState, SubmissionResult } from '../types';
import { detectDeviceType, getUserAgent, markDeviceAsSubmitted } from './antiSpam';

const OFFLINE_QUEUE_KEY = "respondr_offline_queue";

export function formatSurveyPayload(state: SurveyState): SurveyPayload {
  const chosenCollege = state.isCustomCollege 
    ? state.customCollege.trim() 
    : state.college.trim();

  // Helper to serialize an answer (single string or multi-select array) into " | " separated string
  const formatAns = (val: string | string[] | undefined): string => {
    if (!val) return "";
    if (Array.isArray(val)) {
      return val.filter(Boolean).join(" | ");
    }
    return String(val).trim();
  };

  const payload: SurveyPayload = {
    timestamp: new Date().toISOString(),
    sessionId: state.sessionId,
    district: state.district,
    college: chosenCollege || "Unknown College",
    collegeIsCustom: state.isCustomCollege,
    q1: formatAns(state.answers.q1),
    q2: formatAns(state.answers.q2),
    q3: formatAns(state.answers.q3),
    q3Other: state.otherInputs.q3Other ? state.otherInputs.q3Other.trim() : "",
    q4: formatAns(state.answers.q4),
    q4Other: state.otherInputs.q4Other ? state.otherInputs.q4Other.trim() : "",
    q5: formatAns(state.answers.q5),
    q6: formatAns(state.answers.q6),
    q7: formatAns(state.answers.q7),
    q8: formatAns(state.answers.q8),
    q9: formatAns(state.answers.q9),
    q10: formatAns(state.answers.q10),
    q11: state.q11Text ? state.q11Text.trim() : "",
    q11Text: state.q11Text ? state.q11Text.trim() : "",
    q12: formatAns(state.answers.q12),
    q12Other: state.otherInputs.q12Other ? state.otherInputs.q12Other.trim() : "",
    q13: formatAns(state.answers.q13),
    q14: formatAns(state.answers.q14),
    deviceType: detectDeviceType(),
    userAgent: getUserAgent(),
    honeypot: state.honeypot || ""
  };

  return payload;
}

export function getWebhookUrl(): string {
  // Check localStorage override first (useful for testing in-app without rebuilding)
  try {
    const customUrl = localStorage.getItem("respondr_custom_webhook_url");
    if (customUrl && customUrl.trim()) return customUrl.trim();
  } catch {
    // ignore
  }

  const envUrl = (import.meta as any).env?.VITE_SHEETS_WEBHOOK_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.startsWith("http")) {
    return envUrl.trim();
  }

  return "";
}

export function setCustomWebhookUrl(url: string): void {
  try {
    if (!url || !url.trim()) {
      localStorage.removeItem("respondr_custom_webhook_url");
    } else {
      localStorage.setItem("respondr_custom_webhook_url", url.trim());
    }
  } catch {
    // ignore
  }
}

/**
 * Submits the payload to the Google Apps Script Web App endpoint.
 * Note: Google Apps Script Web App endpoints require `mode: 'no-cors'`
 * and `Content-Type: text/plain;charset=utf-8` to avoid browser CORS preflight blocks.
 */
export async function submitSurvey(payload: SurveyPayload): Promise<SubmissionResult> {
  const webhookUrl = getWebhookUrl();

  // If no webhook URL configured yet (e.g. initial demo preview), simulate graceful success with local recording
  if (!webhookUrl) {
    console.info("RespondR: No VITE_SHEETS_WEBHOOK_URL configured yet. Storing response locally in simulation demo mode.", payload);
    
    // Save to local offline queue for review in developer modal
    queuePayloadLocally(payload);

    // Save submission metadata in localStorage
    markDeviceAsSubmitted({
      submittedAt: new Date().toISOString(),
      ticketId: payload.sessionId,
      district: payload.district,
      college: payload.college
    });

    // Simulate realistic 900ms network latency
    await new Promise((resolve) => setTimeout(resolve, 900));

    return {
      success: true,
      message: "Recorded in Demo Mode (Connect your Google Sheet in Setup Guide to send live!).",
      ticketId: payload.sessionId,
      offlineQueued: false
    };
  }

  try {
    const bodyStr = JSON.stringify(payload);

    // Prompt specification:
    // fetch(WEBHOOK_URL, { method: "POST", mode: "no-cors", headers: {"Content-Type": "text/plain;charset=utf-8"}, body: JSON.stringify(payload) })
    await fetch(webhookUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: bodyStr
    });

    // With mode: "no-cors", the response is opaque (type "opaque", status 0).
    // The browser doesn't throw if the request reached Google's server.
    markDeviceAsSubmitted({
      submittedAt: new Date().toISOString(),
      ticketId: payload.sessionId,
      district: payload.district,
      college: payload.college
    });

    // Also stash in recent submissions
    queuePayloadLocally(payload);

    return {
      success: true,
      message: "Your campus drop vote has been successfully committed to Google Sheets!",
      ticketId: payload.sessionId
    };

  } catch (error) {
    console.error("Submission failed:", error);

    // Queue payload locally so user doesn't lose their answers
    queuePayloadLocally(payload);

    return {
      success: false,
      message: "Network glitch or timeout. Your answers are safely preserved on this device. Tap Retry to resubmit.",
      ticketId: payload.sessionId,
      offlineQueued: true
    };
  }
}

export function queuePayloadLocally(payload: SurveyPayload): void {
  try {
    const raw = localStorage.getItem(OFFLINE_QUEUE_KEY);
    const list: SurveyPayload[] = raw ? JSON.parse(raw) : [];
    list.unshift(payload);
    // keep latest 20
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(list.slice(0, 20)));
  } catch {
    // ignore
  }
}

export function getLocalQueuedPayloads(): SurveyPayload[] {
  try {
    const raw = localStorage.getItem(OFFLINE_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
