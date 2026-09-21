import React from 'react';
import { ChevronLeft, ArrowRight, Loader2, CheckCircle } from 'lucide-react';

interface FooterNavProps {
  onBack: () => void;
  onNext: () => void;
  canGoBack?: boolean;
  nextLabel?: string;
  isNextDisabled?: boolean;
  isLoading?: boolean;
  validationError?: string | null;
}

export const FooterNav: React.FC<FooterNavProps> = ({
  onBack,
  onNext,
  canGoBack = true,
  nextLabel = "Continue Drop Vote",
  isNextDisabled = false,
  isLoading = false,
  validationError
}) => {
  return (
    <aside className="fixed bottom-0 inset-x-0 z-40 bg-[#faf8ff]/95 dark:bg-[#131b2e]/95 backdrop-blur-xl border-t border-[#eaedff] dark:border-slate-800 shadow-[0_-4px_24px_rgba(19,27,46,0.06)] pb-safe">
      <div className="max-w-[560px] mx-auto px-4 py-3 flex flex-col gap-1.5">
        {/* Validation error hint badge */}
        {validationError && (
          <div className="text-center text-xs font-semibold text-[#ba1a1a] bg-[#ffdad6] px-3 py-1 rounded-full animate-bounce">
            ⚠️ {validationError}
          </div>
        )}

        <div className="h-14 flex items-center gap-2.5">
          {canGoBack && (
            <button
              id="footer-back-btn"
              type="button"
              onClick={onBack}
              disabled={isLoading}
              className="h-13 px-4 rounded-full bg-[#eaedff] dark:bg-slate-800 text-[#131b2e] dark:text-slate-100 font-bold text-sm flex items-center justify-center gap-1 hover:bg-[#dae2fd] dark:hover:bg-slate-700 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          )}

          <button
            id="footer-next-btn"
            type="button"
            onClick={onNext}
            disabled={isLoading || isNextDisabled}
            className={`flex-1 h-13 px-6 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(220,38,38,0.28)] transition-all ${
              isNextDisabled
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none'
                : 'bg-[#dc2626] hover:bg-[#b70011] text-white active:scale-[0.98]'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Recording Drop Vote...</span>
              </>
            ) : (
              <>
                <span>{nextLabel}</span>
                {nextLabel.includes("Submit") ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <ArrowRight className="w-5 h-5" />
                )}
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};
