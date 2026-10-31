import React, { useState, useContext } from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'
import { toast } from 'react-toastify'
import { FaInstagram, FaFacebookF, FaTiktok, FaYoutube, FaWhatsapp, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa'
import axios from 'axios'
import { ShopContext } from '../context/ShopContextValue'

const Contact = () => {

    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
    const [loading, setLoading] = useState(false)
    const { backendUrl } = useContext(ShopContext)

    const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post(backendUrl + '/api/contact/send', form)
            if (response.data.success) {
                toast.success(response.data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    style: { background: '#f0f9ff', color: '#1e40af', fontWeight: '600', borderLeft: '4px solid #1d4ed8' }
                })
                setForm({ name: '', email: '', phone: '', message: '' })
            } else {
                toast.error(response.data.message, { position: "top-center" })
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.", { position: "top-center" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h1 className='sr-only'>Contact Dermyx Skincare — orders, delivery and product advice</h1>
            <div className='text-2xl text-center pt-8 border-t'>
                <Title text1={'CONTACT'} text2={'US'} />
            </div>

            <div className='my-10 flex flex-col md:flex-row gap-10 mb-20'>

                {/* Left — Info (hidden on mobile screen, shows on md+ desktop screens) */}
                <div className='hidden md:flex flex-col gap-6 md:w-1/2' style={{ maxWidth: '350px' }}>
                    <div className='rounded-2xl p-8 flex flex-col gap-6' style={{ backgroundColor: '#C1DCF5' }}>

                        <div className='flex items-start gap-3'>
                            <FaWhatsapp size={18} className='text-black mt-1 flex-shrink-0' />
                            <div>
                                <h3 className='text-lg font-semibold text-black mb-1'>WhatsApp</h3>
                                <p className='text-white text-sm'>+92 312 4567890</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-3'>
                            <FaPhone size={16} className='text-black mt-1 flex-shrink-0' />
                            <div>
                                <h3 className='text-lg font-semibold text-black mb-1'>Phone</h3>
                                <p className='text-white text-sm'>+92 300 0000000</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-3'>
                            <FaEnvelope size={16} className='text-black mt-1 flex-shrink-0' />
                            <div>
                                <h3 className='text-lg font-semibold text-black mb-1'>Email</h3>
                                <p className='text-white text-sm'>dermyxofficial@gmail.com</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-3'>
                            <FaClock size={16} className='text-black mt-1 flex-shrink-0' />
                            <div>
                                <h3 className='text-lg font-semibold text-black mb-1'>Business Hours</h3>
                                <p className='text-white text-sm leading-relaxed'>Available 24/7</p>
                            </div>
                        </div>

                        <div>
                            <h3 className='text-lg font-semibold text-black mb-3'>Follow Us</h3>
                            <div className='flex gap-4'>
                                <a href='https://www.instagram.com/dermyx.official' target='_blank' rel='noopener noreferrer' className='w-10 h-10 bg-black rounded-full flex items-center justify-center hover:opacity-75 transition-opacity'>
                                    <FaInstagram size={18} color='white' />
                                </a>
                                <a href='https://www.facebook.com/people/Dermyx-Advanced-Skincare/61588704674951/' target='_blank' rel='noopener noreferrer' className='w-10 h-10 bg-black rounded-full flex items-center justify-center hover:opacity-75 transition-colors'>
                                    <FaFacebookF size={18} color='white' />
                                </a>
                                <a href='https://www.tiktok.com/@dermyx.official' target='_blank' rel='noopener noreferrer' className='w-10 h-10 bg-black rounded-full flex items-center justify-center hover:opacity-75 transition-opacity'>
                                    <FaTiktok size={18} color='white' />
                                </a>
                                <a href='https://www.youtube.com/@Dermyx.official' target='_blank' rel='noopener noreferrer' className='w-10 h-10 bg-black rounded-full flex items-center justify-center hover:opacity-75 transition-colors'>
                                    <FaYoutube size={20} color='white' />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right — Form */}
                <form onSubmit={onSubmit} className='flex flex-col gap-4 w-full md:w-1/2'>
                    <h3 className='text-xl font-semibold text-gray-800'>Send us a message</h3>

                    <div className='flex flex-col gap-1'>
                        <label className='text-sm text-gray-600'>Your Name</label>
                        <input
                            name='name'
                            value={form.name}
                            onChange={onChange}
                            required
                            type='text'
                            placeholder='Ali Ahmed'
                            className='border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#1d4ed8] transition-colors'
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-sm text-gray-600'>Email Address</label>
                        <input
                            name='email'
                            value={form.email}
                            onChange={onChange}
                            required
                            type='email'
                            placeholder='ali@example.com'
                            className='border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#1d4ed8] transition-colors'
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-sm text-gray-600'>Phone Number <span className='text-gray-400'>(optional)</span></label>
                        <input
                            name='phone'
                            value={form.phone}
                            onChange={onChange}
                            type='tel'
                            placeholder='+92 300 0000000'
                            className='border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#1d4ed8] transition-colors'
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-sm text-gray-600'>Message</label>
                        <textarea
                            name='message'
                            value={form.message}
                            onChange={onChange}
                            required
                            rows={5}
                            placeholder='Write your message here...'
                            className='border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#1d4ed8] transition-colors resize-none'
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='text-black font-semibold py-3 rounded-lg transition-colors disabled:opacity-60'
                        style={{ backgroundColor: '#C1DCF5' }}
                    >
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>

            <NewsletterBox />
        </div>
    )
}

export default Contact
