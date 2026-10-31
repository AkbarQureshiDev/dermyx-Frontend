import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContextValue'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { bundleUnitPrice, sizeLabel } from '../utils/bundlePricing';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        if (!products.some(p => p._id === items)) continue;
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products])

  const soldOutItems = cartData.filter(({ _id }) => {
    const product = products.find((p) => p._id === _id);
    return product && product.inStock === false;
  });

  // Waiting on the product list must not flash the empty state over a real cart.
  const isEmpty = cartData.length === 0 && products.length > 0;

  if (isEmpty) {
    return (
      <div className='border-t pt-14 min-h-[50vh] flex flex-col items-center justify-center text-center px-4'>
        <img className='w-16 sm:w-20 opacity-60 mb-6' src={assets.cart_icon} alt="" />
        <p className='text-lg sm:text-2xl font-medium text-gray-700'>Your cart is empty</p>
        <p className='text-sm text-gray-500 mt-2 mb-8'>Browse the store and add something you love.</p>
        <button
          onClick={() => navigate('/collection')}
          className='bg-black text-white text-sm px-8 py-3 hover:bg-gray-800 active:bg-gray-700 transition-colors'
        >
          CONTINUE SHOPPING
        </button>
      </div>
    )
  }

  return (
    <div className='border-t pt-14'>

      <div className=' text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {
          cartData.map((item, index) => {

            const productData = products.find((product) => product._id === item._id);

            if (!productData) return null;

            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className=' flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={Array.isArray(productData.image) ? productData.image[0] : (productData.image || assets.cart_icon)} alt={productData.name} />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2 flex-wrap'>
                      {(() => {
                        const unit = bundleUnitPrice(productData.price, item.quantity);
                        const lineTotal = +(unit * item.quantity).toFixed(2);
                        const tierLabel = item.quantity > 1 ? sizeLabel(item.size, item.quantity) : null;
                        const soldOut = productData.inStock === false;
                        return (
                          <>
                            <p>{currency}{lineTotal.toFixed(2)}</p>
                            {tierLabel && (
                              <span className='text-[11px] font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full'>
                                {tierLabel}
                              </span>
                            )}
                            {soldOut && (
                              <span className='text-[11px] font-semibold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full'>
                                OUT OF STOCK
                              </span>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
                <input
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (e.target.value === '' || val === 0) return;
                    if (val >= 4) { e.target.value = 3; return; }
                    updateQuantity(item._id, item.size, val);
                  }}
                  className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                  type="number"
                  min={1}
                  max={3}
                  defaultValue={item.quantity}
                />
                <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
              </div>
            )

          })
        }
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          {soldOutItems.length > 0 && (
            <p className='mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3'>
              Some items in your cart are out of stock. Remove them to continue.
            </p>
          )}
          <CartTotal />
          <div className=' w-full text-end'>
            <button
              onClick={() => {
                if (soldOutItems.length > 0) return;
                navigate('/place-order')
              }}
              disabled={cartData.length === 0 || soldOutItems.length > 0}
              className={`text-white text-sm my-8 px-8 py-3 transition-all duration-200 ${(cartData.length === 0 || soldOutItems.length > 0) ? 'bg-gray-300 cursor-not-allowed opacity-60' : 'bg-black hover:bg-gray-800 cursor-pointer'}`}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart
