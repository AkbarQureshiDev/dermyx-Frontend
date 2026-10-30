import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContextValue'
import RelatedProducts from '../components/RelatedProducts'
import ProductReviews from '../components/ProductReviews'
import { MdCheckCircle } from 'react-icons/md'
import { getTiers } from '../utils/bundlePricing'

const Product = () => {

  const { productId } = useParams()
  const { products, currency, setBundleQuantity, navigate, token } = useContext(ShopContext)
  const [productData, setProductData] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const [selectedTier, setSelectedTier] = useState(1)

  // Auto-cycle images every 5 seconds
  useEffect(() => {
    if (!productData || !productData.image || productData.image.length <= 1) return
    const timer = setInterval(() => {
      setImgIndex(prev => (prev + 1) % productData.image.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [productData])

  useEffect(() => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item)
      }
    })
  }, [productId, products])

  const outOfStock = productData?.inStock === false

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Main image only — auto-cycles every 5s if multiple */}
        <div className='flex-1'>
          <img
            className='w-full h-auto transition-opacity duration-500'
            src={productData.image[imgIndex]}
            alt={productData.name}
          />
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>

          <div className='mt-3 flex items-center gap-2'>
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wide px-2.5 py-1 rounded-full border
              ${outOfStock
                ? 'bg-red-50 text-red-600 border-red-200'
                : 'bg-green-50 text-green-700 border-green-200'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${outOfStock ? 'bg-red-500' : 'bg-green-500'}`} />
              {outOfStock ? 'OUT OF STOCK' : 'IN STOCK'}
            </span>
          </div>

          <p className='mt-5 text-3xl font-medium'>
            {currency}{productData.price}
            {productData.originalPrice > 0 && (
              <span className='text-gray-400 line-through text-lg ml-3'>{currency}{productData.originalPrice}</span>
            )}
          </p>

          {/* Features with tick marks — each on its own line */}
          {productData.features && productData.features.length > 0 && (
            <div className='mt-5 flex flex-col gap-2'>
              {productData.features.map((feature, i) => (
                <div key={i} className='flex items-center gap-2'>
                  <MdCheckCircle className='text-green-600 flex-shrink-0' />
                  <span className='text-sm text-gray-700'>{feature}</span>
                </div>
              ))}
            </div>
          )}

          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

          {/* ── Buy More Save More ── */}
          {(() => {
            const tiers = getTiers(productData.price);

            return (
              <div className='mt-8 md:w-4/5'>
                {/* Header */}
                <div className='flex items-center gap-3 mb-4'>
                  <hr className='flex-1 border-gray-300' />
                  <span className='text-sm font-semibold text-gray-600 whitespace-nowrap tracking-wide'>
                    Buy More Save More
                  </span>
                  <hr className='flex-1 border-gray-300' />
                </div>

                {/* Tier cards */}
                <div className='flex flex-col gap-3'>
                  {tiers.map((tier) => {
                    const isSelected = selectedTier === tier.qty;
                    const saving = tier.original ? (tier.original - tier.total).toFixed(2) : null;

                    return (
                      <div
                        key={tier.qty}
                        onClick={() => setSelectedTier(tier.qty)}
                        className={`relative flex items-center gap-3 rounded-xl border-2 px-4 py-3 cursor-pointer transition-all
                          ${isSelected
                            ? 'border-blue-400 bg-blue-50'
                            : 'border-blue-100 bg-white hover:border-blue-200'
                          }`}
                      >
                        {/* Most Popular ribbon */}
                        {tier.ribbon && (
                          <span className='absolute -top-[1px] right-3 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-b-md'>
                            {tier.ribbon}
                          </span>
                        )}

                        {/* Radio indicator */}
                        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                          ${isSelected ? 'border-blue-500' : 'border-gray-400'}`}
                        >
                          {isSelected && <div className='w-2 h-2 rounded-full bg-blue-500' />}
                        </div>

                        {/* Label + subtitle */}
                        <div className='flex-1'>
                          <div className='flex items-center gap-2'>
                            <span className='font-semibold text-sm text-gray-800'>{tier.label}</span>
                            {tier.badge && (
                              <span className='text-[11px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full'>
                                {tier.badge}
                              </span>
                            )}
                          </div>
                          {saving && (
                            <p className='text-[12px] text-green-600 mt-0.5'>
                              You Save {currency}{saving}
                            </p>
                          )}
                        </div>

                        {/* Price */}
                        <div className='text-right'>
                          <p className='font-bold text-sm text-gray-900'>
                            {currency}{tier.total.toFixed(2)}
                          </p>
                          {tier.original && (
                            <p className='text-xs text-gray-400 line-through'>
                              {currency}{tier.original.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Action buttons */}
          {(() => {
            const handleAddToCart = () => {
              if (outOfStock) return;
              setBundleQuantity(productData._id, selectedTier);
            };
            const handleBuyNow = () => {
              if (outOfStock) return;
              setBundleQuantity(productData._id, selectedTier);
              if (token) {
                navigate('/place-order');
              } else {
                sessionStorage.setItem('redirectAfterLogin', '/place-order');
                navigate('/login');
              }
            };
            if (outOfStock) {
              return (
                <div className='mt-6 md:w-4/5'>
                  <button
                    disabled
                    className='w-full bg-gray-200 text-gray-500 px-6 py-3 text-sm font-medium cursor-not-allowed'
                  >
                    OUT OF STOCK
                  </button>
                  <p className='text-xs text-gray-500 mt-2'>
                    This product is currently unavailable. Message us on WhatsApp to be notified when it is back.
                  </p>
                </div>
              );
            }
            return (
              <div className='flex gap-3 mt-6 md:w-4/5'>
                <button
                  onClick={handleAddToCart}
                  className='flex-1 border-2 border-black text-black px-6 py-3 text-sm font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors'
                >
                  ADD TO CART
                </button>
                <button
                  onClick={handleBuyNow}
                  className='flex-1 bg-black text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 active:bg-gray-700 transition-colors'
                >
                  BUY IT NOW
                </button>
              </div>
            );
          })()}

          <hr className='mt-8 sm:w-4/5' />

        </div>
      </div>

      {/* Reviews */}
      <div className='mt-16 max-w-[1200px]'>
        <ProductReviews productId={productId} />
      </div>

      <RelatedProducts category={productData.category} />

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
