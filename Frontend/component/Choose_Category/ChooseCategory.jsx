import { useNavigate, useParams } from 'react-router-dom';
import './ChooseCategory.css'

function ChooseCategory(){
    const navigate=useNavigate();
    const {name}=useParams();
    const categoryItems={
        pesticides:['Herbicides','Insecticides','Fungicides','Organic Pesticides'],
        seeds:['Wheat seeds','Rice seeds','Vegetable seeds','Fruit seeds'],
        Fertilizers:['Organic fertilizers','Chemical fertilizers','Liquid fertilizers'],
        Nutrients:['Bio-Nutrients','Growth Enhancers','Soil Conditioners'],
        Storage_Solutions:['Grain storage bags','Silos','Storage tanks'],
        Flower_Seeds:['Hybrid flower seeds','Wildflowser seeds','organic flower seeds','seasonal flower seeds'],
        Organic_Farming:['Bio fertilizers','Bio pesticides','Vermicompost'],
        Protective_Gear:['Gloves','Masks','Hats and boots','Shoes'],
        Animal_Husbandry:['Animal feed','Medicine and Vaccines','Fencing and shelter supplier','Milking and dairy equipment'],
        Farming_Equipments:['Hand tools','Machinery','Irrigation tools','Planting and Harvesting equipment']

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