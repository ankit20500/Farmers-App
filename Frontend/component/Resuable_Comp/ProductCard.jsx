import React from 'react';
import Stars from '../StarComp/Star';
import Button from './Button';
import './ReusableComponents.css';

function ProductCard({ 
  product, 
  onCardClick, 
  onAddToCart, 
  userLoggedIn = false 
}) {
  const {
    productname,
    price,
    image,
    category,
    ratings = 0,
    stock = 1
  } = product;

  return (
    <div className="product-card-premium card-premium hover-scale animate-slide-up" onClick={onCardClick}>
      <div className="product-card-img-wrap">
        <img src={image} alt={productname} className="product-card-img" />
        {stock <= 0 && <span className="product-out-badge">Out of Stock</span>}
      </div>
      <div className="product-card-info">
        <span className="product-card-cat">{category}</span>
        <h4 className="product-card-title">{productname}</h4>
        <div className="product-card-rating">
          <Stars rating={ratings} />
        </div>
        <div className="product-card-footer">
          <span className="product-card-price">₹{price}</span>
          {onAddToCart && (
            <div onClick={(e) => e.stopPropagation()}>
              <Button
                value={stock > 0 ? "Add" : "Out"}
                onclick={onAddToCart}
                variant="secondary"
                disabled={stock <= 0}
                className="product-card-btn"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
