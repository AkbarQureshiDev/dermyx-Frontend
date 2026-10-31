import React from 'react'
import Hero from '../components/Hero'
import TrustBadges from '../components/TrustBadges'
import LatestCollection from '../components/LatestCollection'
import FiercelyBanner from '../components/FiercelyBanner'
import BestSeller from '../components/BestSeller'
import Bundles from '../components/Bundles'
import Testimonials from '../components/Testimonials'
import Results from '../components/Results'
import OurPolicy from '../components/OurPolicy'
import VideoSection from '../components/VideoSection'
import Faqs from '../components/Faqs'
import NewsletterBox from '../components/NewsletterBox'
import brandBanner from '../assets/banner.jpg'
import brandBannerMobile from '../assets/mb_banner.png'

const Home = () => {
  return (
    <div>

      {/* 1. Hero - full width slider, first impression */}
      <Hero />

      {/* 2. Trust Badges - builds credibility instantly */}
      <TrustBadges />

      {/* 3. Top Categories - guide user to browse */}
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <LatestCollection />
      </div>

      {/* 5. Best Sellers - top products with social proof */}
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <BestSeller />
      </div>

      {/* 6. Brand Banner - emotional brand moment */}
      <FiercelyBanner />

      {/* 7. Bundles - upsell after single products */}
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <Bundles />
      </div>

      {/* 7b. Brand credibility banner - full bleed, artwork carries its own copy */}
      <div className='lg:px-[15px] lg:my-[15px]'>
        <picture className='block'>
          <source media='(min-width: 640px)' srcSet={brandBanner} />
          <img
            src={brandBannerMobile}
            alt="Dermyx - Pakistan's No. 1 Skincare Brand, with the full product range shown beside a dermatologist"
            className='block w-full h-auto rounded-[15px]'
            loading='lazy'
          />
        </picture>
      </div>

      {/* 7. Testimonials - customer validation */}
      <Testimonials />

      {/* 7c. Results You Can Trust - customer proof */}
      <Results />

      {/* 8. Video Section - Trusted By Influencers & Experts */}
      <VideoSection />

      {/* 9. Policy - reassurance */}
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <OurPolicy />
      </div>

      {/* 10. FAQs + Newsletter - retention */}
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <Faqs />
        <NewsletterBox />
      </div>

    </div>
  )
}

export default Home
