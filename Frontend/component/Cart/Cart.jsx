import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdRemoveShoppingCart, MdOutlineRemoveShoppingCart, MdDeleteForever } from 'react-icons/md';
import { cartContext } from '../ContextApi/cartContext';
import { userContext } from '../ContextApi/userContextApi';
import Button from '../Resuable_Comp/Button';
import LoadingSkeleton from '../Resuable_Comp/LoadingSkeleton';
import SectionHeader from '../Resuable_Comp/SectionHeader';
import EmptyState from '../Resuable_Comp/EmptyState';
import './Cart.css';

function Cart() {
  const { fetchCartItems, AddItemsToCart, decreaseItemsToCart, deleteCartProduct } = useContext(cartContext);
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      try {
        if (user) {
          const response = await fetchCartItems(user.data._id);
          setCart(response.data.data.items || []);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        toast.error('Failed to load shopping cart items');
      }
    }
    fetchItems();
  }, [user, fetchCartItems]);

  if (loading) {
    return (
      <div className="cart-container container py-xl">
        <LoadingSkeleton type="detail" />
      </div>
    );
  }

  // If user not logged in
  if (!user) {
    return (
      <div className="cart-container container py-xl">
        <EmptyState
          icon={<MdOutlineRemoveShoppingCart />}
          title="Sign in to view your cart"
          description="Access the items you added previously or start fresh by shopping direct agricultural supplies."
          actionLabel="Login / Sign In"
          onAction={() => navigate('/auth/login')}
        />
      </div>
    );
  }

  // If cart is empty
  if (!cart || cart.length === 0) {
    return (
      <div className="cart-container container py-xl">
        <EmptyState
          icon={<MdRemoveShoppingCart />}
          title="Your Shopping Cart is Empty"
          description="Explore our verified pesticides, fertilizers, seeds, and animal feeds to add them to your cart."
          actionLabel="Shop Farm Products"
          onAction={() => navigate('/')}
        />
      </div>
    );
  }

  async function handleDecreaseQuantity(product, quantity) {
    try {
      if (quantity > 1) {
        const response = await decreaseItemsToCart({ product, quantity: quantity - 1 });
        setCart(response.data.data.items);
        toast.success(response.data.message || 'Cart quantity decreased');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update cart quantity.');
    }
  }

  async function handleIncreaseQuantity(product, quantity) {
    try {
      const response = await AddItemsToCart({ product, quantity: quantity + 1 });
      setCart(response.data.data.items);
      toast.success(response.data.message || 'Cart quantity increased');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update cart quantity.');
    }
  }

  async function handleDelete(productId, quantity) {
    try {
      const response = await deleteCartProduct({ productId, quantity });
      setCart(response.data.data.items);
      toast.success('Product removed from shopping cart');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete product.');
    }
  }

  function extractPrice(priceString) {
    return parseFloat(priceString);
  }

  const subTotal = cart.reduce((total, item) => total + extractPrice(item.product.price) * item.quantity, 0);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const shippingCharge = 40;
  const grandTotal = subTotal + shippingCharge;

  return (
    <div className="cart-container container py-xl animate-fade-in">
      <SectionHeader
        title="Shopping Cart"
        subtitle={`Review and checkout the agricultural supplies currently in your cart (${totalItems} items)`}
        badge="Your Selection"
      />

      <div className="cart-split-layout">
        {/* Left Side: Cart Items List */}
        <div className="cart-items-column">
          {cart.map((item, idx) => (
            <div key={item.product._id || idx} className="cart-item-card hover-scale animate-slide-up">
              <div className="cart-item-img-box">
                <img src={item.product.image} alt={item.product.productname} />
              </div>
              <div className="cart-item-details">
                <span className="cart-item-cat">{item.product.category}</span>
                <h4 className="cart-item-title">{item.product.productname}</h4>
                <div className="cart-item-meta-row">
                  <span className={`cart-stock-status ${item.product.stock > 0 ? 'in' : 'out'}`}>
                    {item.product.stock > 0 ? '✓ In Stock' : '✗ Out of Stock'}
                  </span>
                  <span className="cart-unit-price">₹{item.product.price} each</span>
                </div>
              </div>

              {/* Quantity selectors & sum */}
              <div className="cart-item-qty-actions">
                <div className="cart-qty-picker">
                  <button type="button" onClick={() => handleDecreaseQuantity(item.product._id, item.quantity)}>-</button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => handleIncreaseQuantity(item.product._id, item.quantity)}>+</button>
                </div>
                <div className="cart-item-total-price">
                  ₹{(extractPrice(item.product.price) * item.quantity).toLocaleString()}
                </div>
              </div>

              {/* Delete trash button */}
              <button
                type="button"
                className="cart-item-delete-btn"
                onClick={() => handleDelete(item.product._id, item.quantity)}
                aria-label="Remove item"
              >
                <MdDeleteForever />
              </button>
            </div>
          ))}
        </div>

        {/* Right Side: Order Summary Card */}
        <div className="cart-summary-column">
          <div className="order-summary-card card-glass">
            <h3>Order Summary</h3>
            
            <div className="summary-rows mt-md">
              <div className="summary-row">
                <span>Subtotal ({totalItems} items)</span>
                <strong>₹{subTotal.toLocaleString()}</strong>
              </div>
              <div className="summary-row">
                <span>Agrilink Logistics Delivery</span>
                <strong>₹{shippingCharge}</strong>
              </div>
              <div className="summary-row promo-row">
                <span>Farmer discount (Direct purchase)</span>
                <strong className="discount-value">-₹0</strong>
              </div>
              <hr />
              <div className="summary-row grand-total-row">
                <span>Grand Total</span>
                <strong>₹{grandTotal.toLocaleString()}</strong>
              </div>
            </div>

            <div className="summary-actions mt-lg">
              <Button
                value="PROCEED TO CHECKOUT"
                onclick={() => navigate('/checkout')}
                variant="primary"
                className="w-full checkout-btn"
              />
              <Button
                value="CONTINUE SHOPPING"
                onclick={() => navigate('/')}
                variant="outline"
                className="w-full mt-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;