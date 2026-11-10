import React, { useContext, useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContextValue'

const announcements = [
    { text: '✦ 11:11 Sale Is Live Now — 20% Off · Shop Now', to: '/collection' },
    { text: '✦ Free Shipping On Orders Over Rs 3000' },
    { text: '✦ Limited Time Offer' },
    { text: '✦ Free Shipping On Orders Over Rs 3000' },
]

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const { setShowSearch, setSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
    const headerRef = useRef(null);
    const [collapsed, setCollapsed] = useState(false);

    // Collapse the announcement + category bars once the user scrolls into the page.
    // Hysteresis on the thresholds stops the header flickering at the boundary.
    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 120) setCollapsed(true);
            else if (window.scrollY < 40) setCollapsed(false);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Publish the live header height so sticky sidebars can offset below it.
    // Re-runs on every collapse toggle: apply() reads the height immediately,
    // transitionend catches the settled value, and the observer covers reflows
    // (font loading, wrapping) that happen without a state change.
    useEffect(() => {
        const el = headerRef.current;
        if (!el) return;
        const apply = () => document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`);
        apply();
        el.addEventListener('transitionend', apply);
        const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(apply) : null;
        ro?.observe(el);
        window.addEventListener('resize', apply);
        return () => {
            el.removeEventListener('transitionend', apply);
            ro?.disconnect();
            window.removeEventListener('resize', apply);
        };
    }, [collapsed]);

    // Typewriter effect state
    const searchKeywords = [
        "Hairfall Treatment Shampoo",
        "Skin Brightening Cream",
        "Purifying Face Cleanser",
        "Sunblock Sebum Control"
    ];
    const [placeholderText, setPlaceholderText] = useState('');
    const [keywordIndex, setKeywordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentFullText = searchKeywords[keywordIndex];
        let timer;

        if (!isDeleting) {
            // Typing forward
            if (placeholderText.length < currentFullText.length) {
                timer = setTimeout(() => {
                    setPlaceholderText(currentFullText.slice(0, placeholderText.length + 1));
                }, 90);
            } else {
                // Finished typing full keyword, pause before deleting
                timer = setTimeout(() => {
                    setIsDeleting(true);
                }, 1800);
            }
        } else {
            // Deleting backward
            if (placeholderText.length > 0) {
                timer = setTimeout(() => {
                    setPlaceholderText(currentFullText.slice(0, placeholderText.length - 1));
                }, 40);
            } else {
                // Finished deleting, move to next keyword
                setIsDeleting(false);
                setKeywordIndex((prev) => (prev + 1) % searchKeywords.length);
            }
        }

        return () => clearTimeout(timer);
    }, [placeholderText, isDeleting, keywordIndex]);

    const logout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        setToken('');
        setCartItems({});
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const query = searchInput.trim() || placeholderText;
        if (query) {
            setSearch(query);
            setShowSearch(true);
            navigate('/collection');
        }
    };

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
        setSearch(e.target.value);
        if (e.target.value.trim()) {
            setShowSearch(true);
        } else {
            setShowSearch(false);
        }
    };

    const renderSearchBar = (customClasses) => (
        <form 
            onSubmit={handleSearchSubmit} 
            className={`flex items-center relative rounded-full border border-[#2b6cb0] bg-white px-3 sm:px-4 py-1.5 sm:py-2 shadow-sm hover:shadow-md focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200 ${customClasses}`}
        >
            <button type="submit" className='flex items-center justify-center text-[#2b6cb0] hover:scale-110 transition-transform mr-2.5 flex-shrink-0'>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>

            <div className='relative flex items-center flex-1 h-full overflow-hidden'>
                <input 
                    type="text" 
                    value={searchInput}
                    onChange={handleSearchChange}
                    className='relative z-10 w-full text-sm font-semibold text-center bg-transparent outline-none sm:text-left sm:text-base text-[#2b6cb0]'
                />
                
                {!searchInput && (
                    <span className='absolute left-1/2 -translate-x-1/2 sm:left-0 sm:-translate-x-0 flex items-center overflow-hidden text-sm font-semibold pointer-events-none sm:text-base text-[#2b6cb0] whitespace-nowrap text-ellipsis'>
                        {placeholderText}
                        <span className='inline-block w-0.5 h-4 sm:h-5 bg-[#2b6cb0] ml-0.5 animate-pulse'></span>
                    </span>
                )}
            </div>
        </form>
    );

    return (
        <header ref={headerRef} className={`w-full font-sans bg-white select-none sticky top-0 z-[60] transition-shadow duration-300 ${collapsed ? 'shadow-lg' : ''}`}>
            {/* ------------ Top Announcement Bar (hides on scroll) ------------ */}
            <div className={`overflow-hidden transition-all duration-300 ease-out ${collapsed ? 'max-h-0 opacity-0' : 'max-h-23 opacity-100'}`}>
                <div className='bg-[#BFE3FD] text-black py-4 px-4 text-xs sm:text-sm font-semibold tracking-wider uppercase overflow-hidden'>
                <div className='flex w-max animate-marquee-banner whitespace-nowrap'>
                    {[...announcements, ...announcements].map((item, i) => (
                        item.to ? (
                            <Link key={i} to={item.to} className='mx-8 hover:underline underline-offset-4'>{item.text}</Link>
                        ) : (
                            <span key={i} className='mx-8'>{item.text}</span>
                        )
                    ))}
                </div>
                <style>{`
                    @keyframes marquee-banner {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-marquee-banner {
                        animation: marquee-banner 25s linear infinite;
                    }
                `}</style>
                </div>
            </div>

            {/* ------------ Middle Main Header Section ------------ */}
            <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-4 sm:py-5 flex items-center justify-between border-b border-gray-100 relative'>
                {/* Left Side: Search Bar & Mobile Hamburger Menu Toggle Button */}
                <div className='flex items-center gap-4'>
                    <div className='flex items-center md:hidden'>
                        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-6 h-6 transition-opacity cursor-pointer opacity-80 hover:opacity-100' alt="Menu" />
                    </div>

                    {/* Search Input Box */}
                    {renderSearchBar('hidden sm:flex w-[220px] md:w-[280px] lg:w-[340px] xl:w-[380px]')}
                </div>

                {/* Center: Brand Logo */}
                <div className='absolute left-1/2 -translate-x-1/2 flex items-center justify-center'>
                    <Link to='/' className='flex items-center justify-center'>
                        {assets.logo ? (
                            <img src={assets.logo} className='object-contain h-12 sm:h-16' alt="Skinkit Logo" />
                        ) : (
                            <div className='flex items-center gap-1.5'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L9.5 8.5 3 9.5 8 14l-1.5 6.5L12 17l5.5 3.5L16 14l5-4.5-6.5-1z" />
                                </svg>
                                <span className='text-2xl font-bold tracking-widest text-black uppercase prata-regular sm:text-3xl'>Skinkit</span>
                            </div>
                        )}
                    </Link>
                </div>

                {/* Right Side: Mobile Search Icon, Profile, Cart */}
                <div className='flex items-center gap-4 sm:gap-6'>
                    {/* Mobile Search Icon removed as full search bar is shown below */}

                    {/* Profile Dropdown Icon */}
                    <div className='relative group'>
                        <img onClick={() => token ? null : navigate('/login')} className='w-5 h-5 transition-opacity cursor-pointer sm:w-6 sm:h-6 opacity-90 hover:opacity-100' src={assets.profile_icon} alt="Account" />
                        {token && (
                            <div className='absolute right-0 z-50 hidden pt-3 group-hover:block dropdown-menu'>
                                <div className='flex flex-col gap-2 px-5 py-3 text-xs font-semibold text-gray-700 bg-white border border-gray-100 rounded-lg shadow-xl w-36'>
                                    <p className='transition-colors cursor-pointer hover:text-black'>My Profile</p>
                                    <p onClick={() => navigate('/orders')} className='transition-colors cursor-pointer hover:text-black'>Orders</p>
                                    <p onClick={logout} className='transition-colors cursor-pointer hover:text-black'>Logout</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Cart Icon with Dropdown Preview */}
                    <div className='relative group'>
                        <Link to='/cart' className='relative flex items-center justify-center'>
                            <img src={assets.cart_icon} className='w-5 h-5 sm:w-6 sm:h-6' alt="Cart" />
                            <span className='absolute -top-2 -right-2.5 w-4 sm:w-5 h-4 sm:h-5 bg-black text-white aspect-square rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm'>
                                {getCartCount()}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* ------------ Mobile Search Bar (Below Header) ------------ */}
            <div className='block sm:hidden px-4 pb-3 border-b border-gray-100 bg-white pt-1'>
                {renderSearchBar('w-full')}
            </div>

            {/* ------------ Bottom Navigation Category Links Bar (hides on scroll) ------------ */}
            <div className={`hidden md:block w-full bg-white overflow-hidden transition-all duration-300 ease-out ${collapsed ? 'max-h-0' : 'max-h-16 border-b border-gray-200'}`}>
                <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-3.5 flex items-center justify-center gap-6 lg:gap-10 overflow-x-auto whitespace-nowrap text-xs sm:text-[13px] font-bold tracking-wider text-gray-900 uppercase'>
                    <NavLink to='/' className={({ isActive }) => `hover:text-black transition-colors ${isActive ? 'text-black border-b-2 border-black pb-1' : ''}`}>
                        HOME
                    </NavLink>
                    <NavLink to='/collection' className={({ isActive }) => `hover:text-black transition-colors ${isActive ? 'text-black border-b-2 border-black pb-1' : ''}`}>
                        ALL PRODUCTS
                    </NavLink>
                    <NavLink to='/collection?category=Face Beauty' className={({ isActive }) => `hover:text-black transition-colors ${isActive ? 'text-black border-b-2 border-black pb-1' : ''}`}>
                        FACE BEAUTY
                    </NavLink>
                    <NavLink to='/collection?category=Hair Care' className={({ isActive }) => `hover:text-black transition-colors ${isActive ? 'text-black border-b-2 border-black pb-1' : ''}`}>
                        HAIR CARE
                    </NavLink>
                    <NavLink to='/collection?category=Skin Care' className={({ isActive }) => `hover:text-black transition-colors ${isActive ? 'text-black border-b-2 border-black pb-1' : ''}`}>
                        SKIN CARE
                    </NavLink>
                    <NavLink to='/collection?tag=bundle' className={({ isActive }) => `hover:text-black transition-colors ${isActive ? 'text-black border-b-2 border-black pb-1' : ''}`}>
                        BUNDLES
                    </NavLink>
                    <NavLink to='/about' className={({ isActive }) => `hover:text-black transition-colors ${isActive ? 'text-black border-b-2 border-black pb-1' : ''}`}>
                        ABOUT
                    </NavLink>
                    <NavLink to='/contact' className={({ isActive }) => `hover:text-black transition-colors ${isActive ? 'text-black border-b-2 border-black pb-1' : ''}`}>
                        CONTACT
                    </NavLink>
                </div>
            </div>

            {/* ------------ Mobile Drawer Navigation Menu ------------ */}
            <div className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 shadow-2xl border-l z-[100] ${visible ? 'w-[80%] sm:w-[50%]' : 'w-0'}`}>
                <div className='flex flex-col text-xs font-bold tracking-wider text-gray-700 uppercase'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-3 p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="Back" />
                        <span className='font-semibold text-gray-600'>Back</span>
                    </div>

                    <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border-b border-gray-100 hover:bg-gray-50' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border-b border-gray-100 hover:bg-gray-50' to='/collection'>ALL PRODUCTS</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border-b border-gray-100 hover:bg-gray-50' to='/collection?category=Face Beauty'>FACE BEAUTY</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border-b border-gray-100 hover:bg-gray-50' to='/collection?category=Hair Care'>HAIR CARE</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border-b border-gray-100 hover:bg-gray-50' to='/collection?category=Skin Care'>SKIN CARE</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border-b border-gray-100 hover:bg-gray-50' to='/collection?tag=bundle'>BUNDLES</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border-b border-gray-100 hover:bg-gray-50' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border-b border-gray-100 hover:bg-gray-50' to='/contact'>CONTACT</NavLink>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
