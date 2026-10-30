import React, { useRef, useEffect, useState, useCallback } from 'react';
import Video1 from '../assets/VideoSection/Video1.mp4';
import Video2 from '../assets/VideoSection/Video2.mp4';
import Video3 from '../assets/VideoSection/Video3.mp4';
import Video4 from '../assets/VideoSection/video4.mp4';
import Video5 from '../assets/VideoSection/Video5.mp4';
import Video6 from '../assets/VideoSection/Video6.mp4';
import poster1 from '../assets/VideoSection/poster1.jpg';
import poster2 from '../assets/VideoSection/poster2.jpg';
import poster3 from '../assets/VideoSection/poster3.jpg';
import poster4 from '../assets/VideoSection/poster4.jpg';
import poster5 from '../assets/VideoSection/poster5.jpg';
import poster6 from '../assets/VideoSection/poster6.jpg';

// 480x854 portrait clips, ~59MB combined — playback is gated on visibility so
// the page never streams more than the one or two cards actually on screen.
const videoCards = [
  { id: 1, videoUrl: Video1, poster: poster1, duration: '1:00' },
  { id: 2, videoUrl: Video2, poster: poster2, duration: '0:50' },
  { id: 3, videoUrl: Video3, poster: poster3, duration: '0:23' },
  { id: 4, videoUrl: Video4, poster: poster4, duration: '1:21' },
  { id: 5, videoUrl: Video5, poster: poster5, duration: '0:41' },
  { id: 6, videoUrl: Video6, poster: poster6, duration: '0:50' },
];

const VideoCard = ({ card, onActivity }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
        } else {
          el.pause();
          el.currentTime = 0;
          setPlaying(false);
        }
      },
      { threshold: [0, 0.6, 1] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    onActivity?.();
    if (el.paused) {
      el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const el = videoRef.current;
    if (!el) return;
    const next = !muted;
    el.muted = next;
    setMuted(next);
    if (!next && el.paused) el.play().then(() => setPlaying(true)).catch(() => {});
  };

  return (
    <div
      data-card
      role="button"
      tabIndex={0}
      aria-label={playing ? `Pause video ${card.id}` : `Play video ${card.id}`}
      onClick={togglePlay}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); togglePlay(); }
      }}
      className="group relative shrink-0 snap-start cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl border border-white/60 bg-black shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[#B0D1E4]"
      style={{ width: 'calc((100vw - 3rem - 1rem) / 1.6)', aspectRatio: '9 / 16' }}
    >
      <video
        ref={videoRef}
        src={card.videoUrl}
        poster={card.poster}
        className="h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="none"
      />

      {/* Bottom scrim keeps the badges readable over bright footage */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

      {/* Duration badge */}
      <span className="absolute right-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white backdrop-blur-md">
        {card.duration}
      </span>

      {/* Sound control — autoplay is muted, so this is how a viewer gets audio */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
        className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md transition hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        {muted ? (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path d="M11 5 6 9H2v6h4l5 4V5Z" fill="currentColor" />
            <path d="m16 9 6 6M22 9l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path d="M11 5 6 9H2v6h4l5 4V5Z" fill="currentColor" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {/* Play glyph only while paused — it would sit on top of active footage */}
      {!playing && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/50 bg-black/40 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-black/60">
            <svg className="h-6 w-6 translate-x-0.5 fill-white" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

const VideoSection = () => {
  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll every 5s by one card, but stand aside while someone is watching.
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isPaused) return;

    const timer = setInterval(() => {
      const firstCard = container.querySelector('[data-card]');
      const gap = 24;
      const scrollAmount = firstCard ? firstCard.offsetWidth + gap : 280;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="w-full py-14 md:py-20 my-10 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-center mb-10 md:mb-14">
          <div className="inline-flex gap-2 items-center">
            <h2 className="prata-regular text-gray-700 text-lg sm:text-3xl md:text-4xl text-center">
              Trusted By Influencers &amp; <span className="text-gray-900 font-medium">Experts</span>
            </h2>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          className="hide-scrollbar flex gap-4 md:gap-6 overflow-x-auto py-6 snap-x snap-mandatory scroll-smooth"
        >
          {videoCards.map((card) => (
            <VideoCard key={card.id} card={card} onActivity={() => setIsPaused(true)} />
          ))}
        </div>

        <style>{`
          .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          @media (min-width: 1024px) {
            [data-card] {
              width: calc((100vw - 2 * 2rem - 5 * 1.5rem) / 4.2) !important;
            }
          }
        `}</style>

      </div>
    </section>
  );
};

export default VideoSection;
