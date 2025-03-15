import './Navbar.css';
import { GrLocation } from 'react-icons/gr'
import { BsSearch } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { BiCart } from 'react-icons/bi'
import InputField from '../../Resuable_Comp/InputField';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { userContext } from '../../ContextApi/userContextApi';
import logo from './logo.jpg';
import { addressContext } from '../../ContextApi/addressContext';
import ImageField from '../../Resuable_Comp/ImageField';

function Navbar() {
  const navigate=useNavigate();
  const {user}=useContext(userContext);
  const {getAddressFromCoords}=useContext(addressContext);
  const [search,setSearch]=useState('');
  const [location, setLocation] = useState("Location");

  // go to profile section
  function handleProfile(){
    if(user){
      navigate('/auth/user/profile');
    }
    else{
      navigate('/auth/login');
    }
  }

  // go to cart section
  function handleCart(){
    navigate("/user/cart");
  }

  function handleLocation(){
    if ("geolocation" in navigator){
      navigator.geolocation.getCurrentPosition(
          async (position) => {
              const { latitude, longitude } = position.coords;
              const address = await getAddressFromCoords(latitude, longitude);
              const allWords=address.split(",").filter(part => part.trim() !== "");
              setLocation(allWords[allWords.length-3]);
          },
          (error) => {
              console.error(error);
              setLocation("Location access denied");
          }
      );
    } else {
        setLocation("Geolocation not supported");
    }
  }


  return (
    <div className='navbar'>
        {/* <ImageField className='logo' 
            onClick={()=>navigate("/")} 
            image={"https://raw.githubusercontent.com/ankit20500/Farmers-App/refs/heads/main/Frontend/component/Home/Navbar/logo.jpg"}
             alt={"logo"}
          /> */}
        <p className='logo' onClick={()=>navigate("/")}>D-MART</p>

        <div className='location name'>
          <span style={{ marginRight: "2px",}}  className='icon' onClick={()=>handleLocation()}><GrLocation /></span>
          <span className='text loc' onClick={()=>handleLocation()}>{location}</span>
        </div>

        <div className='searchBar'>
          <span><BsSearch/></span>
          <InputField 
              onChange={(e)=>setSearch(e.target.value)} 
              type={"text"} 
              placeholder={"Search something..."}
            />
        </div>

        <div className='profile name'>
          <span className='icon' onClick={handleProfile}><CgProfile/></span>
          <span className='text' onClick={handleProfile}>Profile</span>
        </div>

        <div className='cart name'>
          <span className='icon' onClick={handleCart}><BiCart/></span>
          <span className='text' onClick={handleCart}>Cart</span>
        </div>
    </div>
  )
}

export default Navbar