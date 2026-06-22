import React from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../Resuable_Comp/Logo';
import Button from '../../Resuable_Comp/Button';

function MainFooter() {
  const navigate = useNavigate();

  return (
    <footer className="footer-main">
      <div className="footer-container">
        {/* Brand Block */}
        <div className="footer-brand-col">
          <Logo variant="mobile" />
          <p className="footer-brand-desc">
            Empowering Indian agriculture by connecting farmers directly with quality inputs and verified buyers. Removing middlemen, promoting transparency, and boosting rural incomes.
          </p>
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn"><FaLinkedinIn /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn"><FaYoutube /></a>
          </div>
        </div>

        {/* Links Col 1 */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Explore KrishiMart</h4>
          <ul className="footer-links-list">
            <li><Link to="/about">About Our Mission</Link></li>
            <li><Link to="/service">Our Agri Services</Link></li>
            <li><Link to="/farmer-marketplace">Farmer Marketplace</Link></li>
            <li><Link to="/loan">Loans & Schemes</Link></li>
          </ul>
        </div>

        {/* Links Col 2 */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Resources & Help</h4>
          <ul className="footer-links-list">
            <li><Link to="/knowledge">Farmer Knowledge Hub</Link></li>
            <li><Link to="/support">Contact Customer Support</Link></li>
            <li><Link to="/farmers">Trusted Farmer Stories</Link></li>
            <li><a href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer">PM-Kisan Portal ↗</a></li>
          </ul>
        </div>

        {/* Newsletter Col */}
        <div className="footer-newsletter-col">
          <h4 className="footer-col-title">Newsletter Subscriptions</h4>
          <p className="newsletter-text">Stay updated on crop tips, government scheme updates, and market pricing changes.</p>
          <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" className="newsletter-input" required />
            <Button value="Subscribe" type="submit" variant="secondary" className="newsletter-btn" />
          </form>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p className="copyright-text">
            © {new Date().getFullYear()} Krishi-Mart. All Rights Reserved. Empowering farmers digitally.
          </p>
          <div className="footer-bottom-links">
            <Link to="/support">Terms of Service</Link>
            <Link to="/support">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default MainFooter;