import { useParams } from 'react-router-dom';
import './Products.css';
import { useContext, useEffect, useState } from 'react';
import { contextProvider } from '../ContextApi';
import { toast } from 'react-toastify';
import Stars from '../StarComp/Star';
import Loader from '../Loader/Loader';

function ProudctDetails(){
    const {id}=useParams();
    const {fetchProductById}=useContext(contextProvider);
    const [product,setProduct]=useState(null);
    
    // fetch the product details with id
    useEffect(()=>{
        try {
            async function fetchData(){
                const response=await fetchProductById(id);
                console.log(response.data.data[0]);
                setProduct(response.data.data[0]);
            }
            fetchData();
        } catch (error) {   
            toast(error.response.message);
        }
    },[id])

    // if product is null then loader will be shown
    if (!product) {
        return <Loader/>
    }
    
    return(
        <div className='product-details-home'>
            <span>Go Back</span>
            <div className='product-subHome'>
                <div className='product-details-left'>
                    <img src="https://i5.walmartimages.com/asr/e82d6b6d-b65d-4d3c-9cc2-8664a1f7042e_1.4489bf730cb2591f99d531aba0404700.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff"/>
                </div>
                <div className='product-details-right'>
                    <p>{product.productname}</p>
                    <p>Category: {product.category}</p>
                    <p>subCategory: {product.subcategory}</p>
                    <div><Stars rating={product.ratings}/>(0 review)</div>
                    <p>description: {product.description}</p>
                </div>
                <div className='product-details-right-2'>
                    <div>
                        <span>Price:</span>
                        <span>₹{product.price}</span>
                    </div>
                    <div>
                        <span>Stock:</span>
                        <span>{product.stock>0?"In Stock":"Out of Stock"}</span>
                        </div>
                    <button className="add-to-cart-btn">ADD TO CART</button>
                </div>
            </div>
        </div>
    )
}

export default ProudctDetails;