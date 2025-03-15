import { Link } from 'react-router-dom';
import './Footer.css'

function IndividualPg({poster,items,url}){
    return(
        <div className="footer-column">
                <h4>{poster}</h4>
                <ul>
                    {items.map((item,idx)=>
                            <li key={idx}>
                                <Link to={`${url[idx]}`}>{item}</Link>
                            </li>)}
                </ul>
            </div>
    )
}

export default IndividualPg;