import React from 'react';
import { Zap, MapPin, Users, Sparkles, Truck, Flame, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { AssameseWeaveDivider } from './BrandLogo';
import { StoredSubmissionMeta } from '../utils/antiSpam';

interface LandingViewProps {
  onStart: () => void;
  priorSubmission: StoredSubmissionMeta | null;
}

export const LandingView: React.FC<LandingViewProps> = ({ onStart, priorSubmission }) => {
  return (
    <div className="flex flex-col w-full pb-28 pt-2">
      {/* Gentle alert if already submitted on this device */}
      {priorSubmission && (
        <div className="mb-4 p-3.5 rounded-2xl bg-[#ffdcc3] dark:bg-amber-950/40 border border-[#fe932c]/30 text-[#663500] dark:text-amber-200 flex items-start gap-3 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-[#fe932c] shrink-0 mt-0.5" />
          <div className="flex-1 text-xs leading-relaxed">
            <p className="font-bold">Prior Ballot Recorded!</p>
            <p>
              Your campus vote from <strong className="underline">{priorSubmission.college}</strong> ({priorSubmission.district}) is securely saved. You may cast another response for a friend or classmate.
            </p>
          </div>
        </div>
      )}

      {/* Live District & Velocity Badges */}
      <section className="flex flex-col gap-2 mb-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdcc3] dark:bg-amber-900/40 text-[#2f1500] dark:text-amber-200 shadow-sm text-xs font-bold">
            <Zap className="w-3.5 h-3.5 text-[#fe932c] fill-current" />
            <span>Takes under 2 mins</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaedff] dark:bg-slate-800 text-[#131b2e] dark:text-slate-100 shadow-sm text-xs font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00825a] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00825a]"></span>
            </span>
            <span>2,480+ student votes</span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#f2f3ff] dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs">
          <MapPin className="w-4 h-4 text-[#dc2626] shrink-0" />
          <span className="truncate">
            Campus reps live across <strong className="text-[#131b2e] dark:text-white font-bold">all 35 districts</strong> of Assam
          </span>
        </div>
      </section>

      {/* Editorial Streetwear Hero */}
      <section className="flex flex-col mb-5">
        <div className="relative mb-2">
          <h1 className="font-['Sora',sans-serif] font-extrabold text-3xl sm:text-4xl text-[#131b2e] dark:text-white leading-[1.15] tracking-tight">
            Would you wear your{' '}
            <span className="bg-gradient-to-r from-[#dc2626] via-[#fe932c] to-[#00825a] bg-clip-text text-transparent underline decoration-[#dc2626]/30 decoration-wavy">
              college
            </span>
            ?
          </h1>
          <div className="w-14 h-1.5 bg-[#dc2626] rounded-full mt-2.5"></div>
        </div>
        <p className="font-['Plus_Jakarta_Sans',sans-serif] text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Help co-create Assam’s first streetwear-grade college apparel. Drop your honest takes, shape the oversized fit, and unlock early secret drop access for your campus.
        </p>
      </section>

      {/* Streetwear Drop Lookbook Card */}
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-md border border-[#eaedff] dark:border-slate-800 overflow-hidden mb-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#93000b] text-[10px] font-extrabold uppercase tracking-wider">
              Sample Drop 001
            </span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              GAU • DIB • SIL
            </span>
          </div>
          <span className="text-xs font-bold text-[#006646] dark:text-[#85f8c4] bg-[#e1ffec] dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
            Heavy 280 GSM
          </span>
        </div>

        {/* Product Visual Container with Assamese streetwear mockup */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3 shadow-inner">
          <div className="w-full h-full bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#131b2e] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            {/* Subtle Jaapi background pattern decoration */}
            <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full border-8 border-dashed border-[#fe932c]"></div>
            </div>

            {/* Streetwear T-shirt Silhouette Graphic */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-28 h-24 bg-gradient-to-b from-slate-700 to-slate-900 rounded-t-2xl shadow-xl flex items-center justify-center border-t-2 border-[#dc2626] relative">
                {/* Traditional Gamosa red geometric weave strip accent on collar */}
                <div className="absolute top-0 inset-x-3 h-1.5 bg-[#dc2626] flex items-center justify-around px-1">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-[#fe932c] rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
                <div className="text-center px-2">
                  <span className="text-[11px] font-['Sora',sans-serif] font-extrabold text-[#ffdcc3] tracking-widest uppercase block">
                    COTTONIAN
                  </span>
                  <span className="text-[8px] text-slate-400 font-mono tracking-tighter">
                    EST. 1901 • GUWAHATI
                  </span>
                </div>
              </div>
              <div className="w-36 h-3 bg-slate-800/80 rounded-full blur-[2px] mt-2"></div>
            </div>

            {/* Overlay stickers */}
            <div className="absolute bottom-3 left-3 flex flex-col items-start gap-1">
              <span className="px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-sm text-white font-['Sora',sans-serif] font-bold text-xs shadow-md">
                Boxy Fit
              </span>
              <span className="px-2 py-0.5 rounded bg-[#dc2626] text-white text-[9px] font-extrabold tracking-wider uppercase shadow-sm">
                Unisex Cut
              </span>
            </div>

            {/* Cultural Micro Weave Tag */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 shadow-md backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse"></div>
              <span className="text-[10px] text-[#131b2e] dark:text-white font-extrabold uppercase tracking-wide">
                Gamosa Hemline
              </span>
            </div>
          </div>
        </div>

        {/* Drop Details & Swatches */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col">
            <span className="font-['Sora',sans-serif] text-sm font-bold text-[#131b2e] dark:text-white">
              Brahmaputra Acid Wash Series
            </span>
            <span className="text-xs text-slate-500">
              Guwahati, Jorhat & Dibrugarh Campus Batch
            </span>
          </div>
          <div className="flex items-center gap-1.5" aria-label="Color options preview">
            <span className="w-5 h-5 rounded-full bg-slate-300 border border-white shadow-sm" title="Mist Grey"></span>
            <span className="w-5 h-5 rounded-full bg-[#dc2626] border border-white shadow-sm" title="Scarlet Red"></span>
            <span className="w-5 h-5 rounded-full bg-slate-900 border border-white shadow-sm" title="Carbon Black"></span>
          </div>
        </div>
      </div>

      {/* Micro Value Props / Trust Grid */}
      <section className="grid grid-cols-3 gap-2.5 mb-6">
        <div className="flex flex-col items-center text-center p-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 shadow-sm border border-[#eaedff] dark:border-slate-800">
          <Users className="w-5 h-5 text-[#dc2626] mb-1" />
          <span className="text-xs font-bold text-[#131b2e] dark:text-white">100% Student</span>
          <span className="text-[10px] text-slate-500 mt-0.5">Designed by peers</span>
        </div>
        <div className="flex flex-col items-center text-center p-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 shadow-sm border border-[#eaedff] dark:border-slate-800">
          <Sparkles className="w-5 h-5 text-[#fe932c] mb-1" />
          <span className="text-xs font-bold text-[#131b2e] dark:text-white">No Boring Form</span>
          <span className="text-[10px] text-slate-500 mt-0.5">Fast streetwear voting</span>
        </div>
        <div className="flex flex-col items-center text-center p-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800 shadow-sm border border-[#eaedff] dark:border-slate-800">
          <Truck className="w-5 h-5 text-[#00825a] mb-1" />
          <span className="text-xs font-bold text-[#131b2e] dark:text-white">Campus Drop</span>
          <span className="text-[10px] text-slate-500 mt-0.5">Free gate desk pickup</span>
        </div>
      </section>

      {/* Assamese motif accent divider */}
      <AssameseWeaveDivider />

      {/* Recent Student Whispers Carousel / Live Feed */}
      <section className="flex flex-col gap-2.5 mb-6">
        <div className="flex items-center justify-between">
          <span className="font-['Sora',sans-serif] text-sm font-bold text-[#131b2e] dark:text-white flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-[#fe932c]" />
            <span>Campus Whispers</span>
          </span>
          <span className="text-[10px] text-[#dc2626] uppercase font-bold tracking-wider bg-[#ffdad6] dark:bg-red-950/40 px-2 py-0.5 rounded-full">
            Live Feed
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800/60 border border-[#eaedff] dark:border-slate-800">
            <div className="w-8 h-8 rounded-full bg-[#ffdad6] text-[#93000b] flex items-center justify-center font-bold text-xs shrink-0">
              AC
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#131b2e] dark:text-white">Cotton University, Panbazar</span>
                <span className="text-[10px] text-slate-400">4m ago</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 line-clamp-2">
                “Please don't give us generic synthetic fests tees. We want heavyweight 240+ GSM with Assamese typography!”
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f2f3ff] dark:bg-slate-800/60 border border-[#eaedff] dark:border-slate-800">
            <div className="w-8 h-8 rounded-full bg-[#ffdcc3] text-[#663500] flex items-center justify-center font-bold text-xs shrink-0">
              RD
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#131b2e] dark:text-white">Dibrugarh University</span>
                <span className="text-[10px] text-slate-400">12m ago</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 line-clamp-2">
                “Need an oversized fit that doesn’t shrink in tea garden mist or rain. Gamosa patch idea is incredible.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Primary CTA button */}
      <button
        id="landing-start-btn"
        type="button"
        onClick={onStart}
        className="w-full h-14 rounded-2xl bg-[#dc2626] hover:bg-[#b70011] text-white font-['Sora',sans-serif] font-bold text-base flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(220,38,38,0.35)] active:scale-[0.98] transition-all"
      >
        <span>Rep Your College & Start Vote</span>
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Short Privacy Note */}
      <div className="mt-4 flex items-center justify-center gap-1.5 text-slate-500 text-xs text-center">
        <ShieldCheck className="w-4 h-4 text-[#00825a]" />
        <span>Responses are anonymous and used only for market research.</span>
      </div>
    </div>
  );
};
