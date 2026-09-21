import React, { useState, useMemo, useEffect } from 'react';
import { MapPin, School, Search, Check, ChevronDown, Sparkles, X, AlertCircle } from 'lucide-react';
import { ASSAM_DISTRICTS, DISTRICT_COLLEGES, CUSTOM_COLLEGE_OPTION } from '../data/colleges';

interface Step0CampusProps {
  district: string;
  college: string;
  customCollege: string;
  isCustomCollege: boolean;
  onDistrictChange: (district: string) => void;
  onCollegeSelect: (college: string, isCustom: boolean) => void;
  onCustomCollegeChange: (name: string) => void;
  error?: string | null;
}

export const Step0Campus: React.FC<Step0CampusProps> = ({
  district,
  college,
  customCollege,
  isCustomCollege,
  onDistrictChange,
  onCollegeSelect,
  onCustomCollegeChange,
  error
}) => {
  const [searchTerm, setSearchTerm] = useState(college && !isCustomCollege ? college : '');
  const [showDrawer, setShowDrawer] = useState(true);

  // Sync searchTerm if college changes externally
  useEffect(() => {
    if (!isCustomCollege && college) {
      setSearchTerm(college);
    }
  }, [college, isCustomCollege]);

  // Filter colleges for the selected district based on search query
  const districtColleges = useMemo(() => {
    const list = DISTRICT_COLLEGES[district] || [];
    if (!searchTerm.trim() || searchTerm === college) {
      return list;
    }
    const query = searchTerm.toLowerCase();
    return list.filter((c) => c.toLowerCase().includes(query));
  }, [district, searchTerm, college]);

  const handleDistrictSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDistrict = e.target.value;
    onDistrictChange(newDistrict);
    // Reset college search when changing district
    setSearchTerm('');
    onCollegeSelect('', false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    setShowDrawer(true);
    if (isCustomCollege) {
      onCollegeSelect('', false);
    }
  };

  const handlePickCollege = (colName: string) => {
    setSearchTerm(colName);
    onCollegeSelect(colName, false);
  };

  const handlePickCustom = () => {
    onCollegeSelect(CUSTOM_COLLEGE_OPTION, true);
    setSearchTerm(CUSTOM_COLLEGE_OPTION);
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2">
      {/* Progress pill tracker */}
      <div className="mb-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#dc2626]/10 text-[#dc2626] font-bold text-[10px] uppercase tracking-wider">
              Step 0 of 14
            </span>
            <span className="text-slate-500 text-xs font-semibold">Campus Setup</span>
          </div>
          <span className="text-[10px] font-bold text-[#fe932c] uppercase tracking-wider">
            5% Prepared
          </span>
        </div>
        <div className="w-full h-1.5 bg-[#eaedff] dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-[#dc2626] rounded-full w-[5%] transition-all duration-500"></div>
        </div>
      </div>

      {/* Merch Calibration Banner matching Stitch mockup */}
      <div className="relative overflow-hidden rounded-2xl bg-[#f2f3ff] dark:bg-slate-800/80 p-5 mb-5 border border-[#eaedff] dark:border-slate-800 shadow-sm">
        <div className="flex items-start gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center p-2.5 shrink-0 border border-slate-100 dark:border-slate-800">
            {/* Jaapi emblem badge */}
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#dc2626] to-[#fe932c] flex items-center justify-center text-white font-bold text-lg shadow-inner">
              <School className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] uppercase text-[#dc2626] font-extrabold tracking-widest block">
              Merch Calibration
            </span>
            <h2 className="font-['Sora',sans-serif] text-xl font-bold text-[#131b2e] dark:text-white tracking-tight leading-tight mt-0.5">
              First, rep your college
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              Tell us where you study across Assam so we can drop hyper-local streetwear cut for your campus vibe.
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 flex items-center justify-between border-t border-slate-200/60 dark:border-slate-700/60 -mx-5 -mb-5 px-5 py-2.5 bg-white/60 dark:bg-slate-900/40 rounded-b-2xl">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00825a] animate-pulse"></span>
            <span className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">
              Active Drop: Brahmaputra Season 24
            </span>
          </div>
          <span className="text-[10px] uppercase text-[#fe932c] font-bold tracking-wider">
            35 Districts Active
          </span>
        </div>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-5">
        {/* District Field */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="district-select" className="text-xs sm:text-sm font-bold text-[#131b2e] dark:text-white flex items-center gap-1">
              <span>1. District of Assam</span>
              <span className="text-[#dc2626] font-bold">*</span>
            </label>
            <span className="text-[10px] text-[#006646] dark:text-[#85f8c4] uppercase font-bold bg-[#e1ffec] dark:bg-emerald-950/40 px-2 py-0.5 rounded">
              All 35 Verified
            </span>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#dc2626] flex items-center">
              <MapPin className="w-5 h-5" />
            </div>
            <select
              id="district-select"
              value={district}
              onChange={handleDistrictSelect}
              className="w-full h-14 pl-12 pr-10 rounded-2xl bg-[#eaedff] dark:bg-slate-800 text-[#131b2e] dark:text-white text-sm font-semibold appearance-none focus:outline-none focus:ring-2 focus:ring-[#dc2626] transition-all shadow-sm cursor-pointer"
            >
              {ASSAM_DISTRICTS.map((dist) => (
                <option key={dist} value={dist} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
                  {dist}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 flex items-center">
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] uppercase text-slate-500">Hot District Trend:</span>
            <div className="flex items-center gap-1 bg-[#eaedff] dark:bg-slate-800 px-2 py-0.5 rounded-full text-[#fe932c] text-[10px] font-bold">
              <Sparkles className="w-3 h-3" />
              <span>{district} • Active Drops Voted</span>
            </div>
          </div>
        </div>

        {/* College Search & Autocomplete Field */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="college-search-input" className="text-xs sm:text-sm font-bold text-[#131b2e] dark:text-white flex items-center gap-1">
              <span>2. College / University Name</span>
              <span className="text-[#dc2626] font-bold">*</span>
            </label>
            <span className="text-[10px] text-slate-500">Search or pick below</span>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center">
              <Search className="w-5 h-5" />
            </div>
            <input
              id="college-search-input"
              type="text"
              autoComplete="off"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setShowDrawer(true)}
              placeholder={`Start typing your college in ${district}...`}
              className="w-full h-14 pl-12 pr-11 rounded-2xl bg-[#eaedff] dark:bg-slate-800 text-[#131b2e] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#dc2626] transition-all shadow-sm"
            />
            {searchTerm && (
              <button
                id="clear-college-btn"
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  onCollegeSelect('', false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#dae2fd] dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-[#dc2626] hover:text-white transition-colors"
                title="Clear college"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete Drawer */}
          {showDrawer && (
            <div className="flex flex-col gap-1.5 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-[#eaedff] dark:border-slate-800 max-h-56 overflow-y-auto">
              {districtColleges.length > 0 ? (
                districtColleges.map((colName) => {
                  const isSelected = college === colName && !isCustomCollege;
                  return (
                    <button
                      key={colName}
                      type="button"
                      onClick={() => handlePickCollege(colName)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-[#dc2626] text-white shadow-sm'
                          : 'bg-[#f2f3ff] dark:bg-slate-800/60 hover:bg-[#eaedff] dark:hover:bg-slate-800 text-[#131b2e] dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        <School className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                        <span className="text-xs sm:text-sm font-medium truncate">{colName}</span>
                      </div>
                      {isSelected ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded shrink-0">
                          Selected
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 shrink-0">Pick</span>
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="p-3 text-xs text-slate-500 text-center">
                  No preset match for "{searchTerm}" in {district}. Pick option below to type your college manually!
                </div>
              )}

              {/* Always present "My college isn't listed" option as requested */}
              <button
                id="my-college-unlisted-btn"
                type="button"
                onClick={handlePickCustom}
                className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between transition-all border border-dashed ${
                  isCustomCollege
                    ? 'bg-[#fe932c] text-[#2f1500] border-[#fe932c] shadow-sm'
                    : 'bg-[#fff6f5] dark:bg-slate-800/40 border-[#dc2626]/40 text-[#dc2626] dark:text-[#ffb4ab] hover:bg-[#ffdad6]/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold">{CUSTOM_COLLEGE_OPTION}</span>
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-black/10">
                  {isCustomCollege ? 'Custom Mode Active' : '+ Type Manually'}
                </span>
              </button>
            </div>
          )}

          {/* Custom College Input Field when "My college isn't listed" is chosen */}
          {isCustomCollege && (
            <div className="p-3.5 rounded-2xl bg-[#fff6f5] dark:bg-slate-800/80 border border-[#dc2626]/30 flex flex-col gap-2 animate-fadeIn">
              <div className="flex items-center justify-between">
                <label htmlFor="custom-college-input" className="text-xs font-bold text-[#b70011] dark:text-[#ffb4ab] flex items-center gap-1">
                  <span>Enter your full college / institution name:</span>
                  <span className="text-[#dc2626]">*</span>
                </label>
                <span className="text-[10px] text-slate-500">Will be recorded</span>
              </div>
              <input
                id="custom-college-input"
                type="text"
                autoFocus
                value={customCollege}
                onChange={(e) => onCustomCollegeChange(e.target.value)}
                placeholder="e.g. Kokrajhar Science Academy, Diphu Campus..."
                className="w-full h-12 px-3.5 rounded-xl bg-white dark:bg-slate-900 text-[#131b2e] dark:text-white border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
              />
              {customCollege.trim().length >= 2 ? (
                <div className="flex items-center gap-1 text-[11px] text-[#006646] dark:text-[#85f8c4] font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>College name ready for merch drop allocation</span>
                </div>
              ) : (
                <p className="text-[11px] text-slate-500">Please provide your college name so peers can vote together.</p>
              )}
            </div>
          )}

          {/* Validation Error Banner */}
          {error && (
            <div className="p-3 rounded-xl bg-[#ffdad6] text-[#93000a] text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
