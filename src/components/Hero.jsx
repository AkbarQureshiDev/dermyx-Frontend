import { useEffect, useState } from 'react'
import banner1 from '../assets/HeroBanners/Banner1.png'
import banner1Mobile from '../assets/HeroBanners/mb-banner1.png'
import banner2 from '../assets/HeroBanners/Banner2.png'
import banner2Mobile from '../assets/HeroBanners/mb-banner2.png'
import banner3 from '../assets/HeroBanners/Banner3.jfif'
import banner3Mobile from '../assets/HeroBanners/mb-banner3.jfif'

const SLIDE_MS = 3000

const SLIDES = [
  {
    label: 'CLENZIC cleanser',
    desktop: banner1,
    mobile: banner1Mobile,
    alt: 'CLENZIC purifying face cleanser with 3-in-1 action — exfoliates deeply, clears pores and brightens skin',
  },
  {
    label: 'Skincare bundles',
    desktop: banner2,
    mobile: banner2Mobile,
    alt: 'Dermyx skincare bundles — SUNBAE sunblock, LUVANTÉ brightening cream, CLENZIC face wash and FOLIGROW shampoo',
  },
  {
    label: 'Customer reviews',
    desktop: banner3,
    mobile: banner3Mobile,
    alt: 'CLENZIC face cleanser rated 5 stars by more than 1000 customers',
  },
]

const Hero = () => {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timer = setTimeout(() => {
      setActive((index) => (index + 1) % SLIDES.length)
    }, SLIDE_MS)

    return () => clearTimeout(timer)
  }, [active])

  return (
    <section
      className='relative w-full overflow-hidden aspect-[928/1132] sm:aspect-[1802/738] bg-sky-100'
      aria-roledescription='carousel'
      aria-label='Dermyx highlights'
    >
      {SLIDES.map((slide, index) => (
        <picture
          key={slide.desktop}
          aria-hidden={index !== active}
          className={`absolute inset-0 block transition-opacity duration-700 ${
            index === active ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <source media='(min-width: 640px)' srcSet={slide.desktop} />
          <img
            src={slide.mobile}
            alt={slide.alt}
            loading='eager'
            fetchpriority={index === 0 ? 'high' : 'low'}
            decoding='async'
            className='absolute inset-0 w-full h-full object-cover'
          />
        </picture>
      ))}

      <div className='absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-3 py-1.5'>
        {SLIDES.map((slide, index) => (
          <button
            key={slide.desktop}
            type='button'
            onClick={() => setActive(index)}
            aria-label={`Show ${slide.label} banner`}
            aria-current={index === active}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === active ? 'w-6 bg-black' : 'w-2 bg-black/30 hover:bg-black/60'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero
