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

  // Show only the first image, no carousel
  return (
    <div style={{
      background: 'transparent',
      border: '1px solid #B0D1E4',
      borderRadius: '24px',
      padding: '16px 16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      transition: 'box-shadow 0.2s, transform 0.2s',
      overflow: 'hidden',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(176,209,228,0.4)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      {/* Image with autoscroll */}
      <Link to={`/product/${id}`} onClick={() => scrollTo(0, 0)} style={{
        display: 'block',
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        background: '#f0f8fd',
        aspectRatio: '1 / 1',
        width: '100%',
      }}>
        {image && image.length > 0 && (
          <img
            src={image[0]}
            alt={name}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}

        {soldOut && (
          <span style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: '#dc2626',
            color: '#fff',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            padding: '4px 10px',
            borderRadius: '999px',
            zIndex: 2,
          }}>OUT OF STOCK</span>
        )}

      </Link>

      {/* Product name */}
      <Link to={`/product/${id}`} onClick={() => scrollTo(0, 0)}>
        <p style={{
          fontSize: '14px',
          fontWeight: 600,
          color: '#1e293b',
          lineHeight: 1.45,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          cursor: 'pointer',
        }}>{name}</p>
      </Link>

      {/* Price row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexWrap: 'wrap' }}>
        {originalPrice > 0 && originalPrice > price && (
          <span style={{ color: '#94a3b8', fontSize: '13px', textDecoration: 'line-through', fontWeight: 500 }}>
            {currency}{originalPrice.toLocaleString()}
          </span>
        )}
        <span style={{ color: '#B0D1E4', fontSize: '17px', fontWeight: 700 }}>
          {currency} {Number(price).toLocaleString()}
        </span>
        {discountPct > 0 && (
          <span style={{ background: '#FDF2F8', color: '#FCB4C5', fontSize: '11px', fontWeight: 700, padding: '3px 9px', borderRadius: '20px' }}>
            {discountPct}% off
          </span>
        )}
      </div>

      {/* Rating */}
      {Number(reviewCount) > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Stars rating={rating} size={13} />
          <span style={{ fontSize: '12px', color: '#64748b' }}>
            {Number(rating).toFixed(1)} ({reviewCount})
          </span>
        </div>
      )}

      {/* Add to cart button */}
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          background: soldOut ? '#e2e8f0' : '#B0D1E4',
          color: soldOut ? '#94a3b8' : '#1e293b',
          fontSize: '14px',
          fontWeight: 600,
          border: 'none',
          borderRadius: '40px',
          padding: '12px 0',
          width: '100%',
          cursor: soldOut ? 'not-allowed' : 'pointer',
          marginTop: 'auto',
          transition: 'background 0.2s, transform 0.15s',
        }}
        disabled={soldOut}
        onMouseEnter={e => { if (!soldOut) e.currentTarget.style.background = '#93bdd4' }}
        onMouseLeave={e => { e.currentTarget.style.background = soldOut ? '#e2e8f0' : '#B0D1E4' }}
        onClick={() => { if (!soldOut) addToCart(id) }}
      >
        <svg style={{ width: '17px', height: '17px', flexShrink: 0 }} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
          <path d='M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z' />
          <line x1='3' y1='6' x2='21' y2='6' />
          <path d='M16 10a4 4 0 01-8 0' />
        </svg>
        {soldOut ? 'Out of stock' : 'Add to cart'}
      </button>
    </div>
  )
}

export default BestSellerCard
