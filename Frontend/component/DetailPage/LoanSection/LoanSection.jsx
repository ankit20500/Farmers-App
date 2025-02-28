import React, { useState } from "react";
import "./LoanSection.css";
import GovScheme from "./GovernmentScheme";
import SettlementCart from "./settlementCart";
import InputField from "../../Resuable_Comp/InputField";

const LoanPage = () => {
  const [loanDetails, setLoanDetails] = useState({
    name: "",
    phone: "",
    amount: "",
    reason: "",
  });

  const handleChange = (e) => {
    setLoanDetails({ ...loanDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your loan application has been submitted. Our team will contact you soon.");
    setLoanDetails({ name: "", phone: "", amount: "", reason: "" });
  };

  return (
    <div className="loan-container">
      <h2>💰Government Schemes & Farmer Loan</h2>
      <p>Choose the right financial support to strengthen your farming.</p>

      {/* Government Schemes Section */}
      <GovScheme/>

      {/* Loan Settlement Section (Adjusted for Better Layout) */}
      <section className="disaster-settlement-section">
        <h3>🌊 Loan Settlement in Natural Disasters</h3>
        <p className="highlight">
          If your crops are damaged due to **floods, drought, or other natural disasters**,  
          don’t worry—we are here to support you!
        </p>
        <div className="disaster-grid">
            <SettlementCart
                image={"https://bl-i.thgim.com/public/news/c9g7k8/article65693299.ece/alternates/FREE_1200/flood.jpg"}
                title={"Flood & Heavy Rainfall"}
                dis={"Financial relief will be provided for rain-damaged crops."}
                alt={"Flooded farm"}
            />

            <SettlementCart
                image={"https://th.bing.com/th/id/OIP.f9Uq4Z-DftXblsxJJuscbwHaFj?rs=1&pid=ImgDetMain"}
                title={"Drought & Water Scarcity"}
                dis={"Loan repayment can be adjusted or postponed in case of severe drought."}
                alt={"Drought land"}
            />

        </div>
        
        <p className="motivational-message">
          🌾 **Farming is not just a profession, it is a way of life!**  
          We stand with you in difficult times. 💚
        </p>
      </section>

      {/* EMI Calculator */}
      <section className="section">
        <h3>📊 EMI Calculator</h3>
        <p>If you take a ₹1,00,000 loan for 5 years at 3% interest, your estimated EMI will be ₹1,795 per month.</p>
      </section>


      {/* Loan Application Form */}
      <section className="loan-form-section">
        <h3>📋 Apply for a Loan</h3>
        <form onSubmit={handleSubmit}>
          <InputField
            title={"Full Name:"}
            type={"text"}
            name={"name"}
            placeholder={"Enter your name"}
            required={true}
          />
          <InputField
            title={"Mobile Number:"}
            type={"number"}
            name={"phone"}
            placeholder={"Enter your mobile number"}
            required={true}
          />
          <InputField
            title={"Loan Amount (₹):"}
            type={"number"}
            name={"amount"}
            placeholder={"Enter your mobile number"}
            required={true}
          />

          <label>Reason for Loan:</label>
          <textarea name="reason" placeholder="Why do you need this loan?" value={loanDetails.reason} onChange={handleChange} required></textarea>

          <button type="submit">📨 Submit Application</button>
        </form>
      </section>
    </div>
  );
};

export default LoanPage;
