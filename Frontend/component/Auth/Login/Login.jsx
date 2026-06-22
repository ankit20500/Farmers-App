import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoMailOutline, IoLockClosedOutline } from 'react-icons/io5';
import { userContext } from '../../ContextApi/userContextApi';
import Button from '../../Resuable_Comp/Button';
import InputField from '../../Resuable_Comp/InputField';
import Logo from '../../Resuable_Comp/Logo';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser, setUser } = useContext(userContext);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      const obj = { email, password };
      const response = await loginUser(obj);
      setUser(response.data);
      toast.success(response.data.message || 'Logged in successfully!');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Login failed. Please check credentials.');
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
            <h3>Direct Farm Trading</h3>
            <p>Skip middlemen and connect with verified agricultural suppliers and buyers directly.</p>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="auth-form-col">
          <div className="auth-form-header">
            <Logo onClick={() => navigate('/')} />
            <h2 className="mt-md">Welcome Back</h2>
            <p className="text-meta">Sign in to your farmer portal account</p>
          </div>

          <form onSubmit={handleLogin} className="auth-form-element mt-lg">
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
              placeholder="Enter password"
              required
              icon={<IoLockClosedOutline />}
            />

            <div className="auth-utility-row">
              <label className="auth-remember-me">
                <input type="checkbox" className="auth-checkbox-input" />
                <span>Remember Me</span>
              </label>
              <span className="auth-forget-link" onClick={() => toast.info('Password reset is simulated.')}>
                Forgot Password?
              </span>
            </div>

            <Button
              value="SIGN IN TO PORTAL"
              type="submit"
              variant="primary"
              loading={loading}
              className="w-full mt-md py-md"
            />
          </form>

          <p className="auth-redirect-text mt-lg">
            Don't have an account? <Link to="/auth/register" className="auth-redirect-link">Register Now</Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;
