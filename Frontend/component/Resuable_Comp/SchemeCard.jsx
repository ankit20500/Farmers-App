import React from 'react';
import Button from './Button';
import './ReusableComponents.css';

function SchemeCard({ 
  scheme, 
  onApply, 
  status = 'Active' 
}) {
  const {
    title,
    description,
    link,
    category = 'General',
    eligibility = 'All Farmers'
  } = scheme;

  return (
    <div className="scheme-card-premium card-premium hover-scale animate-slide-up">
      <div className="scheme-card-header">
        <span className="badge badge-primary">{category}</span>
        <span className={`scheme-status-pill ${status === 'Applied' ? 'applied' : 'active'}`}>
          {status}
        </span>
      </div>
      <h3 className="scheme-card-title">{title}</h3>
      <p className="scheme-card-desc">{description}</p>
      
      <div className="scheme-card-eligibility">
        <strong>Eligibility:</strong> {eligibility}
      </div>

      <div className="scheme-card-footer">
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="scheme-link-btn">
            Official Portal ↗
          </a>
        )}
        {onApply && (
          <Button
            value={status === 'Applied' ? 'View Details' : 'Apply Now'}
            onclick={onApply}
            variant={status === 'Applied' ? 'outline' : 'secondary'}
            className="scheme-apply-btn"
          />
        )}
      </div>
    </div>
  );
}

export default SchemeCard;
