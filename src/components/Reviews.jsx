import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContextValue';
import Stars from './Stars';

// Helper for relative time like "Last week", "3 weeks ago"
const getRelativeTime = (timestamp) => {
  if (!timestamp) return 'Recently';
  const now = Date.now();
  const date = typeof timestamp === 'number' ? timestamp : new Date(timestamp).getTime();
  const diffInSeconds = Math.max(0, Math.floor((now - date) / 1000));

  if (diffInSeconds < 60) return 'Just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks === 1) return 'Last week';
  if (diffInWeeks < 4) return `${diffInWeeks} weeks ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths === 1) return '1 month ago';
  if (diffInMonths < 12) return `${diffInMonths} months ago`;
  return `${Math.floor(diffInMonths / 12)} years ago`;
};

// Truncate at around 40 words and append "....."
const truncateWords = (text, limit = 40) => {
  if (!text) return { text: '', isTruncated: false };
  const words = text.trim().split(/\s+/);
  if (words.length <= limit) {
    return { text, isTruncated: false };
  }
  return {
    text: words.slice(0, limit).join(' ') + '.....',
    isTruncated: true
  };
};

const Reviews = () => {
  const { backendUrl } = useContext(ShopContext);
  const [reviewsData, setReviewsData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [animating, setAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [modalReview, setModalReview] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.post(backendUrl + '/api/review/latest', { limit: 12 });
        if (response.data.success) setReviewsData(response.data.reviews);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviews();
  }, [backendUrl]);

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
  }, [goNext, isPaused, count]);

  const getVisibleReviews = () => {
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (startIndex + i) % count;
      visible.push({ ...reviewsData[index], isCenter: visibleCount === 3 && i === 1 });
    }
    return visible;
  };

  if (count === 0) return null;

  return (
    <section
      className="w-full py-14 md:py-20 my-10 bg-slate-50 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="flex justify-center mb-10 md:mb-14">
          <div className="inline-flex gap-2 items-center">
            <h2 className="prata-regular text-gray-700 text-3xl">
              Customer <span className="text-gray-900 font-medium">Reviews</span>
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
            className="absolute left-0 md:-left-3 z-10 w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-200 border border-gray-100 focus:outline-none"
          >
            <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Cards Container with Equal Heights */}
          <div className="w-full px-6 sm:px-12">
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch transition-opacity duration-300 ${animating ? 'opacity-0' : 'opacity-100'}`}
            >
              {getVisibleReviews().map((review, idx) => {
                const { text: displayComment, isTruncated } = truncateWords(review.comment, 40);
                const cardImage = review.image || review.productImage;

                return (
                  <div
                    key={`${review._id}-${idx}`}
                    className={`bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full ${
                      review.isCenter ? 'lg:scale-105 lg:-translate-y-1 shadow-md ring-2 ring-[#1b6b93]/30' : ''
                    }`}
                  >
                    {/* Top Image Area */}
                    <div className="relative w-full h-64 sm:h-72 bg-gray-100 overflow-hidden flex-shrink-0 group">
                      {cardImage ? (
                        <img
                          src={cardImage}
                          alt={`Review photo by ${review.name}`}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#eef6fa] to-[#d6ebf7] text-[#1b6b93] p-4 text-center">
                          <div className="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center text-xl font-bold shadow-sm mb-2">
                            {(review.name || 'C').charAt(0).toUpperCase()}
                          </div>
                          <span className="text-xs font-semibold text-[#1b6b93]">
                            {review.productName || 'Dermyx Skincare'}
                          </span>
                        </div>
                      )}

                      {review.image && (
                        <button
                          type="button"
                          onClick={() => setModalReview(review)}
                          className="absolute inset-0 bg-black/20 hover:bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="View photo"
                        >
                          <span className="bg-black/70 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow">
                            Zoom photo
                          </span>
                        </button>
                      )}
                    </div>

                    {/* Card Content Area */}
                    <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                      <div className="flex flex-col flex-1">
                        {/* Reviewer Name in blue */}
                        <h4 className="font-bold text-base text-[#1b6b93] tracking-tight truncate">
                          {review.name}
                        </h4>

                        {/* Stars & Relative Time */}
                        <div className="flex items-center gap-2 mt-1">
                          <Stars rating={review.rating} size={14} />
                          <span className="text-xs text-gray-400 font-normal">
                            {getRelativeTime(review.createdAt)}
                          </span>
                        </div>

                        {/* Optional Title */}
                        {review.title && (
                          <h5 className="font-bold text-sm text-[#1b6b93] mt-2 leading-snug line-clamp-1">
                            {review.title}
                          </h5>
                        )}

                        {/* Product reference name */}
                        {review.productName && (
                          <p className="text-[11px] text-gray-400 mt-1 truncate">
                            For: {review.productName}
                          </p>
                        )}

                        {/* Description truncated at ~40 words with "....." */}
                        <div className="mt-2 flex-1">
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed break-words">
                            {displayComment}
                            {isTruncated && (
                              <button
                                type="button"
                                onClick={() => setModalReview(review)}
                                className="ml-1 text-xs text-[#1b6b93] font-semibold hover:underline inline-block"
                              >
                                Read more
                              </button>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Footer: Verified & Helpful */}
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto text-xs">
                        {review.verified ? (
                          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                            ✓ Verified
                          </span>
                        ) : (
                          <span className="text-[10px] text-gray-400">Customer Review</span>
                        )}

                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <span>👍</span>
                          <span>{review.helpful || 0}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={goNext}
            aria-label="Next Review"
            className="absolute right-0 md:-right-3 z-10 w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-200 border border-gray-100 focus:outline-none"
          >
            <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Carousel indicator dots */}
        <div className="flex justify-center gap-2 mt-8">
          {reviewsData.map((_, i) => (
            <button
              key={i}
              onClick={() => setStartIndex(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${startIndex === i ? 'bg-[#1b6b93] w-6' : 'bg-gray-300'}`}
            />
          ))}
        </div>

      </div>

      {/* Modal for full review details */}
      {modalReview && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setModalReview(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-fade-in flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {modalReview.image && (
              <div className="w-full max-h-72 bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={modalReview.image}
                  alt={`Review photo by ${modalReview.name}`}
                  className="max-h-72 w-full object-contain"
                />
              </div>
            )}
            <div className="p-6 overflow-y-auto flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-lg text-[#1b6b93]">{modalReview.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Stars rating={modalReview.rating} size={15} />
                    <span className="text-xs text-gray-400">
                      {getRelativeTime(modalReview.createdAt)}
                    </span>
                    {modalReview.verified && (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setModalReview(null)}
                  className="text-gray-400 hover:text-black text-xl font-bold"
                >
                  ✕
                </button>
              </div>

              {modalReview.title && (
                <h5 className="font-bold text-base text-[#1b6b93] mt-1">
                  {modalReview.title}
                </h5>
              )}

              {modalReview.productName && (
                <p className="text-xs text-gray-400">
                  Product: {modalReview.productName}
                </p>
              )}

              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap mt-1">
                {modalReview.comment}
              </p>
            </div>
            <div className="px-6 py-3 bg-gray-50 border-t flex justify-end">
              <button
                onClick={() => setModalReview(null)}
                className="px-5 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Reviews;