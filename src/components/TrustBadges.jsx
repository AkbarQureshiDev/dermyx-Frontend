import React from 'react';
import { FaUserMd, FaStar, FaPaw, FaLeaf, FaUsers } from 'react-icons/fa';

const TrustBadges = () => {
  const badges = [
    {
      text: "Dermatologist Approved",
      icon: <FaUserMd className="w-5 h-5 sm:w-6 sm:h-6 text-[#2b6cb0]" />
    },
    {
      text: "1000s Of Success Stories",
      icon: <FaStar className="w-5 h-5 sm:w-6 sm:h-6 text-[#2b6cb0]" />
    },
    {
      text: "Cruelty Free",
      icon: <FaPaw className="w-5 h-5 sm:w-6 sm:h-6 text-[#2b6cb0]" />
    },
    {
      text: "Sulphate & Paraben Free",
      icon: <FaLeaf className="w-5 h-5 sm:w-6 sm:h-6 text-[#2b6cb0]" />
    },
    {
      text: "100K+ Customers",
      icon: <FaUsers className="w-5 h-5 sm:w-6 sm:h-6 text-[#2b6cb0]" />
    }
  ];

  return (
    <div className="w-full border-b border-[#93bdd4] py-3 sm:py-5 overflow-hidden" style={{ backgroundColor: '#B0D1E4' }}>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        /* --per = how many badges fit on screen; the half badge hints there is more */
        .trust-track { --gap: 1.75rem; --per: 1.5; }
        @media (min-width: 640px) { .trust-track { --per: 2.5; } }
        @media (min-width: 1024px) { .trust-track { --per: 3.5; --gap: 3rem; } }
        @media (min-width: 1280px) { .trust-track { --per: 4.5; --gap: 3.5rem; } }
        .trust-badge { width: calc((100vw - var(--gap) * var(--per)) / var(--per)); }
      `}</style>

      <div className="flex w-max animate-marquee trust-track" style={{ gap: 'var(--gap)' }}>
        {/* Render badges twice for seamless looping */}
        {[...badges, ...badges].map((badge, index) => (
          <div
            key={index}
            className="trust-badge flex flex-shrink-0 items-center gap-2.5 sm:gap-3"
          >
            <div className="flex items-center justify-center flex-shrink-0 p-2 bg-white border border-gray-100 rounded-full shadow-sm">
              {badge.icon}
            </div>
            <span className="text-[#2b6cb0] font-bold text-[11px] sm:text-xs lg:text-sm uppercase leading-tight">
              {badge.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBadges;