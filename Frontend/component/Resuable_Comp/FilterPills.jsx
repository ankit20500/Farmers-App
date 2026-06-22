import React from 'react';
import './ReusableComponents.css';

function FilterPills({ options = [], activeValue, onSelect, className = '' }) {
  return (
    <div className={`filter-pills-row ${className}`}>
      {options.map((option) => {
        const value = typeof option === 'string' ? option : option.value;
        const label = typeof option === 'string' ? option : option.label;
        const isActive = activeValue === value;
        
        return (
          <button
            key={value}
            type="button"
            onClick={() => onSelect(value)}
            className={`filter-pill-btn ${isActive ? 'active' : ''}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default FilterPills;
