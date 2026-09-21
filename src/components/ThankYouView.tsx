import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Check, Gift, Copy, CheckCheck, Share2, Send, Map, RotateCcw, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface ThankYouViewProps {
  sessionId: string;
  district: string;
  college: string;
  onReset: () => void;
  onOpenHeatmap: () => void;
}

export const ThankYouView: React.FC<ThankYouViewProps> = ({
  sessionId,
  district,
  college,
  onReset,
  onOpenHeatmap
}) => {
  const [copiedPass, setCopiedPass] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Digital street pass ID formatting: e.g. #AS-2026-KAMRUP-8842
  const formattedPassId = sessionId.startsWith("#")
    ? sessionId
    : `#AS-2026-${district ? district.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 6) : "DROP"}-${sessionId.slice(-4)}`;

  // Launch confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#dc2626', '#fe932c', '#00825a', '#ffdcc3', '#dae2fd']
      });

      // Second gentle wave after 400ms
      const t = setTimeout(() => {
        confetti({
          particleCount: 40,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#dc2626', '#fe932c']
        });
        confetti({
          particleCount: 40,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#00825a', '#fe932c']
        });
      }, 400);

      return () => clearTimeout(t);
    } catch {
      // ignore
    }
  }, []);

  const handleCopyPass = () => {
    try {
      navigator.clipboard.writeText(formattedPassId);
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleCopyLink = () => {
    try {
      const url = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : "";
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleShareWhatsApp = () => {
    const url = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : "";
    const msg = encodeURIComponent(`Vote for our college (${college}) in the Assam Campus Streetwear Merch Drop! First 500 students get 20% off: ${url}`);
    window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
  };

  const handleShareTelegram = () => {
    const url = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : "";
    const msg = encodeURIComponent(`Vote now for ${college} in the Assam Campus Merch Drops!`);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${msg}`, '_blank');
  };

  return (
    <div className="flex flex-col w-full pb-20 pt-2 space-y-4">
      {/* Animated Check Header */}
      <div className="relative flex flex-col items-center text-center pt-2 px-1">
        <div className="relative flex items-center justify-center mb-3">
          <div className="absolute w-24 h-24 rounded-full bg-[#fe932c]/20 animate-ping" style={{ animationDuration: '3s' }} />
          <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-900 shadow-[0_8px_30px_rgba(254,147,44,0.35)] flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#00825a] flex items-center justify-center text-white shadow-inner">
              <Check className="w-9 h-9 stroke-[3]" />
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdcc3] dark:bg-amber-950/60 text-[#663500] dark:text-amber-200 text-[11px] font-bold tracking-widest uppercase mb-2 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#fe932c]"></span>
          <span>Response Recorded!</span>
        </div>

        <h2 className="font-['Sora',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#131b2e] dark:text-white tracking-tight leading-tight max-w-sm mb-2">
          You just put your campus on the merch map! 🔥
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm px-2 leading-relaxed">
          Thank you! Your inputs are directly helping build Assam’s first streetwear-grade college merchandise collection. <strong className="text-[#131b2e] dark:text-white">{college}</strong> and campuses across {district} are climbing the vote tallies.
        </p>
      </div>

      {/* Perks Unlocked Card matching Stitch screen */}
      <div className="relative w-full rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-[0_4px_24px_rgba(19,27,46,0.06)] border border-[#eaedff] dark:border-slate-800 overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[#ffdad6]/40 pointer-events-none blur-xl"></div>
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#dc2626] via-[#fe932c] to-[#00825a]"></div>

        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[#ffdcc3] text-[#663500] flex items-center justify-center">
              <Gift className="w-4 h-4" />
            </span>
            <span className="font-['Sora',sans-serif] text-sm font-bold text-[#131b2e] dark:text-white">
              Perks Unlocked
            </span>
          </div>
          <span className="text-[10px] uppercase px-2.5 py-0.5 rounded-full bg-[#85f8c4] text-[#005137] font-bold tracking-wide">
            Drop Pass #01
          </span>
        </div>

        <div className="rounded-xl bg-[#f2f3ff] dark:bg-slate-800 p-3 mb-3.5 text-xs text-slate-700 dark:text-slate-200">
          🎁 <strong className="text-[#dc2626] font-bold">Early Bird Perks:</strong> First 500 respondents get <span className="bg-[#00825a] text-white px-1.5 py-0.5 rounded font-bold">20% off</span> when the first drop goes live for your campus.
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[10px] uppercase font-bold text-slate-500">
            <span>Your Digital Street Pass ID</span>
            <span className="text-[#00825a] flex items-center gap-0.5 font-bold">
              <Sparkles className="w-3 h-3" /> Verified Student
            </span>
          </div>

          <div className="flex items-center justify-between bg-[#eaedff] dark:bg-slate-800 px-3.5 py-2.5 rounded-xl">
            <span className="font-mono font-bold text-sm tracking-wider text-[#131b2e] dark:text-white select-all">
              {formattedPassId}
            </span>
            <button
              id="copy-pass-id-btn"
              type="button"
              onClick={handleCopyPass}
              className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center active:scale-95 shadow-sm transition-all"
              title="Copy Digital Street Pass ID"
            >
              {copiedPass ? <CheckCheck className="w-4 h-4 text-[#00825a]" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Batchmate Momentum Share Card */}
      <div className="w-full rounded-2xl bg-[#f2f3ff] dark:bg-slate-800/60 p-4 border border-[#eaedff] dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-['Sora',sans-serif] text-xs font-bold text-[#131b2e] dark:text-white">
            Batchmate Momentum
          </span>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-900 text-[10px] font-bold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#00825a] animate-ping"></span>
            <span>142 students joined</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          Unlock custom oversized hoodies faster for your campus by sharing the drop ballot with your department and batch WhatsApp groups.
        </p>

        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            id="share-whatsapp-btn"
            type="button"
            onClick={handleShareWhatsApp}
            className="h-11 rounded-xl bg-[#00825a] hover:bg-[#006646] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>

          <button
            id="share-telegram-btn"
            type="button"
            onClick={handleShareTelegram}
            className="h-11 rounded-xl bg-[#283044] hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Telegram</span>
          </button>

          <button
            id="share-copy-link-btn"
            type="button"
            onClick={handleCopyLink}
            className="h-11 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-600 active:scale-95 transition-all"
          >
            {copiedLink ? <CheckCheck className="w-4 h-4 text-[#00825a]" /> : <Share2 className="w-4 h-4" />}
            <span>{copiedLink ? "Copied!" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 pt-1">
        <button
          id="view-district-heatmap-btn"
          type="button"
          onClick={onOpenHeatmap}
          className="w-full h-12 py-3 px-4 rounded-xl bg-[#eaedff] dark:bg-slate-800 text-[#131b2e] dark:text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#dae2fd] dark:hover:bg-slate-700 active:scale-[0.99] transition-all"
        >
          <Map className="w-4 h-4 text-[#fe932c]" />
          <span>View Live District Heatmap (35 Districts)</span>
        </button>

        <button
          id="submit-another-friend-btn"
          type="button"
          onClick={onReset}
          className="w-full py-2.5 text-center text-xs font-semibold text-slate-500 hover:text-[#dc2626] transition-colors flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Submit Another Response for a Friend</span>
        </button>
      </div>

      {/* Footer Branding */}
      <div className="pt-3 flex flex-col items-center justify-center text-center gap-2">
        <BrandLogo size="lg" showText={false} />
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5">
            <span className="font-['Sora',sans-serif] font-bold text-sm text-[#131b2e] dark:text-white">RespondR</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#ffdad6] text-[#93000b] uppercase font-bold">Assam</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-0.5">
            Culture • Identity • Streetwear
          </p>
        </div>
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#eaedff] dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px]">
          <Heart className="w-3 h-3 text-[#dc2626] fill-current" />
          <span>Crafted for Cottonians, AECians, & Assam Youth</span>
        </div>
      </div>
    </div>
  );
};
