import React from "react";
import "./AboutSection.css";
import BenifitSection from "./BenifitSection";
import StateSection from "./StateSection";
import Button from "../../Resuable_Comp/Button";
import {useNavigate} from 'react-router-dom'

const About = () => {
  const navigate=useNavigate();
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div
        className="hero"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/2209384/pexels-photo-2209384.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')`,
        }}
      >
        <div className="hero-content">
          <h1>Welcome to KrishiMart</h1>
          <p>
            KrishiMart is India's first **farmer-friendly e-commerce platform** that connects farmers and buyers
            directly. Whether you need **farming equipment, pesticides, seeds, or want to sell your crops at a
            fair price**, KrishiMart is here to **empower** you.
          </p>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="benefits">
        <h2>Why Choose KrishiMart?</h2>
        <div className="benefit-boxes">

          <BenifitSection
            benefits={{
              heading:"🌱 For Farmers",
              points:[
                "Sell directly to buyers with **fair pricing**.",
                "No middlemen, **100% profit goes to you**.",
                "Connect with customers in **real-time**.",
                "List your crops **easily** and start selling."
              ]
            }}
          />

          <BenifitSection
            benefits={{
              heading:"🛒 For Buyers",
              points:[
                "Get **high-quality** farming products.",
                "Buy directly from **verified farmers**.",
                "Secure payment and **fast delivery**.",
                "Best price guarantee without extra charges."
              ]
            }}
          />

        </div>
      </div>

      {/* Call to Action */}
      <div className="cta">
        <h2>Join KrishiMart Today!</h2>
        <p>Start buying and selling directly with trust and transparency.</p>
        <Button className="cta-button" onclick={()=>navigate("/auth/register")} value={"Get Started"} />
      </div>
      
      {/* Trust & Statistics Section */}
          <StateSection
            statusTitle="Our Impact So Far"
            property={[
              {value:"🌾 50,000+ Farmers",description:"Connected to genuine buyers and selling their crops."},
              {value:"📦 1,00,000+ Orders",description:"Processed for farming equipment, seeds, and fertilizers."},
              {value:"🌍 100+ Cities",description:"Serving farmers & buyers across India."}
            ]}
          />
          
    </div>
  );
};

export default About;
