import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoMailOutline, IoLockClosedOutline, IoPersonOutline } from 'react-icons/io5';
import { userContext } from '../../ContextApi/userContextApi';
import Button from '../../Resuable_Comp/Button';
import InputField from '../../Resuable_Comp/InputField';
import Logo from '../../Resuable_Comp/Logo';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signupButton } = useContext(userContext);
  const [loading, setLoading] = useState(false);

  async function handleSubmitButton(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error('Please fill in all details.');
      return;
    }

    try {
      setLoading(true);
      const obj = { name, email, password };
      const response = await signupButton(obj);
      toast.success(response.data.message || 'Account registered successfully! Please log in.');
      navigate('/auth/login');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Registration failed. Try a different email.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page-container container animate-fade-in">
      <div className="auth-card card-premium">
        
        {/* Left Visual Column */}
        <div className="auth-visual-col">
          <div className="auth-visual-overlay"></div>
          <img
            src="https://images.pexels.com/photos/2209384/pexels-photo-2209384.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="AgriTech farm field"
            className="auth-visual-img"
          />
          <div className="auth-visual-text">
            <h3>Verified Supply Chain</h3>
            <p>Buy seeds, fertilizers, and protective gear from certified brands directly.</p>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="auth-form-col">
          <div className="auth-form-header">
            <Logo onClick={() => navigate('/')} />
            <h2 className="mt-md">Create Account</h2>
            <p className="text-meta">Join Krishi-Mart portal for free today</p>
          </div>

          <form onSubmit={handleSubmitButton} className="auth-form-element mt-lg">
            <InputField
              onChange={(e) => setName(e.target.value)}
              title="Full Name"
              type="text"
              value={name}
              placeholder="Enter your name"
              required
              icon={<IoPersonOutline />}
            />

            <InputField
              onChange={(e) => setEmail(e.target.value)}
              title="Email Address"
              type="email"
              value={email}
              placeholder="farmer@domain.com"
              required
              icon={<IoMailOutline />}
            />

            <InputField
              onChange={(e) => setPassword(e.target.value)}
              title="Secret Password"
              type="password"
              value={password}
              placeholder="Min 6 characters"
              required
              icon={<IoLockClosedOutline />}
            />

            <div className="auth-utility-row">
              <label className="auth-remember-me">
                <input type="checkbox" required className="auth-checkbox-input" />
                <span>Agree to terms & conditions</span>
              </label>
            </div>

            <Button
              value="CREATE PORTAL ACCOUNT"
              type="submit"
              variant="primary"
              loading={loading}
              className="w-full mt-md py-md"
            />
          </form>

          <p className="auth-redirect-text mt-lg">
            Already have an account? <Link to="/auth/login" className="auth-redirect-link">Sign In</Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Signup;