import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-10 sm:gap-6 text-center py-12 sm:py-16 my-8 sm:my-12'>
      
      <div className='flex flex-col items-center'>
        <img
          src={assets.exchange_icon}
          className='w-14 h-14 sm:w-16 sm:h-16 object-contain mb-3 sm:mb-4 transition-transform duration-300 hover:scale-105'
          alt="Easy Exchange Policy"
        />
        <p className='text-base sm:text-lg font-bold text-gray-800 mb-1'>
          Easy Exchange Policy
        </p>
        <p className='text-xs sm:text-sm text-gray-500 max-w-[260px] leading-relaxed'>
          We offer hassle free exchange policy
        </p>
      </div>

      <div className='flex flex-col items-center'>
        <img
          src={assets.quality_icon}
          className='w-14 h-14 sm:w-16 sm:h-16 object-contain mb-3 sm:mb-4 transition-transform duration-300 hover:scale-105'
          alt="7 Days Return Policy"
        />
        <p className='text-base sm:text-lg font-bold text-gray-800 mb-1'>
          7 Days Return Policy
        </p>
        <p className='text-xs sm:text-sm text-gray-500 max-w-[260px] leading-relaxed'>
          We provide 7 days free return policy
        </p>
      </div>

      <div className='flex flex-col items-center'>
        <img
          src={assets.support_img}
          className='w-14 h-14 sm:w-16 sm:h-16 object-contain mb-3 sm:mb-4 transition-transform duration-300 hover:scale-105'
          alt="Best Customer Support"
        />
        <p className='text-base sm:text-lg font-bold text-gray-800 mb-1'>
          Best customer support
        </p>
        <p className='text-xs sm:text-sm text-gray-500 max-w-[260px] leading-relaxed'>
          We provide 24/7 customer support
        </p>
      </div>

    </div>
  )
}

export default OurPolicy
