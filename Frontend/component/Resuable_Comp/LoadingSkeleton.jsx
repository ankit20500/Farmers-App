import React from 'react';
import './ReusableComponents.css';

function LoadingSkeleton({ type = 'product', count = 3 }) {
  const renderItems = () => {
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push(i);
    }
    return items;
  };

  if (type === 'product') {
    return (
      <div className="grid grid-cols-4 gap-md w-full">
        {renderItems().map((item) => (
          <div key={item} className="skeleton-product-card card-premium">
            <div className="skeleton-image animate-shimmer" />
            <div className="skeleton-line skeleton-title animate-shimmer" />
            <div className="skeleton-line skeleton-subtitle animate-shimmer" />
            <div className="skeleton-line skeleton-price animate-shimmer" />
            <div className="skeleton-line skeleton-stars animate-shimmer" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'scheme') {
    return (
      <div className="grid grid-cols-3 gap-md w-full">
        {renderItems().map((item) => (
          <div key={item} className="skeleton-scheme-card card-premium">
            <div className="skeleton-line skeleton-title animate-shimmer" />
            <div className="skeleton-line skeleton-desc animate-shimmer" />
            <div className="skeleton-line skeleton-desc animate-shimmer" style={{ width: '80%' }} />
            <div className="skeleton-flex mt-md">
              <div className="skeleton-tag animate-shimmer" />
              <div className="skeleton-button animate-shimmer" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'profile') {
    return (
      <div className="skeleton-profile-container animate-fade-in">
        <div className="skeleton-profile-sidebar animate-shimmer" />
        <div className="skeleton-profile-content">
          <div className="skeleton-circle animate-shimmer" />
          <div className="skeleton-line skeleton-title animate-shimmer" style={{ width: '200px' }} />
          <div className="skeleton-line skeleton-desc animate-shimmer" />
          <div className="skeleton-line skeleton-desc animate-shimmer" />
          <div className="skeleton-line skeleton-desc animate-shimmer" />
        </div>
      </div>
    );
  }

  if (type === 'detail') {
    return (
      <div className="skeleton-detail-container animate-fade-in">
        <div className="skeleton-detail-left animate-shimmer" />
        <div className="skeleton-detail-right">
          <div className="skeleton-line skeleton-title animate-shimmer" style={{ width: '60%' }} />
          <div className="skeleton-line skeleton-stars animate-shimmer" style={{ width: '30%' }} />
          <br />
          <div className="skeleton-line skeleton-desc animate-shimmer" />
          <div className="skeleton-line skeleton-desc animate-shimmer" />
          <div className="skeleton-line skeleton-desc animate-shimmer" style={{ width: '80%' }} />
          <br />
          <div className="skeleton-line skeleton-price animate-shimmer" style={{ width: '40%' }} />
          <div className="skeleton-button animate-shimmer" style={{ width: '150px', height: '45px' }} />
        </div>
      </div>
    );
  }

  return null;
}

export default LoadingSkeleton;
