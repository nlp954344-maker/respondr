import React, { useState } from 'react';
import { X, Search, Flame, MapPin } from 'lucide-react';
import { ASSAM_DISTRICTS } from '../data/colleges';

interface HeatmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  userDistrict?: string;
}

// Seed realistic trending votes across the 35 districts of Assam
const DISTRICT_VOTE_WEIGHTS: Record<string, number> = {
  "Kamrup Metropolitan": 1420,
  "Dibrugarh": 890,
  "Jorhat": 780,
  "Cachar": 650,
  "Sonitpur": 610,
  "Nagaon": 540,
  "Kamrup": 510,
  "Barpeta": 430,
  "Sivasagar": 410,
  "Tinsukia": 390,
  "Bongaigaon": 340,
  "Golaghat": 320,
  "Lakhimpur": 290,
  "Kokrajhar": 280,
  "Darrang": 260,
  "Nalbari": 250,
  "Morigaon": 230,
  "Karbi Anglong": 210,
  "Dhemaji": 190,
  "Dhubri": 180,
  "Hailakandi": 170,
  "Sribhumi (Karimganj)": 160,
  "Biswanath": 150,
  "Hojai": 140,
  "Goalpara": 130,
  "Charaideo": 120,
  "Baksa": 110,
  "Udalguri": 105,
  "Bajali": 95,
  "Chirang": 85,
  "Tamulpur": 80,
  "Dima Hasao": 75,
  "Majuli": 70,
  "South Salmara-Mankachar": 60,
  "West Karbi Anglong": 55
};

export const HeatmapModal: React.FC<HeatmapModalProps> = ({
  isOpen,
  onClose,
  userDistrict
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const maxVotes = 1420;
  const filtered = ASSAM_DISTRICTS.filter((d) =>
    d.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => (DISTRICT_VOTE_WEIGHTS[b] || 0) - (DISTRICT_VOTE_WEIGHTS[a] || 0));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-[#eaedff] dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-[#f2f3ff] dark:bg-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#dc2626] text-white flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-['Sora',sans-serif] text-sm font-bold text-[#131b2e] dark:text-white">
                Assam 35-District Heatmap
              </h3>
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">
                Live Merch Calibration
              </span>
            </div>
          </div>
          <button
            id="close-heatmap-btn"
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-200 flex items-center justify-center hover:bg-slate-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search bar */}
        <div className="p-3 border-b border-slate-100 dark:border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              id="heatmap-search-input"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search district e.g. Kamrup, Dibrugarh..."
              className="w-full h-10 pl-9 pr-3 rounded-xl bg-[#eaedff] dark:bg-slate-800 text-xs text-[#131b2e] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
            />
          </div>
        </div>

        {/* District list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filtered.map((dist, idx) => {
            const votes = DISTRICT_VOTE_WEIGHTS[dist] || 50;
            const pct = Math.round((votes / maxVotes) * 100);
            const isUser = userDistrict === dist;

            return (
              <div
                key={dist}
                className={`p-3 rounded-xl border transition-all ${
                  isUser
                    ? 'bg-[#ffdad6]/40 dark:bg-red-950/30 border-[#dc2626]'
                    : 'bg-[#faf8ff] dark:bg-slate-800/50 border-slate-100 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-[10px] font-mono text-slate-400 font-bold w-5">
                      #{idx + 1}
                    </span>
                    <MapPin className={`w-3.5 h-3.5 shrink-0 ${isUser ? 'text-[#dc2626]' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold text-[#131b2e] dark:text-white truncate">
                      {dist}
                    </span>
                    {isUser && (
                      <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-[#dc2626] text-white font-extrabold">
                        Your District
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    {votes.toLocaleString()} votes
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      idx < 3 ? 'bg-[#dc2626]' : idx < 8 ? 'bg-[#fe932c]' : 'bg-[#00825a]'
                    }`}
                    style={{ width: `${Math.max(5, pct)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#f2f3ff] dark:bg-slate-800 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-[11px] text-slate-500">
            Top 5 voting districts receive early-bird physical drop pop-ups during youth festival season.
          </p>
        </div>
      </div>
    </div>
  );
};
