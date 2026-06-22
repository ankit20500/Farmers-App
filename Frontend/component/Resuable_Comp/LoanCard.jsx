import React from 'react';
import Button from './Button';
import './ReusableComponents.css';

function LoanCard({ 
  loan, 
  onApply 
}) {
  const {
    title = 'Farmer Crop Loan',
    interestRate = '3.0%',
    maxAmount = '₹3,00,000',
    tenure = 'Up to 5 Years',
    description = 'Short-term credit for crop cultivation and production expenses.',
    requirements = ['Kisan Credit Card', 'Land ownership proof']
  } = loan;

  return (
    <div className="loan-card-premium card-premium hover-scale animate-slide-up">
      <div className="loan-card-badge-row">
        <span className="badge badge-warning">Special Agri Rate</span>
      </div>
      <h3 className="loan-card-title">{title}</h3>
      <p className="loan-card-desc">{description}</p>
      
      <div className="loan-card-stats-grid">
        <div className="loan-card-stat">
          <span className="loan-stat-label">Interest</span>
          <span className="loan-stat-val text-accent">{interestRate} p.a.</span>
        </div>
        <div className="loan-card-stat">
          <span className="loan-stat-label">Max Limit</span>
          <span className="loan-stat-val">{maxAmount}</span>
        </div>
        <div className="loan-card-stat">
          <span className="loan-stat-label">Tenure</span>
          <span className="loan-stat-val">{tenure}</span>
        </div>
      </div>

      <div className="loan-card-requirements">
        <strong>Key Documents:</strong>
        <ul>
          {requirements.map((req, idx) => (
            <li key={idx}>✓ {req}</li>
          ))}
        </ul>
      </div>

      <div className="loan-card-footer">
        <Button
          value="Check Eligibility"
          onclick={onApply}
          variant="primary"
          className="w-full"
        />
      </div>
    </div>
  );
}

export default LoanCard;
