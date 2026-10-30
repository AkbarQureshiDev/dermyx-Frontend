import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { FaInstagram, FaFacebookF, FaTiktok, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
  return (
    <div style={{ backgroundColor: '#98C7DC' }} className='-mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-20'>

      <div className='flex flex-col sm:grid grid-cols-3 gap-14 py-14 text-sm'>

        <div>
          <p className='text-xl font-medium mb-5 text-black'>CUSTOMER INFO</p>
          <ul className='flex flex-col gap-2 text-black'>
            <Link to='/contact'><li className='hover:text-gray-700 transition-colors'>Contact</li></Link>
            <Link to='/privacy-policy'><li className='hover:text-gray-700 transition-colors'>Privacy Policy</li></Link>
            <Link to='/refund-policy'><li className='hover:text-gray-700 transition-colors'>Refund Policy</li></Link>
            <Link to='/shipping-policy'><li className='hover:text-gray-700 transition-colors'>Shipping Policy</li></Link>
            <Link to='/terms-of-service'><li className='hover:text-gray-700 transition-colors'>Terms of Service</li></Link>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5 text-black'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-black'>
            <Link to='/'><li className='hover:text-gray-700 transition-colors'>Home</li></Link>
            <Link to='/collection'><li className='hover:text-gray-700 transition-colors'>All Products</li></Link>
            <Link to='/about'><li className='hover:text-gray-700 transition-colors'>About</li></Link>
            <Link to='/contact'><li className='hover:text-gray-700 transition-colors'>Contact</li></Link>
            <Link to='/collection?tag=bundle'><li className='hover:text-gray-700 transition-colors'>Bundles</li></Link>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5 text-black'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-black'>
            <li className='flex items-center gap-2'>
              <FaPhone size={13} />
              <a href="tel:+923075111131" className="hover:text-gray-700 transition-colors">0307-5111131</a>
            </li>
            <li className='flex items-center gap-2'>
              <FaEnvelope size={13} />
              <a href="mailto:dermyxofficial@gmail.com" className="hover:text-gray-700 transition-colors">dermyxofficial@gmail.com</a>
            </li>
            <li className='flex items-start gap-2 mt-1'>
              <FaMapMarkerAlt size={14} className='mt-1 flex-shrink-0' />
              <span>2nd Floor, Humayun Arcade, Block C, PWD Society, Islamabad</span>
            </li>
          </ul>
          <div className='flex gap-4 mt-5'>
            <a href="https://www.instagram.com/dermyx.official" target="_blank" rel="noopener noreferrer" className="text-black hover:text-pink-400 transition-colors"><FaInstagram size={20} /></a>
            <a href="https://www.facebook.com/people/Dermyx-Advanced-Skincare/61588704674951/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-blue-500 transition-colors"><FaFacebookF size={20} /></a>
            <a href="https://www.tiktok.com/@dermyx.official" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700 transition-colors"><FaTiktok size={20} /></a>
            <a href="https://www.youtube.com/@Dermyx.official" target="_blank" rel="noopener noreferrer" className="text-black hover:text-red-500 transition-colors"><FaYoutube size={20} /></a>
          </div>
        </div>

      </div>

      <div>
        <hr className='border-black' />
        <div className='py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-black'>
          <p>Copyright 2026@ dermyxskincare.com - All Right Reserved.</p>
          <p>Designed & Developed by OptizerX</p>
        </div>
      </div>

    </div>
  )
}

export default Footer
