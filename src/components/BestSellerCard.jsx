import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContextValue'
import Stars from './Stars'

const BestSellerCard = ({ id, image, name, price, originalPrice, inStock, rating, reviewCount }) => {
  const { currency, addToCart } = useContext(ShopContext)
  const soldOut = inStock === false

  const discountPct =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0

  return (
    <div
      className="bg-transparent border border-[#B0D1E4] rounded-2xl sm:rounded-[24px] p-2.5 sm:p-4 pb-3 sm:pb-5 flex flex-col gap-2 sm:gap-3 transition-all duration-200 overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(176,209,228,0.4)] h-full"
    >
      {/* Product Image */}
      <Link
        to={`/product/${id}`}
        onClick={() => scrollTo(0, 0)}
        className="block relative rounded-xl sm:rounded-2xl overflow-hidden bg-[#f0f8fd] aspect-square w-full"
      >
        {image && image.length > 0 && (
          <img
            src={image[0]}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {soldOut && (
          <span className="absolute top-2 left-2 bg-[#dc2626] text-white text-[9px] sm:text-[10px] font-bold tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full z-10">
            OUT OF STOCK
          </span>
        )}
      </Link>

      {/* Product name */}
      <Link to={`/product/${id}`} onClick={() => scrollTo(0, 0)}>
        <p className="text-xs sm:text-sm font-semibold text-[#1e293b] leading-snug line-clamp-2 cursor-pointer min-h-[2rem] sm:min-h-[2.5rem]">
          {name}
        </p>
      </Link>

      {/* Price row */}
      <div className="flex items-baseline gap-1 sm:gap-2 flex-wrap">
        {originalPrice > 0 && originalPrice > price && (
          <span className="text-[#94a3b8] text-[11px] sm:text-[13px] line-through font-medium">
            {currency}{originalPrice.toLocaleString()}
          </span>
        )}
        <span className="text-[#B0D1E4] text-sm sm:text-[17px] font-bold">
          {currency} {Number(price).toLocaleString()}
        </span>
        {discountPct > 0 && (
          <span className="bg-[#FDF2F8] text-[#FCB4C5] text-[10px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full">
            {discountPct}% off
          </span>
        )}
      </div>

      {/* Rating */}
      {Number(reviewCount) > 0 && (
        <div className="flex items-center gap-1 sm:gap-1.5">
          <Stars rating={rating} size={12} />
          <span className="text-[11px] sm:text-xs text-[#64748b]">
            {Number(rating).toFixed(1)} ({reviewCount})
          </span>
        </div>
      )}

      {/* Add to cart button */}
      <button
        type="button"
        disabled={soldOut}
        onClick={() => { if (!soldOut) addToCart(id) }}
        className={`w-full py-2 sm:py-3 px-2 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 mt-auto transition-colors border-0 ${
          soldOut
            ? 'bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed'
            : 'bg-[#B0D1E4] hover:bg-[#93bdd4] text-[#1e293b] cursor-pointer'
        }`}
      >
        <svg className="w-3.5 h-3.5 sm:w-[17px] sm:h-[17px] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        <span>{soldOut ? 'Out of stock' : 'Add to cart'}</span>
      </button>
    </div>
  )
}

export default BestSellerCard
