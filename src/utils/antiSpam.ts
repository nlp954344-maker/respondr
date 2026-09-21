/**
 * Anti-Spam & Session Utilities for RespondR
 */

const LOCAL_STORAGE_KEY = "respondr_assam_submission_meta";
const SESSION_STORAGE_KEY = "respondr_session_id";

export function generateSessionId(district?: string): string {
  try {
    const existing = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (existing) return existing;
  } catch {
    // ignore sessionStorage errors (e.g. private browsing)
  }

  const randomHex = Math.random().toString(16).substring(2, 8).toUpperCase();
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  const districtPrefix = district ? district.replace(/[^a-zA-Z]/g, '').substring(0, 4).toUpperCase() : "AS";
  const id = `RESP-${districtPrefix}-${timestamp}-${randomHex}`;

  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, id);
  } catch {
    // ignore
  }

  return id;
}

export function detectDeviceType(): 'mobile' | 'desktop' {
  if (typeof window === 'undefined') return 'mobile';
  const ua = navigator.userAgent.toLowerCase();
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
  const isSmallScreen = window.innerWidth <= 768;
  return (isMobile || isSmallScreen) ? 'mobile' : 'desktop';
}

export function getUserAgent(): string {
  if (typeof window === 'undefined') return 'unknown';
  return navigator.userAgent || 'unknown';
}

export interface StoredSubmissionMeta {
  submittedAt: string;
  ticketId: string;
  district: string;
  college: string;
}

export function getDeviceSubmissionMeta(): StoredSubmissionMeta | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function markDeviceAsSubmitted(meta: StoredSubmissionMeta): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(meta));
  } catch {
    // ignore
  }
}

export function clearDeviceSubmittedFlag(): void {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch {
    // ignore
  }
}

/**
 * Validates minimum time on form (e.g. 5000ms) to filter automated bots
 */
export function validateFormTime(startTime: number, minSeconds = 6): { valid: boolean; elapsedSeconds: number } {
  const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);
  return {
    valid: elapsedSeconds >= minSeconds,
    elapsedSeconds
  };
}
