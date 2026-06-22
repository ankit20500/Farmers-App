import React from 'react';
import './Footer.css';
import { GiSprout } from 'react-icons/gi';
import { FaUsers, FaBoxes } from 'react-icons/fa';
import { GrMapLocation } from 'react-icons/gr';

function FirstFooter() {
  const stats = [
    { icon: <GiSprout />, value: '100+', label: 'Verified Brands' },
    { icon: <FaUsers />, value: '10M+', label: 'Happy Farmers' },
    { icon: <FaBoxes />, value: '5K+', label: 'Agriculture Products' },
    { icon: <GrMapLocation />, value: '15K+', label: 'Pincodes Served' }
  ];

  return (
    <div className="top-footer-container">
      <div className="top-footer-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card hover-scale">
            <div className="stat-icon-wrap">{stat.icon}</div>
            <div className="stat-content">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FirstFooter;