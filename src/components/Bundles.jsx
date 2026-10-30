import React, { useContext, useEffect, useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContextValue'
import Title from './Title'

const Bundles = () => {

    const { products, currency, addToCart } = useContext(ShopContext)
    const [bundles, setBundles] = useState([])
    const [startIndex, setStartIndex] = useState(0)
    const [animating, setAnimating] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const bundleProducts = products.filter((item) =>
            item.tags && item.tags.includes('bundle')
        )
        setBundles(bundleProducts)
    }, [products])

    const needsCarousel = bundles.length > 4

    const goNext = useCallback(() => {
        if (!needsCarousel || animating) return
        setAnimating(true)
        setTimeout(() => {
            setStartIndex((prev) => (prev + 1) % bundles.length)
            setAnimating(false)
        }, 300)
    }, [needsCarousel, animating, bundles.length])

    const goPrev = () => {
        if (!needsCarousel || animating) return
        setAnimating(true)
        setTimeout(() => {
            setStartIndex((prev) => (prev === 0 ? bundles.length - 1 : prev - 1))
            setAnimating(false)
        }, 300)
    }

    // Auto-scroll every 4 seconds
    useEffect(() => {
        if (!needsCarousel || isPaused) return
        const timer = setInterval(goNext, 4000)
        return () => clearInterval(timer)
    }, [goNext, needsCarousel, isPaused])

    const handleAddToCart = (e, itemId) => {
        e.preventDefault()
        e.stopPropagation()
        addToCart(itemId)
        navigate('/cart')
    }

    const getVisibleBundles = () => {
        if (!needsCarousel) return bundles
        const visible = []
        for (let i = 0; i < 4; i++) {
            visible.push(bundles[(startIndex + i) % bundles.length])
        }
        return visible
    }

    if (bundles.length === 0) return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'Save More'} text2={'With Bundles'} />
            </div>
        </div>
    )

    const BundleCard = ({ item, index }) => {
        const imgUrl = Array.isArray(item.image) ? item.image[0] : item.image
        return (
            <Link
                key={item._id || index}
                to={`/product/${item._id}`}
                className="group relative block aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
                {/* Full cover image */}
                <div className="absolute inset-0">
                    <img
                        src={imgUrl}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Title - small, black text on white pill */}
                <div className="absolute top-3 left-3 right-3 z-10">
                    <h3 className="text-black bg-white/80 backdrop-blur-sm rounded-xl px-3 py-1.5 text-xs sm:text-sm font-semibold tracking-wide uppercase leading-tight line-clamp-1 inline-block max-w-full">
                        {item.name}
                    </h3>
                </div>

                {/* Bottom action bar */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="bg-white/40 backdrop-blur-md border border-white/30 rounded-full p-2 pl-6 flex items-center justify-between shadow-lg transition-all duration-300 group-hover:bg-white/50">
                        <span className="text-white font-extrabold text-base sm:text-lg tracking-tight drop-shadow">
                            {currency}{Number(item.price).toFixed(2)}
                        </span>
                        <button
                            onClick={(e) => handleAddToCart(e, item._id)}
                            aria-label="Add to Cart"
                            className="w-11 h-11 bg-slate-950 text-white rounded-full flex items-center justify-center shadow-md transform transition-all duration-300 group-hover:scale-105 active:scale-95"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                <path d="M16 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM21 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7.1 14h12.8a1 1 0 0 0 .9-.6l3.6-7.2a1 1 0 0 0-.9-1.4H5.2L4.3 2.1A1 1 0 0 0 3.3 1.3H1v2h1.4l3.6 8a1 1 0 0 0 .9.7z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </Link>
        )
    }

    return (
        <div
            className='my-10 lg:my-16 lg:py-[30px] px-4 max-w-7xl mx-auto'
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className='text-center text-3xl py-8'>
                <Title text1={'Save More'} text2={'With Bundles'} />
            </div>

            {needsCarousel ? (
                <div className="relative flex items-center">
                    {/* Left arrow */}
                    <button
                        onClick={goPrev}
                        aria-label="Previous"
                        className="absolute left-0 z-10 w-10 h-10 bg-white rounded-full shadow-lg hidden sm:flex items-center justify-center hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-200 -translate-x-4"
                    >
                        <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    {/* Mobile: horizontal scroll showing 1.5 cards */}
                    <div className="flex sm:hidden w-full overflow-x-auto gap-4 pb-2 snap-x snap-mandatory scrollbar-hide">
                        {bundles.map((item, index) => (
                            <div key={item._id || index} className="snap-start flex-shrink-0 w-[70vw]">
                                <BundleCard item={item} index={index} />
                            </div>
                        ))}
                    </div>

                    {/* Desktop: carousel grid */}
                    <div className={`hidden sm:grid grid-cols-4 gap-6 w-full px-8 transition-opacity duration-300 ${animating ? 'opacity-0' : 'opacity-100'}`}>
                        {getVisibleBundles().map((item, index) => (
                            <BundleCard key={`${item._id}-${index}`} item={item} index={index} />
                        ))}
                    </div>

                    {/* Right arrow */}
                    <button
                        onClick={goNext}
                        aria-label="Next"
                        className="absolute right-0 z-10 w-10 h-10 bg-white rounded-full shadow-lg hidden sm:flex items-center justify-center hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-200 translate-x-4"
                    >
                        <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>

                    {/* Dots - desktop only */}
                    <div className="absolute -bottom-8 left-0 right-0 hidden sm:flex justify-center gap-2">
                        {bundles.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setStartIndex(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${startIndex === i ? 'bg-gray-700 w-6' : 'bg-gray-300 w-2'}`}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="relative">
                    {/* Mobile: horizontal scroll showing 1.5 cards */}
                    <div className="flex sm:hidden w-full overflow-x-auto gap-4 pb-2 snap-x snap-mandatory scrollbar-hide">
                        {bundles.map((item, index) => (
                            <div key={item._id || index} className="snap-start flex-shrink-0 w-[70vw]">
                                <BundleCard item={item} index={index} />
                            </div>
                        ))}
                    </div>
                    {/* Desktop: regular grid */}
                    <div className='hidden sm:grid grid-cols-2 md:grid-cols-4 gap-6 gap-y-8'>
                        {bundles.map((item, index) => (
                            <BundleCard key={item._id || index} item={item} index={index} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Bundles
