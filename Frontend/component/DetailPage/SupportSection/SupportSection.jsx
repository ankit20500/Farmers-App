import React from "react";
import "./SupportSection.css";
import SupportCart from "./SupportCart";
import SupportQuestion from "./SupportQues";
import InputField from "../../Resuable_Comp/InputField";
import Button from "../../Resuable_Comp/Button";

const SupportPage = () => {
  return (
    <div className="support-container">
      <h2>📞 Kisaan Support Center</h2>
      <p>Agar aapko madad ki zaroorat hai, hamari team aapke saath hai!</p>

      {/* Contact Options */}
      <section className="contact-section">
        <SupportCart
            supportType={"📞 Call Support"}
            disc={"Hamare expert se baat karein:"}
            contact={"+91 98765 43210"}
        />

        <SupportCart
            supportType={"💬 WhatsApp Support"}
            disc={"Direct message karein:"}
            contact={"+91 98765 43210"}
        />

        <SupportCart
            supportType={"📩 Email Support"}
            disc={"Humein email bhejein:"}
            contact={"support@krishimart.com"}
        />
      </section>

      {/* FAQ Section */}
      <SupportQuestion/>

      {/* Complaint Form */}
      <section className="complaint-section">
        <h3>⚠ Explain Your Problems</h3>
        <form>
          <label>Naam:</label>
          <InputField type={"text"} placeholder={"Enter Your Name"} required={true}/>

          <label>Mobile Number:</label>
          <InputField type={"number"} placeholder={"Enter Your Number"} required={true}/>

          <label>Your Problems:</label>
          <textarea placeholder="Explain your problems..." required></textarea>

          <Button value={"📨 Submit Complaint"}/>
        </form>
      </section>
    </div>
  );
};

export default SupportPage;
