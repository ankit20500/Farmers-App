import './Navbar.css';
import { GrLocation } from 'react-icons/gr'
import { BsSearch } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { BiCart } from 'react-icons/bi'
import InputField from '../../Resuable_Comp/InputField';
import { useNavigate } from 'react-router-dom';
// import { handleProfile } from './LogicPart';

function Navbar() {
  const navigate=useNavigate();

  function handleProfile(){
    navigate('/auth/register')
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
          <InputField type={"text"} placeholder={"Search something..."}/>
        </div>

        <div className='profile name'>
          <span className='icon' onClick={handleProfile}><CgProfile/></span>
          <span className='text' onClick={handleProfile}>Profile</span>
        </div>

        <div className='cart name'>
          <span className='icon'><BiCart/></span>
          <span className='text'>Cart</span>
        </div>
    </div>
  )
}

export default Navbar