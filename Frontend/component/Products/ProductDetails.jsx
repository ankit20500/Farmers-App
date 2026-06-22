import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoArrowBackOutline, IoShieldCheckmarkOutline } from 'react-icons/io5';
import { BsTruck, BsCashCoin } from 'react-icons/bs';
import { userContext } from '../ContextApi/userContextApi';
import { productContext } from '../ContextApi/productContext';
import { cartContext } from '../ContextApi/cartContext';
import Stars from '../StarComp/Star';
import Loader from '../Loader/Loader';
import LoadingSkeleton from '../Resuable_Comp/LoadingSkeleton';
import Button from '../Resuable_Comp/Button';
import ReviewSection from './ReviewSection';
import ReviewInput from './ReviewInput';
import './Products.css';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { AddItemsToCart } = useContext(cartContext);
  const { fetchProductById } = useContext(productContext);
  const { user } = useContext(userContext);

  const [loader, setLoader] = useState(true);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviewInput, setShowReviewInput] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoader(true);
        const response = await fetchProductById(id);
        const fetchedProduct = response.data.data;
        setProduct(fetchedProduct);
        setReviews(fetchedProduct.reviews || []);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.error(error);
        toast.error('Failed to load product details');
      }
    }
    fetchData();
  }, [id, fetchProductById]);

  async function handleAddToCart() {
    if (!user) {
      toast.info('Please sign in to add items to your cart.');
      navigate('/auth/login');
      return;
    }
    try {
      const detail = {
        product: product._id,
        quantity: 1,
      };
      const response = await AddItemsToCart(detail);
      toast.success(response.data.message || 'Added to cart!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add item to cart.');
    }
  }

  if (loader) {
    return (
      <div className="product-details-container container py-xl">
        <LoadingSkeleton type="detail" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-xl text-center">
        <h2>Product not found</h2>
        <Button value="Back to Shop" onclick={() => navigate(-1)} variant="primary" className="mt-md" />
      </div>
    );
  }

  const inStock = product.stock > 0;

  return (
    <div className={`product-details-container container py-xl animate-fade-in ${showReviewInput ? 'blur-background' : ''}`}>
      {/* Back navigation pill */}
      <button className="back-navigation-pill" onClick={() => navigate(-1)}>
        <IoArrowBackOutline /> <span>Go Back</span>
      </button>

      <div className="product-details-grid mt-lg">
        {/* Gallery/Image Frame */}
        <div className="product-gallery-card">
          <img src={product.image} alt={product.productname} className="product-main-img" />
          {!inStock && <span className="sold-out-ribbon">Sold Out</span>}
        </div>

        {/* Specifications Column */}
        <div className="product-specifications-col">
          <span className="product-category-path">
            {product.category} &gt; {product.subcategory}
          </span>
          <h1 className="product-detail-name">{product.productname}</h1>
          
          <div className="product-rating-row">
            <Stars rating={product.ratings} />
            <span className="reviews-count-text">({reviews.length} customer reviews)</span>
          </div>

          <p className="product-detail-desc">{product.description}</p>
          
          {/* Trust assurances info grid */}
          <div className="assurances-grid-detail">
            <div className="assurance-detail-item">
              <IoShieldCheckmarkOutline className="detail-item-icon" />
              <span>100% Quality Guaranteed</span>
            </div>
            <div className="assurance-detail-item">
              <BsTruck className="detail-item-icon" />
              <span>Express Farm Shipping</span>
            </div>
            <div className="assurance-detail-item">
              <BsCashCoin className="detail-item-icon" />
              <span>Escrow Protected Payments</span>
            </div>
          </div>

          <div className="action-buttons-row mt-lg">
            <Button
              value="Add Customer Review"
              onclick={() => {
                if (user) {
                  setShowReviewInput(true);
                } else {
                  toast.info('Please log in to write a review.');
                  navigate('/auth/login');
                }
              }}
              variant="outline"
            />
          </div>
        </div>

        {/* E-commerce Purchase Sidecard */}
        <div className="ecommerce-purchase-sidecard card-glass">
          <div className="sidecard-price-row">
            <span className="price-tag-label">Total Price</span>
            <span className="product-detail-price">₹{product.price}</span>
          </div>

          <div className="sidecard-stock-row mt-md">
            <span className="stock-tag-label">Availability</span>
            <span className={`stock-status-pill-detail ${inStock ? 'in-stock' : 'out-of-stock'}`}>
              {inStock ? 'Available in Stock' : 'Out of Stock'}
            </span>
          </div>

          <div className="sidecard-actions mt-lg">
            <Button
              value={inStock ? 'ADD TO SHOPPING CART' : 'OUT OF STOCK'}
              onclick={handleAddToCart}
              variant="secondary"
              disabled={!inStock}
              className="w-full purchase-btn"
            />
          </div>
        </div>
      </div>

      {/* Review input modal */}
      {showReviewInput && (
        <div className="review-modal-wrapper">
          <div className="review-modal-card card-premium animate-slide-up">
            <ReviewInput
              setShowReviewInput={setShowReviewInput}
              reviews={reviews}
              setProduct={setProduct}
              setReviews={setReviews}
            />
          </div>
          <div className="modal-backdrop" onClick={() => setShowReviewInput(false)} />
        </div>
      )}

      {/* Reviews list Section */}
      <div className="mt-xxl">
        <ReviewSection
          reviews={reviews}
          setShowReviewInput={setShowReviewInput}
        />
      </div>
    </div>
  );
}

export default ProductDetails;
