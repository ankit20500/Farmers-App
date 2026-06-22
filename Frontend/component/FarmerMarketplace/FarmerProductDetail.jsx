import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { IoArrowBackOutline, IoCallOutline, IoLogoWhatsapp } from 'react-icons/io5';
import { FaLeaf, FaMapMarkerAlt } from 'react-icons/fa';
import Button from '../Resuable_Comp/Button';
import SectionHeader from '../Resuable_Comp/SectionHeader';
import './FarmerMarketplace.css';

function FarmerProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const startNego = searchParams.get('negotiate') === 'true';

  const [crop, setCrop] = useState(null);
  const [showNego, setShowNego] = useState(startNego);
  
  // Negotiation Chat Simulation State
  const [bidPrice, setBidPrice] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'farmer', text: 'Namaste! Main organic fasal bech raha hoon. Aapko kitni quantity chahiye?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const fetchCropDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/farmer-crop/${id}`);
        setCrop(response.data.data);
      } catch (error) {
        console.error("Fetch crop details error:", error);
        toast.error("Failed to load crop details");
      }
    };

    fetchCropDetails();
    
    if (startNego) {
      setShowNego(true);
    }
  }, [id, startNego]);


  const handleSendBid = (e) => {
    e.preventDefault();
    if (!bidPrice.trim()) return;

    const offer = parseFloat(bidPrice);
    if (isNaN(offer) || offer <= 0) {
      toast.error('Please enter a valid price offer.');
      return;
    }

    const currentPrice = parseFloat(crop.price);
    const newHistory = [
      ...chatHistory,
      { sender: 'buyer', text: `Can you agree to ₹${offer}/${crop.unit}? I want to buy in bulk.` }
    ];
    setChatHistory(newHistory);
    setBidPrice('');
    setIsTyping(true);

    // AI simulation delay
    setTimeout(() => {
      let reply = '';
      if (offer >= currentPrice) {
        reply = `Aapka offer ₹${offer} swikar hai! Main aapko fresh stock dispatch kar dunga. Kripya details confirm karein.`;
      } else if (offer >= currentPrice * 0.9) {
        const counter = Math.round(currentPrice * 0.95);
        reply = `₹${offer} thoda kam hai, par main ₹${counter}/${crop.unit} mein maan sakta hoon bulk order ke liye. Kya yeh thik hai?`;
      } else {
        reply = `Nahi bhaiya, organic fasal ugane mein bohot mehnat lagti hai. ₹${Math.round(currentPrice * 0.97)} se niche nahi de paunga.`;
      }

      setChatHistory((prev) => [...prev, { sender: 'farmer', text: reply }]);
      setIsTyping(false);
    }, 1500);
  };

  if (!crop) {
    return (
      <div className="container py-xl text-center">
        <h2>Listing not found</h2>
        <Button value="Back to Marketplace" onclick={() => navigate('/farmer-marketplace')} variant="primary" className="mt-md" />
      </div>
    );
  }

  return (
    <div className="marketplace-container container py-xl animate-fade-in">
      <button className="back-navigation-pill" onClick={() => navigate('/farmer-marketplace')}>
        <IoArrowBackOutline /> <span>Back to Marketplace</span>
      </button>

      <div className="farmer-detail-grid mt-lg">
        {/* Left Side: Product Gallery & Farmer card */}
        <div className="product-gallery-card">
          <img src={crop.image} alt={crop.productName} className="product-main-img" />
          
          <div className="farmer-profile-card-header mt-lg" style={{ padding: '16px', gap: '16px', cursor: 'pointer' }} onClick={() => navigate(`/farmer-marketplace/profile/${crop.farmerId || crop.farmer}`)}>
            <img 
              src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=100" 
              alt={crop.farmerName} 
              className="farmer-profile-avatar" 
              style={{ width: '60px', height: '60px' }}
            />
            <div className="farmer-profile-intro" style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--white)', margin: 0 }}>{crop.farmerName}</h3>
              <p style={{ fontStyle: 'italic', fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', margin: 0 }}>Verified Farmer Partner</p>
              <div className="verified-farm-badge" style={{ display: 'inline-block', marginTop: '4px', fontSize: '0.6rem' }}>Visit Farm Profile</div>
            </div>
          </div>
        </div>

        {/* Right Side: Crop Details & Specifications */}
        <div className="product-specifications-col">
          <span className={`badge ${crop.organic ? 'badge-success' : 'badge-info'}`} style={{ alignSelf: 'flex-start' }}>
            {crop.organic ? '100% Certified Organic' : 'Conventional Crop'}
          </span>
          <h1 className="product-detail-name" style={{ fontSize: '2.5rem', margin: '8px 0 0 0' }}>{crop.productName}</h1>
          <p className="farmer-card-loc" style={{ marginTop: '8px', fontSize: '0.95rem' }}>
            <FaMapMarkerAlt /> <span>{crop.location}</span>
          </p>

          <p className="product-detail-desc" style={{ marginTop: '16px' }}>{crop.description}</p>
          
          <table className="farm-spec-table">
            <tbody>
              <tr>
                <td>Stock Available</td>
                <td>{crop.quantity} {crop.unit}</td>
              </tr>
              <tr>
                <td>Harvest Date</td>
                <td>{crop.harvestDate}</td>
              </tr>
              <tr>
                <td>Base Unit Price</td>
                <td style={{ color: 'var(--accent-orange)', fontSize: '1.25rem' }}>₹{crop.price} / {crop.unit}</td>
              </tr>
            </tbody>
          </table>

          {/* Action CTAs: Negotiate or Contact */}
          <div className="action-buttons-row mt-lg" style={{ display: 'flex', gap: '16px' }}>
            <Button
              value={showNego ? 'Hide Negotiation Chat' : 'Start Price Negotiation'}
              onclick={() => setShowNego(!showNego)}
              variant={showNego ? 'outline' : 'secondary'}
            />
            
            <a href="tel:+919876543210" style={{ display: 'inline-flex' }}>
              <Button
                value="Call Farmer"
                variant="primary"
                icon={<IoCallOutline />}
              />
            </a>
          </div>

          {/* Interactive Negotiation Simulator Card */}
          {showNego && (
            <div className="nego-chat-wrapper animate-slide-up mt-lg card-premium">
              <h4 style={{ marginBottom: '8px', color: 'var(--primary)' }}>Real-time Direct Negotiation</h4>
              
              <div className="nego-chat-history">
                {chatHistory.map((chat, idx) => (
                  <div key={idx} className={`chat-bubble ${chat.sender}`}>
                    {chat.text}
                  </div>
                ))}
                {isTyping && (
                  <div className="chat-bubble farmer animate-pulse">
                    Farmer is typing a counter-offer...
                  </div>
                )}
              </div>

              <form onSubmit={handleSendBid} className="nego-chat-input-row">
                <input
                  type="number"
                  placeholder={`Suggest bid price per ${crop.unit} (Base: ₹${crop.price})`}
                  value={bidPrice}
                  onChange={(e) => setBidPrice(e.target.value)}
                  disabled={isTyping}
                />
                <Button
                  value="Send Offer"
                  type="submit"
                  variant="secondary"
                  disabled={isTyping}
                />
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FarmerProductDetail;
