/**
 * RespondR – Assam Campus Merch Survey
 * TypeScript Type Definitions
 */

export interface SurveyState {
  district: string;
  college: string;
  customCollege: string;
  isCustomCollege: boolean;
  answers: Record<string, string | string[]>;
  otherInputs: {
    q3Other: string;
    q4Other: string;
    q12Other: string;
  };
  q11Text: string;
  honeypot: string;
  sessionId: string;
  startTime: number;
}

export interface SurveyPayload {
  timestamp: string;
  sessionId: string;
  district: string;
  college: string;
  collegeIsCustom: boolean;
  q1: string;
  q2: string;
  q3: string;
  q3Other: string;
  q4: string;
  q4Other: string;
  q5: string;
  q6: string;
  q7: string;
  q8: string;
  q9: string;
  q10: string;
  q11: string;
  q11Text: string;
  q12: string;
  q12Other: string;
  q13: string;
  q14: string;
  deviceType: 'mobile' | 'desktop';
  userAgent: string;
  honeypot: string;
}

export type StepKey = 'landing' | 'step0' | `q${number}` | 'review' | 'submitting' | 'success';

export interface SubmissionResult {
  success: boolean;
  message: string;
  ticketId?: string;
  offlineQueued?: boolean;
}
