import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoArrowBackOutline, IoLocationOutline } from 'react-icons/io5';
import { FaLeaf, FaMedal } from 'react-icons/fa';
import FarmerCard from '../Resuable_Comp/FarmerCard';
import SectionHeader from '../Resuable_Comp/SectionHeader';
import Stars from '../StarComp/Star';
import './FarmerMarketplace.css';

function FarmerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [farmerDetails, setFarmerDetails] = useState(null);
  const [farmerCrops, setFarmerCrops] = useState([]);

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        // Fetch crops listed by this farmer
        const cropsRes = await axios.get(`http://localhost:3000/farmer-crop?farmerId=${id}`);
        const list = cropsRes.data.data || [];
        setFarmerCrops(list);

        // Fetch farmer user profile details
        const userRes = await axios.get(`http://localhost:3000/user/profile/${id}`);
        const userProfile = userRes.data.data;
        
        if (userProfile) {
          setFarmerDetails({
            name: userProfile.name,
            location: list.length > 0 ? list[0].location : 'India',
            rating: 4.8,
            farmSize: '6.5 Acres',
            certified: list.length > 0 ? list[0].organic : true,
            experience: '12 Years in Cultivation',
            bio: 'Welcome to our family farm! We specialize in sustainable cultivation methods. Our mission is to produce high-yield, nutrient-rich crops and deliver them directly to your tables without artificial chemical spraying.'
          });
        } else if (list.length > 0) {
          setFarmerDetails({
            name: list[0].farmerName,
            location: list[0].location,
            rating: 4.8,
            farmSize: '6.5 Acres',
            certified: list[0].organic,
            experience: '12 Years in Cultivation',
            bio: 'Welcome to our family farm! We specialize in sustainable cultivation methods. Our mission is to produce high-yield, nutrient-rich crops and deliver them directly to your tables without artificial chemical spraying.'
          });
        }
      } catch (error) {
        console.error("Fetch farmer profile error:", error);
        toast.error("Failed to load farmer profile");
      }
    };

    fetchFarmerData();
  }, [id]);


  if (!farmerDetails) {
    return (
      <div className="container py-xl text-center">
        <h2>Farmer Profile Not Found</h2>
        <button onClick={() => navigate('/farmer-marketplace')} className="back-navigation-pill mt-md">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="marketplace-container container py-xl animate-fade-in">
      <button className="back-navigation-pill" onClick={() => navigate(-1)}>
        <IoArrowBackOutline /> <span>Go Back</span>
      </button>

      {/* Profile Card Header */}
      <div className="farmer-profile-card-header mt-lg">
        <img
          src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=200"
          alt={farmerDetails.name}
          className="farmer-profile-avatar"
        />
        <div className="farmer-profile-intro">
          <h2>{farmerDetails.name}</h2>
          <p className="align-center gap-xs">
            <IoLocationOutline style={{ color: 'var(--accent-yellow)' }} /> {farmerDetails.location}
          </p>
          <div className="align-center gap-sm mt-xs">
            <Stars rating={5} />
            <span style={{ fontSize: '0.85rem' }}>({farmerDetails.rating} average rating)</span>
          </div>
          <div className="farmer-badges-row mt-sm">
            <span className="verified-farm-badge">✓ Verified Farmer</span>
            {farmerDetails.certified && (
              <span className="verified-farm-badge" style={{ backgroundColor: 'var(--success-bg)', color: 'var(--success)', border: '1px solid var(--success)' }}>
                <FaLeaf style={{ display: 'inline', marginRight: '2px' }} /> Certified Organic
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="fm-layout mt-xl">
        {/* Left Column: Farm description */}
        <aside className="fm-sidebar" style={{ position: 'static', width: '100%' }}>
          <h3 className="filter-label" style={{ marginBottom: '12px' }}>Farm Bio Portfolio</h3>
          <p className="text-meta" style={{ lineHeight: '1.6', marginBottom: '20px' }}>{farmerDetails.bio}</p>
          
          <h4 className="filter-label" style={{ fontSize: '0.8rem', marginBottom: '8px' }}>Farming details</h4>
          <table className="farm-spec-table" style={{ marginTop: '0' }}>
            <tbody>
              <tr>
                <td>Farm Size</td>
                <td>{farmerDetails.farmSize}</td>
              </tr>
              <tr>
                <td>Experience</td>
                <td>{farmerDetails.experience}</td>
              </tr>
              <tr>
                <td>Certifications</td>
                <td>{farmerDetails.certified ? 'PGS India Organic' : 'Conventional State Verified'}</td>
              </tr>
            </tbody>
          </table>
        </aside>

        {/* Right Column: Farmer listings grid */}
        <div className="fm-main-content">
          <SectionHeader
            title="Crops Listed by Farmer"
            subtitle={`Explore fresh crops listed directly by ${farmerDetails.name}`}
          />

          <div className="fm-grid">
            {farmerCrops.map((crop) => (
              <FarmerCard
                key={crop.id || crop._id}
                listing={crop}
                onContact={() => navigate(`/farmer-marketplace/profile/${crop.farmerId || crop.farmer}`)}
                onNegotiate={() => navigate(`/farmer-marketplace/product/${crop.id || crop._id}?negotiate=true`)}
                onCardClick={() => navigate(`/farmer-marketplace/product/${crop.id || crop._id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmerProfile;
