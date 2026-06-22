import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { IoCloseCircleOutline } from 'react-icons/io5';
import './ReusableComponents.css';

function SearchBar({ value, onChange, placeholder = 'Search...', onClear, className = '' }) {
  return (
    <div className={`search-bar-container ${className}`}>
      <span className="search-icon-left"><BsSearch /></span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="search-input-element"
      />
      {value && onClear && (
        <button type="button" onClick={onClear} className="search-clear-btn" aria-label="Clear search">
          <IoCloseCircleOutline />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
