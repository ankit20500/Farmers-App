import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsShieldCheck, BsCashStack, BsTruck, BsPhone } from 'react-icons/bs';
import { FaUserGraduate, FaHandshake, FaHandHoldingHeart } from 'react-icons/fa';
import { MdOutlineSecurity, MdOutlinePercent } from 'react-icons/md';
import Button from '../../Resuable_Comp/Button';
import SectionHeader from '../../Resuable_Comp/SectionHeader';
import Stars from '../../StarComp/Star';
import './MidStrip.css';

function MidStrip() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BsCashStack />,
      title: 'Direct Marketplace',
      desc: 'Connect directly with wholesale buyers. Sell crops at best rates without middlemen commission.'
    },
    {
      icon: <MdOutlinePercent />,
      title: 'Farmer Micro-Loans',
      desc: 'Agri-credit starting at 3.0% interest to buy fertilizers, seeds, and irrigation components.'
    },
    {
      icon: <FaHandshake />,
      title: 'Government Schemes',
      desc: 'Check eligibility, read guides, and submit applications directly to central & state subsidies.'
    },
    {
      icon: <FaHandHoldingHeart />,
      title: 'Natural Disaster Support',
      desc: 'Crop loss insurance and postponed loan repayments during heavy rainfall or severe drought.'
    }
  ];

  const trustPillars = [
    {
      icon: <BsShieldCheck />,
      title: '100% Escrow Payments',
      desc: 'Funds are securely verified and released to the farmer only after the harvest delivery is approved.'
    },
    {
      icon: <BsTruck />,
      title: 'SaaS Delivery Logistics',
      desc: 'Doorstep shipping across remote villages with temperature-controlled trucks for fresh produce.'
    },
    {
      icon: <FaUserGraduate />,
      title: 'Agri-Expert Advice',
      desc: 'Connect with certified agronomists for direct support on crop health and fertilizer formulas.'
    }
  ];

  const testimonials = [
    {
      name: 'Ramesh Kumar',
      location: 'Bihar, India',
      rating: 5,
      comment: 'Selling my wheat directly to buyers through Krishi-Mart has boosted my family income by 40%! The payments are direct to my bank account.',
      image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=200'
    },
    {
      name: 'Sunita Devi',
      location: 'Uttar Pradesh, India',
      rating: 5,
      comment: 'Finding organic pesticide advice and buying quality tools is extremely easy here. I do not have to visit multiple markets anymore.',
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200'
    }
  ];

  return (
    <div className="homepage-mid-blocks">
      {/* 1. Features Showcase */}
      <section className="features-showcase py-xxl bg-light">
        <div className="container">
          <SectionHeader
            title="All Farming Needs In One Platform"
            subtitle="Explore Krishi-Mart's powerful tools designed to simplify your daily agricultural operations and increase income."
            badge="What We Offer"
          />

          <div className="features-grid-custom">
            {features.map((feat, idx) => (
              <div key={idx} className="feature-card-custom card-premium hover-scale">
                <div className="feat-icon-wrap">{feat.icon}</div>
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Trust Section */}
      <section className="trust-guarantees py-xxl bg-white">
        <div className="container">
          <SectionHeader
            title="Built on Trust & Transparency"
            subtitle="We implement strict quality verification and safety safeguards to guarantee worry-free farming trade."
            badge="Security & Safety"
          />

          <div className="trust-grid-custom">
            {trustPillars.map((pillar, idx) => (
              <div key={idx} className="trust-pillar-card animate-slide-up">
                <div className="trust-icon-box">{pillar.icon}</div>
                <div className="trust-pillar-content">
                  <h4>{pillar.title}</h4>
                  <p>{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Testimonials Section */}
      <section className="testimonials-showcase py-xxl bg-light">
        <div className="container">
          <SectionHeader
            title="Loved by 10M+ Farmers"
            subtitle="Read inspirational reviews from our verified farming partners who transformed their business using Krishi-Mart."
            badge="User Testimonials"
          />

          <div className="testimonials-grid-custom">
            {testimonials.map((test, idx) => (
              <div key={idx} className="testimonial-card card-premium animate-slide-up">
                <div className="test-profile">
                  <img src={test.image} alt={test.name} className="test-avatar" />
                  <div className="test-meta">
                    <h4>{test.name}</h4>
                    <span>📍 {test.location}</span>
                  </div>
                </div>
                <div className="test-rating">
                  <Stars rating={test.rating} />
                </div>
                <p className="test-comment">"{test.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Home CTA Section */}
      <section className="home-cta-section container py-xl">
        <div className="cta-banner-card card-glass animate-slide-up">
          <div className="cta-banner-content">
            <h2>Ready to Maximize Your Crop Profit?</h2>
            <p>Join millions of Indian farmers who are shopping smarter, selling directly, and securing low-interest credits.</p>
            <div className="cta-banner-buttons">
              <Button
                value="Create Account (Free)"
                onclick={() => navigate('/auth/register')}
                variant="accent"
                className="cta-action-btn"
              />
              <Button
                value="Browse Marketplace"
                onclick={() => navigate('/farmer-marketplace')}
                variant="outline"
                className="cta-action-btn-outline"
              />
            </div>
          </div>
          <div className="cta-banner-visual">
            <BsPhone className="cta-phone-icon" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default MidStrip;
