import heroBanner1 from '../assets/HeroBanners/Bannner1.png'
import heroBannerMobile from '../assets/HeroBanners/mb-banner1.png'

const Hero = () => {
  return (
    <div className='w-full overflow-hidden relative aspect-[928/1132] sm:aspect-[1802/738] bg-sky-100'>
      <picture className='contents'>
        <source media='(min-width: 640px)' srcSet={heroBanner1} />
        <img
          src={heroBannerMobile}
          alt='Dermyx Skincare Bundles — Sunbae, Luvanté, Clenzic and Foligrow in a shopping basket'
          loading='eager'
          className='absolute inset-0 w-full h-full object-cover'
        />
      </picture>
    </div>
  )
}

export default Hero
