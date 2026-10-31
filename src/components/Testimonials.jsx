import React, { useState, useEffect } from 'react';
import Title from './Title';

const testimonialsData = [
  {
    id: 1,
    name: 'Razaq',
    rating: 5,
    testimonial: 'This cleanser has genuinely transformed my daily routine. My skin used to be excessively oily, especially around the T-zone, but after just two weeks of use it feels completely balanced and smooth. It cleans deeply without stripping moisture away, leaving a fresh, healthy texture all day long!'
  },
  {
    id: 2,
    name: 'Ayesha',
    rating: 5,
    testimonial: 'I personally used this face wash and their texture, fragrance is ufffffff I have no words to explain...! The price is super reasonable and my face looks so shiny, clear and glowing within just a week. Highly gentle on sensitive skin, absolutely must try this 1000% recommended!'
  },
  {
    id: 3,
    name: 'Dr Aqsa',
    rating: 5,
    testimonial: "Honestly, your cleanser was so good that I genuinely felt like recommending it again and again. It's rare that I like a product this much, but this one really impressed me. The texture, feel and overall experience were just so good that I couldn't stop myself from recommending it to everyone around me. ✨✨"
  },
  {
    id: 4,
    name: 'Kainat',
    rating: 5,
    testimonial: 'Here is my honest review: this is hands down the best cleanser I have ever tried! Tysm for creating this absolute gem 💎. It removes all impurities effortlessly, leaves zero residue or dryness, and gives an instant soft glow. Truly a skincare essential I will keep repurchasing!'
  },
  {
    id: 5,
    name: 'Sadia Khan',
    rating: 5,
    testimonial: "More power to you, you'll always be my favourite skincare brand! My whole team is fond of your cleanser seriously. It feels so luxurious yet gentle, perfectly controls breakouts, and makes the skin look revitalized every single morning. Can't imagine my skincare shelf without it!"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonialsData.length - itemsPerPage);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  // Auto scroll after every 5 seconds
  useEffect(() => {
    if (isPaused || maxIndex <= 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    }, 5000);
    return () => clearInterval(timer);
  }, [maxIndex, isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <section
      aria-label="Customer Testimonials"
      className="relative w-full mt-16 mb-8 md:my-32 py-4 sm:py-6 select-none"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Title kept unchanged */}
        <div className="text-center pb-6 sm:pb-8 text-xl sm:text-3xl">
          <Title text1={'What Our Clients'} text2={'Say About Us'} />
        </div>

        {/* Carousel Slider */}
        <div
          className="relative w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Cards Track */}
          <div
            className="overflow-hidden w-full py-1"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`
              }}
            >
              {testimonialsData.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 px-2 sm:px-2.5"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <div className="w-full h-[290px] bg-[#BFE3FD] rounded-3xl py-6 sm:py-7 px-5 sm:px-6 flex flex-col items-center justify-start shadow-sm border border-black/5 hover:shadow-md transition-shadow">
                    {/* 1. Empty profile image */}
                    <div className="w-20 h-20 rounded-full bg-white/60 border-2 border-white shadow-xs flex items-center justify-center text-gray-600 overflow-hidden flex-shrink-0 mb-1">
                      <svg
                        className="w-8 h-8 sm:w-10 sm:h-10 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>

                    {/* 2. Client Name */}
                    <h3 className="font-semibold text-gray-900 text-lg text-center leading-tight my-3">
                      {item.name}
                    </h3>

                    {/* 3. Review star in black color */}
                    <div className="flex items-center justify-center gap-1 mb-1.5 text-black">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 fill-black text-black"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>

                    {/* 4. Review text - 4 to 5 lines */}
                    <p className="text-gray-800 text-xs sm:text-sm text-center leading-relaxed flex-1 flex items-center justify-center line-clamp-5 overflow-hidden">
                      "{item.testimonial}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Pagination Navigation Dots */}
          <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to testimonial slide ${i + 1}`}
                aria-current={currentIndex === i}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                  currentIndex === i
                    ? 'w-7 bg-[#98C7DC]'
                    : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
