import './Navbar.css';
import { GrLocation } from 'react-icons/gr'
import { BsSearch } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { BiCart } from 'react-icons/bi'
import InputField from '../../Resuable_Comp/InputField';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { userContext } from '../../ContextApi/userContextApi';

function Navbar() {
  const navigate=useNavigate();
  const {user}=useContext(userContext);
  const [search,setSearch]=useState('');

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

  // h
  function handleInput(e){
    setSearch(e.target.value);
  }

  return (
    <div className='navbar'>
        <div className='logo'><b onClick={()=>navigate("/")}>Ankit</b></div>

        <div className='location name'>
          <span style={{ marginRight: "2px",}}  className='icon'><GrLocation /></span>
          <span className='text loc'>Location</span>
        </div>

        <div className='searchBar'>
          <span><BsSearch/></span>
          <InputField onChange={(e)=>handleInput(e)} type={"text"} placeholder={"Search something..."}/>
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