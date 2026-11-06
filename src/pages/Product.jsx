import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContextValue'
import RelatedProducts from '../components/RelatedProducts'
import ProductReviews from '../components/ProductReviews'
import Seo from '../components/Seo'
import { MdCheckCircle, MdExpandMore } from 'react-icons/md'
import { getTiers } from '../utils/bundlePricing'
import { SITE_URL, optimizeImage, pageUrl, stripText } from '../utils/seo'

const Product = () => {

  const { productId } = useParams()
  const { products, currency, setBundleQuantity, navigate } = useContext(ShopContext)
  const [productData, setProductData] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const [selectedTier, setSelectedTier] = useState(1)
  const [showIngredients, setShowIngredients] = useState(false)

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

  if (!productData) return <div className='opacity-0'></div>

  const outOfStock = productData.inStock === false
  const productUrl = pageUrl(`/product/${productId}`)
  const cleanDescription = stripText(productData.description)
  const ingredientsText = typeof productData.ingredients === 'string' ? productData.ingredients.trim() : ''
  const ingredientLines = ingredientsText ? ingredientsText.split(/[\n,]+/).map((line) => line.trim()).filter(Boolean) : []
  const seoDescription = cleanDescription.slice(0, 158)
  const categoryPath = `/collection?category=${encodeURIComponent(productData.category)}`

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: productData.name,
        description: cleanDescription,
        image: (productData.image || []).slice(0, 4),
        sku: productData._id,
        category: productData.category,
        brand: { '@type': 'Brand', name: 'Dermyx' },
        offers: {
          '@type': 'Offer',
          url: productUrl,
          priceCurrency: 'PKR',
          price: productData.price,
          availability: outOfStock ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller: { '@type': 'Organization', name: 'Dermyx Skincare' },
        },
        ...(Number(productData.reviewCount) > 0 && Number(productData.rating) > 0
          ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: productData.rating, reviewCount: productData.reviewCount } }
          : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: productData.category, item: `${SITE_URL}${categoryPath}` },
          { '@type': 'ListItem', position: 3, name: productData.name, item: productUrl },
        ],
      },
    ],
  }

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <Seo
        title={productData.name}
        description={seoDescription}
        path={`/product/${productId}`}
        image={(productData.image || [])[0]}
        type='product'
        keywords={['dermyx', productData.name, productData.category, 'buy online pakistan'].join(', ')}
        jsonLd={productJsonLd}
      />

      <nav aria-label='Breadcrumb' className='mb-5 flex flex-wrap items-center gap-2 text-xs text-gray-500'>
        <Link to='/' className='hover:text-black transition-colors'>Home</Link>
        <span aria-hidden='true'>/</span>
        <Link to={categoryPath} className='hover:text-black transition-colors'>{productData.category}</Link>
        <span aria-hidden='true'>/</span>
        <span className='text-gray-800 font-medium'>{productData.name}</span>
      </nav>

      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Main image — auto-cycles every 5s, thumbnails pick a frame */}
        <div className='flex-1'>
          <div className='w-full flex items-center justify-center'>
            <img
              className='w-full h-auto max-h-[500px] object-contain transition-opacity duration-500'
              src={optimizeImage(productData.image[imgIndex], 1000)}
              alt={`${productData.name} — ${productData.category} by Dermyx`}
              loading='eager'
              decoding='async'
            />
          </div>

          {productData.image.length > 1 && (
            <div className='mt-3 flex gap-2 sm:gap-3 overflow-x-auto pb-1'>
              {productData.image.map((url, i) => (
                <button
                  key={i}
                  type='button'
                  onClick={() => setImgIndex(i)}
                  aria-label={`Show image ${i + 1} of ${productData.image.length}`}
                  aria-current={imgIndex === i}
                  className={`shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-md overflow-hidden border-2 transition-colors cursor-pointer ${
                    imgIndex === i ? 'border-black' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={optimizeImage(url, 200)}
                    alt={`${productData.name} — image ${i + 1}`}
                    className='w-full h-full object-cover'
                    loading='lazy'
                    decoding='async'
                  />
                </button>
              ))}
            </div>
          )}
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

          {/* ── Ingredients (FAQ) ── */}
          {ingredientLines.length > 0 && (
            <div className='mt-6 md:w-4/5 border border-gray-200 rounded-xl overflow-hidden'>
              <button
                type='button'
                onClick={() => setShowIngredients((open) => !open)}
                aria-expanded={showIngredients}
                aria-controls='product-ingredients'
                className='w-full flex items-center justify-between gap-4 px-4 py-3 text-left cursor-pointer hover:bg-gray-50 transition-colors'
              >
                <span className='text-sm font-semibold text-gray-800'>Ingredients</span>
                <MdExpandMore
                  className={`text-xl text-gray-500 transition-transform duration-300 ${showIngredients ? 'rotate-180' : ''}`}
                />
              </button>
              {showIngredients && (
                <div
                  id='product-ingredients'
                  className='px-4 pb-4 flex flex-col gap-1 text-sm text-gray-600 leading-relaxed'
                >
                  {ingredientLines.map((line, i) => (
                    <span key={i} className='block'>{line}</span>
                  ))}
                </div>
              )}
            </div>
          )}

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
              navigate('/place-order');
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
  )
}

export default Product
