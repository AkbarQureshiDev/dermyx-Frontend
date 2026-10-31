import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContextValue'
import axios from 'axios'
import { toast } from 'react-toastify'
import { bundleUnitPrice } from '../utils/bundlePricing'

const emptyAddress = {
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
};

const PlaceOrder = () => {
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products, currency } = useContext(ShopContext);
    const [loading, setLoading] = useState(false);
    const [placedOrder, setPlacedOrder] = useState(null);

    // Keep a typed address across reloads so a shopper doesn't lose it mid-form.
    const [formData, setFormData] = useState(() => {
        try {
            return { ...emptyAddress, ...JSON.parse(sessionStorage.getItem('placeOrderAddress') || '{}') };
        } catch {
            return emptyAddress;
        }
    });

    useEffect(() => {
        sessionStorage.setItem('placeOrderAddress', JSON.stringify(formData));
    }, [formData]);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (loading) return;

        try {
            setLoading(true);

            let orderItems = [];

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    const quantity = cartItems[items][item];
                    if (quantity > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items));
                        if (itemInfo) {
                            if (itemInfo.inStock === false) {
                                toast.error(`${itemInfo.name} is out of stock. Remove it to continue.`);
                                setLoading(false);
                                return;
                            }
                            // qty 2/3 carries the bundle discount, so the line the
                            // admin sees must be the discounted unit price
                            itemInfo.size = item;
                            itemInfo.quantity = quantity;
                            itemInfo.price = bundleUnitPrice(itemInfo.price, quantity);
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }

            if (orderItems.length === 0) {
                toast.error("Your cart is empty!");
                setLoading(false);
                return;
            }

            const orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            };

            // Cash on Delivery Order placement (guests allowed — no token)
            const response = await axios.post(
                backendUrl + '/api/order/place',
                orderData,
                token ? { headers: { token } } : undefined
            );
            
            if (response.data.success) {
                sessionStorage.removeItem('placeOrderAddress');
                setCartItems({});
                toast.success("Order Placed Successfully!");
                if (token) {
                    navigate('/orders');
                } else {
                    setPlacedOrder({
                        orderId: response.data.orderId,
                        email: formData.email,
                        firstName: formData.firstName,
                        amount: orderData.amount
                    });
                }
            } else {
                toast.error(response.data.message || "Failed to place order");
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    if (placedOrder) {
        return (
            <div className='min-h-[70vh] flex items-center justify-center py-16'>
                <div className='w-full max-w-lg bg-white border border-gray-100 rounded-2xl shadow-sm p-8 text-center'>
                    <div className='mx-auto w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5'>
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>

                    <h1 className='text-xl sm:text-2xl font-semibold tracking-tight text-gray-900'>Order Placed Successfully!</h1>
                    <p className='text-sm text-gray-500 mt-2 leading-relaxed'>
                        Thank you{placedOrder.firstName ? `, ${placedOrder.firstName}` : ''}. We've received your Cash on Delivery order and our team will call you shortly to confirm it.
                    </p>

                    {placedOrder.orderId && (
                        <p className='mt-5 inline-block bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-semibold text-gray-800'>
                            Order #{String(placedOrder.orderId).slice(-6).toUpperCase()}
                        </p>
                    )}

                    <p className='text-xs text-gray-500 mt-4'>
                        Total payable on delivery: {currency}{placedOrder.amount}
                        {placedOrder.email ? ` — a confirmation email is on its way to ${placedOrder.email}` : ''}.
                    </p>

                    <button
                        onClick={() => navigate('/collection')}
                        className='mt-8 w-full bg-black hover:bg-gray-800 text-white font-medium py-3.5 rounded-xl text-sm transition-colors cursor-pointer'
                    >
                        CONTINUE SHOPPING
                    </button>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col lg:flex-row justify-between gap-10 pt-12 sm:pt-20 min-h-[80vh] pb-16'>
            {/* ------------- Left Side: Delivery Information ---------------- */}
            <div className='flex flex-col gap-5 w-full lg:max-w-[520px] bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm'>
                <div className='flex items-center gap-3 border-b pb-4'>
                    <span className='flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-semibold text-sm'>1</span>
                    <div className='text-xl sm:text-2xl font-medium tracking-tight'>
                        <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                    </div>
                </div>

                <p className='text-xs sm:text-sm text-gray-500 -mt-2'>Please enter your shipping address details to complete your order.</p>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2'>
                    <div>
                        <label className='block text-xs font-semibold text-gray-600 mb-1'>First Name *</label>
                        <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-200 rounded-lg py-2.5 px-4 w-full focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm' type="text" placeholder='Ali' />
                    </div>
                    <div>
                        <label className='block text-xs font-semibold text-gray-600 mb-1'>Last Name *</label>
                        <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-200 rounded-lg py-2.5 px-4 w-full focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm' type="text" placeholder='Khan' />
                    </div>
                </div>

                <div>
                    <label className='block text-xs font-semibold text-gray-600 mb-1'>Email Address *</label>
                    <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-200 rounded-lg py-2.5 px-4 w-full focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm' type="email" placeholder='ali.khan@gmail.com' />
                </div>

                <div>
                    <label className='block text-xs font-semibold text-gray-600 mb-1'>Street Address *</label>
                    <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-200 rounded-lg py-2.5 px-4 w-full focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm' type="text" placeholder='House 12, Street 4, Block B' />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                        <label className='block text-xs font-semibold text-gray-600 mb-1'>City *</label>
                        <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-200 rounded-lg py-2.5 px-4 w-full focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm' type="text" placeholder='Lahore' />
                    </div>
                    <div>
                        <label className='block text-xs font-semibold text-gray-600 mb-1'>State / Province</label>
                        <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-200 rounded-lg py-2.5 px-4 w-full focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm' type="text" placeholder='Punjab' />
                    </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                        <label className='block text-xs font-semibold text-gray-600 mb-1'>Zipcode / Postal Code *</label>
                        <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-200 rounded-lg py-2.5 px-4 w-full focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm' type="number" placeholder='54000' />
                    </div>
                    <div>
                        <label className='block text-xs font-semibold text-gray-600 mb-1'>Country *</label>
                        <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-200 rounded-lg py-2.5 px-4 w-full focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm' type="text" placeholder='Pakistan' />
                    </div>
                </div>

                <div>
                    <label className='block text-xs font-semibold text-gray-600 mb-1'>Phone Number *</label>
                    <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-200 rounded-lg py-2.5 px-4 w-full focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm' type="tel" placeholder='0300-1234567' />
                </div>
            </div>

            {/* ------------- Right Side: Order Summary & Payment Method ------------------ */}
            <div className='flex-1 flex flex-col gap-8'>
                <div className='bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm'>
                    <div className='flex items-center gap-3 border-b pb-4 mb-6'>
                        <span className='flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-semibold text-sm'>2</span>
                        <div className='text-xl sm:text-2xl font-medium tracking-tight'>
                            <Title text1={'ORDER'} text2={'SUMMARY'} />
                        </div>
                    </div>
                    <CartTotal />
                </div>

                <div className='bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm'>
                    <div className='text-xl sm:text-2xl font-medium tracking-tight mb-4'>
                        <Title text1={'PAYMENT'} text2={'METHOD'} />
                    </div>

                    {/* Exclusive Cash on Delivery Payment Card */}
                    <div className='relative border-2 border-emerald-500 bg-emerald-50/40 rounded-xl p-5 transition-all duration-300 shadow-sm hover:shadow-md'>
                        <div className='flex items-start justify-between gap-4'>
                            <div className='flex items-center gap-3.5'>
                                <div className='w-5 h-5 rounded-full border-2 border-emerald-600 flex items-center justify-center bg-white shadow-inner'>
                                    <div className='w-2.5 h-2.5 rounded-full bg-emerald-600'></div>
                                </div>

                                <div>
                                    <div className='flex items-center gap-2.5'>
                                        <p className='font-semibold text-gray-900 text-base'>Cash on Delivery</p>
                                        <span className='bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm'>Default</span>
                                    </div>
                                    <p className='text-xs text-gray-600 mt-0.5'>Pay with cash or card upon delivery to your doorstep.</p>
                                </div>
                            </div>

                            {/* Truck & Cash Badge SVG Icon */}
                            <div className='hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 shrink-0'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Feature Badges */}
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4 pt-4 border-t border-emerald-200/60 text-xs text-emerald-900 font-medium'>
                            <div className='flex items-center gap-1.5'>
                                <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                <span>No Online Prepayment</span>
                            </div>
                            <div className='flex items-center gap-1.5'>
                                <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                <span>100% Risk-Free</span>
                            </div>
                            <div className='flex items-center gap-1.5'>
                                <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                <span>Fast Delivery</span>
                            </div>
                        </div>
                    </div>

                    {/* Submit Order Button */}
                    <div className='w-full mt-8'>
                        <button 
                            type='submit' 
                            disabled={loading}
                            className='w-full bg-black hover:bg-gray-800 text-white font-medium py-4 rounded-xl text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer'
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>PROCESSING ORDER...</span>
                                </>
                            ) : (
                                <span>PLACE ORDER (CASH ON DELIVERY)</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
