import React from 'react';
import './Button.css';

function Button({ 
  value, 
  onclick, 
  variant = 'primary', 
  type = 'button', 
  disabled = false, 
  loading = false, 
  className = '',
  icon
}) {
  return (
    <button
      type={type}
      onClick={onclick}
      disabled={disabled || loading}
      className={`btn-custom btn-${variant} ${loading ? 'btn-loading' : ''} ${className}`}
    >
      {loading ? (
        <span className="btn-spinner"></span>
      ) : (
        <>
          {icon && <span className="btn-icon">{icon}</span>}
          {value}
        </>
      )}
    </button>
  );
}

export default Button;