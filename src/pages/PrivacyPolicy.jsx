import React from 'react'
import Title from '../components/Title'
import { FaPhone, FaEnvelope } from 'react-icons/fa'

const Section = ({ title, children }) => (
  <div className='mb-8'>
    <h2 className='text-lg font-bold text-gray-900 mb-3'>{title}</h2>
    <div className='text-gray-600 text-sm leading-relaxed flex flex-col gap-3'>{children}</div>
  </div>
)

const PrivacyPolicy = () => {
  return (
    <div className='max-w-4xl mx-auto py-10'>
      <h1 className='sr-only'>Privacy Policy — Dermyx Skincare</h1>

      <div className='text-2xl text-center pb-6 border-t pt-8'>
        <Title text1={'PRIVACY'} text2={'POLICY'} />
      </div>

      <p className='text-xs text-gray-400 mb-8'>Last updated: July 29, 2026</p>

      <p className='text-gray-600 text-sm leading-relaxed mb-8'>
        Dermyx SkinCare operates this store and website, including all related information, content, features, tools, products and services, in order to provide you, the customer, with a curated shopping experience (the "Services"). This Privacy Policy describes how we collect, use, and disclose your personal information when you visit, use, or make a purchase or other transaction using the Services or otherwise communicate with us.
      </p>
      <p className='text-gray-600 text-sm leading-relaxed mb-10'>
        Please read this Privacy Policy carefully. By using and accessing any of the Services, you acknowledge that you have read this Privacy Policy and understand the collection, use, and disclosure of your information as described in this Privacy Policy.
      </p>

      <Section title="Personal Information We Collect or Process">
        <p>When we use the term "personal information," we are referring to information that identifies or can reasonably be linked to you or another person. We may collect or process the following categories of personal information:</p>
        <ul className='list-disc pl-5 flex flex-col gap-2'>
          <li><span className='font-medium text-gray-800'>Contact details</span> including your name, address, billing address, shipping address, phone number, and email address.</li>
          <li><span className='font-medium text-gray-800'>Financial information</span> including credit card, debit card, and financial account numbers, payment card information, transaction details, form of payment, and other payment details.</li>
          <li><span className='font-medium text-gray-800'>Account information</span> including your username, password, security questions, preferences and settings.</li>
          <li><span className='font-medium text-gray-800'>Transaction information</span> including the items you view, put in your cart, purchase, return, exchange or cancel and your past transactions.</li>
          <li><span className='font-medium text-gray-800'>Communications with us</span> including the information you include in communications with us, for example, when sending a customer support inquiry.</li>
          <li><span className='font-medium text-gray-800'>Device information</span> including information about your device, browser, or network connection, your IP address, and other unique identifiers.</li>
          <li><span className='font-medium text-gray-800'>Usage information</span> including information regarding your interaction with the Services.</li>
        </ul>
      </Section>

      <Section title="Personal Information Sources">
        <p>We may collect personal information from the following sources:</p>
        <ul className='list-disc pl-5 flex flex-col gap-2'>
          <li><span className='font-medium text-gray-800'>Directly from you</span> including when you create an account, visit or use the Services, communicate with us, or otherwise provide us with your personal information.</li>
          <li><span className='font-medium text-gray-800'>Automatically through the Services</span> including from your device when you use our products or services or visit our websites, and through the use of cookies and similar technologies.</li>
          <li><span className='font-medium text-gray-800'>From our service providers</span> including when we engage them to enable certain technology and when they collect or process your personal information on our behalf.</li>
          <li><span className='font-medium text-gray-800'>From our partners or other third parties.</span></li>
        </ul>
      </Section>

      <Section title="How We Use Your Personal Information">
        <ul className='list-disc pl-5 flex flex-col gap-2'>
          <li><span className='font-medium text-gray-800'>Provide, Tailor, and Improve the Services.</span> We use your personal information to process your payments, fulfill your orders, remember your preferences, send notifications related to your account, arrange for shipping, and create a customized shopping experience for you.</li>
          <li><span className='font-medium text-gray-800'>Marketing and Advertising.</span> We use your personal information to send marketing, advertising and promotional communications by email, text message or postal mail, and to show you online advertisements.</li>
          <li><span className='font-medium text-gray-800'>Security and Fraud Prevention.</span> We use your personal information to authenticate your account, provide a secure payment experience, and detect or investigate possible fraudulent or malicious activity.</li>
          <li><span className='font-medium text-gray-800'>Communicating with You.</span> We use your personal information to provide you with customer support and to maintain our business relationship with you.</li>
          <li><span className='font-medium text-gray-800'>Legal Reasons.</span> We use your personal information to comply with applicable law or respond to valid legal process.</li>
        </ul>
      </Section>

      <Section title="How We Disclose Personal Information">
        <p>In certain circumstances, we may disclose your personal information to third parties for legitimate purposes, including:</p>
        <ul className='list-disc pl-5 flex flex-col gap-2'>
          <li>With vendors and other third parties who perform services on our behalf (e.g. IT management, payment processing, data analytics, customer support, cloud storage, fulfillment and shipping).</li>
          <li>With business and marketing partners to provide marketing services and advertise to you.</li>
          <li>When you direct, request, or otherwise consent to our disclosure of certain information to third parties.</li>
          <li>With our affiliates or otherwise within our corporate group.</li>
          <li>In connection with a business transaction such as a merger or bankruptcy, or to comply with any applicable legal obligations.</li>
        </ul>
      </Section>

      <Section title="Third Party Websites and Links">
        <p>The Services may provide links to websites or other online platforms operated by third parties. We do not guarantee and are not responsible for the privacy or security of such sites. Our inclusion of such links does not, by itself, imply any endorsement of the content on such platforms.</p>
      </Section>

      <Section title="Children's Data">
        <p>The Services are not intended to be used by children, and we do not knowingly collect any personal information about children under the age of majority in your jurisdiction. If you are the parent or guardian of a child who has provided us with their personal information, you may contact us to request that it be deleted.</p>
      </Section>

      <Section title="Security and Retention of Your Information">
        <p>Please be aware that no security measures are perfect or impenetrable, and we cannot guarantee "perfect security." In addition, any information you send to us may not be secure while in transit. We recommend that you do not use unsecure channels to communicate sensitive or confidential information to us.</p>
        <p>How long we retain your personal information depends on different factors, such as whether we need the information to maintain your account, to provide you with Services, comply with legal obligations, resolve disputes or enforce other applicable contracts and policies.</p>
      </Section>

      <Section title="Your Rights and Choices">
        <p>Depending on where you live, you may have some or all of the rights listed below in relation to your personal information:</p>
        <ul className='list-disc pl-5 flex flex-col gap-2'>
          <li><span className='font-medium text-gray-800'>Right to Access / Know.</span> You may have a right to request access to personal information that we hold about you.</li>
          <li><span className='font-medium text-gray-800'>Right to Delete.</span> You may have a right to request that we delete personal information we maintain about you.</li>
          <li><span className='font-medium text-gray-800'>Right to Correct.</span> You may have a right to request that we correct inaccurate personal information we maintain about you.</li>
          <li><span className='font-medium text-gray-800'>Right of Portability.</span> You may have a right to receive a copy of the personal information we hold about you and to request that we transfer it to a third party.</li>
          <li><span className='font-medium text-gray-800'>Managing Communication Preferences.</span> We may send you promotional emails, and you may opt out of receiving these at any time by using the unsubscribe option displayed in our emails.</li>
        </ul>
      </Section>

      <Section title="Complaints">
        <p>If you have complaints about how we process your personal information, please contact us using the contact details provided below. Depending on where you live, you may have the right to appeal our decision or lodge your complaint with your local data protection authority.</p>
      </Section>

      <Section title="Changes to This Privacy Policy">
        <p>We may update this Privacy Policy from time to time, including to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will post the revised Privacy Policy on this website and update the "Last updated" date.</p>
      </Section>

      <Section title="Contact">
        <p>Should you have any questions about our privacy practices or this Privacy Policy, or if you would like to exercise any of the rights available to you, please contact us:</p>
        <div className='bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col gap-3'>
          <a href="tel:+923331912513" className='flex items-center gap-3 text-gray-700 hover:text-black transition-colors'>
            <FaPhone size={15} className='text-gray-500' />
            <span>+92 333 1912513</span>
          </a>
          <a href="mailto:dermyxadvancedskincare@gmail.com" className='flex items-center gap-3 text-gray-700 hover:text-black transition-colors'>
            <FaEnvelope size={15} className='text-gray-500' />
            <span>dermyxadvancedskincare@gmail.com</span>
          </a>
        </div>
      </Section>

    </div>
  )
}

export default PrivacyPolicy
