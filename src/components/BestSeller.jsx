import React, { useContext, useEffect, useState, useCallback, useRef } from 'react'
import { ShopContext } from '../context/ShopContextValue'
import Title from './Title'
import BestSellerCard from './BestSellerCard'

const BestSeller = () => {
    const { products } = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([])
    const [mobileIndex, setMobileIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const touchStartX = useRef(null)

    useEffect(() => {
        const bestProduct = products.filter(item => item.bestseller)
        setBestSeller(bestProduct)
    }, [products])

    const total = bestSeller.length

    // Safely reset index if products count changes
    useEffect(() => {
        if (mobileIndex >= total && total > 0) {
            setMobileIndex(0)
        }
    }, [total, mobileIndex])

    const goNext = useCallback(() => {
        if (isAnimating || total <= 1) return
        setIsAnimating(true)
        setTimeout(() => {
            setMobileIndex(prev => (prev + 1) % total)
            setIsAnimating(false)
        }, 220)
    }, [isAnimating, total])

    const goPrev = () => {
        if (isAnimating || total <= 1) return
        setIsAnimating(true)
        setTimeout(() => {
            setMobileIndex(prev => (prev === 0 ? total - 1 : prev - 1))
            setIsAnimating(false)
        }, 220)
    }

    // Auto-advance on mobile screen every 4.5 seconds, pauses when touched/hovered
    useEffect(() => {
        if (isPaused || total <= 1) return
        const interval = setInterval(goNext, 4500)
        return () => clearInterval(interval)
    }, [goNext, isPaused, total])

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e) => {
        if (touchStartX.current === null) return
        const touchEndX = e.changedTouches[0].clientX
        const diff = touchStartX.current - touchEndX
        if (Math.abs(diff) > 40) {
            if (diff > 0) goNext()
            else goPrev()
        }
        touchStartX.current = null
    }

    if (total === 0) return null

    const currentMobileProduct = bestSeller[mobileIndex] || bestSeller[0]

    return (
        <div className='my-10 px-4 sm:px-0 lg:my-16'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'Best'} text2={'Sellers'} />
            </div>

            {/* Desktop Layout: Multi-column grid preserved (looks good on desktop) */}
            <div className='hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 sm:gap-y-10'>
                {bestSeller.map((item, index) => (
                    <BestSellerCard
                        key={item._id || index}
                        id={item._id}
                        name={item.name}
                        image={item.image}
                        price={item.price}
                        originalPrice={item.originalPrice || 0}
                        inStock={item.inStock}
                        rating={item.rating}
                        reviewCount={item.reviewCount}
                    />
                ))}
            </div>

            {/* Mobile Screen: 1 Product at a time in the section, the others show after it */}
            <div
                className='block sm:hidden relative max-w-[340px] mx-auto'
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* Product Card Container with Smooth Transition */}
                <div
                    className={`transition-all duration-300 ease-out ${
                        isAnimating ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
                    }`}
                >
                    {currentMobileProduct && (
                        <BestSellerCard
                            id={currentMobileProduct._id}
                            name={currentMobileProduct.name}
                            image={currentMobileProduct.image}
                            price={currentMobileProduct.price}
                            originalPrice={currentMobileProduct.originalPrice || 0}
                            inStock={currentMobileProduct.inStock}
                            rating={currentMobileProduct.rating}
                            reviewCount={currentMobileProduct.reviewCount}
                        />
                    )}
                </div>

                {/* Mobile Navigation Controls: Prev & Next floating arrows */}
                {total > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={goPrev}
                            aria-label="Previous best seller"
                            className="absolute -left-3 top-1/3 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-90 transition-all focus:outline-none"
                        >
                            <svg className="w-4 h-4 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            onClick={goNext}
                            aria-label="Next best seller"
                            className="absolute -right-3 top-1/3 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-90 transition-all focus:outline-none"
                        >
                            <svg className="w-4 h-4 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </>
                )}

                {/* Mobile Pagination Indicators (Dots + Counter) */}
                {total > 1 && (
                    <div className="flex flex-col items-center justify-center gap-2 mt-5">
                        <div className="flex items-center gap-1.5">
                            {bestSeller.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setMobileIndex(i)}
                                    aria-label={`Go to product ${i + 1}`}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        mobileIndex === i ? 'w-6 bg-[#B0D1E4]' : 'w-2 bg-gray-200'
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-[11px] font-medium text-gray-400">
                            {mobileIndex + 1} of {total}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BestSeller
