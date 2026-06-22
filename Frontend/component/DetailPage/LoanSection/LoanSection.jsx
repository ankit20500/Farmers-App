import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { BsCalculator, BsBookmarkCheck, BsCashCoin } from 'react-icons/bs';
import { IoShieldCheckmarkOutline, IoShieldOutline } from 'react-icons/io5';
import GovScheme from './GovernmentScheme';
import SettlementCart from './settlementCart';
import InputField from '../../Resuable_Comp/InputField';
import Button from '../../Resuable_Comp/Button';
import SectionHeader from '../../Resuable_Comp/SectionHeader';
import LoanCard from '../../Resuable_Comp/LoanCard';
import './LoanSection.css';

const loanProductsList = [
  {
    title: 'Kisan Crop Cultivation Loan',
    interestRate: '3.0%',
    maxAmount: '₹3,00,000',
    tenure: '1 to 5 Years',
    description: 'Short-term credit designed to cover cultivation, crop maintenance, and immediate post-harvest expenses.',
    requirements: ['Land Title Ownership', 'Kisan Credit Card (KCC)']
  },
  {
    title: 'Agri-Machinery Credit Line',
    interestRate: '4.5%',
    maxAmount: '₹15,00,000',
    tenure: 'Up to 7 Years',
    description: 'Medium-term funding to buy tractors, combine harvesters, drip irrigation systems, and solar water pumps.',
    requirements: ['Proforma Invoice of Machinery', 'Land ownership / lease records']
  },
  {
    title: 'Solar Pump Installation Loan',
    interestRate: '3.5%',
    maxAmount: '₹5,00,000',
    tenure: 'Up to 5 Years',
    description: 'Eco-friendly financing option to upgrade irrigation systems to solar power. Covers up to 90% cost.',
    requirements: ['Government Solar Subsidy Letter', 'Farm coordinates']
  }
];

