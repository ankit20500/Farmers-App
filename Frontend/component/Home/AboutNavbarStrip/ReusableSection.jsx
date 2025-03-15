import { useLocation } from 'react-router-dom';
import './AboutNavStrip.css';

function ReusableSection({value,onclick,path}){
    const location=useLocation();
    return(
        <div 
            onClick={onclick} 
            className={`aboutStrip-container-value ${location.pathname === path ? "active" : ""}`}
        >
            {value}
        </div>
    )
}

export default ReusableSection;