import { Link } from 'react-router-dom';
import './Footer.css'

function IndividualPg({poster,items}){
    return(
        <div className="footer-column">
                <h4>{poster}</h4>
                <ul>
                    {items.map((item,idx)=><li key={idx}><Link to={`${item}`}>{item}</Link></li>)}
                </ul>
            </div>
    )
}

export default IndividualPg;