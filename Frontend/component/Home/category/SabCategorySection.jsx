import { useNavigate } from 'react-router-dom';
import './Category.css'

function CategorySection({image,name}){
    const navigate=useNavigate();

    function handlebutton(){
        navigate(`/${name.replace(/\s+/g, '_')}/categories`);
    }
    return (
        <div className='category-section'>
            <div onClick={handlebutton} className='sub-section'>
                <img src={image}/>
            </div>
            <span onClick={handlebutton} className='cat-name'>{name}</span>
        </div>
    )
}

export default CategorySection;