import { Link } from 'react-router-dom';
import './Footer.css'

function IndividualPg({poster,item1,item2,item3}){
    return(
        <div className="footer-column">
                <h4>{poster}</h4>
                <ul>
                    <li><Link to="/about">{item1}</Link></li>
                    <li><Link to="/team">{item2}</Link></li>
                    <li><Link to="/careers">{item3}</Link></li>
                </ul>
            </div>
    )
}

export default IndividualPg;