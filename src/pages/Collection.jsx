import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContextValue'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [tag, setTag] = useState('');
  const [sortType, setSortType] = useState('relavent');
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setCategory([categoryParam]);
    } else {
      setCategory([]);
    }

    const tagParam = searchParams.get('tag');
    setTag(tagParam || '');
  }, [location.search]);

  const toggleCategory = (catName) => {
    if (category.includes(catName)) {
      setCategory(prev => prev.filter(item => item !== catName));
    } else {
      setCategory(prev => [...prev, catName]);
    }
  };

  const clearAllFilters = () => {
    setCategory([]);
    setTag('');
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (tag) {
      productsCopy = productsCopy.filter(item => item.tags && item.tags.includes(tag));
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, tag, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  // Extract all categories dynamically or fallback
  const availableCategories = ['Face Care', 'Hair Care', 'Skin Care'];

  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 pt-8 sm:pt-10 border-t border-gray-100">
      
      {/* Filter Sidebar — sticks under the header once its top edge reaches it */}
      <div
        className="min-w-64 sm:w-64 flex-shrink-0 sm:sticky sm:self-start sm:h-fit"
        style={{ top: 'calc(var(--header-h, 0px) + 1rem)' }}
      >
        
        {/* Mobile toggle button */}
        <button
          type="button"
          onClick={() => setShowFilter(!showFilter)}
          className="w-full flex sm:hidden items-center justify-between py-3 px-4 bg-gray-50 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
            FILTERS
            {category.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#B0D1E4] text-xs flex items-center justify-center font-bold">
                {category.length}
              </span>
            )}
          </span>
          <img
            className={`h-3 transition-transform duration-200 ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </button>

        {/* Filters Box */}
        <div className={`bg-white sm:rounded-2xl sm:border sm:border-gray-100 sm:p-5 mt-4 sm:mt-0 ${showFilter ? 'block' : 'hidden'} sm:block`}>
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
            <p className="text-sm font-bold tracking-wider text-gray-900 uppercase">
              Categories
            </p>
            {category.length > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-[#6BA3C2] hover:text-gray-900 font-medium transition-colors"
              >
                Reset
              </button>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {availableCategories.map(cat => {
              const isChecked = category.includes(cat);
              const count = products.filter(p => p.category === cat).length;

              return (
                <label
                  key={cat}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      value={cat}
                      onChange={() => toggleCategory(cat)}
                      checked={isChecked}
                      className="w-4 h-4 rounded text-blue-500 focus:ring-blue-400 border-gray-300 cursor-pointer accent-[#7caec7]"
                    />
                    <span className={`text-sm ${isChecked ? 'font-semibold text-gray-900' : 'text-gray-600 group-hover:text-gray-900'} transition-colors`}>
                      {cat}
                    </span>
                  </div>
                  {count > 0 && (
                    <span className="text-[11px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {count}
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        </div>

      </div>

      {/* Right Products Area */}
      <div className="flex-1">

        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <Title text1={tag === 'bundle' ? 'BUNDLES' : 'ALL'} text2={tag === 'bundle' ? '' : 'COLLECTIONS'} />
            <p className="text-xs text-gray-500 font-medium mt-1">
              Showing <span className="font-semibold text-gray-800">{filterProducts.length}</span> {filterProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs font-medium text-gray-500 hidden sm:inline">Sort:</span>
            <div className="relative">
              <select
                aria-label="Sort products"
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-full text-xs sm:text-sm font-medium text-gray-700 pl-4 pr-9 py-2 hover:border-[#B0D1E4] focus:outline-none focus:ring-2 focus:ring-[#B0D1E4]/50 cursor-pointer shadow-sm transition-all"
              >
                <option value="relavent">Featured / Relevant</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {(category.length > 0 || tag) && (
          <div className="flex flex-wrap items-center gap-2 mb-6 pt-1">
            <span className="text-xs text-gray-400 font-medium mr-1">Active filters:</span>
            {category.map(cat => (
              <span
                key={cat}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#E8F3FA] text-[#2C6B8D] border border-[#B0D1E4]"
              >
                {cat}
                <button
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  aria-label={`Remove filter ${cat}`}
                  className="hover:text-red-500 focus:outline-none ml-0.5"
                >
                  ✕
                </button>
              </span>
            ))}
            {tag && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#E8F3FA] text-[#2C6B8D] border border-[#B0D1E4]">
                Tag: {tag}
                <button
                  type="button"
                  onClick={() => setTag('')}
                  aria-label="Remove tag filter"
                  className="hover:text-red-500 focus:outline-none ml-0.5"
                >
                  ✕
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs text-gray-500 hover:text-gray-900 underline ml-2 cursor-pointer font-medium"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Products Grid */}
        {filterProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 sm:gap-6 sm:gap-y-8 items-stretch">
            {filterProducts.map((item, index) => (
              <ProductItem
                key={item._id || index}
                id={item._id}
                name={item.name}
                price={item.price}
                originalPrice={item.originalPrice}
                image={item.image}
                inStock={item.inStock}
                rating={item.rating}
                reviewCount={item.reviewCount}
                category={item.category}
                bestseller={item.bestseller}
                badge={item.badge}
                tags={item.tags}
              />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="py-20 px-4 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200 mt-6 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">No products found</h3>
            <p className="text-sm text-gray-500 max-w-sm mb-6">
              We couldn't find any products matching your current filters. Try relaxing or resetting your filters.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-2.5 rounded-full bg-[#B0D1E4] hover:bg-[#97c4dc] text-gray-900 font-semibold text-xs sm:text-sm shadow-sm transition-all active:scale-95"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

    </div>
  );
};

export default Collection;
