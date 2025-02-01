import { useNavigate, useParams } from 'react-router-dom';
import './ChooseCategory.css'

function ChooseCategory(){
    const navigate=useNavigate();
    const {name}=useParams();
    const categoryItems={
        pesticides:['herbicides','insecticides','fungicides','organic pesticides'],
        seeds:['wheat seeds','rice seeds','vegetable seeds','fruit seeds'],
        fertilizers:['organic fertilizers','chemical fertilizers','liquid fertilizers'],
        nutrients:['bio-nutrients','growth enhancers','soil conditioners'],
        storage_solutions:['grain storage bags','silos','storage tanks'],
        flower_seeds:['hybrid flower seeds','wildflowser seeds','organic flower seeds','seasonal flower seeds'],
        organic_farming:['bio fertilizers','bio pesticides','vermicompost'],
        protective_gear:['gloves','masks','hats and boots','shoes'],
        animal_husbandry:['animal feed','medicine and vaccines','fencing and shelter supplier','milking and dairy equipment'],
        farming_equipments:['hand tools','Machinery','irrigation tools','planting and harvesting equipment']

    }
    const normalizedCategoryName = name.replace(/\s+/g, '_');
    const items = categoryItems[normalizedCategoryName];

    // go to products page according to sub category
    function handleProduct(item){
        navigate(`/categories/${name.replace(/\s+/g, '_')}/subCategory/${item.replace(/\s+/g, '_')}`);
    }

    return(
        <div className='category-home'>
            <div className='category-content'>
                {items.length>0?(
                    items.map((item,idx)=><div onClick={()=>handleProduct(item)} key={idx}>{item}</div>)
                ):<p>No items</p>}
            </div>
        </div>
    )
}

export default ChooseCategory;