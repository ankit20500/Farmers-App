import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaLeaf, FaPlus } from 'react-icons/fa';
import FarmerCard from '../Resuable_Comp/FarmerCard';
import SectionHeader from '../Resuable_Comp/SectionHeader';
import SearchBar from '../Resuable_Comp/SearchBar';
import FilterPills from '../Resuable_Comp/FilterPills';
import EmptyState from '../Resuable_Comp/EmptyState';
import Button from '../Resuable_Comp/Button';
import './FarmerMarketplace.css';

function FarmerMarketplace() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  
  // Filters State
  const [search, setSearch] = useState('');
  const [organicFilter, setOrganicFilter] = useState('All');
  const [maxPrice, setMaxPrice] = useState(500);

  // Fetch crops data from backend
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/farmer-crop?search=${search}&organic=${organicFilter}&maxPrice=${maxPrice}`);
        const data = response.data.data || [];
        setListings(data);
        setFilteredListings(data);
      } catch (error) {
        console.error("Fetch crops error:", error);
        toast.error("Failed to fetch crop listings");
      }
    };
    fetchCrops();
  }, [search, organicFilter, maxPrice]);


  return (
    <div className="marketplace-container container py-xl animate-fade-in">
      <SectionHeader
        title="Direct Farmer Marketplace"
        subtitle="Connect, negotiate, and purchase harvest stocks directly from farmers. 100% Commission-free."
        badge="Zero Middlemen"
        action={
          <Button
            value="List Your Harvest"
            onclick={() => navigate('/farmer-marketplace/sell')}
            variant="accent"
            icon={<FaPlus />}
          />
        }
      />

      <div className="fm-layout">
        {/* Sidebar Filters */}
        <aside className="fm-sidebar">
          <div className="filter-group">
            <label className="filter-label">Search Crops</label>
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch('')}
              placeholder="Search crop, farmer, or region..."
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">Farming Style</label>
            <FilterPills
              options={['All', 'Organic', 'Conventional']}
              activeValue={organicFilter}
              onSelect={setOrganicFilter}
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">Max Price per Unit: ₹{maxPrice}</label>
            <input
              type="range"
              min="10"
              max="500"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="price-slider"
            />
            <div className="slider-labels">
              <span>₹10</span>
              <span>₹500</span>
            </div>
          </div>

          <button
            className="clear-filters-btn-accent mt-md"
            onClick={() => {
              setSearch('');
              setOrganicFilter('All');
              setMaxPrice(500);
            }}
          >
            Clear Filters
          </button>
        </aside>

        {/* Main listings Grid */}
        <div className="fm-main-content">
          {filteredListings.length > 0 ? (
            <div className="fm-grid">
              {filteredListings.map((crop) => (
                <FarmerCard
                  key={crop.id || crop._id}
                  listing={crop}
                  onContact={() => navigate(`/farmer-marketplace/profile/${crop.farmerId || crop.farmer}`)}
                  onNegotiate={() => navigate(`/farmer-marketplace/product/${crop.id || crop._id}?negotiate=true`)}
                  onCardClick={() => navigate(`/farmer-marketplace/product/${crop.id || crop._id}`)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Harvest Available"
              description="We could not find any active crop listings matching your search tags."
              actionLabel="Show All Listings"
              onAction={() => {
                setSearch('');
                setOrganicFilter('All');
                setMaxPrice(500);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default FarmerMarketplace;
