import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Resuable_Comp/Button';
import './Midimage.css';

function AllMidimage() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-grid container">
        <div className="hero-content animate-slide-up">
          <span className="hero-badge">🌾 2026 Smart AgriTech Platform</span>
          <h1 className="hero-heading">
            Buy Directly <br />
            <span className="gradient-text">Without Middlemen</span>
          </h1>
          <p className="hero-desc">
            Welcome to Krishi-Mart—your digital farm portal. Access direct buyer connections, low-interest micro-loans, fast-track government schemes, and verified agriculture products with fair pricing.
          </p>
          <div className="hero-actions">
            <Button
              value="Start Selling Crops"
              onclick={() => navigate('/farmer-marketplace/sell')}
              variant="accent"
              className="hero-btn-main"
            />
            <Button
              value="Explore Products"
              onclick={() => {
                const element = document.getElementById('categories-section');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              variant="outline"
              className="hero-btn-outline"
            />
          </div>
          
          <div className="hero-features-list">
            <div className="hero-feat-item">✓ Zero Commission</div>
            <div className="hero-feat-item">✓ Secure Payments</div>
            <div className="hero-feat-item">✓ Real-time Negotiation</div>
          </div>
        </div>

        <div className="hero-image-container animate-fade-in">
          <div className="hero-blob-bg"></div>
          <img
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop"
            alt="Modern Farmer with Tablet"
            className="hero-image"
          />
          <div className="floating-card stat-card-float">
            <div className="float-icon">📈</div>
            <div>
              <h4>+40% Income</h4>
              <p>Average farmer margin boost</p>
            </div>
          </div>
          <div className="floating-card trust-card-float">
            <div className="float-icon">✓</div>
            <div>
              <h4>Verified Sellers Only</h4>
              <p>Safe agricultural supply</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AllMidimage;