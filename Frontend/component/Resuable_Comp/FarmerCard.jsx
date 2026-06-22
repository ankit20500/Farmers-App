import React from 'react';
import { GrLocation } from 'react-icons/gr';
import { FaLeaf } from 'react-icons/fa';
import Button from './Button';
import './ReusableComponents.css';

function FarmerCard({ 
  listing, 
  onContact, 
  onNegotiate,
  onCardClick
}) {
  const {
    id,
    productName,
    farmerName,
    location,
    quantity,
    price,
    unit = 'kg',
    harvestDate,
    organic = true,
    image
  } = listing;

  const defaultImage = 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600';

  return (
    <div className="farmer-card-premium card-premium hover-scale animate-slide-up" onClick={onCardClick}>
      <div className="farmer-card-img-wrap">
        <img src={image || defaultImage} alt={productName} className="farmer-card-img" />
        <span className={`farmer-card-organic-badge ${organic ? 'organic' : 'conventional'}`}>
          {organic ? <><FaLeaf style={{ marginRight: '4px' }} /> Organic</> : 'Conventional'}
        </span>
      </div>
      <div className="farmer-card-info">
        <h3 className="farmer-card-title">{productName}</h3>
        <p className="farmer-card-farmer">Seller: <strong>{farmerName}</strong></p>
        
        <div className="farmer-card-loc">
          <GrLocation /> <span>{location}</span>
        </div>

        <div className="farmer-card-specs">
          <div>
            <span className="spec-lbl">Available:</span>
            <span className="spec-val">{quantity} {unit}</span>
          </div>
          <div>
            <span className="spec-lbl">Harvest:</span>
            <span className="spec-val">{harvestDate}</span>
          </div>
        </div>

        <div className="farmer-card-price-row">
          <span className="farmer-card-price">₹{price} <span className="price-unit">/{unit}</span></span>
        </div>

        <div className="farmer-card-actions" onClick={(e) => e.stopPropagation()}>
          <Button
            value="Negotiate"
            onclick={onNegotiate}
            variant="outline"
            className="flex-1"
          />
          <Button
            value="Details"
            onclick={onCardClick}
            variant="secondary"
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}

export default FarmerCard;
