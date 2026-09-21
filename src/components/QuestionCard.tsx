import React from 'react';
import { Question, QuestionOption } from '../data/questions';
import { Clock, Check, Flame, AlertCircle, Sparkles, CheckCircle2, PlusCircle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  district: string;
  college: string;
  selectedAnswer: string | string[] | undefined;
  otherText: string;
  onSelectOption: (val: string) => void;
  onToggleMultiChip: (val: string) => void;
  onOtherTextChange: (text: string) => void;
  validationError?: string | null;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  district,
  college,
  selectedAnswer,
  otherText,
  onSelectOption,
  onToggleMultiChip,
  onOtherTextChange,
  validationError
}) => {
  const currentQNum = question.number;
  const totalQCount = 14;
  const progressPercent = Math.round((currentQNum / totalQCount) * 100);

  // Remaining time estimate calculation: ~8s per question
  const remainingQuestions = totalQCount - currentQNum;
  const remainingSecs = Math.max(15, remainingQuestions * 8);
  const remainingMinutes = Math.floor(remainingSecs / 60);
  const remainingSecsMod = remainingSecs % 60;
  const timeEstString = remainingMinutes > 0
    ? `~${remainingMinutes}m ${remainingSecsMod}s left`
    : `~${remainingSecs}s left`;

  // Selected values helper
  const isSelected = (val: string): boolean => {
    if (!selectedAnswer) return false;
    if (Array.isArray(selectedAnswer)) {
      return selectedAnswer.includes(val);
    }
    return selectedAnswer === val;
  };

  const selectedArray = Array.isArray(selectedAnswer) ? selectedAnswer : (selectedAnswer ? [selectedAnswer] : []);
  const selectedCount = selectedArray.length;
  const maxLimit = question.maxSelect || 0;
  const isMaxReached = maxLimit > 0 && selectedCount >= maxLimit;

  // Determine if "Other" is currently selected
  const isOtherActive = isSelected("Other");

  return (
    <div className="flex flex-col w-full pb-28 pt-2">
      {/* Kinetic Progress Header Tracker Card matching Stitch screen */}
      <div className="bg-[#f2f3ff] dark:bg-slate-800/80 rounded-2xl p-4 shadow-sm border border-[#eaedff] dark:border-slate-800 relative overflow-hidden mb-5">
        <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-[#ffdcc3] dark:bg-amber-900/30 opacity-40 blur-xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-[#dc2626] text-white font-bold text-[10px] uppercase tracking-wider shadow-sm">
                DROP QUESTION {String(currentQNum).padStart(2, '0')} OF {totalQCount}
              </span>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {timeEstString}
              </span>
            </div>
            <span className="font-['Sora',sans-serif] text-base font-bold text-[#dc2626]">
              {progressPercent}%
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-[#eaedff] dark:bg-slate-700 overflow-hidden">
            <div
              className="h-full bg-[#dc2626] rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(220,38,38,0.4)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-slate-500 text-[11px] font-medium">
            <span className="flex items-center gap-1 truncate max-w-[280px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00825a] shrink-0"></span>
              <span className="truncate">{college || district} Cohort</span>
            </span>
            <span className="text-[#fe932c] font-bold uppercase tracking-wider shrink-0">
              ASSAM DROP SZN
            </span>
          </div>
        </div>
      </div>

      {/* Question Header & Prompt */}
      <div className="flex flex-col gap-1.5 mb-4">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="px-2 py-0.5 rounded-md bg-[#ffdcc3] dark:bg-amber-950/50 text-[#663500] dark:text-amber-200 text-[10px] font-bold uppercase tracking-wide">
            Q{currentQNum} • {question.category}
          </span>
          {question.required ? (
            <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
              <Check className="w-3 h-3 text-[#00825a]" /> Required
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold uppercase">
              Optional
            </span>
          )}
        </div>

        <h2 className="font-['Sora',sans-serif] text-lg sm:text-xl font-bold text-[#131b2e] dark:text-white leading-snug">
          {question.label}
        </h2>

        {question.subtitle && (
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {question.subtitle}
          </p>
        )}
      </div>

      {/* Validation Error Banner */}
      {validationError && (
        <div className="p-3 mb-4 rounded-xl bg-[#ffdad6] text-[#93000a] text-xs font-bold flex items-center gap-2 animate-shake">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* VARIANT 1: Multi-Limit Chips (Q7: Max 3) */}
      {question.type === 'multi-limit' && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Select your non-negotiables:</span>
            <div
              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-all ${
                isMaxReached
                  ? 'bg-[#fe932c] text-[#2f1500] animate-pulse shadow-sm'
                  : 'bg-[#ffdcc3] text-[#663500]'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>
                {selectedCount} of {maxLimit} selected {isMaxReached ? '(Limit reached)' : ''}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {(question.options || []).map((opt) => {
              const optVal = typeof opt === 'string' ? opt : opt.value;
              const optLabel = typeof opt === 'string' ? opt : opt.label;
              const active = isSelected(optVal);
              const disabled = !active && isMaxReached;

              return (
                <button
                  key={optVal}
                  type="button"
                  onClick={() => onToggleMultiChip(optVal)}
                  disabled={disabled}
                  className={`h-12 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all text-left ${
                    active
                      ? 'bg-[#00825a] text-white ring-2 ring-[#85f8c4] active:scale-95'
                      : disabled
                      ? 'bg-slate-100 dark:bg-slate-800/40 text-slate-400 dark:text-slate-600 opacity-45 cursor-not-allowed'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-[#eaedff] dark:hover:bg-slate-700 active:scale-95'
                  }`}
                >
                  {active ? (
                    <CheckCircle2 className="w-4 h-4 text-[#85f8c4] shrink-0" />
                  ) : (
                    <PlusCircle className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <span>{optLabel}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* VARIANT 2: Multi-Select Chips (e.g. Q3, Q9) */}
      {question.type === 'multi-chip' && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2.5">
            {(question.options || []).map((opt) => {
              const optVal = typeof opt === 'string' ? opt : opt.value;
              const optLabel = typeof opt === 'string' ? opt : opt.label;
              const active = isSelected(optVal);

              return (
                <button
                  key={optVal}
                  type="button"
                  onClick={() => onToggleMultiChip(optVal)}
                  className={`h-12 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all text-left ${
                    active
                      ? 'bg-[#dc2626] text-white ring-2 ring-[#ffdad6] active:scale-95'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-[#eaedff] dark:hover:bg-slate-700 active:scale-95 border border-slate-100 dark:border-slate-800'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 ${
                      active
                        ? 'bg-white text-[#dc2626]'
                        : 'bg-slate-100 dark:bg-slate-700 text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span>{optLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Expanded conditional text input for 'Other' */}
          {question.allowOther && isOtherActive && (
            <div className="mt-2 bg-[#f2f3ff] dark:bg-slate-800/80 rounded-xl p-3.5 shadow-sm border border-[#eaedff] dark:border-slate-700 transition-all duration-300">
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="other-input-field" className="text-[11px] uppercase tracking-wider text-[#fe932c] font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Custom Item Concept</span>
                </label>
                {otherText.trim() && (
                  <span className="text-[10px] text-[#00825a] font-bold flex items-center gap-0.5">
                    <Check className="w-3 h-3" /> Recorded
                  </span>
                )}
              </div>
              <input
                id="other-input-field"
                type="text"
                autoFocus
                value={otherText}
                onChange={(e) => onOtherTextChange(e.target.value)}
                placeholder={question.otherPlaceholder || "Specify your concept..."}
                className="w-full h-11 px-3.5 rounded-lg bg-white dark:bg-slate-900 text-sm text-[#131b2e] dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
              />
            </div>
          )}
        </div>
      )}

      {/* VARIANT 3: Single-Select Cards (e.g. Q1, Q2, Q4, Q5, Q6, Q8, Q10, Q12, Q13, Q14) */}
      {question.type === 'single-card' && (
        <div className="flex flex-col gap-3">
          {/* If Q6 price selector, show stylish 2-column cards matching Stitch design */}
          <div className={question.id === 'q6' ? 'grid grid-cols-2 gap-2.5' : 'flex flex-col gap-2.5'}>
            {(question.options || []).map((opt) => {
              const optObj: QuestionOption = typeof opt === 'string'
                ? { value: opt, label: opt }
                : opt;
              const active = isSelected(optObj.value);

              return (
                <button
                  key={optObj.value}
                  type="button"
                  onClick={() => onSelectOption(optObj.value)}
                  className={`group relative flex flex-col p-3.5 rounded-xl shadow-sm text-left transition-all overflow-hidden ${
                    active
                      ? 'bg-[#ffdad6] dark:bg-red-950/60 border-2 border-[#dc2626] text-[#410002] dark:text-red-100 shadow-md'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-[#eaedff] dark:hover:bg-slate-700/80 border border-slate-100 dark:border-slate-800'
                  }`}
                >
                  {/* Badge sticker */}
                  {optObj.badge && (
                    <div className="absolute top-0 right-0 bg-[#dc2626] text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-bl-lg shadow-sm flex items-center gap-0.5">
                      {optObj.isPopular && <Flame className="w-2.5 h-2.5" />}
                      <span>{optObj.badge}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-['Sora',sans-serif] text-sm sm:text-base font-bold text-[#131b2e] dark:text-white group-hover:text-[#dc2626] transition-colors pr-6">
                      {optObj.label}
                    </span>
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        active
                          ? 'bg-[#dc2626] text-white'
                          : 'bg-[#eaedff] dark:bg-slate-700 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  </div>

                  {optObj.subtext && (
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
                      {optObj.subtext}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Conditional "Other" text input for single-select questions with allowOther */}
          {question.allowOther && isOtherActive && (
            <div className="mt-1 bg-[#f2f3ff] dark:bg-slate-800/80 rounded-xl p-3.5 shadow-sm border border-[#eaedff] dark:border-slate-700">
              <label htmlFor="card-other-field" className="text-[11px] uppercase tracking-wider text-[#fe932c] font-bold block mb-1.5">
                Please specify your idea:
              </label>
              <input
                id="card-other-field"
                type="text"
                autoFocus
                value={otherText}
                onChange={(e) => onOtherTextChange(e.target.value)}
                placeholder={question.otherPlaceholder || "Type details..."}
                className="w-full h-11 px-3.5 rounded-lg bg-white dark:bg-slate-900 text-sm text-[#131b2e] dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
              />
            </div>
          )}
        </div>
      )}

      {/* VARIANT 4: Long Text Open-Ended (Q11) */}
      {question.type === 'long-text' && (
        <div className="flex flex-col gap-2">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-[#eaedff] dark:border-slate-800 flex flex-col gap-2">
            <textarea
              id="streetwear-feedback-textarea"
              rows={5}
              maxLength={question.maxChars || 500}
              value={otherText}
              onChange={(e) => onOtherTextChange(e.target.value)}
              placeholder="e.g. Clean boxy oversized cut, 260 GSM textured cotton, subtle Assamese Gamosa red geometric weave patch on the sleeve, and puff-printed campus crest on the back..."
              className="w-full p-2 bg-transparent text-sm sm:text-base text-[#131b2e] dark:text-white placeholder:text-slate-400 focus:outline-none resize-none leading-relaxed"
            />
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-500">
              <span>500 characters max</span>
              <span className={`font-mono font-bold ${otherText.length > 450 ? 'text-[#dc2626]' : ''}`}>
                {otherText.length} / {question.maxChars || 500}
              </span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 flex items-center gap-1 px-1">
            <Sparkles className="w-3.5 h-3.5 text-[#fe932c]" />
            <span>Student ideas are reviewed directly by our Assam campus design team.</span>
          </p>
        </div>
      )}
    </div>
  );
};
