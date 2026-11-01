import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import RefundPolicy from './pages/RefundPolicy'
import ShippingPolicy from './pages/ShippingPolicy'
import TermsOfService from './pages/TermsOfService'

import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Seo from './components/Seo'

const STATIC_SEO = {
  '/about': {
    title: 'About Dermyx Skincare | Dermatologist-Tested Skincare in Pakistan',
    description: 'Dermyx brings dermatologist-grade formulas to Pakistani skin — accessible, affordable and real. Meet the team behind CLENZIC, LUVANTE, SUNBAE and FOLIGROW.',
  },
  '/contact': {
    title: 'Contact Dermyx Skincare',
    description: 'Contact Dermyx Skincare for orders, delivery questions or product advice. WhatsApp, email and social support for customers across Pakistan.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy',
    description: 'How Dermyx Skincare collects, uses and protects your personal data when you shop skincare online in Pakistan.',
  },
  '/refund-policy': {
    title: 'Refund & Return Policy',
    description: 'Dermyx refund and return policy — eligibility, timelines and how to start a return for your skincare order.',
  },
  '/shipping-policy': {
    title: 'Shipping Policy',
    description: 'Dermyx shipping policy — delivery times, charges and cash on delivery details for skincare orders across Pakistan.',
  },
  '/terms-of-service': {
    title: 'Terms of Service',
    description: 'Terms of service for shopping skincare and haircare with Dermyx Skincare online.',
  },
  '/cart': { title: 'Your Cart', description: 'Review the Dermyx products in your bag, update quantities and continue to checkout.', noindex: true },
  '/login': { title: 'Sign In', description: 'Sign in to your Dermyx account to track orders and check out faster.', noindex: true },
  '/place-order': { title: 'Checkout', description: 'Complete your Dermyx order with delivery details and cash on delivery or online payment.', noindex: true },
  '/orders': { title: 'My Orders', description: 'Track your Dermyx skincare orders, delivery status and history.', noindex: true },
}

const App = () => {
  const { pathname } = useLocation()
  const staticSeo = STATIC_SEO[pathname]

  return (
    <div className='w-full min-h-screen bg-white'>
      <ToastContainer />
      {staticSeo && <Seo path={pathname} {...staticSeo} />}
      
      {/* Full width Header & Navbar */}
      <Navbar />

      <Routes>
        {/* Home page handles its own padding internally to allow full-width Hero */}
        <Route path='/' element={<Home />} />
        
        {/* Other pages wrapped in standard padding */}
        <Route path='/collection' element={<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'><Collection /></div>} />
        <Route path='/bundles' element={<Navigate to='/collection?tag=bundle' replace />} />
        <Route path='/about' element={<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'><About /></div>} />
        <Route path='/contact' element={<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'><Contact /></div>} />
        <Route path='/privacy-policy' element={<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'><PrivacyPolicy /></div>} />
        <Route path='/refund-policy' element={<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'><RefundPolicy /></div>} />
        <Route path='/shipping-policy' element={<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'><ShippingPolicy /></div>} />
        <Route path='/terms-of-service' element={<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'><TermsOfService /></div>} />

        <Route path='/product/:productId' element={<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'><Product /></div>} />
        <Route path='/cart' element={<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'><Cart /></div>} />
        <Route path='/login' element={<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'><Login /></div>} />
        <Route path='/place-order' element={<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'><PlaceOrder /></div>} />
        <Route path='/orders' element={<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'><Orders /></div>} />
      </Routes>

      {/* Footer with standard padding */}
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <Footer />
      </div>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/923125249877?text=Hi%2C%20how%20can%20you%20help%20me%3F"
        target="_blank"
        rel="noopener noreferrer"
        className='fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebe5d] transition-colors rounded-full w-14 h-14 flex items-center justify-center shadow-lg'
        aria-label="Chat with us on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="30" height="30" fill="white">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.472 2.027 7.77L0 32l8.437-2.01A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.2a13.17 13.17 0 0 1-6.71-1.83l-.48-.285-4.99 1.19 1.234-4.865-.314-.5A13.14 13.14 0 0 1 2.8 16C2.8 8.71 8.71 2.8 16 2.8S29.2 8.71 29.2 16 23.29 29.2 16 29.2zm7.18-9.71c-.394-.197-2.33-1.149-2.692-1.28-.362-.13-.625-.197-.888.197-.263.394-1.02 1.28-1.25 1.543-.23.263-.46.296-.854.099-.394-.197-1.663-.613-3.167-1.953-1.17-1.044-1.96-2.333-2.19-2.727-.23-.394-.025-.607.173-.803.177-.176.394-.46.591-.689.197-.23.263-.394.394-.657.131-.263.066-.493-.033-.69-.099-.197-.888-2.14-1.217-2.929-.32-.768-.645-.664-.888-.676l-.756-.013c-.263 0-.69.099-.1051.493-.362.394-1.382 1.35-1.382 3.293 0 1.942 1.414 3.818 1.611 4.081.197.263 2.783 4.25 6.742 5.962.943.407 1.678.65 2.25.832.945.3 1.805.258 2.486.156.758-.113 2.33-.953 2.66-1.873.329-.92.329-1.708.23-1.873-.099-.164-.362-.263-.756-.46z"/>
        </svg>
      </a>
    </div>
  )
}

export default App
