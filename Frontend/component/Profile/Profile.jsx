import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { IoSettingsOutline, IoPersonOutline, IoReceiptOutline, IoGridOutline, IoLogOutOutline, IoTrashOutline } from 'react-icons/io5';
import { userContext } from '../ContextApi/userContextApi';
import LoadingSkeleton from '../Resuable_Comp/LoadingSkeleton';
import InputField from '../Resuable_Comp/InputField';
import Button from '../Resuable_Comp/Button';
import SectionHeader from '../Resuable_Comp/SectionHeader';
import './Profile.css';

function Profile() {
  const { user, UserLogout, deleteUser, updateUserProfile } = useContext(userContext);
  const navigate = useNavigate();
  
  const [activeMenu, setActiveMenu] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [myCrops, setMyCrops] = useState([]);
  
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.data.name || '');
      setContactNumber(user.data.contactNumber || '');
      
      // Load user crop listings from backend
      const fetchMyCrops = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/farmer-crop?farmerId=${user.data._id}`);
          setMyCrops(response.data.data || []);
        } catch (error) {
          console.error("Fetch profile crops error:", error);
        }
      };
      fetchMyCrops();
    }
  }, [user]);

  // Fetch orders from backend
  useEffect(() => {
    if (user && activeMenu === 'orders') {
      const fetchOrders = async () => {
        try {
          setOrdersLoading(true);
          const response = await axios.get('http://localhost:3000/order/user', { withCredentials: true });
          setOrders(response.data.data || []);
          setOrdersLoading(false);
        } catch (error) {
          console.error("Fetch orders error:", error);
          setOrdersLoading(false);
        }
      };
      fetchOrders();
    }
  }, [user, activeMenu]);


  if (!user) {
    return (
      <div className="profile-dashboard-container container py-xl">
        <LoadingSkeleton type="profile" />
      </div>
    );
  }

  function handleEditProfile() {
    if (isEditing) {
      updateUserProfile({ name, contactNumber });
      toast.success('Your profile settings were updated successfully!');
    }
    setIsEditing(!isEditing);
  }

  function handleLogout() {
    UserLogout();
    toast.success('Logged out successfully.');
    navigate('/');
  }

  const handleDeleteCrop = async (cropId) => {
    try {
      await axios.delete(`http://localhost:3000/farmer-crop/${cropId}`, { withCredentials: true });
      setMyCrops(prev => prev.filter(c => (c.id || c._id) !== cropId));
      toast.success('Crop listing deleted from marketplace');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to delete crop');
    }
  };


  return (
    <div className="profile-dashboard-container container py-xl animate-fade-in">
      <SectionHeader
        title="Settings & Dashboard"
        subtitle="Manage your personal details, inspect purchases, configure credentials, and list harvest stocks."
        badge="Farmer Dashboard"
      />

      <div className="profile-layout-grid">
        {/* Left Sidebar Menu */}
        <aside className="profile-sidebar-menu card-premium">
          <button
            className={`profile-menu-btn ${activeMenu === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveMenu('personal')}
          >
            <IoPersonOutline /> Personal Details
          </button>
          <button
            className={`profile-menu-btn ${activeMenu === 'crops' ? 'active' : ''}`}
            onClick={() => setActiveMenu('crops')}
          >
            <IoGridOutline /> My Crop Listings ({myCrops.length})
          </button>
          <button
            className={`profile-menu-btn ${activeMenu === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveMenu('orders')}
          >
            <IoReceiptOutline /> Order History
          </button>
          <hr />
          <button
            className="profile-menu-btn delete-acc-btn"
            onClick={() => {
              if (window.confirm('Are you sure you want to permanently delete your account? This action is irreversible.')) {
                deleteUser(user.data._id);
                toast.warning('Account deleted.');
                navigate('/');
              }
            }}
          >
            <IoTrashOutline /> Delete Account
          </button>
          <button className="profile-menu-btn logout-btn" onClick={handleLogout}>
            <IoLogOutOutline /> Sign Out
          </button>
        </aside>

        {/* Right Details Panel */}
        <main className="profile-details-panel card-premium">
          
          {/* PERSONAL DETAILS PANEL */}
          {activeMenu === 'personal' && (
            <div className="details-pane animate-fade-in">
              <h3 className="pane-title">Personal Settings</h3>
              
              <div className="profile-avatar-wrap">
                <img
                  src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=200"
                  alt={user.data.name}
                  className="profile-avatar-img"
                />
                <div>
                  <h4>{user.data.name}</h4>
                  <p className="text-meta">{user.data.email}</p>
                </div>
              </div>

              <div className="profile-form-grid mt-lg">
                <InputField
                  title="Full Name"
                  value={name}
                  readOnly={!isEditing}
                  onChange={(e) => setName(e.target.value)}
                />
                
                <InputField
                  title="Mobile Contact Number"
                  value={contactNumber}
                  readOnly={!isEditing}
                  onChange={(e) => setContactNumber(e.target.value)}
                />

                <InputField
                  title="Account Email address"
                  value={user.data.email}
                  readOnly={true}
                />
              </div>

              <div className="profile-actions-row mt-lg">
                <Button
                  value={isEditing ? 'Save Profile Details' : 'Edit Profile Settings'}
                  onclick={handleEditProfile}
                  variant={isEditing ? 'secondary' : 'primary'}
                />
                {isEditing && (
                  <Button
                    value="Cancel"
                    onclick={() => {
                      setName(user.data.name);
                      setContactNumber(user.data.contactNumber);
                      setIsEditing(false);
                    }}
                    variant="outline"
                  />
                )}
              </div>
            </div>
          )}

          {/* ACTIVE CROP LISTINGS PANEL */}
          {activeMenu === 'crops' && (
            <div className="details-pane animate-fade-in">
              <h3 className="pane-title">My Crop Listings</h3>
              <p className="text-meta mb-md" style={{ marginBottom: '16px' }}>Crops you listed directly on the public Farmer Marketplace.</p>

              {myCrops.length > 0 ? (
                <div className="profile-crops-list">
                  {myCrops.map((crop) => (
                    <div key={crop.id || crop._id} className="profile-crop-row align-center">
                      <img src={crop.image} alt={crop.productName} className="profile-crop-row-img" />
                      <div className="profile-crop-row-details">
                        <h4>{crop.productName}</h4>
                        <p className="text-meta">₹{crop.price}/{crop.unit} | Available: {crop.quantity} {crop.unit}</p>
                      </div>
                      <button
                        type="button"
                        className="profile-crop-delete-btn"
                        onClick={() => handleDeleteCrop(crop.id || crop._id)}
                        title="Delete listing"
                      >
                        <IoTrashOutline /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-xl">
                  <p style={{ color: 'var(--text-muted)' }}>You have not listed any crops yet.</p>
                  <Button
                    value="Sell Crop Now"
                    onclick={() => navigate('/farmer-marketplace/sell')}
                    variant="primary"
                    className="mt-md"
                  />
                </div>
              )}
            </div>
          )}

          {/* ORDER HISTORY PANEL */}
          {activeMenu === 'orders' && (
            <div className="details-pane animate-fade-in">
              <h3 className="pane-title">Order History</h3>
              <p className="text-meta mb-md">Verify the fulfillment status of all your placed escrow orders.</p>

              {ordersLoading ? (
                <LoadingSkeleton type="product" count={3} />
              ) : orders.length > 0 ? (
                <div className="profile-orders-list">
                  {orders.map((ord) => (
                    <div key={ord._id} className="profile-order-card card-glass p-md mb-md align-start" style={{ marginBottom: '16px', border: '1px solid var(--neutral-border)', borderRadius: 'var(--radius-md)', padding: '16px', textAlign: 'left' }}>
                      <div className="order-card-header flex justify-between" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--neutral-border)', paddingBottom: '8px', marginBottom: '12px' }}>
                        <div>
                          <span className="text-meta block" style={{ display: 'block', fontSize: '0.8rem' }}>Order Ref: {ord._id}</span>
                          <span className="text-meta" style={{ fontSize: '0.8rem' }}>Placed: {new Date(ord.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span className="badge" style={{ 
                            padding: '4px 8px', 
                            borderRadius: '4px', 
                            fontSize: '0.75rem', 
                            fontWeight: '600',
                            backgroundColor: ord.status === 'Cancelled' ? 'rgba(235, 87, 87, 0.15)' : 'rgba(39, 174, 96, 0.15)',
                            color: ord.status === 'Cancelled' ? 'var(--error, #eb5757)' : 'var(--success, #27ae60)',
                            border: ord.status === 'Cancelled' ? '1px solid var(--error, #eb5757)' : '1px solid var(--success, #27ae60)'
                          }}>
                            {ord.status}
                          </span>
                        </div>
                      </div>

                      <div className="order-items-summary" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                        {ord.items.map((item, idx) => (
                          <div key={item._id || idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {item.product && item.product.image && (
                              <img src={item.product.image} alt={item.product.productname} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                            )}
                            <div>
                              <strong style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>{item.product ? item.product.productname : 'Crop Product'}</strong>
                              <span className="text-meta" style={{ fontSize: '0.8rem', marginLeft: '8px' }}>Qty: {item.quantity}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="order-card-footer flex justify-between align-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--neutral-border)', paddingTop: '12px', marginTop: '12px' }}>
                        <div className="text-meta" style={{ fontSize: '0.8rem' }}>
                          <span>Ship to: <strong>{ord.addressSnapshot?.fullName}</strong>, {ord.addressSnapshot?.city}</span>
                        </div>
                        <div>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Total Price: </span>
                          <strong style={{ fontSize: '1.15rem', color: 'var(--primary)' }}>₹{ord.totalPrice.toLocaleString()}</strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-xl">
                  <p style={{ color: 'var(--text-muted)' }}>No previous orders found for this account.</p>
                  <Button
                    value="Browse Products Shop"
                    onclick={() => navigate('/')}
                    variant="primary"
                    className="mt-md"
                  />
                </div>
              )}
            </div>
          )}


        </main>
      </div>
    </div>
  );
}

export default Profile;