import './Star.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function Stars({ rating }) {
    const maxStars = 5;
    const starsArray = [];

    for (let i = 1; i <= maxStars; i++) {
        if (rating >= i) {
            // Full star
            starsArray.push(<FaStar key={i} color='#E29111'/>);
        } else if (rating >= i - 0.5) {
            // Half star
            starsArray.push(<FaStarHalfAlt key={i} color='#E29111'/>);
        } else {
            // Empty star
            starsArray.push(<FaRegStar key={i} color='#E29111'/>);
        }
    }

    return <div>{starsArray}</div>;
}

export default Stars;
