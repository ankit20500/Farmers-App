import { useNavigate } from 'react-router-dom';
import './Category.css'

function CategorySection({image,name}){
    const navigate=useNavigate();

    function handlebutton(){
        const category=name.toLowerCase();
        navigate(`/categories/${category.replace(/\s+/g, '_')}`);
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