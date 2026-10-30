import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContextValue'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible, setVisible] = useState(false)
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true);
        }
        else {
            setVisible(false)
        }
    }, [location])
    
  return showSearch && visible ? (
    <div style={{ backgroundColor: '#B0D1E4' }} className='text-center border-t border-b'>
      <div style={{ borderColor: '#7aafc9' }} className='inline-flex items-center justify-center border px-5 py-3.5 my-5 mx-3 rounded-full w-2/3 sm:w-1/3 max-w-md bg-white'>
        <input value={search} onChange={(e) => setSearch(e.target.value)} className='flex-1 text-sm outline-none bg-inherit sm:text-base' type="text" placeholder='Search'/>
        <img className='w-4' src={assets.search_icon} alt="" />
      </div>
      <img onClick={() => { setShowSearch(false); setSearch(''); }} className='inline w-3 cursor-pointer' src={assets.cross_icon} alt="" />
    </div>
  ) : null
}

export default SearchBar