import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
    IoArrowBackOutline, 
    IoLocationOutline, 
    IoCheckmarkCircleOutline, 
    IoCloseCircleOutline, 
    IoWalletOutline, 
    IoCardOutline, 
    IoCashOutline, 
    IoPhonePortraitOutline,
    IoAddOutline,
    IoTrashOutline
} from 'react-icons/io5';
import { cartContext } from '../ContextApi/cartContext';
import { userContext } from '../ContextApi/userContextApi';
import InputField from '../Resuable_Comp/InputField';
import Button from '../Resuable_Comp/Button';
import SectionHeader from '../Resuable_Comp/SectionHeader';
import LoadingSkeleton from '../Resuable_Comp/LoadingSkeleton';
import './Checkout.css';

function Checkout() {
    const navigate = useNavigate();
    const { user } = useContext(userContext);
    const { fetchCartItems } = useContext(cartContext);

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Cart Items & Summary
    const [cart, setCart] = useState([]);
    const [summary, setSummary] = useState(null);

    // Address list & form
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState('');
    const [showAddressForm, setShowAddressForm] = useState(false);
    
    // Address Form State
    const [addressForm, setAddressForm] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        country: 'India',
        state: '',
        city: '',
        postalCode: '',
        fullAddress: '',
        landmark: '',
        isDefault: false
    });

    // Payment State
    const [paymentMethod, setPaymentMethod] = useState('CARD'); // CARD, UPI, WALLET, CASH
    const [simulateStatus, setSimulateStatus] = useState('success'); // success, failure
    
    // Card simulation inputs
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    
    // UPI simulation inputs
    const [upiId, setUpiId] = useState('');

    // Placed Order Result State
    const [orderResult, setOrderResult] = useState(null);

    useEffect(() => {
        if (!user) {
            toast.info('Please log in to proceed to checkout.');
            navigate('/auth/login');
            return;
        }
        
        const initCheckout = async () => {
            try {
                // 1. Fetch addresses
                const addrRes = await axios.get('http://localhost:3000/user/addresses', { withCredentials: true });
                const addrs = addrRes.data.data || [];
                setAddresses(addrs);
                
                // Select default address if exists
                const defaultAddr = addrs.find(a => a.isDefault);
                if (defaultAddr) {
                    setSelectedAddressId(defaultAddr._id);
                } else if (addrs.length > 0) {
                    setSelectedAddressId(addrs[0]._id);
                }

                // 2. Fetch cart summary
                const sumRes = await axios.get('http://localhost:3000/order/summary', { withCredentials: true });
                setSummary(sumRes.data.data);

                // 3. Fetch cart items
                const cartRes = await fetchCartItems(user.data._id);
                setCart(cartRes.data.data.items || []);

                setLoading(false);
            } catch (error) {
                console.error("Checkout init error:", error);
                toast.error("Failed to load checkout details");
                setLoading(false);
            }
        };

        initCheckout();
    }, [user, fetchCartItems, navigate]);

    // Handle Address form input
    const handleAddressInput = (e) => {
        const { name, value, type, checked } = e.target;
        setAddressForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Save Address API call
    const handleSaveAddress = async (e) => {
        e.preventDefault();
        
        // Simple client side validations
        if (!/^\d{10}$/.test(addressForm.phoneNumber)) {
            toast.error("Phone number must be a valid 10-digit number");
            return;
        }
        if (!/^\d{6}$/.test(addressForm.postalCode)) {
            toast.error("Postal code must be 6 digits");
            return;
        }

        try {
            setSubmitting(true);
            const response = await axios.post('http://localhost:3000/user/addresses', addressForm, { withCredentials: true });
            const updatedAddrs = response.data.data || [];
            setAddresses(updatedAddrs);
            
            // Select the newly added address
            // Assuming it gets added at the end, or if it is default
            const newlyAdded = updatedAddrs[updatedAddrs.length - 1];
            if (newlyAdded) {
                setSelectedAddressId(newlyAdded._id);
            }

            toast.success("Address saved successfully");
            setShowAddressForm(false);
            
            // Reset form
            setAddressForm({
                fullName: '',
                phoneNumber: '',
                email: user?.data?.email || '',
                country: 'India',
                state: '',
                city: '',
                postalCode: '',
                fullAddress: '',
                landmark: '',
                isDefault: false
            });
            setSubmitting(false);
        } catch (error) {
            console.error("Add address error:", error);
            toast.error(error.response?.data?.message || "Failed to add address");
            setSubmitting(false);
        }
    };

    // Set Default Address
    const handleSetDefaultAddress = async (addressId, e) => {
        e.stopPropagation();
        try {
            const response = await axios.put(`http://localhost:3000/user/addresses/${addressId}/default`, {}, { withCredentials: true });
            setAddresses(response.data.data);
            toast.success("Default address updated");
        } catch (error) {
            console.error("Set default address error:", error);
            toast.error("Failed to update default address");
        }
    };

    // Delete Address
    const handleDeleteAddress = async (addressId, e) => {
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to delete this address?")) return;
        try {
            const response = await axios.delete(`http://localhost:3000/user/addresses/${addressId}`, { withCredentials: true });
            const remainingAddrs = response.data.data || [];
            setAddresses(remainingAddrs);
            
            // If the deleted address was selected, update selected ID
            if (selectedAddressId === addressId) {
                if (remainingAddrs.length > 0) {
                    setSelectedAddressId(remainingAddrs[0]._id);
                } else {
                    setSelectedAddressId('');
                }
            }
            toast.success("Address deleted successfully");
        } catch (error) {
            console.error("Delete address error:", error);
            toast.error("Failed to delete address");
        }
    };

    // Submit Order API
    const handlePlaceOrder = async () => {
        if (!selectedAddressId) {
            toast.error("Please select a shipping address");
            return;
        }

        // Validate dummy payment input
        if (paymentMethod === 'CARD') {
            if (!cardNumber || !cardExpiry || !cardCvv) {
                toast.error("Please fill in card details");
                return;
            }
        } else if (paymentMethod === 'UPI') {
            if (!upiId) {
                toast.error("Please fill in your UPI ID");
                return;
            }
        }

        try {
            setSubmitting(true);
            const payload = {
                addressId: selectedAddressId,
                paymentMethod,
                simulateStatus
            };

            const response = await axios.post('http://localhost:3000/order', payload, { withCredentials: true });
            
            // Success Placement
            setOrderResult({
                success: true,
                order: response.data.data
            });
            
            // Force Cart Refetch so cart item count in navbar goes to 0
            await fetchCartItems(user.data._id);
            setStep(4);
            setSubmitting(false);
        } catch (error) {
            console.error("Order placement error:", error);
            
            if (error.response && error.response.status === 402) {
                // Payment failure simulation
                setOrderResult({
                    success: false,
                    order: error.response.data.data
                });
                setStep(4);
            } else {
                toast.error(error.response?.data?.message || "Failed to place order due to server error");
            }
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="checkout-container container py-xl">
                <LoadingSkeleton type="profile" />
            </div>
        );
    }

    if (!cart || cart.length === 0) {
        if (step !== 4) {
            return (
                <div className="checkout-container container py-xl text-center">
                    <h2>Your checkout session is empty</h2>
                    <p className="text-meta">No items found in your shopping cart. Add items from the shop first.</p>
                    <Button value="Go to Shop" onclick={() => navigate('/')} variant="primary" className="mt-md" />
                </div>
            );
        }
    }

    return (
        <div className="checkout-container container py-xl animate-fade-in">
            {step < 4 && (
                <SectionHeader
                    title="Escrow Secure Checkout"
                    subtitle="Complete shipping addresses and choose safe payment methods to finalize order execution."
                    badge="Escrow Trade"
                />
            )}

            {/* Step Indicators */}
            {step < 4 && (
                <div className="checkout-step-bar card-glass mb-xl">
                    <div className={`step-item ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`} onClick={() => step > 1 && setStep(1)}>
                        <span className="step-num">1</span>
                        <span className="step-txt">Address</span>
                    </div>
                    <div className="step-divider"></div>
                    <div className={`step-item ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`} onClick={() => step > 2 && setStep(2)}>
                        <span className="step-num">2</span>
                        <span className="step-txt">Summary</span>
                    </div>
                    <div className="step-divider"></div>
                    <div className={`step-item ${step >= 3 ? 'active' : ''}`} onClick={() => step > 3 && setStep(3)}>
                        <span className="step-num">3</span>
                        <span className="step-txt">Payment</span>
                    </div>
                </div>
            )}

            <div className="checkout-grid">
                {/* Left Side: Form content based on step */}
                {step < 4 && (
                    <div className="checkout-main-content">
                        {/* STEP 1: ADDRESS SELECTION & CREATION */}
                        {step === 1 && (
                            <div className="checkout-card card-premium animate-slide-up">
                                <div className="card-header-row mb-md">
                                    <h3>Select Shipping Address</h3>
                                    {!showAddressForm && (
                                        <button className="add-addr-btn" onClick={() => setShowAddressForm(true)}>
                                            <IoAddOutline /> Add Address
                                        </button>
                                    )}
                                </div>

                                {showAddressForm ? (
                                    <form onSubmit={handleSaveAddress} className="address-creation-form animate-fade-in">
                                        <h4 className="mb-sm">Add New Address</h4>
                                        <div className="form-grid">
                                            <InputField
                                                title="Full Name"
                                                name="fullName"
                                                value={addressForm.fullName}
                                                onChange={handleAddressInput}
                                                required
                                            />
                                            <InputField
                                                title="Phone Number (10 digits)"
                                                name="phoneNumber"
                                                value={addressForm.phoneNumber}
                                                onChange={handleAddressInput}
                                                required
                                            />
                                            <InputField
                                                title="Email address"
                                                name="email"
                                                type="email"
                                                value={addressForm.email}
                                                onChange={handleAddressInput}
                                                required
                                            />
                                            <InputField
                                                title="Country"
                                                name="country"
                                                value={addressForm.country}
                                                onChange={handleAddressInput}
                                                required
                                            />
                                            <InputField
                                                title="State / Province"
                                                name="state"
                                                placeholder="e.g. Maharashtra"
                                                value={addressForm.state}
                                                onChange={handleAddressInput}
                                                required
                                            />
                                            <InputField
                                                title="City"
                                                name="city"
                                                value={addressForm.city}
                                                onChange={handleAddressInput}
                                                required
                                            />
                                            <InputField
                                                title="Postal Code (6 digits)"
                                                name="postalCode"
                                                value={addressForm.postalCode}
                                                onChange={handleAddressInput}
                                                required
                                            />
                                            <InputField
                                                title="Landmark (Optional)"
                                                name="landmark"
                                                value={addressForm.landmark}
                                                onChange={handleAddressInput}
                                            />
                                        </div>
                                        <div className="full-width-field mt-sm">
                                            <InputField
                                                title="Full House/Street Address"
                                                name="fullAddress"
                                                value={addressForm.fullAddress}
                                                onChange={handleAddressInput}
                                                required
                                            />
                                        </div>
                                        
                                        <div className="checkbox-field mt-md">
                                            <input 
                                                type="checkbox" 
                                                id="isDefault" 
                                                name="isDefault"
                                                checked={addressForm.isDefault}
                                                onChange={handleAddressInput} 
                                            />
                                            <label htmlFor="isDefault">Set as Default Address</label>
                                        </div>

                                        <div className="form-actions mt-lg flex gap-md">
                                            <Button value="Cancel" onclick={() => setShowAddressForm(false)} variant="outline" className="flex-1" />
                                            <Button value="Save Address" type="submit" variant="primary" className="flex-1" disabled={submitting} />
                                        </div>
                                    </form>
                                ) : (
                                    <div className="addresses-list-view">
                                        {addresses.length === 0 ? (
                                            <div className="empty-addresses text-center py-lg">
                                                <IoLocationOutline style={{ fontSize: '3rem', color: 'var(--text-muted)' }} />
                                                <p className="mt-sm">No saved addresses found. Please add a shipping address to proceed.</p>
                                            </div>
                                        ) : (
                                            <div className="address-cards-grid">
                                                {addresses.map((addr) => (
                                                    <div 
                                                        key={addr._id} 
                                                        className={`address-select-card ${selectedAddressId === addr._id ? 'selected' : ''}`}
                                                        onClick={() => setSelectedAddressId(addr._id)}
                                                    >
                                                        <div className="addr-card-header">
                                                            <h5>{addr.fullName}</h5>
                                                            {addr.isDefault && <span className="default-badge">Default</span>}
                                                        </div>
                                                        <p className="addr-card-text mt-xs">{addr.fullAddress}</p>
                                                        <p className="addr-card-text">{addr.city}, {addr.state} - {addr.postalCode}</p>
                                                        {addr.landmark && <p className="addr-card-text text-meta">Landmark: {addr.landmark}</p>}
                                                        <p className="addr-card-text mt-sm">Phone: {addr.phoneNumber}</p>
                                                        
                                                        <div className="addr-actions mt-md">
                                                            {!addr.isDefault && (
                                                                <button className="addr-act-btn default" onClick={(e) => handleSetDefaultAddress(addr._id, e)}>
                                                                    Set Default
                                                                </button>
                                                            )}
                                                            <button className="addr-act-btn delete" onClick={(e) => handleDeleteAddress(addr._id, e)}>
                                                                <IoTrashOutline /> Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="step-actions mt-xl flex justify-between">
                                            <Button value="Back to Cart" onclick={() => navigate('/user/cart')} variant="outline" />
                                            <Button 
                                                value="Proceed to Summary" 
                                                onclick={() => setStep(2)} 
                                                variant="primary" 
                                                disabled={!selectedAddressId}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* STEP 2: REVIEW ORDER SUMMARY */}
                        {step === 2 && (
                            <div className="checkout-card card-premium animate-slide-up">
                                <h3>Review Order Summary</h3>
                                <p className="text-meta mb-md">Ensure crop items list and shipping charges computed on backend are correct.</p>

                                <div className="checkout-items-list mb-lg">
                                    {cart.map((item, idx) => (
                                        <div key={item.product._id || idx} className="checkout-item-row">
                                            <img src={item.product.image} alt={item.product.productname} className="checkout-item-img" />
                                            <div className="checkout-item-details">
                                                <h5>{item.product.productname}</h5>
                                                <p className="text-meta">₹{item.product.price} each | Qty: {item.quantity}</p>
                                            </div>
                                            <div className="checkout-item-price">
                                                ₹{(parseFloat(item.product.price) * item.quantity).toLocaleString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="shipping-destination-preview card-glass mb-lg">
                                    <div className="align-center gap-sm">
                                        <IoLocationOutline style={{ fontSize: '1.25rem', color: 'var(--accent-orange)' }} />
                                        <strong>Shipping Destination:</strong>
                                    </div>
                                    {(() => {
                                        const selected = addresses.find(a => a._id === selectedAddressId);
                                        return selected ? (
                                            <div className="mt-xs text-meta">
                                                <p>{selected.fullName} | {selected.phoneNumber}</p>
                                                <p>{selected.fullAddress}, {selected.city}, {selected.state} - {selected.postalCode}</p>
                                            </div>
                                        ) : <p className="text-error">No address selected</p>;
                                    })()}
                                </div>

                                <div className="step-actions flex justify-between">
                                    <Button value="Back" onclick={() => setStep(1)} variant="outline" />
                                    <Button value="Proceed to Payment" onclick={() => setStep(3)} variant="primary" />
                                </div>
                            </div>
                        )}

                        {/* STEP 3: PAYMENT METHOD SIMULATOR */}
                        {step === 3 && (
                            <div className="checkout-card card-premium animate-slide-up">
                                <h3>Safe Escrow Payment Details</h3>
                                <p className="text-meta mb-lg">Choose a dummy payment option below. You can simulate transaction success or failure.</p>

                                <div className="payment-options-grid mb-lg">
                                    <div 
                                        className={`payment-option-card ${paymentMethod === 'CARD' ? 'active' : ''}`}
                                        onClick={() => setPaymentMethod('CARD')}
                                    >
                                        <IoCardOutline className="payment-icon" />
                                        <span>Credit / Debit Card</span>
                                    </div>
                                    <div 
                                        className={`payment-option-card ${paymentMethod === 'UPI' ? 'active' : ''}`}
                                        onClick={() => setPaymentMethod('UPI')}
                                    >
                                        <IoPhonePortraitOutline className="payment-icon" />
                                        <span>Test UPI API</span>
                                    </div>
                                    <div 
                                        className={`payment-option-card ${paymentMethod === 'WALLET' ? 'active' : ''}`}
                                        onClick={() => setPaymentMethod('WALLET')}
                                    >
                                        <IoWalletOutline className="payment-icon" />
                                        <span>Test Wallet</span>
                                    </div>
                                    <div 
                                        className={`payment-option-card ${paymentMethod === 'CASH' ? 'active' : ''}`}
                                        onClick={() => setPaymentMethod('CASH')}
                                    >
                                        <IoCashOutline className="payment-icon" />
                                        <span>Cash On Delivery</span>
                                    </div>
                                </div>

                                {/* Dynamic Details Inputs */}
                                <div className="payment-details-inputs card-glass p-md mb-lg">
                                    {paymentMethod === 'CARD' && (
                                        <div className="card-payment-form animate-fade-in">
                                            <h5 className="mb-sm">Simulate Card Credentials</h5>
                                            <InputField
                                                title="Dummy Card Number"
                                                placeholder="1111 2222 3333 4444"
                                                value={cardNumber}
                                                onChange={(e) => setCardNumber(e.target.value)}
                                                required
                                            />
                                            <div className="flex gap-md mt-sm">
                                                <InputField
                                                    title="Expiry Date"
                                                    placeholder="MM/YY"
                                                    value={cardExpiry}
                                                    onChange={(e) => setCardExpiry(e.target.value)}
                                                    className="flex-1"
                                                    required
                                                />
                                                <InputField
                                                    title="CVV"
                                                    placeholder="123"
                                                    type="password"
                                                    value={cardCvv}
                                                    onChange={(e) => setCardCvv(e.target.value)}
                                                    className="flex-1"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {paymentMethod === 'UPI' && (
                                        <div className="upi-payment-form animate-fade-in">
                                            <h5 className="mb-sm">Simulate UPI ID</h5>
                                            <InputField
                                                title="Test UPI VPA Address"
                                                placeholder="farmer@ybl"
                                                value={upiId}
                                                onChange={(e) => setUpiId(e.target.value)}
                                                required
                                            />
                                        </div>
                                    )}

                                    {paymentMethod === 'WALLET' && (
                                        <div className="wallet-payment-info animate-fade-in text-center py-xs">
                                            <IoWalletOutline style={{ fontSize: '2.5rem', color: 'var(--primary)' }} />
                                            <p className="mt-sm">Simulate payment utilizing the internal Krishi Wallet (Current Balance: ₹10,000).</p>
                                        </div>
                                    )}

                                    {paymentMethod === 'CASH' && (
                                        <div className="cash-payment-info animate-fade-in text-center py-xs">
                                            <IoCashOutline style={{ fontSize: '2.5rem', color: 'var(--accent-orange)' }} />
                                            <p className="mt-sm">Order will be confirmed and processed immediately. Payment collected at delivery.</p>
                                        </div>
                                    )}
                                </div>

                                {/* Simulator Status selector */}
                                <div className="simulator-selector card-glass mb-xl">
                                    <label className="input-label" style={{ display: 'block', marginBottom: '8px' }}>
                                        <strong>Simulate Payment Status Result:</strong>
                                    </label>
                                    <select 
                                        className="price-slider" 
                                        value={simulateStatus} 
                                        onChange={(e) => setSimulateStatus(e.target.value)}
                                        style={{ width: '100%', height: '40px', padding: '8px', borderRadius: '4px', background: 'var(--neutral-card)', border: '1px solid var(--neutral-border)', color: 'var(--text-dark)' }}
                                    >
                                        <option value="success">Simulate Successful Transaction (Paid)</option>
                                        <option value="failure">Simulate Failed Transaction (Failed)</option>
                                    </select>
                                </div>

                                <div className="step-actions flex justify-between">
                                    <Button value="Back" onclick={() => setStep(2)} variant="outline" />
                                    <Button 
                                        value={submitting ? "Processing Transaction..." : `Pay & Place Order (₹${summary?.grandTotal.toLocaleString()})`} 
                                        onclick={handlePlaceOrder} 
                                        variant="primary" 
                                        disabled={submitting} 
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Right Side: Order Totals Column */}
                {step < 4 && summary && (
                    <div className="checkout-summary-column">
                        <div className="order-summary-card card-glass animate-slide-up">
                            <h3>Escrow Summary</h3>
                            <div className="summary-rows mt-md">
                                <div className="summary-row">
                                    <span>Subtotal ({summary.itemsCount} items)</span>
                                    <strong>₹{summary.subTotal.toLocaleString()}</strong>
                                </div>
                                <div className="summary-row">
                                    <span>Shipping charges</span>
                                    <strong>{summary.shippingCharge === 0 ? <span className="discount-value">FREE</span> : `₹${summary.shippingCharge}`}</strong>
                                </div>
                                <div className="summary-row">
                                    <span>GST (5%)</span>
                                    <strong>₹{summary.tax.toLocaleString()}</strong>
                                </div>
                                <div className="summary-row promo-row">
                                    <span>Platform discounts</span>
                                    <strong className="discount-value">-₹{summary.discount}</strong>
                                </div>
                                <hr />
                                <div className="summary-row grand-total-row">
                                    <span>Grand Total</span>
                                    <strong>₹{summary.grandTotal.toLocaleString()}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 4: ORDER PLACEMENT RESULTS */}
                {step === 4 && orderResult && (
                    <div className="order-result-full-screen text-center py-xl animate-fade-in w-full" style={{ gridColumn: 'span 2' }}>
                        {orderResult.success ? (
                            <div className="order-success-card card-premium p-xl animate-slide-up" style={{ maxWidth: '600px', margin: '0 auto' }}>
                                <IoCheckmarkCircleOutline style={{ fontSize: '4.5rem', color: 'var(--success)', margin: '0 auto 16px' }} />
                                <h2>Your Order has been Placed!</h2>
                                <p className="text-meta mt-xs">Thank you for purchasing direct agricultural supplies. Your order is secured in platform escrow.</p>
                                
                                <div className="order-details-summary mt-lg card-glass p-md text-left" style={{ textAlign: 'left' }}>
                                    <div className="row flex justify-between py-xs border-b">
                                        <span>Order Identification:</span>
                                        <strong>{orderResult.order._id}</strong>
                                    </div>
                                    <div className="row flex justify-between py-xs border-b">
                                        <span>Transaction ID:</span>
                                        <strong className="text-meta">{orderResult.order.paymentDetails?.transactionId}</strong>
                                    </div>
                                    <div className="row flex justify-between py-xs border-b">
                                        <span>Amount Settled:</span>
                                        <strong>₹{orderResult.order.totalPrice.toLocaleString()}</strong>
                                    </div>
                                    <div className="row flex justify-between py-xs border-b">
                                        <span>Payment Status:</span>
                                        <strong style={{ color: 'var(--success)' }}>SUCCESSFUL / PAID</strong>
                                    </div>
                                    <div className="row flex justify-between py-xs border-b">
                                        <span>Shipping Location:</span>
                                        <strong className="text-right">{orderResult.order.addressSnapshot?.city}, {orderResult.order.addressSnapshot?.state}</strong>
                                    </div>
                                    <div className="row flex justify-between py-xs">
                                        <span>Estimated Delivery:</span>
                                        <strong style={{ color: 'var(--accent-orange)' }}>Within 3-5 Working Days</strong>
                                    </div>
                                </div>

                                <div className="result-actions mt-xl flex gap-md justify-center">
                                    <Button value="Browse More Products" onclick={() => navigate('/')} variant="outline" />
                                    <Button 
                                        value="View Order History" 
                                        onclick={() => {
                                            navigate('/auth/user/profile');
                                            // Optional: setActiveMenu in Profile if using state, but navigation works
                                        }} 
                                        variant="primary" 
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="order-failure-card card-premium p-xl animate-slide-up" style={{ maxWidth: '600px', margin: '0 auto' }}>
                                <IoCloseCircleOutline style={{ fontSize: '4.5rem', color: 'var(--error)', margin: '0 auto 16px' }} />
                                <h2>Payment Transaction Failed</h2>
                                <p className="text-meta mt-xs">The card processor or UPI server simulation returned a declined response. Your cart is preserved.</p>
                                
                                {orderResult.order && (
                                    <div className="order-details-summary mt-lg card-glass p-md text-left" style={{ textAlign: 'left' }}>
                                        <div className="row flex justify-between py-xs border-b">
                                            <span>Order Ref:</span>
                                            <strong>{orderResult.order._id}</strong>
                                        </div>
                                        <div className="row flex justify-between py-xs border-b">
                                            <span>Failure Code:</span>
                                            <strong style={{ color: 'var(--error)' }}>TXN_DECLINED</strong>
                                        </div>
                                        <div className="row flex justify-between py-xs">
                                            <span>Simulated Transaction ID:</span>
                                            <strong className="text-meta">{orderResult.order.paymentDetails?.transactionId}</strong>
                                        </div>
                                    </div>
                                )}

                                <div className="result-actions mt-xl flex gap-md justify-center">
                                    <Button value="Return to Checkout Summary" onclick={() => setStep(3)} variant="outline" />
                                    <Button value="Verify Cart Items" onclick={() => navigate('/user/cart')} variant="primary" />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Checkout;
