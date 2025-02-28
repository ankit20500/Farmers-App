import React from "react";
import "./Knowledge.css";
import Cart from "./KnowCart";
import VideoCart from "./VideoCart";

const farmingTips = [
  {
    title: "Soil Health & Fertility",
    description: "Ensure your soil has the right nutrients by using organic compost and crop rotation.",
    image: "https://images.unsplash.com/photo-1523861751938-121b5323b48b?w=600",
  },
  {
    title: "Water-Saving Irrigation",
    description: "Use drip irrigation and rainwater harvesting to save water and improve yield.",
    image: "https://pestpointers.com/wp-content/uploads/2022/02/155831710_l-1-1024x683.jpg",
  },
  {
    title: "Pest Control Without Chemicals",
    description: "Use natural pesticides like neem oil to protect crops from insects and diseases.",
    image: "https://1.bp.blogspot.com/-Dd9FgZSUnKI/WnHFHyFvofI/AAAAAAAAFmw/sLZGE0tnHI40d0p_6HaiGlHauOeJDJbEACLcBGAs/s1600/chemical-pest-control.jpg",
  },
];

const modernTech = [
  {
    title: "Smart Irrigation Systems",
    description: "Automated irrigation can save 50% more water and increase crop yield.",
    image: "https://th.bing.com/th/id/OIP.5wAfoU1wO8mIGVGEYStbBgHaEc?rs=1&pid=ImgDetMain",
  },
  {
    title: "Drones for Pesticide Spraying",
    description: "Drones can spray pesticides evenly, saving time and reducing chemical usage.",
    image: "https://th.bing.com/th/id/OIP.JT4yakbmbrq1r34kmStLMQHaE8?rs=1&pid=ImgDetMain",
  },
  {
    title: "Hydroponic Farming",
    description: "Grow crops without soil using nutrient-rich water solutions.",
    image: "https://kj1bcdn.b-cdn.net/media/63733/ebb-and-flow-hydroponic-system.jpeg",
  },
];



const KnowledgePage = () => {
  return (
    <div className="knowledge-container">
      <h2>🌾 Farmer Knowledge Hub</h2>
      <p>Learn the best farming practices, explore new technologies, and watch expert tutorials.</p>

      {/* Farming Tips Section */}
      <section className="section">
        <h3>🚜 Farming Tips & Best Practices</h3>
        <div className="farming-section-grid">
          {farmingTips.map((tip, index) => (
            <Cart index={index} tip={tip}/>
          ))}
        </div>
      </section>

      {/* Modern Farming Technology Section */}
      <section className="section">
        <h3>🌱 Modern Farming Technology & Equipment</h3>
        <div className="farming-section-grid">
          {modernTech.map((tech, index) => (
            <Cart index={index} tip={tech}/>
          ))}
        </div>
      </section>

      {/* Video Tutorials Section */}
      <VideoCart/>
    </div>
  );
};

export default KnowledgePage;
