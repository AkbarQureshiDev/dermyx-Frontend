import React, { useEffect, useState } from 'react';
import Title from './Title';

const CARDS = 6;

// Real Instagram review screenshots. Each strip already contains the reviewer's
// own avatar, handle and text, so it must be shown whole — never object-cover.
const modules = import.meta.glob('../assets/Reviews/*.jpeg', { eager: true, query: '?url', import: 'default' });
const SOURCES = Object.keys(modules).sort().map(key => modules[key]);

// Round-robin keeps all six cards filled even if the image count changes.
const GROUPS = Array.from({ length: CARDS }, (_, cardIndex) =>
  SOURCES.filter((_, i) => i % CARDS === cardIndex)
).filter(group => group.length > 0);

const ReviewCard = ({ images, cardIndex, onOpen }) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = images.length;

  // Stagger the interval per card so the six galleries don't flip in unison.
  // `active` is a dependency so a manual dot click restarts the countdown
  // instead of being overridden by a rotation that was already due.
  useEffect(() => {
    if (paused || total < 2) return;
    const timer = setInterval(() => setActive(prev => (prev + 1) % total), 3200 + cardIndex * 450);
    return () => clearInterval(timer);
  }, [paused, total, cardIndex, active]);

  return (
    <div
      className="group relative h-full flex flex-col gap-3 rounded-3xl border border-[#F6D9E7] bg-white p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FCB4C5] hover:shadow-[0_16px_36px_rgba(252,180,197,0.32)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Decorative quote glyph */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-1 right-4 prata-regular text-6xl leading-none text-[#FBCBE2] transition-colors duration-300 group-hover:text-[#FCB4C5]"
      >&rdquo;</span>

      {/* Review strip */}
      <button
        type="button"
        onClick={() => onOpen(cardIndex, active)}
        aria-label={`Open review ${active + 1} of ${total}`}
        className="relative block w-full h-[136px] sm:h-[150px] lg:h-[160px] rounded-2xl bg-white overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FCB4C5]"
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Customer review ${i + 1}`}
            loading={cardIndex === 0 && i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className="absolute inset-0 h-full w-full object-contain p-1 transition-opacity duration-500 ease-out"
            style={{ opacity: active === i ? 1 : 0 }}
          />
        ))}

        {/* Hover affordance */}
        <span className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#2C6B8D]/85 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" />
          </svg>
        </span>
      </button>

      {/* Progress dots */}
      <div className="mt-auto flex items-center justify-center gap-1.5">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show review ${i + 1}`}
            aria-current={active === i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              active === i ? 'w-7 bg-[#FCB4C5]' : 'w-1.5 bg-[#F6D9E7] hover:bg-[#FCB4C5]/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const Lightbox = ({ index, group, onClose, onStep }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onStep]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Customer review"
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-2 backdrop-blur-sm sm:p-8"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-3xl bg-white p-3 shadow-2xl sm:p-6"
      >
        <img
          src={group[index]}
          alt={`Customer review ${index + 1} of ${group.length}`}
          className="mx-auto block max-h-[70vh] w-auto max-w-full object-contain"
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-500 shadow-lg transition-colors hover:text-gray-900 sm:-right-3 sm:-top-3"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {group.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => onStep(-1)}
              aria-label="Previous review"
              className="absolute left-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition-transform hover:scale-110 active:scale-95 sm:-left-4"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => onStep(1)}
              aria-label="Next review"
              className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition-transform hover:scale-110 active:scale-95 sm:-right-4"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}

        <p className="mt-3 text-center text-xs font-medium tracking-wide text-gray-400">
          {index + 1} / {group.length}
        </p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [open, setOpen] = useState(null);

  const stepOpen = (delta) => setOpen(prev => {
    if (!prev) return prev;
    const n = GROUPS[prev.card].length;
    return { ...prev, index: (prev.index + delta + n) % n };
  });

  if (GROUPS.length === 0) return null;

  return (
    <section
      aria-label="Customer Testimonials"
      className="relative my-10 w-full select-none overflow-hidden py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

        <div className="text-center py-8 text-3xl">
          <Title text1={'What Our Clients'} text2={'Say About Us'} />
        </div>
        <p className="-mt-4 mb-10 text-center text-sm text-gray-500">
          Unfiltered screenshots from real customers &mdash; tap any card to read it full size
        </p>

        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {GROUPS.map((group, cardIndex) => (
            <ReviewCard
              key={cardIndex}
              cardIndex={cardIndex}
              images={group}
              onOpen={(card, index) => setOpen({ card, index })}
            />
          ))}
        </div>
      </div>

      {open && (
        <Lightbox
          index={open.index}
          group={GROUPS[open.card]}
          onClose={() => setOpen(null)}
          onStep={stepOpen}
        />
      )}
    </section>
  );
};

export default Testimonials;
