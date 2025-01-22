import FirstFooter from "./FirstFooter.jsx";
import IndividualPg from "./IndividualPg.jsx";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";

function MainFooter(){
    return (
        <>
            <FirstFooter/>

            <footer className="LastFooter">
                <div className="footer-container">
                    <IndividualPg poster={'COMPANY'} item1={'About Us'} item2={'Our Team'} item3={'Careers'}/>
                    <IndividualPg poster={'SERVICEs'} item1={'Web Development'} item2={'UI/UX Design'} item3={'SEO Optimization'}/>
                    <IndividualPg poster={'SUPPORT'} item1={'FAQ'} item2={'Contact Us'} item3={'Terms of Service'}/>
                </div>
            
                <div>
                    <p>
                        © 2025 FarmerStore. All Rights Reserved. | Designed with Ankit❤️ for Farmers.
                    </p>
                    <p className="social-media">
                        <span><FaFacebookSquare/></span>
                        <span><FaInstagramSquare/></span>
                        <span><FaLinkedin/></span>
                        <span><IoLogoYoutube/></span>
                    </p>
                </div>
        </footer>
        </>
    )
}

export default MainFooter;