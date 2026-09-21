import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  }[size];

  // Hotlinked image provided in the Google Stitch design
  const STITCH_LOGO_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuD1HhYbU3b-WgcVZcAINZRqHo0dUXiHnDlYkEbEMTZo_kLtz0tZmjSVwylRXc7NOGovceP1Wzi-gTyaC7jjf6txXZMjthDDHs5vy87IzcV7Hu8X2PvHtTFo7qexivmwrkaSDoqTc5Ztg1fbz7I8Rq_jA2D3yvvF_iAP3zdNH2XkMZr2rS8-OioIj1Gf1U51gDTF5K3962Eg0YUe7OQ-bGlQ_0X4bURTIQx1wS3ZRJuR47lGmwGL6YC68g";

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div className={`relative ${sizeClasses} rounded-full overflow-hidden shrink-0 shadow-sm border border-[#fe932c]/30 bg-[#131b2e] flex items-center justify-center`}>
        <img
          src={STITCH_LOGO_URL}
          alt="RespondR Logo"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to inline SVG representation if network image is blocked
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        {/* Geometric Jaapi/Gamosa R Emblem fallback */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full absolute inset-0 p-1 text-[#fe932c]"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        >
          <circle cx="50" cy="50" r="45" stroke="#dc2626" strokeWidth="6" />
          <circle cx="50" cy="50" r="39" stroke="#fe932c" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M35 28 L35 72 M35 28 C55 28 65 38 65 48 C65 58 52 58 35 58 M48 56 L68 72" stroke="#dc2626" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M42 35 L42 62 M42 35 C52 35 58 40 58 46 C58 52 50 52 42 52" stroke="#fe932c" strokeWidth="3" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-['Sora',sans-serif] font-bold text-[#131b2e] tracking-tight leading-none text-base">
              RespondR
            </span>
            <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#ffdad6] text-[#93000b] tracking-wider">
              Assam
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#dc2626] font-['Plus_Jakarta_Sans',sans-serif] mt-0.5">
            Assam Campus Merch
          </span>
        </div>
      )}
    </div>
  );
};

export const AssameseWeaveDivider: React.FC = () => (
  <div aria-hidden="true" className="w-full flex items-center justify-center gap-1 py-3 my-2">
    <div className="h-0.5 flex-1 bg-[#eaedff]"></div>
    <div className="flex items-center gap-1.5 px-2">
      <div className="w-2 h-2 rotate-45 bg-[#dc2626]"></div>
      <div className="w-1.5 h-1.5 rotate-45 bg-[#fe932c]"></div>
      <div className="w-2.5 h-2.5 rotate-45 bg-[#dc2626]"></div>
      <div className="w-1.5 h-1.5 rotate-45 bg-[#fe932c]"></div>
      <div className="w-2 h-2 rotate-45 bg-[#dc2626]"></div>
    </div>
    <div className="h-0.5 flex-1 bg-[#eaedff]"></div>
  </div>
);
