import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContextValue'
import Title from './Title';

const CartTotal = ({ discount = 0, couponCode = '', children = null }) => {

    const {currency,delivery_fee,getCartAmount} = useContext(ShopContext);
    const subtotal = getCartAmount();
    const total = subtotal === 0 ? 0 : +(subtotal + delivery_fee - discount).toFixed(2);

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
                        <p>{currency} {delivery_fee.toFixed(2)}</p>
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
