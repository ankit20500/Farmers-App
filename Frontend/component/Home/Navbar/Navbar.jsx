import React, { useContext, useState } from 'react';
import './Navbar.css';
import { GrLocation } from 'react-icons/gr';
import { BsSearch, BsCart3 } from 'react-icons/bs';
import { CgProfile, CgMenuRight, CgClose } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../ContextApi/userContextApi';
import { addressContext } from '../../ContextApi/addressContext';
import Logo from '../../Resuable_Comp/Logo';
import Button from '../../Resuable_Comp/Button';

function Navbar() {
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const { getAddressFromCoords } = useContext(addressContext);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('Select Location');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleProfile() {
    setMobileMenuOpen(false);
    if (user) {
      navigate('/auth/user/profile');
    } else {
      navigate('/auth/login');
    }
  }

  function handleCart() {
    setMobileMenuOpen(false);
    navigate('/user/cart');
  }

  function handleLocation() {
    if ('geolocation' in navigator) {
      setLocation('Locating...');
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const address = await getAddressFromCoords(latitude, longitude);
          const allWords = address.split(',').filter((part) => part.trim() !== '');
          if (allWords.length >= 3) {
            setLocation(allWords[allWords.length - 3]);
          } else {
            setLocation('India');
          }
        },
        (error) => {
          console.error(error);
          setLocation('Location Denied');
        }
      );
    } else {
      setLocation('Not Supported');
    }
  }

  function handleSearchSubmit(e) {
    if (e.key === 'Enter' && search.trim()) {
      // Direct products search
      navigate(`/categories/pesticides/subCategory/organic_pesticides?search=${search}`);
    }
  }

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* SVG Sprout Brand Logo */}
        <Logo onClick={() => navigate('/')} />

        {/* Location Selector */}
        <div className="nav-location" onClick={handleLocation}>
          <GrLocation className="nav-location-icon" />
          <div className="nav-location-text">
            <span className="loc-label">Delivering to</span>
            <span className="loc-value">{location}</span>
          </div>
        </div>

        {/* Unified Search Input */}
        <div className="nav-search-container">
          <BsSearch className="nav-search-icon" />
          <input
            type="text"
            placeholder="Search crop seeds, organic fertilizers, farming tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearchSubmit}
            className="nav-search-input"
          />
        </div>

        {/* Navigation Action Buttons */}
        <div className="nav-actions">
          <button className="nav-action-btn" onClick={handleProfile}>
            <CgProfile className="nav-action-icon" />
            <span className="nav-action-text">{user ? 'Dashboard' : 'Sign In'}</span>
          </button>

          <button className="nav-action-btn nav-cart-btn" onClick={handleCart}>
            <BsCart3 className="nav-action-icon" />
            <span className="nav-action-text">Cart</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <CgClose /> : <CgMenuRight />}
        </button>
      </div>

      {/* Mobile Drawer Slide-out Panel */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <Logo onClick={() => { navigate('/'); setMobileMenuOpen(false); }} variant="mobile" />
          <button className="drawer-close-btn" onClick={() => setMobileMenuOpen(false)}><CgClose /></button>
        </div>
        <div className="drawer-body">
          <div className="drawer-search">
            <BsSearch />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setMobileMenuOpen(false);
                  handleSearchSubmit(e);
                }
              }}
            />
          </div>

          <div className="drawer-location" onClick={handleLocation}>
            <GrLocation />
            <div>
              <p>Deliver to</p>
              <strong>{location}</strong>
            </div>
          </div>

          <nav className="drawer-links">
            <button className="drawer-link-item" onClick={() => { navigate('/about'); setMobileMenuOpen(false); }}>About Us</button>
            <button className="drawer-link-item" onClick={() => { navigate('/service'); setMobileMenuOpen(false); }}>Our Services</button>
            <button className="drawer-link-item" onClick={() => { navigate('/farmer-marketplace'); setMobileMenuOpen(false); }}>Farmer Marketplace</button>
            <button className="drawer-link-item" onClick={() => { navigate('/loan'); setMobileMenuOpen(false); }}>Schemes & Loans</button>
            <button className="drawer-link-item" onClick={() => { navigate('/farmers'); setMobileMenuOpen(false); }}>Farmer Stories</button>
            <button className="drawer-link-item" onClick={() => { navigate('/knowledge'); setMobileMenuOpen(false); }}>Knowledge Hub</button>
            <button className="drawer-link-item" onClick={() => { navigate('/support'); setMobileMenuOpen(false); }}>Support</button>
          </nav>

          <div className="drawer-footer-actions">
            <Button
              value={user ? 'User Profile' : 'Login / Register'}
              onclick={handleProfile}
              variant="primary"
              className="w-full"
            />
            <Button
              value="Go to Shopping Cart"
              onclick={handleCart}
              variant="outline"
              className="w-full mt-sm"
            />
          </div>
        </div>
      </div>

      {/* Screen blur overlay */}
      {mobileMenuOpen && <div className="drawer-overlay" onClick={() => setMobileMenuOpen(false)} />}
    </header>
  );
}

export default Navbar;