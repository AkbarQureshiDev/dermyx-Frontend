import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContextValue';
import { FaChevronRight } from 'react-icons/fa';
import faceCleanser from '../assets/TopCategories/face-cleanser.jpg';
import sunblock from '../assets/TopCategories/sunblock.jpg';
import shampoo from '../assets/TopCategories/shampoo.jpg';
import creams from '../assets/TopCategories/creams.jpg';

// `match` resolves the target by product name, because re-adding a product in the
// admin assigns a new _id and a stale id would quietly navigate to /product/undefined.
// `fallback` is always an existing product category, so a card can never dead-end.
const categories = [
  { name: 'FACE CLEANSER', match: 'cleanser', fallback: 'Face Care', img: faceCleanser, alt: 'Model holding Dermyx Clenzic purifying face cleanser' },
  { name: 'SUNBLOCK', match: 'sunblock', fallback: 'Face Care', img: sunblock, alt: 'Model holding Dermyx Sunbae sunblock gel' },
  { name: 'SHAMPOO', match: 'shampoo', fallback: 'Hair Care', img: shampoo, alt: 'Model holding Dermyx Foligrow anti hair fall shampoo' },
  { name: 'CREAMS', match: 'cream', fallback: 'Skin Care', img: creams, alt: 'Model holding Dermyx Luvanté skin brightening face cream' },
];

// A real anchor, not a div+onClick: without an href Googlebot cannot follow the
// homepage into the product pages, and the card is unreachable by keyboard.
const cardClass =
  'relative block w-full aspect-[960/330] bg-white rounded-2xl border-2 border-[#2b6cb0] cursor-pointer shadow-[4px_4px_0px_#2b6cb0] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#2b6cb0] transition-all duration-200 overflow-hidden';

const CategoryCard = ({ cat, to }) => (
  <Link to={to} onClick={() => scrollTo(0, 0)} className={cardClass}>
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
  </Link>
);

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [activeIndex, setActiveIndex] = useState(0);

  const linkFor = (cat) => {
    const match = (products || []).find(
      (p) => (p.name || '').toLowerCase().includes(cat.match)
    );
    return match
      ? `/product/${match._id}`
      : `/collection?category=${encodeURIComponent(cat.fallback)}`;
  };

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
        {categories.map((cat) => (
          <CategoryCard key={cat.name} cat={cat} to={linkFor(cat)} />
        ))}
      </div>

      {/* Mobile Auto-Scroll Carousel Layout */}
      <div className='flex flex-col items-center w-full overflow-hidden sm:hidden'>
        <div className='relative w-full py-2'>
          <div
            className='flex transition-transform duration-500 ease-out'
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {categories.map((cat) => (
              <div key={cat.name} className='flex-shrink-0 w-full px-1.5'>
                <CategoryCard cat={cat} to={linkFor(cat)} />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className='flex gap-2.5 mt-6 mb-2'>
          {categories.map((cat, index) => (
            <div
              key={cat.name}
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
