import React, { useState } from 'react'

const faqs = [
  {
    q: 'What is your return policy?',
    a: 'We offer a 7-day return policy for orders that arrive damaged, defective, or if you receive the wrong item. Please contact us within 7 days of receiving your order with photos of the issue.'
  },
  {
    q: 'How long does delivery take?',
    a: 'Orders are usually processed within 1–2 business days. Delivery typically takes 3–7 business days depending on your location.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We currently accept Cash on Delivery (COD). If you want to send payment online, please contact us on WhatsApp for further details regarding online payment options.'
  },
  {
    q: 'Can I cancel or change my order after placing it?',
    a: 'We process orders quickly, so cancellations may not always be possible after an order is confirmed. Please contact us as soon as possible and we will do our best to help.'
  },
  {
    q: 'Are your products suitable for sensitive skin?',
    a: 'Our products are formulated with skin health in mind. However, we recommend checking the ingredient list for each product and doing a patch test if you have sensitive skin.'
  },
]

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className='border-b border-gray-200'>
      <button
        onClick={() => setOpen(!open)}
        className='w-full flex justify-between items-center py-4 text-left text-sm font-medium text-gray-800 hover:text-black transition-colors'
      >
        <span>{q}</span>
        <span className='text-lg leading-none ml-4'>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <p className='pb-4 text-sm text-gray-600 leading-relaxed'>{a}</p>
      )}
    </div>
  )
}

const Faqs = () => {
  return (
    <div className='my-16'>
      <div className='text-center mb-8'>
        <p className='prata-regular text-2xl sm:text-3xl text-gray-500'>Frequently Asked <span className='text-gray-700 font-medium'>Questions</span></p>
      </div>
      <div className='max-w-[1000px] mx-auto'>
        {faqs.map((faq, i) => (
          <FaqItem key={i} q={faq.q} a={faq.a} />
        ))}
      </div>
    </div>
  )
}

export default Faqs
