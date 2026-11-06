import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContextValue'
import { optimizeImage } from '../utils/seo'

const ProductItem = ({
  id,
  image = [],
  name = '',
  price = 0,
  originalPrice = 0,
  inStock = true,
  category = '',
  tags = []
}) => {
  const { currency, addToCart } = useContext(ShopContext);

  const [isAdded, setIsAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const soldOut = inStock === false;
  const numPrice = Number(price) || 0;
  const numOriginal = Number(originalPrice) || 0;
  const discountPct =
    numOriginal > numPrice
      ? Math.round(((numOriginal - numPrice) / numOriginal) * 100)
      : 0;

  const images = Array.isArray(image) ? image : [image].filter(Boolean);
  const primaryImg = images[0] || '';
  const secondaryImg = images[1] || null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (soldOut) return;

    addToCart(id);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <div className="group h-full flex flex-col justify-between bg-white rounded-2xl sm:rounded-[22px] border border-gray-100 hover:border-[#B0D1E4] p-3 sm:p-3.5 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_30px_rgba(176,209,228,0.35)] relative overflow-hidden select-none">
      
      {/* Clickable Card Link for Navigation */}
      <Link
        to={`/product/${id}`}
        onClick={() => scrollTo(0, 0)}
        className="flex flex-col flex-1"
      >
        {/* Image Showcase Container */}
        <div className="relative w-full aspect-square bg-[#F8FAFC] rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-center">
          
          {/* Skeleton Pulse before image loads */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
          )}

          {/* Primary Image */}
          {primaryImg && (
            <img
              src={optimizeImage(primaryImg, 600)}
              alt={`${name} — ${category || 'Dermyx skincare'} product by Dermyx`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
              decoding="async"
              className={`w-full h-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-105 ${
                secondaryImg ? 'group-hover:opacity-0' : ''
              } ${soldOut ? 'opacity-60 grayscale-[30%]' : ''}`}
            />
          )}

          {/* Secondary Hover Image (Catchy flip effect if 2nd image exists) */}
          {secondaryImg && !soldOut && (
            <img
              src={optimizeImage(secondaryImg, 600)}
              alt={`${name} — alternate view`}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
            />
          )}

          {/* Floating Badges (Top-Left) */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 items-start">
            {soldOut ? (
              <span className="bg-rose-600/95 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase shadow-sm">
                Sold Out
              </span>
            ) : (
              discountPct > 0 && (
                <>
                  <span className="sm:hidden inline-flex items-center bg-black text-[#BFE3FD] text-[9px] font-bold tracking-wide px-2 py-[3px] rounded-full leading-none shadow-sm">
                    {discountPct}% OFF
                  </span>
                  <span className="hidden sm:flex w-11 h-11 rounded-full bg-black text-[#BFE3FD] text-[10px] sm:text-[11px] font-bold flex-col items-center justify-center leading-none shadow-sm">
                    <b>{discountPct}%</b>
                    <span className="mt-0.5 tracking-wider">OFF</span>
                  </span>
                </>
              )
            )}
          </div>
        </div>

        {/* Product Information */}
        <div className="pt-3 pb-1 flex flex-col flex-1 justify-between">
          <div>
            {/* Category / Tag */}
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[11px] font-semibold tracking-wider text-[#6BA3C2] uppercase line-clamp-1">
                {category || (tags && tags[0]) || 'Skincare'}
              </span>
            </div>

            {/* Product Title */}
            <h3 className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-black line-clamp-2 min-h-[2.4rem] leading-snug transition-colors">
              {name}
            </h3>
          </div>

          <div className="mt-2.5">
            {/* Price Row */}
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-sm sm:text-base font-bold text-gray-900 tracking-tight">
                {currency} {numPrice.toLocaleString()}
              </span>
              {numOriginal > numPrice && (
                <span className="text-xs text-gray-400 line-through font-medium">
                  {currency} {numOriginal.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Interactive Action Button: Add to Cart */}
      <div className="mt-3 pt-1">
        <button
          type="button"
          disabled={soldOut}
          onClick={handleAddToCart}
          className={`w-full py-2.5 px-3 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-sm ${
            soldOut
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
              : isAdded
              ? 'bg-emerald-500 text-white shadow-emerald-200 shadow-md scale-[1.02]'
              : 'bg-[#B0D1E4] hover:bg-[#97c4dc] text-gray-900 hover:shadow-md'
          }`}
        >
          {soldOut ? (
            <span>Out of Stock</span>
          ) : isAdded ? (
            <>
              <svg className="w-4 h-4 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span>Added to Bag!</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span>Add to Bag</span>
            </>
          )}
        </button>
      </div>

    </div>
  )
}

export default ProductItem
