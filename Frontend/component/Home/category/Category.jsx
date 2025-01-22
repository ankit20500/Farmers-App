import './Category.css'
import CategorySection from './SabCategorySection';
function Category(){
    return (
        <div className='category'>
            <div className="cat-heading">
                <span>Category</span>
            </div>
            <div className='category-circle'>
                <CategorySection  
                    name={'pesticides'} 
                    image={'https://th.bing.com/th/id/OIP.JZk6lq1hE-j3sF-ibK-_fwHaHa?w=600&h=600&rs=1&pid=ImgDetMain'}
                />

                <CategorySection 
                    name={'seeds'} 
                    image={'https://media.bighaat.com/wsfbanners/ba912d25-3087-4240-8405-3b2622b5d961.webp?w=1920&q=80'}
                />

                <CategorySection 
                    name={'Fertilizers'} 
                    image={'https://th.bing.com/th/id/OIP.7nKBQyLL4o-CbHrgF8d83QHaHa?w=500&h=500&rs=1&pid=ImgDetMain'}
                />

                <CategorySection 
                    name={'Nutrients'} 
                    image={'https://media.bighaat.com/wsfbanners/fbb5cfcb-bae3-47e4-bcf2-9556df773ab1.webp?w=1920&q=80'}
                />

                <CategorySection 
                    name={'Storage Solutions'} 
                    image={'https://i.pinimg.com/originals/23/df/6f/23df6f119e7d923adc33290cddf5cfee.jpg'}
                />

                <CategorySection 
                    name={'Flower Seeds'} 
                    image={'https://media.bighaat.com/wsfbanners/69dc72b4-ae76-414c-82ce-611e7e474c0f.webp?w=1920&q=80'}
                />

                <CategorySection 
                    name={'Organic Farming'} 
                    image={'https://media.bighaat.com/wsfbanners/e30ef4b6-7418-430a-98d4-bc38e6070a85.webp?w=1920&q=80'}
                />
                
                <CategorySection 
                    name={'Protective Gear'} 
                    image={'https://img-aws.ehowcdn.com/560x560/photos.demandstudios.com/getty/article/94/116/461034645.jpg'}
                />

                <CategorySection 
                    name={'Animal Husbandry'} 
                    image={'https://media.bighaat.com/wsfbanners/7fe75100-e3aa-41cc-9b81-727590e2e4ad.webp?w=1920&q=80'}
                />

                <CategorySection 
                    name={'Farming Equipments'} 
                    image={'https://media.bighaat.com/wsfbanners/8827ae31-f29f-4851-80c5-bde6464abc3f.webp?w=1920&q=80'}
                />

                

            </div>
        </div>
    )
}

export default Category;