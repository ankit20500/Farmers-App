import React from 'react';
import './ReusableComponents.css';

function SectionHeader({ title, subtitle, badge, action }) {
  return (
    <div className="section-header-container">
      <div className="section-header-left">
        {badge && <span className="badge badge-primary section-header-badge">{badge}</span>}
        <h2 className="section-header-title">{title}</h2>
        {subtitle && <p className="section-header-subtitle">{subtitle}</p>}
      </div>
      {action && <div className="section-header-right">{action}</div>}
    </div>
  );
}

export default SectionHeader;
