import React from 'react'
import Title from '../components/Title'

const Section = ({ title, children }) => (
  <div className='mb-8'>
    <h2 className='text-lg font-bold text-gray-900 mb-3'>{title}</h2>
    <div className='text-gray-600 text-sm leading-relaxed flex flex-col gap-3'>{children}</div>
  </div>
)

const RefundPolicy = () => {
  return (
    <div className='max-w-4xl mx-auto py-10'>

      <div className='text-2xl text-center pb-6 border-t pt-8'>
        <Title text1={'REFUND'} text2={'POLICY'} />
      </div>

      <p className='text-gray-600 text-sm leading-relaxed mb-10'>
        We offer a 7-day return policy for orders that are damaged, defective, or if you receive the wrong item.
      </p>

      <Section title="Eligible Returns">
        <p>You may request a return if:</p>
        <ul className='list-disc pl-5 flex flex-col gap-2'>
          <li>The product arrives damaged</li>
          <li>You receive the wrong item</li>
        </ul>
      </Section>

      <Section title="Return Request">
        <p>
          To request a return, please contact us within 7 days of receiving your order with your order details and clear photos of the issue.
        </p>
      </Section>

      <Section title="Refund or Replacement">
        <p>
          Once your return request is approved, we will arrange a replacement or refund based on the situation.
        </p>
        <p className='text-gray-500 italic'>
          Please note that returns for reasons other than damaged or incorrect items may not be accepted.
        </p>
      </Section>

    </div>
  )
}

export default RefundPolicy
