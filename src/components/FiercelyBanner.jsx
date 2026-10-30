import React from 'react';

const FiercelyBanner = () => {
  return (
    <div style={{ backgroundColor: '#98C7DC' }} className="relative w-full my-[15px] overflow-hidden py-10 sm:py-14">

      {/* Main text - centered */}
      <div className="flex justify-center items-center px-8 sm:px-[20%] lg:px-[28%] xl:px-[32%]">
        <p className="prata-regular text-center text-[#374151] text-xl sm:text-2xl lg:text-3xl leading-relaxed tracking-wide">
          Here we learn to love <br />
          ourselves <span className="tracking-[0.2em]">FIERCELY</span>
        </p>
      </div>

      {/* Circular badge - right side */}
      <div className="absolute right-[4%] sm:right-[6%] top-1/2 -translate-y-1/2 w-[80px] h-[80px] sm:w-[110px] sm:h-[110px]">
        {/* Outer rotating ring text */}
        <svg viewBox="0 0 110 110" className="w-full h-full">
          <defs>
            <path id="circlePath" d="M55,55 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0"/>
          </defs>
          <text fill="#000" fontSize="10.5" fontFamily="Arial" letterSpacing="3.2">
            <textPath href="#circlePath">NON-TOXIC • CRUELTY FREE •</textPath>
          </text>
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-0.5">
            <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" fill="#000"/>
          </svg>
          <span className="text-[10px] sm:text-xs text-black font-medium tracking-widest uppercase leading-none">Clean</span>
          <span className="text-[10px] sm:text-xs text-black font-medium tracking-widest uppercase leading-none">Kind</span>
        </div>
      </div>

    </div>
  );
};

export default FiercelyBanner;
