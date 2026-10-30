import React, { useState, useEffect } from 'react';
import Title from './Title';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import faceCleanser from '../assets/TopCategories/face-cleanser.jpg';
import sunblock from '../assets/TopCategories/sunblock.jpg';
import shampoo from '../assets/TopCategories/shampoo.jpg';
import creams from '../assets/TopCategories/creams.jpg';

const categories = [
  { name: 'FACE CLEANSER', value: 'Face Cleanser', img: faceCleanser, alt: 'Model holding Dermyx Clenzic purifying face cleanser' },
  { name: 'SUNBLOCK', value: 'Sunblock', img: sunblock, alt: 'Model holding Dermyx Sunbae sunblock gel' },
  { name: 'SHAMPOO', value: 'Shampoo', img: shampoo, alt: 'Model holding Dermyx Foligrow anti hair fall shampoo' },
  { name: 'CREAMS', value: 'Creams', img: creams, alt: 'Model holding Dermyx Luvanté skin brightening face cream' },
];

const CategoryCard = ({ cat }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/collection?category=${cat.value}`)}
      className='relative w-full aspect-[960/330] bg-white rounded-2xl border-2 border-[#2b6cb0] cursor-pointer shadow-[4px_4px_0px_#2b6cb0] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#2b6cb0] transition-all duration-200 overflow-hidden'
    >
      <img
        src={cat.img}
        alt={cat.alt}
        className='absolute inset-0 w-full h-full object-cover'
      />
      {/* Legibility scrim for the label over the coloured artwork */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent' />
      <div className='absolute inset-0 flex items-end justify-between p-4'>
        <p className='text-white font-extrabold text-lg lg:text-xl leading-tight uppercase tracking-wide pr-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]'>
          {cat.name}
        </p>
        <div className='w-7 h-7 lg:w-8 lg:h-8 bg-white rounded-full flex-shrink-0 flex items-center justify-center text-[#2b6cb0] shadow-md'>
          <FaChevronRight className='w-3 h-3 lg:w-4 lg:h-4 ml-0.5' />
        </div>
      </div>
    </div>
  );
};

const LatestCollection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-scroll logic for mobile carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % categories.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='my-12 max-w-[1400px] mx-auto'>
      <div className='py-6 text-3xl text-center'>
        <Title text1={'Top'} text2={'Categories'} />
      </div>

      {/* Desktop Layout - 2 across on tablets, 4 across from lg up */}
      <div className='hidden gap-4 py-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-6'>
        {categories.map((cat, index) => (
          <CategoryCard key={index} cat={cat} />
        ))}
      </div>

      {/* Mobile Auto-Scroll Carousel Layout */}
      <div className='flex flex-col items-center w-full overflow-hidden sm:hidden'>
        <div className='relative w-full py-2'>
          <div
            className='flex transition-transform duration-500 ease-out'
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {categories.map((cat, index) => (
              <div key={index} className='flex-shrink-0 w-full px-1.5'>
                <CategoryCard cat={cat} />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className='flex gap-2.5 mt-6 mb-2'>
          {categories.map((_, index) => (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full cursor-pointer transition-all duration-300 ${activeIndex === index ? 'w-8 bg-[#2b6cb0]' : 'w-2.5 bg-gray-300'}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestCollection;
