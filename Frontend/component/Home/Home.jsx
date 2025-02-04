import Category from './category/category';
import './Home.css';
import AllMidimage from './MidSection/Midimage';
import MidStrip from './MidStrip/MidStrip';

function Home(){
    return(
        <div>
            <AllMidimage/>
            <Category/>
            <MidStrip/>
        </div>
    )
}
export default Home;