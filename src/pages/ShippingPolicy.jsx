import React from 'react'
import Title from '../components/Title'

const Section = ({ title, children }) => (
  <div className='mb-8'>
    <h2 className='text-lg font-bold text-gray-900 mb-3'>{title}</h2>
    <div className='text-gray-600 text-sm leading-relaxed flex flex-col gap-3'>{children}</div>
  </div>
)

const ShippingPolicy = () => {
  return (
    <div className='max-w-4xl mx-auto py-10'>
      <h1 className='sr-only'>Shipping Policy — Dermyx Skincare delivery across Pakistan</h1>

      <div className='text-2xl text-center pb-6 border-t pt-8'>
        <Title text1={'SHIPPING'} text2={'POLICY'} />
      </div>

      <p className='text-gray-600 text-sm leading-relaxed mb-10'>
        We process and ship all orders as quickly as possible to ensure timely delivery.
      </p>

      <Section title="Processing Time">
        <p>Orders are usually processed within 1–2 business days after confirmation.</p>
      </Section>

      <Section title="Delivery Time">
        <p>Delivery typically takes 3–7 business days depending on your location.</p>
      </Section>

      <Section title="Shipping Charges">
        <p>Shipping charges, if applicable, will be shown at checkout before you complete your order.</p>
      </Section>

      <Section title="Order Tracking">
        <p>Once your order is shipped, you will receive tracking details (if available) to monitor your package.</p>
      </Section>

      <Section title="Delays">
        <p>Delivery times may vary during holidays, sales periods, or due to courier delays beyond our control.</p>
        <p>For any shipping-related questions, please feel free to contact our support team.</p>
      </Section>

    </div>
  )
}

export default ShippingPolicy
