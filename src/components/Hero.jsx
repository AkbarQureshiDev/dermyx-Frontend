import React, { useState, useEffect } from 'react'
import heroBanner1 from '../assets/HeroBanners/Bannner1.png'
import heroBanner2 from '../assets/HeroBanners/Bannner2.png'

const slides = [
  { src: heroBanner1, alt: 'Dermyx Skincare Bundles — Sunbae, Luvanté, Clenzic and Foligrow in a shopping basket' },
  { src: heroBanner2, alt: 'Dermyx Advanced Skincare Solution — two customers holding Clenzic, Foligrow, Sunbae and Luvanté' },
]

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='w-full overflow-hidden relative group'>
      {/* Slider */}
      <div
        className='flex transition-transform duration-700 ease-in-out'
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className='relative min-w-full aspect-[1802/738] bg-sky-100'>
            <img
              src={slide.src}
              alt={slide.alt}
              loading={index === 0 ? 'eager' : 'lazy'}
              className='absolute inset-0 w-full h-full object-cover'
            />
          </div>
        ))}
      </div>

      {/* Dots Navigation */}
      <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10'>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              currentIndex === index
                ? 'w-8 h-2 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero
