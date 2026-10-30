import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { ShopContext } from './ShopContextValue'
import { bundleUnitPrice, normalizeCart } from '../utils/bundlePricing'

// Ensure requests specify JSON acceptance to prevent 406 Not Acceptable responses
axios.defaults.headers.common['Accept'] = 'application/json';

const ShopContextProvider = (props) => {

    const currency = 'Rs.';
    const delivery_fee = 250;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const readStoredCart = () => {
        try {
            return normalizeCart(JSON.parse(localStorage.getItem('cartItems') || '{}'))
        } catch {
            return {}
        }
    }
    const [cartItems, setCartItems] = useState(readStoredCart);
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('')
    const navigate = useNavigate();


    const isOutOfStock = (itemId) => {
        const product = products.find((p) => p._id === itemId);
        return product ? product.inStock === false : false;
    }

    const addToCart = async (itemId) => {
        const size = 'default';
        if (isOutOfStock(itemId)) {
            toast.error('This product is out of stock.');
            return;
        }
        let cartData = normalizeCart(cartItems);

        const currentQty = cartData[itemId]?.[size] || 0;
        const nextQty = currentQty + 1;
        cartData[itemId] = { ...(cartData[itemId] || {}), [size]: nextQty };
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size, quantity: nextQty }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    // Selecting a "Buy 2 / Buy 3" tier replaces the product's cart line so the
    // bundle never stacks next to an older tier choice.
    const setBundleQuantity = async (itemId, qty) => {
        const size = 'default';
        if (isOutOfStock(itemId)) {
            toast.error('This product is out of stock.');
            return;
        }
        let cartData = normalizeCart(cartItems);

        cartData[itemId] = { [size]: qty };
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size, quantity: qty }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (products.length > 0 && !products.some(p => p._id === items)) continue;
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = normalizeCart(cartItems);

        cartData[itemId] = { ...(cartData[itemId] || {}), [size]: quantity };

        setCartItems(cartData)

        if (token) {
            try {

                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            if (products.length > 0 && !products.some(p => p._id === items)) continue;
            let itemInfo = products.find((product) => product._id === items);
            if (!itemInfo) continue;
            for (const item in cartItems[items]) {
                const qty = cartItems[items][item];
                if (qty > 0) {
                    totalAmount += bundleUnitPrice(itemInfo.price, qty) * qty;
                }
            }
        }
        return +totalAmount.toFixed(2);
    }

    const getProductsData = async () => {
        try {

            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async ( token ) => {
        try {
            
            const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
            if (response.data.success) {
                setCartItems(normalizeCart(response.data.cartData))
            } else if (response.data.message?.toLowerCase().includes('token') || response.data.message?.toLowerCase().includes('login again') || response.data.message === 'jwt expired') {
                localStorage.removeItem('token')
                sessionStorage.removeItem('token')
                setToken('')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // A cart built while signed out must survive the login trip: the server
    // returns the union of the guest cart and the saved account cart.
    const mergeGuestCart = async (guestCart, token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/merge', { mergeData: guestCart }, { headers: { token } })
            if (response.data.success) {
                setCartItems(normalizeCart(response.data.cartData))
                return
            }
        } catch (error) {
            console.log(error)
        }
        await getUserCart(token)
    }

    useEffect(() => {
        getProductsData()
        // Stock flags are edited in the admin app; pulling the list when the tab
        // regains focus keeps the storefront tag in step without a hard reload.
        const refetch = () => { if (document.visibilityState === 'visible') getProductsData() }
        window.addEventListener('focus', refetch)
        document.addEventListener('visibilitychange', refetch)
        return () => {
            window.removeEventListener('focus', refetch)
            document.removeEventListener('visibilitychange', refetch)
        }
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
        } else if (!token && sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'))
        } else if (token) {
            mergeGuestCart(normalizeCart(cartItems), token)
        }
    }, [token])

    // A cart must survive a page refresh, not just in-app navigation.
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

    // A token signed with an old secret (or simply expired) is unrecoverable, so
    // any authenticated call reporting it drops the dead session instead of
    // surfacing "invalid signature" to the shopper.
    const resettingSession = useRef(false)
    useEffect(() => {
        const isDeadSession = (data) => data?.success === false && (
            data.sessionExpired === true ||
            /invalid signature|jwt expired|not authorized login again/i.test(data.message || '')
        )
        if (token) resettingSession.current = false
        const id = axios.interceptors.response.use((response) => {
            if (isDeadSession(response.data) && !resettingSession.current) {
                resettingSession.current = true
                localStorage.removeItem('token')
                sessionStorage.removeItem('token')
                setToken('')
                const path = window.location.pathname
                if (path === '/place-order' || path === '/orders') {
                    sessionStorage.setItem('redirectAfterLogin', path)
                    navigate('/login')
                }
                toast.error(/not authorized login again/i.test(response.data.message || '')
                    ? 'Please log in to continue.'
                    : response.data.message)
            }
            return response
        })
        return () => axios.interceptors.response.eject(id)
    }, [token, navigate])

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setBundleQuantity, setCartItems,
        getCartCount, updateQuantity, isOutOfStock,
        getCartAmount, navigate, backendUrl,
        setToken, token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;