const LoanPage = () => {
  const [activeTab, setActiveTab] = useState('schemes');
  
  // EMI Calculator state
  const [loanAmount, setLoanAmount] = useState(100000);
  const [tenureYears, setTenureYears] = useState(5);
  const [interestRate, setInterestRate] = useState(3.0);
  const [calculatedEmi, setCalculatedEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);

  // Eligibility quiz state
  const [occupation, setOccupation] = useState('Farmer');
  const [annualIncome, setAnnualIncome] = useState('');
  const [hasKcc, setHasKcc] = useState(true);
  const [quizScore, setQuizScore] = useState(null);

  // Loan Form wizard state
  const [loanStep, setLoanStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(loanProductsList[0].title);
  const [formDetails, setFormDetails] = useState({
    name: '',
    phone: '',
    amountRequested: '',
    landAcre: '',
    reason: ''
  });

  // Calculate EMI dynamically on slider changes
  useEffect(() => {
    const P = loanAmount;
    const r = interestRate / 12 / 100; // Monthly interest rate
    const n = tenureYears * 12; // Total payments in months
    
    // Formula: EMI = [P x r x (1+r)^n] / [(1+r)^n - 1]
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const roundedEmi = Math.round(emi);
    const total = Math.round(emi * n);
    const interest = Math.round(total - P);

    if (isNaN(roundedEmi) || !isFinite(roundedEmi)) {
      setCalculatedEmi(0);
      setTotalInterest(0);
      setTotalPayable(0);
    } else {
      setCalculatedEmi(roundedEmi);
      setTotalInterest(interest);
      setTotalPayable(total);
    }
  }, [loanAmount, tenureYears, interestRate]);

  const handleFormChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    if (!annualIncome) return;
    
    let probability = 85;
    if (hasKcc) probability += 10;
    if (occupation === 'Farmer') probability += 5;
    
    setQuizScore(Math.min(probability, 99));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (loanStep < 3) {
      setLoanStep(loanStep + 1);
    } else {
      toast.success('Your micro-loan application was submitted successfully!');
      // Reset form
      setFormDetails({
        name: '',
        phone: '',
        amountRequested: '',
        landAcre: '',
        reason: ''
      });
      setLoanStep(1);
      setActiveTab('schemes'); // Take them back to schemes dashboard
    }
  };

  return (
    <div className="loan-dashboard-container container py-xl animate-fade-in">
      <SectionHeader
        title="Schemes & Micro-Loans"
        subtitle="Access direct financial assistance, micro-credit lines, and disaster relief solutions tailored for farming."
        badge="Fintech Services"
      />

      {/* Fintech Dashboard Tab Selectors */}
      <div className="loan-tab-row">
        <button
          className={`loan-tab-btn ${activeTab === 'schemes' ? 'active' : ''}`}
          onClick={() => setActiveTab('schemes')}
        >
          <BsBookmarkCheck /> Government Schemes
        </button>
        <button
          className={`loan-tab-btn ${activeTab === 'loans' ? 'active' : ''}`}
          onClick={() => setActiveTab('loans')}
        >
          <BsCashCoin /> Micro-Loan Products
        </button>
        <button
          className={`loan-tab-btn ${activeTab === 'calculator' ? 'active' : ''}`}
          onClick={() => setActiveTab('calculator')}
        >
          <BsCalculator /> EMI Calculator
        </button>
        <button
          className={`loan-tab-btn ${activeTab === 'disaster' ? 'active' : ''}`}
          onClick={() => setActiveTab('disaster')}
        >
          <IoShieldOutline /> Disaster Relief
        </button>
      </div>

      <div className="loan-tab-content mt-xl">
        
        {/* TAB 1: GOVERNMENT SCHEMES */}
        {activeTab === 'schemes' && (
          <div className="tab-pane animate-fade-in">
            <GovScheme />
          </div>
        )}

        {/* TAB 2: LOANS PRODUCTS & APPLY FLOW */}
        {activeTab === 'loans' && (
          <div className="tab-pane animate-fade-in">
            <div className="loans-split-layout">
              {/* Left Column: Loan Options */}
              <div className="loans-list-col">
                <h3 className="pane-section-title">Verified Loan Products</h3>
                <div className="loans-grid-container">
                  {loanProductsList.map((loan, idx) => (
                    <LoanCard
                      key={idx}
                      loan={loan}
                      onApply={() => {
                        setSelectedProduct(loan.title);
                        setFormDetails(prev => ({
                          ...prev,
                          amountRequested: loan.maxAmount.replace(/[^\d]/g, '')
                        }));
                        // Scroll to apply form
                        const formElem = document.getElementById('apply-loan-form-section');
                        if (formElem) formElem.scrollIntoView({ behavior: 'smooth' });
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Right Column: Mini Eligibility Checker & Apply Form */}
              <div className="loans-form-col" id="apply-loan-form-section">
                
                {/* 1. Mini Qualification Quiz */}
                <div className="eligibility-quiz-card card-premium">
                  <h4>Check Loan Approval Chance</h4>
                  <form onSubmit={handleQuizSubmit}>
                    <div className="quiz-input-row">
                      <div className="quiz-select-field">
                        <label>Occupation</label>
                        <select value={occupation} onChange={(e) => setOccupation(e.target.value)}>
                          <option>Farmer</option>
                          <option>Agri-business Owner</option>
                          <option>Co-operative Society</option>
                        </select>
                      </div>
                      <div className="quiz-select-field">
                        <label>Owns KCC Card?</label>
                        <select value={hasKcc ? 'Yes' : 'No'} onChange={(e) => setHasKcc(e.target.value === 'Yes')}>
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>
                    </div>
                    
                    <InputField
                      title="Approx. Annual Farm Income (₹)"
                      placeholder="e.g. 150000"
                      type="number"
                      value={annualIncome}
                      onChange={(e) => setAnnualIncome(e.target.value)}
                      required
                    />

                    <Button value="Calculate Probability" type="submit" variant="outline" className="w-full mt-sm" />
                  </form>

                  {quizScore !== null && (
                    <div className="quiz-result-banner animate-fade-in">
                      <div className="score-circle">
                        <span>{quizScore}%</span>
                      </div>
                      <p>Approval probability is high! Click form below to start.</p>
                    </div>
                  )}
                </div>

                {/* 2. Step-by-Step Application Form */}
                <div className="loan-application-wizard card-premium mt-lg">
                  <div className="wizard-header">
                    <h4>Apply for {selectedProduct}</h4>
                    <span className="wizard-step-indicator">Step {loanStep} of 3</span>
                  </div>

                  <form onSubmit={handleFormSubmit} className="mt-md">
                    {loanStep === 1 && (
                      <div className="wizard-step animate-fade-in">
                        <InputField
                          title="Applicant Full Name"
                          placeholder="Enter name matching ID documents"
                          name="name"
                          value={formDetails.name}
                          onChange={handleFormChange}
                          required
                        />
                        <InputField
                          title="Mobile Contact Number"
                          placeholder="e.g. 9876543210"
                          type="number"
                          name="phone"
                          value={formDetails.phone}
                          onChange={handleFormChange}
                          required
                        />
                        <div className="wizard-actions mt-lg">
                          <Button value="Next: Loan Details" type="submit" variant="primary" className="w-full" />
                        </div>
                      </div>
                    )}

                    {loanStep === 2 && (
                      <div className="wizard-step animate-fade-in">
                        <InputField
                          title="Required Loan Capital (₹)"
                          placeholder="e.g. 100000"
                          type="number"
                          name="amountRequested"
                          value={formDetails.amountRequested}
                          onChange={handleFormChange}
                          required
                        />
                        <InputField
                          title="Farm Land Cultivated (Acres)"
                          placeholder="e.g. 3.5"
                          type="number"
                          name="landAcre"
                          value={formDetails.landAcre}
                          onChange={handleFormChange}
                          required
                        />
                        <div className="wizard-actions mt-lg flex gap-md">
                          <Button value="Back" onclick={() => setLoanStep(1)} variant="outline" className="flex-1" />
                          <Button value="Next: Purpose" type="submit" variant="primary" className="flex-1" />
                        </div>
                      </div>
                    )}

                    {loanStep === 3 && (
                      <div className="wizard-step animate-fade-in">
                        <label className="input-label">Detailed Reason for Loan Application</label>
                        <textarea
                          name="reason"
                          placeholder="How will these funds help buy inputs, grow yields or install machinery?"
                          value={formDetails.reason}
                          onChange={handleFormChange}
                          required
                          className="loan-wizard-textarea"
                          rows="4"
                        />
                        <div className="wizard-actions mt-lg flex gap-md">
                          <Button value="Back" onclick={() => setLoanStep(2)} variant="outline" className="flex-1" />
                          <Button value="Submit Loan Form" type="submit" variant="secondary" className="flex-1" />
                        </div>
                      </div>
                    )}
                  </form>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EMI CALCULATOR */}
        {activeTab === 'calculator' && (
          <div className="tab-pane animate-fade-in">
            <div className="emi-calculator-grid">
              
              {/* Left Side: Sliders inputs */}
              <div className="emi-sliders-card card-premium">
                <h3>Calculate Estimated Payments</h3>
                <p className="text-meta mb-lg">Calculate monthly principal and interest payouts. Agri rate is locked at low 3.0% by default.</p>

                <div className="slider-group-emi mt-md">
                  <div className="slider-header-label">
                    <span>Borrowing Capital (₹)</span>
                    <strong>₹{loanAmount.toLocaleString()}</strong>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="1000000"
                    step="10000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                    className="price-slider"
                  />
                  <div className="slider-labels">
                    <span>₹10,000</span>
                    <span>₹10,00,000</span>
                  </div>
                </div>

                <div className="slider-group-emi mt-lg">
                  <div className="slider-header-label">
                    <span>Loan Duration Tenure</span>
                    <strong>{tenureYears} Years</strong>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(parseInt(e.target.value))}
                    className="price-slider"
                  />
                  <div className="slider-labels">
                    <span>1 Year</span>
                    <span>10 Years</span>
                  </div>
                </div>

                <div className="slider-group-emi mt-lg">
                  <div className="slider-header-label">
                    <span>Subsidy Annual Interest Rate (%)</span>
                    <strong>{interestRate}%</strong>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="12.0"
                    step="0.5"
                    value={interestRate}
                    onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                    className="price-slider"
                  />
                  <div className="slider-labels">
                    <span>1.0% (DBT Spec)</span>
                    <span>12.0%</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Calculation results */}
              <div className="emi-results-card card-glass">
                <div className="emi-circle-display">
                  <span className="emi-amount-label">Monthly EMI Payout</span>
                  <h2 className="emi-amount-value">₹{calculatedEmi.toLocaleString()}</h2>
                  <span className="emi-amount-period">per month</span>
                </div>

                <div className="emi-breakdown-details mt-xl">
                  <div className="breakdown-row">
                    <span>Borrowing Principal</span>
                    <strong>₹{loanAmount.toLocaleString()}</strong>
                  </div>
                  <div className="breakdown-row">
                    <span>Accumulated Interest</span>
                    <strong className="text-accent">₹{totalInterest.toLocaleString()}</strong>
                  </div>
                  <hr />
                  <div className="breakdown-row total-payable-row">
                    <span>Total Amount Payable</span>
                    <strong>₹{totalPayable.toLocaleString()}</strong>
                  </div>
                </div>

                <div className="emi-note mt-lg">
                  <IoShieldCheckmarkOutline />
                  <p>Rates calculated include active central farm subsidies rebates.</p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: DISASTER RELIEF */}
        {activeTab === 'disaster' && (
          <div className="tab-pane animate-fade-in">
            <section className="disaster-settlement-section card-premium">
              <SectionHeader
                title="Disaster Loan Settlement & Forgiveness"
                subtitle="Farming is a way of life, and we support you in difficult times. Adjust or postpone repayment programs in case of crop failure due to weather conditions."
                badge="Disaster Relief"
              />

              <div className="disaster-grid mt-lg">
                <SettlementCart
                  image="https://bl-i.thgim.com/public/news/c9g7k8/article65693299.ece/alternates/FREE_1200/flood.jpg"
                  title="Flood & Heavy Rainfall Support"
                  dis="Government-backed financial relief and post-flood loan extensions will be calculated dynamically based on regional rain damage records."
                  alt="Flooded farm crop"
                />

                <SettlementCart
                  image="https://th.bing.com/th/id/OIP.f9Uq4Z-DftXblsxJJuscbwHaFj?rs=1&pid=ImgDetMain"
                  title="Drought & Water Scarcity Support"
                  dis="Payment delays or partial interest relief for micro-loans will be approved automatically for areas declared drought-affected."
                  alt="Dry cracked soil"
                />
              </div>

              <div className="disaster-action-footer mt-xl">
                <h4>Need to submit a crop damage verification report?</h4>
                <p>Register your farm details and request inspection support from local agrarian officers.</p>
                <Button
                  value="Request Damage Inspection"
                  onclick={() => toast.info('Our inspection team will contact you for verification.')}
                  variant="accent"
                  className="mt-md"
                />
              </div>
            </section>
          </div>
        )}

      </div>
    </div>
  );
};

export default LoanPage;
