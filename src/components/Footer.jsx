import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { FaInstagram, FaFacebookF, FaTiktok, FaYoutube, FaPhone, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  return (
    <div style={{ backgroundColor: '#111111' }} className='-mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-20'>

      <div className='flex flex-col sm:grid grid-cols-3 gap-14 py-14 text-sm'>

        <div>
          <p className='text-xl font-medium mb-5 text-white'>CUSTOMER INFO</p>
          <ul className='flex flex-col gap-2 text-white'>
            <Link to='/contact'><li className='hover:text-gray-300 transition-colors'>Contact</li></Link>
            <Link to='/privacy-policy'><li className='hover:text-gray-300 transition-colors'>Privacy Policy</li></Link>
            <Link to='/refund-policy'><li className='hover:text-gray-300 transition-colors'>Refund Policy</li></Link>
            <Link to='/shipping-policy'><li className='hover:text-gray-300 transition-colors'>Shipping Policy</li></Link>
            <Link to='/terms-of-service'><li className='hover:text-gray-300 transition-colors'>Terms of Service</li></Link>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5 text-white'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-white'>
            <Link to='/'><li className='hover:text-gray-300 transition-colors'>Home</li></Link>
            <Link to='/collection'><li className='hover:text-gray-300 transition-colors'>All Products</li></Link>
            <Link to='/about'><li className='hover:text-gray-300 transition-colors'>About</li></Link>
            <Link to='/contact'><li className='hover:text-gray-300 transition-colors'>Contact</li></Link>
            <Link to='/collection?tag=bundle'><li className='hover:text-gray-300 transition-colors'>Bundles</li></Link>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5 text-white'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-white'>
            <li className='flex items-center gap-2'>
              <FaPhone size={13} />
              <a href="tel:+923075111131" className="hover:text-gray-300 transition-colors">0307-5111131</a>
            </li>
            <li className='flex items-center gap-2'>
              <FaEnvelope size={13} />
              <a href="mailto:dermyxofficial@gmail.com" className="hover:text-gray-300 transition-colors">dermyxofficial@gmail.com</a>
            </li>
          </ul>
          <div className='flex gap-4 mt-5'>
            <a href="https://www.instagram.com/dermyx.official" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition-colors"><FaInstagram size={20} /></a>
            <a href="https://www.facebook.com/people/Dermyx-Advanced-Skincare/61588704674951/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500 transition-colors"><FaFacebookF size={20} /></a>
            <a href="https://www.tiktok.com/@dermyx.official" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors"><FaTiktok size={20} /></a>
            <a href="https://www.youtube.com/@Dermyx.official" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-500 transition-colors"><FaYoutube size={20} /></a>
          </div>
        </div>

      </div>

      <div>
        <hr className='border-gray-700' />
        <div className='py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-400'>
          <p>Copyright 2026@ dermyxskincare.com - All Right Reserved.</p>
          <p>Designed & Developed by Innovex Technologies</p>
        </div>
      </div>

    </div>
  )
}

export default Footer
