import React from 'react';
import './AboutNavStrip.css';
import ReusableSection from './ReusableSection';
import { useNavigate } from 'react-router-dom';

function AboutNavStrip() {
  const navigate = useNavigate();

  return (
    <div className="nav-strip-container">
      <div className="nav-strip-scrollable">
        <ReusableSection onclick={() => navigate('/about')} value={'About Us'} path="/about" />
        <ReusableSection onclick={() => navigate('/service')} value={'Our Services'} path="/service" />
        <ReusableSection onclick={() => navigate('/farmer-marketplace')} value={'Farmer Marketplace'} path="/farmer-marketplace" />
        <ReusableSection onclick={() => navigate('/loan')} value={'Schemes & Loans'} path="/loan" />
        <ReusableSection onclick={() => navigate('/farmers')} value={'Farmer Stories'} path="/farmers" />
        <ReusableSection onclick={() => navigate('/knowledge')} value={'Knowledge Hub'} path="/knowledge" />
        <ReusableSection onclick={() => navigate('/support')} value={'Help & Support'} path="/support" />
      </div>
    </div>
  );
}

export default AboutNavStrip;