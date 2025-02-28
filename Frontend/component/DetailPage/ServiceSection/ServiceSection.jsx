import "./ServiceSection.css";

const services = [
  {
    icon: "🛒",
    title: "Easy Buying & Selling",
    description: "Buy farming equipment, fertilizers, and pesticides. Sell crops directly to buyers at fair prices.",
  },
  {
    icon: "💳",
    title: "Secure Payment System",
    description: "Multiple payment options like UPI, Net Banking, and Cash on Delivery for hassle-free transactions.",
  },
  {
    icon: "🔗",
    title: "Direct Farmer-to-Buyer Connection",
    description: "No middlemen! Farmers and buyers can directly chat and make deals.",
  },
  {
    icon: "🚚",
    title: "Reliable Logistics & Delivery",
    description: "Fast and secure delivery of farming products with real-time tracking.",
  },
  {
    icon: "📚",
    title: "Farmer Knowledge Hub",
    description: "Access farming tips, crop management strategies, and market trends to maximize profits.",
  },
];

const ServiceSection = () => {
  return (
    <div className="service-container">
      <h2>Our Services</h2>
      <p>Helping farmers grow and buyers find quality products with ease.</p>
      <div className="service-grid">
        {services.map((service, index) => (
          <div key={index} className="service-box">
            <span className="service-icon">{service.icon}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSection;
