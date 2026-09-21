import React from 'react';
import { ArrowLeft, Wifi, Code2, Moon, Sun, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { StepKey } from '../types';

interface HeaderProps {
  currentStep: StepKey;
  stepProgressPercent: number;
  onBack: () => void;
  onOpenGuide: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  stepProgressPercent,
  onBack,
  onOpenGuide,
  isDarkMode,
  onToggleDarkMode
}) => {
  const isLanding = currentStep === 'landing';
  const isSuccess = currentStep === 'success';

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#faf8ff]/90 dark:bg-[#131b2e]/90 backdrop-blur-xl border-b border-[#eaedff] dark:border-slate-800 transition-colors">
      {/* Micro ticker banner */}
      <div className="bg-[#131b2e] dark:bg-black text-slate-100 px-4 py-1 flex items-center justify-between text-[11px] font-bold tracking-wide">
        <div className="flex items-center gap-1.5 truncate">
          <span className="w-2 h-2 rounded-full bg-[#fe932c] animate-pulse"></span>
          <span className="uppercase tracking-wider text-[#ffdcc3] text-[10px]">Live Pulse</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300 truncate">35 Assam Districts Active</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 text-[#85f8c4] text-[10px] uppercase font-bold tracking-wider">
            <Wifi className="w-3 h-3 text-[#68dba9]" />
            <span>Offline Ready</span>
          </div>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="h-16 px-4 flex items-center justify-between max-w-[560px] mx-auto w-full">
        <div className="flex items-center gap-2.5">
          {!isLanding && !isSuccess ? (
            <button
              id="header-back-btn"
              type="button"
              onClick={onBack}
              aria-label="Go Back to previous step"
              className="w-10 h-10 rounded-xl bg-[#eaedff] dark:bg-slate-800 text-[#131b2e] dark:text-slate-100 flex items-center justify-center hover:bg-[#dae2fd] dark:hover:bg-slate-700 active:scale-95 transition-all shadow-sm"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : null}

          <BrandLogo size="md" showText={true} />
        </div>

        <div className="flex items-center gap-2">
          {/* Google Sheets Backend Guide / Setup Pill */}
          <button
            id="backend-guide-btn"
            type="button"
            onClick={onOpenGuide}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#eaedff] dark:bg-slate-800 text-[#131b2e] dark:text-slate-100 hover:bg-[#dae2fd] dark:hover:bg-slate-700 text-xs font-semibold shadow-sm transition-all"
            title="Google Sheets & Apps Script Setup Guide"
          >
            <Code2 className="w-3.5 h-3.5 text-[#dc2626]" />
            <span className="hidden sm:inline">Sheets Setup</span>
            <span className="sm:hidden">Sheets</span>
          </button>

          {/* Theme mode toggle */}
          <button
            id="theme-toggle-btn"
            type="button"
            onClick={onToggleDarkMode}
            aria-label="Toggle dark mode"
            className="w-9 h-9 rounded-full bg-[#eaedff] dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-[#dae2fd] active:scale-95 transition-all"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-[#fe932c]" /> : <Moon className="w-4 h-4 text-[#131b2e]" />}
          </button>
        </div>
      </div>

      {/* Dynamic continuous progress bar underneath header */}
      {!isLanding && (
        <div className="w-full h-1 bg-[#eaedff] dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#dc2626] via-[#fe932c] to-[#00825a] rounded-r-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(220,38,38,0.3)]"
            style={{ width: `${Math.min(100, Math.max(4, stepProgressPercent))}%` }}
          />
        </div>
      )}
    </header>
  );
};
