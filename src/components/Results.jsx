import React from 'react';
import Title from './Title';

// Import all 3 result images from assets/Results
const imageModules = import.meta.glob('../assets/Results/*.jpeg', { eager: true, import: 'default' });
const resultImages = Object.values(imageModules);

const Results = () => {
  return (
    <section aria-label="Results You Can Trust" className="my-14 sm:my-20">
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        {/* Heading */}
        <div className="text-center text-2xl sm:text-3xl">
          <Title text1={'Results You'} text2={'Can Trust'} />
        </div>

        {/* Subtitle */}
        <p className="text-center text-xs sm:text-sm md:text-base text-gray-500 -mt-2 mb-8 sm:mb-12 font-medium tracking-wide">
          Real Skin. Real Results. Zero Filters.
        </p>

        {/* Carousel / Grid Container */}
        {/* Mobile: 1.3 cards peek horizontal scroll without navigation buttons; Desktop: 3-column grid */}
        <div className="flex flex-row md:grid md:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scroll-smooth pb-4 pt-1 px-1">
          {resultImages.map((src, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[76vw] sm:w-[60vw] md:w-auto snap-start rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 bg-white"
            >
              <img
                src={src}
                alt={`Customer skin result ${index + 1}`}
                loading="lazy"
                className="w-full h-auto aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] object-cover block transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;
