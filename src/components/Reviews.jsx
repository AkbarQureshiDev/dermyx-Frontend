import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContextValue';
import Stars from './Stars';

const Reviews = () => {
  const { backendUrl } = useContext(ShopContext);
  const [reviewsData, setReviewsData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [animating, setAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Real customer reviews only — the section hides until there is something
  // truthful to show.
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.post(backendUrl + '/api/review/latest', { limit: 9 })
        if (response.data.success) setReviewsData(response.data.reviews)
      } catch (error) {
        console.log(error)
      }
    }
    fetchReviews()
  }, [backendUrl])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const count = reviewsData.length;

  const goNext = useCallback(() => {
    if (animating || count === 0) return;
    setAnimating(true);
    setTimeout(() => {
      setStartIndex((prev) => (prev + 1) % count);
      setAnimating(false);
    }, 300);
  }, [animating, count]);

  const goPrev = () => {
    if (animating || count === 0) return;
    setAnimating(true);
    setTimeout(() => {
      setStartIndex((prev) => (prev === 0 ? count - 1 : prev - 1));
      setAnimating(false);
    }, 300);
  };

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (isPaused || count === 0) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [goNext, isPaused, count])

  const getVisibleReviews = () => {
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (startIndex + i) % count;
      visible.push({ ...reviewsData[index], isCenter: visibleCount === 3 && i === 1 });
    }
    return visible;
  };

  if (count === 0) return null

  return (
    <section
      style={{ backgroundColor: '#B0D1E4' }}
      className="w-full py-14 md:py-20 my-10 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="flex justify-center mb-10 md:mb-14">
          <div className="inline-flex gap-2 items-center">
            <h2 className="prata-regular text-gray-600 text-3xl">
              What Our Customers <span className="text-gray-800 font-medium">Say</span>
            </h2>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative flex items-center justify-center">

          {/* Left Arrow */}
          <button
            onClick={goPrev}
            aria-label="Previous Review"
            className="absolute left-0 md:-left-2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Cards */}
          <div className="w-full px-10 sm:px-14">
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch transition-opacity duration-300 ${animating ? 'opacity-0' : 'opacity-100'}`}
            >
              {getVisibleReviews().map((review, idx) => (
                <div
                  key={`${review._id}-${idx}`}
                  className={`bg-white rounded-3xl p-8 sm:p-10 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center ${
                    review.isCenter ? 'lg:scale-105 lg:-translate-y-2 shadow-xl ring-2 ring-[#B0D1E4]' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#e8f4fb] border-4 border-[#B0D1E4] shadow mb-5 flex items-center justify-center text-2xl font-semibold text-[#4a90b3] flex-shrink-0">
                    {(review.name || 'C').charAt(0).toUpperCase()}
                  </div>

                  {/* Product */}
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 tracking-wide mb-3 line-clamp-2">
                    {review.productName}
                  </h3>

                  {/* Stars */}
                  <div className="flex items-center justify-center gap-1 mb-3">
                    <Stars rating={review.rating} size={18} />
                  </div>

                  {/* Name */}
                  <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1">
                    {review.name}
                  </h4>

                  {review.verified && (
                    <p className="text-[11px] font-semibold text-green-700 mb-3">✓ Verified purchase</p>
                  )}

                  {/* Divider */}
                  <div className="w-10 h-0.5 bg-[#B0D1E4] rounded my-3"></div>

                  {/* Comment */}
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-4">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={goNext}
            aria-label="Next Review"
            className="absolute right-0 md:-right-2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {reviewsData.map((_, i) => (
            <button
              key={i}
              onClick={() => setStartIndex(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${startIndex === i ? 'bg-gray-700 w-6' : 'bg-white opacity-70'}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Reviews;
