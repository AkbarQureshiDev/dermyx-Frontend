import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContextValue'
import Title from './Title'
import BestSellerCard from './BestSellerCard'

const BestSeller = () => {
    const { products } = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([])

    useEffect(() => {
        const bestProduct = products.filter(item => item.bestseller)
        setBestSeller(bestProduct)
    }, [products])

    if (bestSeller.length === 0) return null

    return (
        <div className='my-10 lg:my-16'>
            <div className='text-center text-xl sm:text-3xl py-6 sm:py-8'>
                <Title text1={'Best'} text2={'Sellers'} />
            </div>

            {/* 2 cards per row on mobile, 3 on md, 4 on lg — same grid layout as Collection page */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 gap-y-6 sm:gap-y-10 items-stretch'>
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
        </div>
    )
}

export default BestSeller
