import './AboutNavStrip.css';
import ReusableSection from './ReusableSection';
import {useNavigate} from 'react-router-dom';

function AboutNavStrip(){
    const navigate=useNavigate();
   
    return(
        <div className='AboutStrip-container'>
            <ReusableSection onclick={()=>navigate("/about")} value={'About'}/>
            <ReusableSection onclick={()=>navigate("/service")} value={'Services'}/>
            <ReusableSection onclick={()=>navigate("/sell")} value={'Sell'}/>
            <ReusableSection onclick={()=>navigate("/loan")} value={'Loan'}/>
            <ReusableSection onclick={()=>navigate("/farmers")} value={'Trusted By Farmers'}/>
            <ReusableSection onclick={()=>navigate('/knowledge')} value={'Knowledge'}/>
            <ReusableSection onclick={()=>navigate("/support")} value={'Support'}/>
        </div>
    )
}

export default AboutNavStrip;