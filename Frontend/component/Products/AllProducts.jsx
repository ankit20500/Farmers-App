import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaBan, FaFilter } from 'react-icons/fa';
import { productContext } from '../ContextApi/productContext';
import { cartContext } from '../ContextApi/cartContext';
import { userContext } from '../ContextApi/userContextApi';
import ProductCard from '../Resuable_Comp/ProductCard';
import LoadingSkeleton from '../Resuable_Comp/LoadingSkeleton';
import SectionHeader from '../Resuable_Comp/SectionHeader';
import SearchBar from '../Resuable_Comp/SearchBar';
import EmptyState from '../Resuable_Comp/EmptyState';
import './Products.css';

function Product() {
  const navigate = useNavigate();
  const { category, subCategory } = useParams();
  const [searchParams] = useSearchParams();
  const urlSearchQuery = searchParams.get('search') || '';

  const { fetchProduct } = useContext(productContext);
  const { AddItemsToCart } = useContext(cartContext);
  const { user } = useContext(userContext);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);

  // Filters State
  const [maxPrice, setMaxPrice] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoader(true);
        const formattedCategory = category.replace(/_/g, ' ');
        const formattedSubCategory = subCategory.replace(/_/g, ' ');
        const response = await fetchProduct(formattedCategory, formattedSubCategory);
        const fetched = response.data.data || [];
        setProducts(fetched);
        setFilteredProducts(fetched);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.error(error);
        toast.error('Failed to load products');
      }
    }
    fetchData();
  }, [category, subCategory, fetchProduct]);

  // Run search & filtering client-side for dynamic feedback
  useEffect(() => {
    let result = [...products];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.productname.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      );
    }

    // Price range filter
    result = result.filter(p => parseFloat(p.price) <= maxPrice);

    // Ratings filter
    if (minRating > 0) {
      result = result.filter(p => p.ratings >= minRating);
    }

    // Stock availability filter
    if (onlyInStock) {
      result = result.filter(p => p.stock > 0);
    }

    setFilteredProducts(result);
  }, [products, searchQuery, maxPrice, minRating, onlyInStock]);

  // Handle Add to Cart action
  async function handleAddToCart(product) {
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
      toast.success(response.data.message || 'Product added to cart!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add product to cart.');
    }
  }

  const categoryLabel = category.replace(/_/g, ' ');
  const subCategoryLabel = subCategory.replace(/_/g, ' ');

  return (
    <div className="marketplace-container container py-xl animate-fade-in">
      <SectionHeader
        title={subCategoryLabel.toUpperCase()}
        subtitle={`Showing verified agricultural inventory for ${categoryLabel} > ${subCategoryLabel}`}
        badge="Marketplace"
      />

      <div className="marketplace-layout">
        {/* Sidebar Filters */}
        <aside className={`filter-sidebar ${showMobileFilters ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h3>Filters</h3>
            <button className="close-filters-btn" onClick={() => setShowMobileFilters(false)}>×</button>
          </div>

          <div className="filter-group">
            <label className="filter-label">Search Products</label>
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
              placeholder="Search in this view..."
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">Max Price: ₹{maxPrice}</label>
            <input
              type="range"
              min="0"
              max="3000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="price-slider"
            />
            <div className="slider-labels">
              <span>₹0</span>
              <span>₹3,000</span>
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">Minimum Customer Rating</label>
            <div className="rating-options">
              {[0, 4, 3, 2].map((stars) => (
                <button
                  key={stars}
                  type="button"
                  className={`rating-pill ${minRating === stars ? 'active' : ''}`}
                  onClick={() => setMinRating(stars)}
                >
                  {stars === 0 ? 'All Ratings' : `${stars}★ & Above`}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group-checkbox">
            <input
              type="checkbox"
              id="stockCheckbox"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
            />
            <label htmlFor="stockCheckbox">Exclude Out of Stock</label>
          </div>

          <button
            className="clear-filters-btn-accent"
            onClick={() => {
              setMaxPrice(2000);
              setMinRating(0);
              setOnlyInStock(false);
              setSearchQuery('');
            }}
          >
            Reset Filters
          </button>
        </aside>

        {/* Mobile Filter Toggle Banner */}
        <div className="mobile-filter-bar">
          <button className="mobile-filter-trigger-btn" onClick={() => setShowMobileFilters(true)}>
            <FaFilter /> Filters & Sorts
          </button>
        </div>

        {/* Products List Grid */}
        <div className="products-grid-column">
          {loader ? (
            <LoadingSkeleton type="product" count={8} />
          ) : filteredProducts.length > 0 ? (
            <div className="products-grid-layout">
              {filteredProducts.map((item, idx) => (
                <ProductCard
                  key={item._id || idx}
                  product={item}
                  onCardClick={() => navigate(`/product/${item._id}`)}
                  onAddToCart={() => handleAddToCart(item)}
                  userLoggedIn={!!user}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Products Found"
              description="No inventory matches your active filter query. Try adjustments to your sliders or query."
              actionLabel="Reset All Filters"
              onAction={() => {
                setMaxPrice(2000);
                setMinRating(0);
                setOnlyInStock(false);
                setSearchQuery('');
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
