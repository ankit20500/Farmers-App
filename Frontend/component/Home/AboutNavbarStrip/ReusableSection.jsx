import './AboutNavStrip.css';

function ReusableSection({value,onclick}){
    return(
        <div onClick={onclick} className='aboutStrip-container-value'>
            {value}
        </div>
    )
}

export default ReusableSection;