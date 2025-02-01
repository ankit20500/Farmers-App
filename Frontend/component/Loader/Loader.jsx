import { InfinitySpin } from 'react-loader-spinner'
import './Loader.css'

function Loader(){
    return (
        <div className="loader-container">
            <InfinitySpin
                visible={true}
                width="200"
                color="#4fa94d"
                ariaLabel="infinity-spin-loading"
            />
        </div>
    );
}

export default Loader;