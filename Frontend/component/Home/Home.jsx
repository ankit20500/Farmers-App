import Category from './category/Category';
import FirstFooter from './Footer/FirstFooter';
import './Home.css';
import AllMidimage from './MidSection/MidImage';
import MidStrip from './MidStrip/MidStrip';

function Home(){
    return(
        <div>
            <AllMidimage/>
            <Category/>
            <MidStrip/>
            <FirstFooter/>
        </div>
    )
}
export default Home;