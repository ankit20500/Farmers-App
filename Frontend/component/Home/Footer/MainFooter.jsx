import FirstFooter from "./FirstFooter.jsx";
import IndividualPg from "./IndividualPg.jsx";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { Link } from "react-router-dom";

function MainFooter(){
    return (
        <>
            <footer className="LastFooter">
                <div className="footer-container">
                    <IndividualPg 
                        poster={'COMPANY'} 
                        items={['About Us','Our Team','Careers']}
                        url={['about','teams','careers']}
                        />
                    <IndividualPg 
                        poster={'SERVICEs'} 
                        items={['Web Development', 'UI/UX Design','SEO Optimization']}
                        url={['development','uiuxDesigner','SEO-optimization']}
                        />
                    <IndividualPg 
                        poster={'SUPPORT'} 
                        items={['FAQ','Contact Us','Terms of Service']}
                        url={['faq','support','terms-and-service']}
                        />
                </div>
            
                <div>
                    <p>
                        © 2025 FarmerStore. All Rights Reserved. | Designed with Ankit❤️ for Farmers.
                    </p>
                    <p className="social-media">
                        <Link to={'https://www.youtube.com/watch?v=FYX6LMXVHEs'}><FaFacebookSquare/></Link>
                        <Link to={'https://www.youtube.com/watch?v=FYX6LMXVHEs'}><FaInstagramSquare/></Link>
                        <Link to={'https://www.youtube.com/watch?v=FYX6LMXVHEs'}><FaLinkedin/></Link>
                        <Link to={'https://www.youtube.com/watch?v=FYX6LMXVHEs'}><IoLogoYoutube/></Link>
                    </p>
                </div>
        </footer>
        </>
    )
}

export default MainFooter;