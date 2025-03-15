import './AboutNavStrip.css';
import ReusableSection from './ReusableSection';
import {useNavigate} from 'react-router-dom';

function AboutNavStrip(){
    const navigate=useNavigate();
   
    return(
        <div className='AboutStrip-container'>
            <ReusableSection onclick={() => navigate("/about")} value={'About'} path="/about" />
            <ReusableSection onclick={() => navigate("/service")} value={'Services'} path="/service" />
            <ReusableSection onclick={() => navigate("/sell")} value={'Sell'} path="/sell" />
            <ReusableSection onclick={() => navigate("/loan")} value={'Loan'} path="/loan" />
            <ReusableSection onclick={() => navigate("/farmers")} value={'Trusted By Farmers'} path="/farmers" />
            <ReusableSection onclick={() => navigate("/knowledge")} value={'Knowledge'} path="/knowledge" />
            <ReusableSection onclick={() => navigate("/support")} value={'Support'} path="/support" />
        </div>
    )
}

export default AboutNavStrip;