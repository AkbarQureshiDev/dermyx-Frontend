import React from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* Our Story */}
      <div className='my-12'>
        <h2 className='text-3xl font-bold text-gray-900 mb-6'>OUR STORY</h2>
        <div className='flex flex-col gap-5 text-gray-600 md:text-base max-w-[820px]'>
          <p className='text-lg font-semibold text-gray-800 italic'>We didn't start as a brand. We started as a problem.</p>
          <p>Dermyx wasn't built in a boardroom. It was built out of frustration, failed products, and a mirror that kept showing the same skin no matter what we tried.</p>
          <p>This is the story of why we exist — and why we refuse to make products that don't work.</p>
          <div className='bg-gray-50 border-l-4 border-black px-6 py-4 rounded-r-xl mt-2'>
            <p className='text-gray-700 italic text-base leading-relaxed'>"I tried everything. Nothing worked. So I decided to build something that actually would."</p>
            <p className='mt-3 text-sm font-bold text-gray-900 tracking-widest'>— DERMYX FOUNDER</p>
          </div>
        </div>
      </div>

      {/* Who We Are */}
      <div className='my-12 flex flex-col gap-5 text-gray-600'>
        <h2 className='text-2xl font-bold text-gray-900'>WHO WE ARE</h2>
        <p>DermyxSkincare was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
        <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality skincare products that cater to every skin type and concern. From face cleansers and sunblocks to shampoos and creams, we offer an extensive collection sourced from trusted brands and formulated for real results.</p>
        <p>We believe skincare should be simple, honest, and effective. Every product on Dermyx goes through rigorous quality checks before it reaches your door — because your skin deserves nothing less.</p>
      </div>

      {/* Our Mission */}
      <div className='my-12 bg-gray-50 rounded-2xl px-8 py-10'>
        <h2 className='text-2xl font-bold text-gray-900 mb-4'>OUR MISSION</h2>
        <p className='text-gray-600 text-base leading-relaxed mb-4'>Our mission at DermyxSkincare is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
        <p className='text-gray-600 text-base leading-relaxed'>We don't just sell skincare — we build trust, one product at a time. Our commitment is to keep improving, keep listening, and keep delivering products that genuinely make a difference in your daily routine.</p>
      </div>

      {/* Our Values */}
      <div className='my-12'>
        <div className='text-xl py-4'>
          <Title text1={'OUR'} text2={'VALUES'} />
        </div>
        <div className='flex flex-col gap-6 mb-10'>
          <div className='flex gap-6 items-start border rounded-xl px-8 py-6'>
            <span className='text-4xl font-bold text-gray-200 leading-none flex-shrink-0'>01</span>
            <div>
              <b className='text-gray-900 text-base'>If it doesn't work, it doesn't go in</b>
              <p className='text-gray-600 mt-2'>Every ingredient in a Dermyx product is there because it does something measurable. We don't add things to make the label look impressive. We add things because they make the formula better.</p>
            </div>
          </div>

          <div className='flex gap-6 items-start border rounded-xl px-8 py-6'>
            <span className='text-4xl font-bold text-gray-200 leading-none flex-shrink-0'>02</span>
            <div>
              <b className='text-gray-900 text-base'>Honesty over hype — always</b>
              <p className='text-gray-600 mt-2'>We will never promise overnight results. We will never use before & after photos that aren't real. We will tell you exactly what our products do, what they don't do, and how long it takes.</p>
            </div>
          </div>

          <div className='flex gap-6 items-start border rounded-xl px-8 py-6'>
            <span className='text-4xl font-bold text-gray-200 leading-none flex-shrink-0'>03</span>
            <div>
              <b className='text-gray-900 text-base'>One product should solve one problem — completely</b>
              <p className='text-gray-600 mt-2'>We didn't build a 10-step routine. We built targeted solutions. You shouldn't need an entire shelf of products to fix one skin concern. One great formula, used consistently, is enough.</p>
            </div>
          </div>

          <div className='flex gap-6 items-start border rounded-xl px-8 py-6'>
            <span className='text-4xl font-bold text-gray-200 leading-none flex-shrink-0'>04</span>
            <div>
              <b className='text-gray-900 text-base'>Pakistani skin deserves clinical-grade ingredients</b>
              <p className='text-gray-600 mt-2'>The best actives shouldn't only exist in imported products with imported price tags. Dermyx exists to bring dermatologist-grade formulas to Pakistani skin — accessible, affordable, and real.</p>
            </div>
          </div>
        </div>
      </div>

      <NewsletterBox />

    </div>
  )
}

export default About
