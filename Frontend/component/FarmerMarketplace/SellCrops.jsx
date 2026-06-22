import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { IoCheckmarkCircleOutline, IoCloudUploadOutline } from 'react-icons/io5';
import { userContext } from '../ContextApi/userContextApi';
import InputField from '../Resuable_Comp/InputField';
import Button from '../Resuable_Comp/Button';
import SectionHeader from '../Resuable_Comp/SectionHeader';
import './FarmerMarketplace.css';

function SellCrops() {
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const [step, setStep] = useState(1);

  // Form states
  const [farmerName, setFarmerName] = useState('');
  const [location, setLocation] = useState('');
  
  const [cropName, setCropName] = useState('');
  const [category, setCategory] = useState('Grains');
  const [harvestDate, setHarvestDate] = useState('');
  const [organic, setOrganic] = useState(true);

  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('kg');

  const [imagePreview, setImagePreview] = useState('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600');

  useEffect(() => {
    if (user) {
      setFarmerName(user.data.name || '');
    }
  }, [user]);

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleBackStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmitListing = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.info('Please sign in to publish crop listings.');
      navigate('/auth/login');
      return;
    }

    try {
      const payload = {
        productName: cropName,
        category,
        harvestDate,
        organic,
        quantity: Number(quantity),
        price: Number(price),
        unit,
        description: `Freshly harvested ${cropName} of premium grade. Directly shipped from verified farms in ${location}.`,
        image: imagePreview,
        location: location
      };

      await axios.post('http://localhost:3000/farmer-crop', payload, { withCredentials: true });
      toast.success('Your crop listing has been published successfully!');
      navigate('/farmer-marketplace');
    } catch (error) {
      console.error("Publish crop error:", error);
      toast.error(error.response?.data?.message || "Failed to publish crop listing");
    }
  };


  return (
    <div className="marketplace-container container py-xl animate-fade-in">
      <SectionHeader
        title="List Your Harvest Stock"
        subtitle="Complete our 5-step checklist to list your agricultural produce directly on our verified buyer board."
        badge="Direct Sell Form"
      />

      <div className="sell-form-card card-premium">
        {/* Step indicator bar */}
        <div className="sell-form-steps-nav">
          <div className={`sell-step-pill ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}>
            1
            <span className="sell-step-label">Farmer</span>
          </div>
          <div className={`sell-step-pill ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}>
            2
            <span className="sell-step-label">Crop Spec</span>
          </div>
          <div className={`sell-step-pill ${step === 3 ? 'active' : step > 3 ? 'completed' : ''}`}>
            3
            <span className="sell-step-label">Price & Vol</span>
          </div>
          <div className={`sell-step-pill ${step === 4 ? 'active' : step > 4 ? 'completed' : ''}`}>
            4
            <span className="sell-step-label">Images</span>
          </div>
          <div className={`sell-step-pill ${step === 5 ? 'active' : ''}`}>
            5
            <span className="sell-step-label">Publish</span>
          </div>
        </div>

        {/* Wizard Form bodies */}
        <div className="sell-form-body mt-xl">
          {step === 1 && (
            <form onSubmit={handleNextStep} className="animate-fade-in">
              <InputField
                title="Your Full Name"
                placeholder="Enter name matching ID credentials"
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                required
              />
              <InputField
                title="Farm Location (City, State)"
                placeholder="e.g. Nagpur, Maharashtra"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              <div className="wizard-actions mt-lg">
                <Button value="Continue to Crop Specs" type="submit" variant="primary" className="w-full" />
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNextStep} className="animate-fade-in">
              <InputField
                title="Crop Product Name"
                placeholder="e.g. Organic Basmati Rice / Golden Potatoes"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                required
              />
              <div className="quiz-select-field mb-md" style={{ marginBottom: '16px' }}>
                <label className="input-label">Crop Category Type</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option>Grains</option>
                  <option>Vegetables</option>
                  <option>Fruits</option>
                  <option>Pulses</option>
                  <option>Oilseeds</option>
                </select>
              </div>
              <InputField
                title="Actual Harvest Date"
                type="date"
                value={harvestDate}
                onChange={(e) => setHarvestDate(e.target.value)}
                required
              />
              <div className="filter-group-checkbox mt-md">
                <input
                  type="checkbox"
                  id="organicWizard"
                  checked={organic}
                  onChange={(e) => setOrganic(e.target.checked)}
                />
                <label htmlFor="organicWizard">Certified Organic Crop</label>
              </div>
              <div className="wizard-actions mt-lg flex gap-md">
                <Button value="Back" onclick={handleBackStep} variant="outline" className="flex-1" />
                <Button value="Continue to Volume" type="submit" variant="primary" className="flex-1" />
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleNextStep} className="animate-fade-in">
              <InputField
                title="Available Stock Quantity"
                placeholder="e.g. 500"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
              <div className="quiz-select-field mb-md" style={{ marginBottom: '16px' }}>
                <label className="input-label">Stock Units</label>
                <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                  <option value="kg">Kilograms (kg)</option>
                  <option value="quintal">Quintals (qtl)</option>
                  <option value="ton">Tons (t)</option>
                  <option value="dozen">Dozens (dz)</option>
                </select>
              </div>
              <InputField
                title={`Selling Base Price (₹ per ${unit})`}
                placeholder="e.g. 60"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <div className="wizard-actions mt-lg flex gap-md">
                <Button value="Back" onclick={handleBackStep} variant="outline" className="flex-1" />
                <Button value="Continue to Images" type="submit" variant="primary" className="flex-1" />
              </div>
            </form>
          )}

          {step === 4 && (
            <form onSubmit={handleNextStep} className="animate-fade-in">
              <label className="input-label">Harvest Quality Image</label>
              <div className="image-upload-zone" onClick={() => {
                // Preselect a nice mockup photo based on category or default
                const imageList = [
                  'https://images.unsplash.com/photo-1595855759920-86582396756a?w=600',
                  'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600',
                  'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600'
                ];
                const randomImg = imageList[Math.floor(Math.random() * imageList.length)];
                setImagePreview(randomImg);
                toast.info('Mock photo loaded for preview.');
              }}>
                <IoCloudUploadOutline className="upload-icon" style={{ margin: '0 auto' }} />
                <p>Click here to capture or select a preview photo of your crop bag.</p>
                <span className="text-meta">Supports PNG, JPG (Max 5MB)</span>
              </div>

              <div className="upload-preview-row">
                <img src={imagePreview} alt="Crop Preview" className="upload-preview-img" />
              </div>

              <div className="wizard-actions mt-lg flex gap-md">
                <Button value="Back" onclick={handleBackStep} variant="outline" className="flex-1" />
                <Button value="Continue to Review" type="submit" variant="primary" className="flex-1" />
              </div>
            </form>
          )}

          {step === 5 && (
            <form onSubmit={handleSubmitListing} className="animate-fade-in text-center">
              <IoCheckmarkCircleOutline style={{ fontSize: '3.5rem', color: 'var(--success)', margin: '0 auto 12px' }} />
              <h4>Review Listing Specifications</h4>
              <p className="text-meta" style={{ marginBottom: '16px' }}>Verify crop specifications details before publishing to public board.</p>

              <div className="summary-review-card text-left" style={{ textAlign: 'left' }}>
                <div>
                  <span>Farmer Name:</span>
                  <strong>{farmerName}</strong>
                </div>
                <div>
                  <span>Crop Name:</span>
                  <strong>{cropName}</strong>
                </div>
                <div>
                  <span>Farm Location:</span>
                  <strong>{location}</strong>
                </div>
                <div>
                  <span>Available Volume:</span>
                  <strong>{quantity} {unit}</strong>
                </div>
                <div>
                  <span>Unit Base Price:</span>
                  <strong>₹{price} / {unit}</strong>
                </div>
                <div>
                  <span>Farming Style:</span>
                  <strong>{organic ? 'Organic Certified' : 'Conventional'}</strong>
                </div>
              </div>

              <div className="wizard-actions mt-lg flex gap-md" style={{ marginTop: '24px' }}>
                <Button value="Back" onclick={handleBackStep} variant="outline" className="flex-1" />
                <Button value="Publish crop Listing" type="submit" variant="secondary" className="flex-1" />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default SellCrops;
