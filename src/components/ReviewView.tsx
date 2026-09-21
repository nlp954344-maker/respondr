import React from 'react';
import { SurveyState } from '../types';
import { QUESTIONS } from '../data/questions';
import { ShieldCheck, MapPin, School, Edit2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ReviewViewProps {
  state: SurveyState;
  onEditQuestion: (qId: string) => void;
  onEditCampus: () => void;
  onHoneypotChange: (val: string) => void;
  errorMessage?: string | null;
}

export const ReviewView: React.FC<ReviewViewProps> = ({
  state,
  onEditQuestion,
  onEditCampus,
  onHoneypotChange,
  errorMessage
}) => {
  const chosenCollege = state.isCustomCollege ? state.customCollege : state.college;

  const getAnswerDisplay = (qId: string) => {
    if (qId === 'q11') {
      return state.q11Text ? `“${state.q11Text}”` : '(No note left — skipped)';
    }

    const val = state.answers[qId];
    if (!val || (Array.isArray(val) && val.length === 0)) {
      return '(Not answered)';
    }

    let text = Array.isArray(val) ? val.join(", ") : val;

    // Append other field if present
    if (qId === 'q3' && state.otherInputs.q3Other) {
      text += ` [Custom: ${state.otherInputs.q3Other}]`;
    } else if (qId === 'q4' && state.otherInputs.q4Other) {
      text += ` [Custom: ${state.otherInputs.q4Other}]`;
    } else if (qId === 'q12' && state.otherInputs.q12Other) {
      text += ` [Custom: ${state.otherInputs.q12Other}]`;
    }

    return text;
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2">
      {/* Header card */}
      <div className="bg-[#f2f3ff] dark:bg-slate-800/80 rounded-2xl p-4 shadow-sm border border-[#eaedff] dark:border-slate-800 mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-[#00825a] text-white text-[10px] font-bold uppercase tracking-wider">
            Final Step • Review & Confirm
          </span>
          <span className="text-[10px] text-[#fe932c] font-bold uppercase">
            100% Calibrated
          </span>
        </div>
        <h2 className="font-['Sora',sans-serif] text-xl font-bold text-[#131b2e] dark:text-white">
          Review your campus drop ballot
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
          Verify your preferences before we submit your vote to the Assam Campus Merch database.
        </p>
      </div>

      {/* Error alert if any */}
      {errorMessage && (
        <div className="p-3.5 mb-4 rounded-xl bg-[#ffdad6] text-[#93000a] text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Campus & District Summary Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-[#eaedff] dark:border-slate-800 mb-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-3">
          <span className="text-xs font-bold uppercase text-[#dc2626] tracking-wider">
            Campus Identity
          </span>
          <button
            id="edit-campus-btn"
            type="button"
            onClick={onEditCampus}
            className="text-xs font-bold text-[#006646] dark:text-[#85f8c4] flex items-center gap-1 hover:underline"
          >
            <Edit2 className="w-3 h-3" />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ffdcc3] text-[#663500] flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">District</span>
              <span className="text-xs sm:text-sm font-bold text-[#131b2e] dark:text-white">
                {state.district || "Not selected"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ffdad6] text-[#93000b] flex items-center justify-center shrink-0">
              <School className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 block font-medium">College</span>
              <span className="text-xs sm:text-sm font-bold text-[#131b2e] dark:text-white truncate block">
                {chosenCollege || "Not selected"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Answers list */}
      <div className="flex flex-col gap-2.5 mb-5">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
            Your Question Responses (Q1–Q14)
          </span>
          <span className="text-[10px] text-slate-400">Tap Edit to modify any choice</span>
        </div>

        {QUESTIONS.map((q) => {
          const ansText = getAnswerDisplay(q.id);

          return (
            <div
              key={q.id}
              className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-[#eaedff] dark:border-slate-800 shadow-sm flex items-start justify-between gap-3"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-bold text-[#fe932c] uppercase tracking-wide">
                    Q{q.number} • {q.category}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[#131b2e] dark:text-white line-clamp-1">
                  {q.label}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium mt-1 leading-snug">
                  {ansText}
                </p>
              </div>

              <button
                id={`edit-${q.id}-btn`}
                type="button"
                onClick={() => onEditQuestion(q.id)}
                className="p-1.5 rounded-lg bg-[#eaedff] dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#dc2626] hover:bg-[#ffdad6] transition-colors shrink-0"
                title={`Edit Q${q.number}`}
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Hidden Honeypot Input for anti-spam (invisible to human users) */}
      <div className="opacity-0 absolute -left-[9999px] pointer-events-none" aria-hidden="true">
        <label htmlFor="website_hp_field">Website URL (leave blank)</label>
        <input
          id="website_hp_field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={state.honeypot}
          onChange={(e) => onHoneypotChange(e.target.value)}
        />
      </div>

      {/* Short Privacy Note as requested */}
      <div className="p-3.5 rounded-xl bg-[#f2f3ff] dark:bg-slate-800/60 border border-[#eaedff] dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs flex items-center gap-2.5">
        <ShieldCheck className="w-5 h-5 text-[#00825a] shrink-0" />
        <span className="leading-relaxed">
          Responses are anonymous and used only for market research. Your data is protected.
        </span>
      </div>
    </div>
  );
};
