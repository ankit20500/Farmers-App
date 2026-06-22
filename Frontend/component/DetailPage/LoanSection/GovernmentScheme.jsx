import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import SchemeCard from '../../Resuable_Comp/SchemeCard';
import SearchBar from '../../Resuable_Comp/SearchBar';
import FilterPills from '../../Resuable_Comp/FilterPills';
import Button from '../../Resuable_Comp/Button';
import InputField from '../../Resuable_Comp/InputField';

const initialSchemesList = [
  {
    title: 'PM Kisan Samman Nidhi Yojana',
    description: 'Financial support providing ₹6,000 per year directly to bank accounts of land-holding farmer families in three equal installments.',
    link: 'https://pmkisan.gov.in/',
    category: 'Financial Assistance',
    eligibility: 'Small & marginal landholding farmers'
  },
  {
    title: 'Kisan Credit Card (KCC) Scheme',
    description: 'Access affordable credit up to ₹3 Lakhs at subsidized interest rates (low as 3%-4% with timely repayment) for farm cultivation expenses.',
    link: 'https://www.nabard.org/kcc.aspx',
    category: 'Agricultural Credit',
    eligibility: 'All farmers, sharecroppers, and tenant cultivators'
  },
  {
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    description: 'Complete crop insurance cover against failure due to natural calamities, pests, and crop diseases with very low premium rates.',
    link: 'https://pmfby.gov.in/',
    category: 'Crop Insurance',
    eligibility: 'All farmers growing notified crops in notified areas'
  },
  {
    title: 'Agri-Clinic & Agri-Business Center (ACABC)',
    description: 'Provides credit-linked back-ended subsidies (up to 36%-44%) to setup custom hiring centers, clinics, and animal health centers.',
    link: 'https://www.agriclinics.net/',
    category: 'Subsidies',
    eligibility: 'Agricultural graduates, diploma holders, and science graduates'
  },
  {
    title: 'Sub-Mission on Agricultural Mechanization (SMAM)',
    description: 'Subsidies of 40% to 50% for purchasing high-tech farming machinery like tractors, rotavators, power tillers, and laser levellers.',
    link: 'https://farmech.dac.gov.in/',
    category: 'Subsidies',
    eligibility: 'Individual farmers, cooperative societies, and self-help groups'
  }
];

function GovScheme() {
  const [schemes] = useState(initialSchemesList);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [appliedSchemes, setAppliedSchemes] = useState({}); // Tracking scheme applications
  const [activeApplyScheme, setActiveApplyScheme] = useState(null); // Active apply modal
  const [applyStep, setApplyStep] = useState(1); // Application steps
  
  // Apply form state
  const [farmerId, setFarmerId] = useState('');
  const [landArea, setLandArea] = useState('');
  const [bankAccount, setBankAccount] = useState('');

  const categories = ['All', 'Financial Assistance', 'Agricultural Credit', 'Crop Insurance', 'Subsidies'];

  // Handle Search and Category Filter
  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch = scheme.title.toLowerCase().includes(search.toLowerCase()) || 
                          scheme.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || scheme.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleApplyClick = (scheme) => {
    setActiveApplyScheme(scheme);
    setApplyStep(1);
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (applyStep === 1) {
      setApplyStep(2); // Move to verification confirmation
    } else {
      setAppliedSchemes((prev) => ({
        ...prev,
        [activeApplyScheme.title]: 'Applied (In Verification)'
      }));
      toast.success(`Application submitted for ${activeApplyScheme.title}!`);
      // Reset form
      setFarmerId('');
      setLandArea('');
      setBankAccount('');
      setActiveApplyScheme(null);
    }
  };

  return (
    <section className="schemes-interactive-board py-lg">
      <div className="schemes-header-filters">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch('')}
          placeholder="Search government schemes..."
          className="schemes-search-bar"
        />
        
        <FilterPills
          options={categories}
          activeValue={activeCategory}
          onSelect={setActiveCategory}
          className="schemes-filter-pills"
        />
      </div>

      <div className="grid grid-cols-3 mt-lg">
        {filteredSchemes.length > 0 ? (
          filteredSchemes.map((scheme, index) => (
            <SchemeCard
              key={index}
              scheme={scheme}
              onApply={() => handleApplyClick(scheme)}
              status={appliedSchemes[scheme.title] || 'Active'}
            />
          ))
        ) : (
          <div className="grid-span-all text-center py-xl">
            <p style={{ color: 'var(--text-muted)' }}>No government schemes matched your active query filters.</p>
          </div>
        )}
      </div>

      {/* Scheme Application Step-by-Step Modal */}
      {activeApplyScheme && (
        <div className="review-modal-wrapper">
          <div className="review-modal-card card-premium animate-slide-up" style={{ maxWidth: '500px' }}>
            <div className="review-input-heading">
              Apply for {activeApplyScheme.title}
            </div>

            <form onSubmit={handleApplySubmit}>
              {applyStep === 1 ? (
                <div className="apply-step-body animate-fade-in">
                  <p className="text-meta mb-md" style={{ marginBottom: '16px' }}>
                    Please supply your verified agricultural credentials to check qualification requirements for this scheme.
                  </p>
                  
                  <InputField
                    title="Kisan Aadhaar / ID Card Number"
                    placeholder="Enter 12-digit Aadhaar card"
                    value={farmerId}
                    onChange={(e) => setFarmerId(e.target.value)}
                    required
                  />

                  <InputField
                    title="Cultivated Land Area (Acres)"
                    placeholder="e.g. 2.5"
                    type="number"
                    value={landArea}
                    onChange={(e) => setLandArea(e.target.value)}
                    required
                  />

                  <InputField
                    title="Primary Bank Account Number (for DBT)"
                    placeholder="Enter 11 to 16-digit account number"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                    required
                  />

                  <div className="review-input-buttons mt-lg">
                    <Button value="Cancel" onclick={() => setActiveApplyScheme(null)} variant="outline" />
                    <Button value="Verify & Continue" type="submit" variant="primary" />
                  </div>
                </div>
              ) : (
                <div className="apply-step-body animate-fade-in text-center py-md">
                  <div style={{ fontSize: '3rem', color: 'var(--success)', marginBottom: '16px' }}>
                    <IoCheckmarkCircleOutline style={{ margin: '0 auto' }} />
                  </div>
                  <h4 style={{ marginBottom: '8px' }}>Credentials Verified Successfully</h4>
                  <p className="text-meta" style={{ marginBottom: '24px' }}>
                    Based on your Land Area of {landArea} Acres, you are eligible for 100% DBT payouts. Payouts will be credited to account ending in ...{bankAccount.slice(-4)}.
                  </p>

                  <div className="review-input-buttons mt-lg" style={{ justifyContent: 'center', gap: '16px' }}>
                    <Button value="Back" onclick={() => setApplyStep(1)} variant="outline" />
                    <Button value="Confirm & Apply Now" type="submit" variant="secondary" />
                  </div>
                </div>
              )}
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setActiveApplyScheme(null)} />
        </div>
      )}
    </section>
  );
}

export default GovScheme;