import heroBanner1 from '../assets/HeroBanners/Bannner1.png'

const Hero = () => {
  return (
    <div className='w-full overflow-hidden relative aspect-[1802/738] bg-sky-100'>
      <img
        src={heroBanner1}
        alt='Dermyx Skincare Bundles — Sunbae, Luvanté, Clenzic and Foligrow in a shopping basket'
        loading='eager'
        className='absolute inset-0 w-full h-full object-cover'
      />
    </div>
  )
}

export default Hero
