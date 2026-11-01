import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContextValue'
import Title from './Title';
import { shippingFeeFor } from '../utils/shipping';

const CartTotal = ({ discount = 0, couponCode = '', children = null }) => {

    const {currency,delivery_fee,getCartAmount} = useContext(ShopContext);
    const subtotal = getCartAmount();
    const shipping = shippingFeeFor(subtotal, delivery_fee);
    const total = subtotal === 0 ? 0 : +(subtotal + shipping - discount).toFixed(2);

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>Subtotal</p>
                <p>{currency} {subtotal.toFixed(2)}</p>
            </div>
            <hr />
            {subtotal > 0 && (
                <>
                    <div className='flex justify-between'>
                        <p>Shipping Fee</p>
                        <p className={shipping === 0 ? 'font-semibold text-emerald-700' : ''}>
                            {shipping === 0 ? 'FREE' : `${currency} ${shipping.toFixed(2)}`}
                        </p>
                    </div>
                    <hr />
                </>
            )}
            {children}
            {discount > 0 && (
                <>
                    <div className='flex justify-between text-emerald-700'>
                        <p>Discount{couponCode ? ` (${couponCode})` : ''}</p>
                        <p>- {currency} {discount.toFixed(2)}</p>
                    </div>
                    <hr />
                </>
            )}
            <div className='flex justify-between'>
                <b>Total</b>
                <b>{currency} {total.toFixed(2)}</b>
            </div>
      </div>
    </div>
  )
}

export default CartTotal
