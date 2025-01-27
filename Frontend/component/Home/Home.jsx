import { useContext } from 'react';
import Category from './category/category';
import './Home.css';
import AllMidimage from './MidSection/Midimage';
import MidStrip from './MidStrip/MidStrip';
import { contextProvider } from '../ContextApi';

function Home(){
    const {signupData}=useContext(contextProvider);
    console.log(signupData);
    return(
        <div>
            <AllMidimage/>
            <Category/>
            <MidStrip/>
        </div>
    )
}
export default Home;