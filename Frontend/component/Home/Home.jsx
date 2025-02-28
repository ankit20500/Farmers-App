import Category from './category/category';
import FirstFooter from './Footer/FirstFooter';
import './Home.css';
import AllMidimage from './MidSection/Midimage';
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