import React from 'react'
import Title from '../components/Title'
import { Link } from 'react-router-dom'

const Section = ({ title, children }) => (
  <div className='mb-8'>
    <h2 className='text-lg font-bold text-gray-900 mb-3'>{title}</h2>
    <div className='text-gray-600 text-sm leading-relaxed flex flex-col gap-3'>{children}</div>
  </div>
)

const TermsOfService = () => {
  return (
    <div className='max-w-4xl mx-auto py-10'>

      <div className='text-2xl text-center pb-6 border-t pt-8'>
        <Title text1={'TERMS OF'} text2={'SERVICE'} />
      </div>

      <Section title="OVERVIEW">
        <p>
          Welcome to Dermyx SkinCare! The terms "we", "us" and "our" refer to Dermyx SkinCare. Dermyx SkinCare operates this store and website, including all related information, content, features, tools, products and services in order to provide you, the customer, with a curated shopping experience (the "Services").
        </p>
        <p>
          The below terms and conditions (these "Terms of Service" or "Terms") describe your rights and responsibilities when you use the Services. Please read these Terms carefully, as they include important information about your legal rights, warranty disclaimers, and limitations of liability.
        </p>
        <p>
          By visiting, interacting with or using our Services, you agree to be bound by these Terms of Service and our{' '}
          <Link to='/privacy-policy' className='underline text-gray-800 hover:text-black'>Privacy Policy</Link>.
          If you do not agree, you should not use or access our Services.
        </p>
      </Section>

      <Section title="SECTION 1 - ACCESS AND ACCOUNT">
        <p>
          By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, and you have given us your consent to allow any of your minor dependents to use the Services on devices you own, purchase or manage.
        </p>
        <p>
          To use the Services, you may be asked to provide certain information such as your email address, billing, payment, and shipping information. You represent and warrant that all information you provide is correct, current and complete and that you have all rights necessary to provide it.
        </p>
        <p>
          You are solely responsible for maintaining the security of your account credentials and for all of your account activity. You may not transfer, sell, assign, or license your account to any other person.
        </p>
      </Section>

      <Section title="SECTION 2 - OUR PRODUCTS">
        <p>
          We have made every effort to provide an accurate representation of our products and services. However, colors or product appearance may differ from how they appear on your screen due to your device type and settings.
        </p>
        <p>
          We do not warrant that the appearance or quality of any products purchased will meet your expectations or be the same as depicted in our store. All product descriptions are subject to change at any time without notice at our sole discretion. We reserve the right to discontinue any product at any time and may limit quantities offered to any person, geographic region or jurisdiction.
        </p>
      </Section>

      <Section title="SECTION 3 - ORDERS">
        <p>
          When you place an order, you are making an offer to purchase. Dermyx SkinCare reserves the right to accept or decline your order for any reason at its discretion. Your order is not accepted until Dermyx SkinCare confirms acceptance. We must receive and process your payment before your order is accepted.
        </p>
        <p>
          Please review your order carefully before submitting, as Dermyx SkinCare may be unable to accommodate cancellation requests after an order is accepted. If we do not accept or cancel an order, we will attempt to notify you via the contact details provided at the time of the order.
        </p>
        <p>
          Your purchases are subject to return or exchange solely in accordance with our{' '}
          <Link to='/refund-policy' className='underline text-gray-800 hover:text-black'>Refund Policy</Link>.
          You represent and warrant that your purchases are for your own personal or household use and not for commercial resale or export.
        </p>
      </Section>

      <Section title="SECTION 4 - PRICES AND BILLING">
        <p>
          Prices, discounts and promotions are subject to change without notice. The price charged for a product will be the price in effect at the time the order is placed and will be set out in your order confirmation email. Unless otherwise stated, posted prices do not include taxes, shipping, handling, customs or import charges.
        </p>
        <p>
          We accept Cash on Delivery (COD) as our payment method. Payment is collected upon delivery of your order.
        </p>
        <p>
          You agree to provide current, complete and accurate information for all purchases. We reserve the right to refuse or cancel any order if we suspect fraud or unauthorized activity.
        </p>
      </Section>

      <Section title="SECTION 5 - SHIPPING AND DELIVERY">
        <p>
          We are not liable for shipping and delivery delays. All delivery times are estimates only and are not guaranteed. We are not responsible for delays caused by shipping carriers, customs processing, or events outside our control.
        </p>
        <p>
          Once we transfer products to the carrier, title and risk of loss passes to you. Please refer to our{' '}
          <Link to='/shipping-policy' className='underline text-gray-800 hover:text-black'>Shipping Policy</Link> for full details.
        </p>
      </Section>

      <Section title="SECTION 6 - INTELLECTUAL PROPERTY">
        <p>
          Our Services, including all trademarks, brands, text, displays, images, graphics, product reviews, video, and audio, are owned by Dermyx SkinCare, its affiliates or licensors and are protected by applicable intellectual property laws.
        </p>
        <p>
          These Terms permit you to use the Services for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, republish, download, store, or transmit any material from the Services without our prior written consent.
        </p>
        <p>
          Dermyx SkinCare's names, logos, product and service names, designs, and slogans are trademarks of Dermyx SkinCare or its affiliates. You must not use such trademarks without prior written permission. All rights not expressly granted herein are reserved.
        </p>
      </Section>

      <Section title="SECTION 7 - OPTIONAL TOOLS">
        <p>
          You may be provided with access to tools offered by third parties as part of the Services, which we neither monitor nor have any control over. We provide access to such tools "as is" and "as available" without any warranties or endorsement. Any use of optional third-party tools is entirely at your own risk.
        </p>
      </Section>

      <Section title="SECTION 8 - THIRD-PARTY LINKS">
        <p>
          The Services may contain links to websites operated by third parties. We are not responsible for the content or accuracy of any third-party materials or websites. If you leave the Services to access third-party sites, you do so at your own risk. Complaints regarding third-party products and services should be directed to the third-party.
        </p>
      </Section>

      <Section title="SECTION 9 - PRIVACY POLICY">
        <p>
          All personal information we collect through the Services is subject to our{' '}
          <Link to='/privacy-policy' className='underline text-gray-800 hover:text-black'>Privacy Policy</Link>.
          By using the Services, you acknowledge that you have read and agree to our privacy practices.
        </p>
      </Section>

      <Section title="SECTION 10 - FEEDBACK">
        <p>
          If you submit any ideas, suggestions, feedback, reviews, or other content ("Feedback"), you grant us a perpetual, worldwide, sublicensable, royalty-free license to use, reproduce, modify, publish, distribute and display such Feedback for any purpose, including commercial use.
        </p>
        <p>
          You represent and warrant that you own or have all necessary rights to all Feedback you submit, and that your Feedback will not violate any third-party rights or these Terms. You are solely responsible for any Feedback you make and its accuracy.
        </p>
      </Section>

      <Section title="SECTION 11 - ERRORS, INACCURACIES AND OMISSIONS">
        <p>
          Occasionally there may be information on the Services that contains typographical errors, inaccuracies or omissions relating to product descriptions, pricing, promotions, shipping charges, or availability. We reserve the right to correct any errors or omissions and to change or update information at any time without prior notice.
        </p>
      </Section>

      <Section title="SECTION 12 - PROHIBITED USES">
        <p>You may access and use the Services for lawful purposes only. You may not use the Services:</p>
        <ul className='list-disc pl-5 flex flex-col gap-2'>
          <li>For any unlawful or malicious purpose</li>
          <li>To violate any regulations, rules, laws, or local ordinances</li>
          <li>To infringe upon our intellectual property rights or those of others</li>
          <li>To harass, abuse, harm, defame, or intimidate any person</li>
          <li>To transmit false or misleading information</li>
          <li>To transmit advertising or promotional material (spam)</li>
          <li>To impersonate any other person or entity</li>
          <li>To upload viruses or malicious code</li>
          <li>To collect or track the personal information of others</li>
          <li>To use any automated tools, scrapers, or bots to access the Services</li>
        </ul>
        <p>
          We reserve the right to suspend, disable, or terminate your account at any time, without notice, if we determine that you have violated any part of these Terms.
        </p>
      </Section>

      <Section title="SECTION 13 - TERMINATION">
        <p>
          We may terminate this agreement or your access to the Services at any time without notice, and you will remain liable for all amounts due up to the date of termination. Provisions relating to Intellectual Property, Feedback, Disclaimer of Warranties, Limitation of Liability, Indemnification, and Governing Law will survive any termination.
        </p>
      </Section>

      <Section title="SECTION 14 - DISCLAIMER OF WARRANTIES">
        <p>
          The information presented on or through the Services is made available solely for general information purposes. We do not warrant the accuracy, completeness, or usefulness of this information.
        </p>
        <p className='uppercase text-xs text-gray-500'>
          Except as expressly stated by Dermyx SkinCare, the Services and all products offered through the Services are provided "as is" and "as available" for your use, without any representation, warranties or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, fitness for a particular purpose, durability, title, and non-infringement.
        </p>
      </Section>

      <Section title="SECTION 15 - LIMITATION OF LIABILITY">
        <p className='uppercase text-xs text-gray-500'>
          To the fullest extent provided by law, in no case shall Dermyx SkinCare, our partners, directors, officers, employees, affiliates, agents, contractors, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including without limitation, lost profits, lost revenue, lost savings, loss of data, or replacement costs, whether based in contract, tort, strict liability or otherwise, arising from your use of any of the Services or any products procured using the Services.
        </p>
      </Section>

      <Section title="SECTION 16 - INDEMNIFICATION">
        <p>
          You agree to indemnify, defend and hold harmless Dermyx SkinCare and our affiliates, partners, officers, directors, employees, agents, contractors, licensors, and service providers from any losses, damages, liabilities or claims, including reasonable attorneys' fees, arising out of (1) your breach of these Terms, (2) your violation of any law or the rights of a third party, or (3) your access to and use of the Services.
        </p>
      </Section>

      <Section title="SECTION 17 - SEVERABILITY">
        <p>
          In the event that any provision of these Terms is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed severed from these Terms without affecting the validity and enforceability of any other remaining provisions.
        </p>
      </Section>

      <Section title="SECTION 18 - WAIVER; ENTIRE AGREEMENT">
        <p>
          The failure of us to exercise or enforce any right or provision of these Terms shall not constitute a waiver of such right or provision. These Terms constitute the entire agreement between you and us and govern your use of the Services, superseding any prior agreements, communications and proposals, whether oral or written.
        </p>
      </Section>

      <Section title="SECTION 19 - ASSIGNMENT">
        <p>
          You may not delegate, transfer or assign this Agreement or any of your rights or obligations under these Terms without our prior written consent, and any such attempt will be null and void. We may transfer, assign, or delegate these Terms and our rights and obligations without consent or notice to you.
        </p>
      </Section>

      <Section title="SECTION 20 - GOVERNING LAW">
        <p>
          These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of the jurisdiction where Dermyx SkinCare is headquartered.
        </p>
      </Section>

      <Section title="SECTION 21 - CHANGES TO TERMS OF SERVICE">
        <p>
          We reserve the right, in our sole discretion, to update, change, or replace any part of these Terms of Service by posting updates to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to the Services following the posting of any changes constitutes acceptance of those changes.
        </p>
      </Section>

      <Section title="SECTION 22 - CONTACT INFORMATION">
        <p>Questions about the Terms of Service should be sent to us at:</p>
        <div className='bg-gray-50 border border-gray-200 rounded-xl p-5'>
          <a href="mailto:dermyxadvancedskincare@gmail.com" className='text-gray-700 hover:text-black underline text-sm'>
            dermyxadvancedskincare@gmail.com
          </a>
        </div>
      </Section>

    </div>
  )
}

export default TermsOfService
