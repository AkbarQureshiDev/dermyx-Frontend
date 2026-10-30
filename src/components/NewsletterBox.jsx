import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContextValue'
import { toast } from 'react-toastify'
import axios from 'axios'

const NewsletterBox = () => {

    const [email, setEmail] = useState('')
    const { backendUrl } = useContext(ShopContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(backendUrl + '/api/newsletter/subscribe', { email })
            if (response.data.success) {
                toast.success(response.data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    style: { background: '#f0f9ff', color: '#1e40af', fontWeight: '600', borderLeft: '4px solid #1d4ed8' }
                })
                setEmail('')
            } else {
                toast.error(response.data.message, { position: "top-center" })
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

  return (
    <div className=' text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe for new product updates</p>
      <p className='text-gray-400 mt-3'>
      Be the first to know when we add exciting new collections and products to our store!
      </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input onChange={(e) => setEmail(e.target.value)} value={email} className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required/>
        <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsletterBox
