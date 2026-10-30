import React from 'react';
import { FaUserMd, FaStar, FaPaw, FaLeaf, FaUsers } from 'react-icons/fa';

const TrustBadges = () => {
  const badges = [
    {
      text: "Dermatologist Approved",
      icon: <FaUserMd className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-black" />
    },
    {
      text: "1000s Of Success Stories",
      icon: <FaStar className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-black" />
    },
    {
      text: "Cruelty Free",
      icon: <FaPaw className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-black" />
    },
    {
      text: "Sulphate & Paraben Free",
      icon: <FaLeaf className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-black" />
    },
    {
      text: "100K+ Customers",
      icon: <FaUsers className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-black" />
    }
  ];

  // 4 repetitions (2 sets of 10) for seamless -50% marquee loop
  const displayBadges = [...badges, ...badges, ...badges, ...badges];

  return (
    <div className="w-full border-b border-[#98C7DC] py-2.5 sm:py-4 overflow-hidden select-none" style={{ backgroundColor: '#98C7DC' }}>
      <style>{`
        @keyframes marqueeTrust {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-trust-marquee {
          display: flex;
          width: max-content;
          animation: marqueeTrust 48s linear infinite;
        }
        .animate-trust-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="animate-trust-marquee">
        {displayBadges.map((badge, index) => (
          <div
            key={index}
            className="w-[50vw] max-w-[50vw] md:w-[calc(100vw/4.5)] md:max-w-none flex-shrink-0 flex items-center justify-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 overflow-hidden"
          >
            <div className="flex items-center justify-center flex-shrink-0 p-1 sm:p-2 bg-white border border-gray-100 rounded-full shadow-sm">
              {badge.icon}
            </div>
            <span className="text-black font-bold text-[9px] sm:text-xs lg:text-sm uppercase leading-tight line-clamp-2 sm:line-clamp-none sm:whitespace-nowrap">
              {badge.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBadges;
