import React from "react";
import "./FarmersReview.css";
import ImageField from "../../Resuable_Comp/ImageField";

const farmers = [
  {
    name: "Ramesh Kumar",
    location: "Bihar, India",
    image: "https://agropreneurs.in/wp-content/uploads/2023/12/farmer-19-sq.jpg",
    story: `Mujhe kheti karte 15 saal ho gaye hain. Shuru mein hum purani tareeke se kheti karte the, lekin kamaai bohot kam hoti thi. 
    Beech waale (middlemen) hamare anaj ka sahi daam nahi dete the, aur hum bas guzara kar rahe the.

    2020 mein, ek dost ne mujhe KrishiMart ke baare mein bataya. Pehle mujhe yakeen nahi hua, lekin maine apne gehun ki listing dali. 
    Kuch hi dino mein mere paas seedha kharidne waale log aaye, bina kisi beech waale ke! Pehli baar mujhe laga ki main apne kaam ka asli malik hoon.

    Aaj meri kamaai lagbhag dugni ho chuki hai. Maine apne kheti ka area badha diya hai aur naye mazdoor rakhe hain. 
    Meri family ka jeevan badal gaya hai, aur ab main apne bachchon ko acchi shiksha de sakta hoon. Kaash mujhe KrishiMart ke baare mein pehle pata chala hota!`,
  },
  {
    name: "Sunita Devi",
    location: "Uttar Pradesh, India",
    image: "https://th.bing.com/th/id/OIP.-Xo40nCGoiQsAqcDtc2ChwHaGr?w=1109&h=1001&rs=1&pid=ImgDetMain",
    story: `Mujhe hamesha organic farming ka shauk tha. Maine 2016 mein chhoti si organic kheti shuru ki, 
    lekin samasya yeh thi ki log organic sabziyon ke liye zyada paise dene ko tayar nahi the. 

    Phir mujhe KrishiMart ke baare mein pata chala. Maine apne farm ki tazi sabziyon ki tasveerein upload ki, 
    aur kuch hi dino mein mujhe pehla order mila! Dheere-dheere mere customers badhne lage, aur meri kamaai bhi.

    Aaj mujhe kisi mandi ya dealer ke paas nahi jaana padta. Mere pas khud ki ek market hai jo meri kheti ki kimat samajhti hai. 
    KrishiMart ne meri zindagi badal di hai, aur mujhe umeed hai ki aur bhi kisaan is platform ka fayda uthayenge!`,
  },
];

const FarmerStories = () => {
  return (
    <div className="stories-container">
      <h2>🌾 Farmer Stories</h2>
      <p>Real stories from real farmers who changed their lives with KrishiMart.</p>

      <div className="stories-grid">
        {farmers.map((farmer, index) => (
          <div key={index} className="story-card">
            <ImageField image={farmer.image} alt={farmer.name} className="farmer-image" />
            <h3>{farmer.name}</h3>
            <p className="location">📍 {farmer.location}</p>
            <p className="farmer-story">{farmer.story}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmerStories;
