import React from 'react';
import './InputField.css';

function InputField({
  type = 'text',
  placeholder,
  value,
  readOnly = false,
  onChange,
  required = false,
  title,
  name,
  error,
  icon,
  className = ''
}) {
  return (
    <div className={`input-field-container ${error ? 'has-error' : ''} ${className}`}>
      {title && (
        <label className="input-label">
          {title} {required && <span className="required-star">*</span>}
        </label>
      )}
      <div className="input-wrapper">
        {icon && <span className="input-icon-left">{icon}</span>}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          readOnly={readOnly}
          onChange={onChange}
          required={required}
          className={`input-element ${icon ? 'with-icon' : ''}`}
        />
      </div>
      {error && <span className="input-error-msg">{error}</span>}
    </div>
  );
}

export default InputField;