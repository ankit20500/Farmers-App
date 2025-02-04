import { useParams } from 'react-router-dom';
import './Products.css';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Stars from '../StarComp/Star';
import Loader from '../Loader/Loader';
import ImageField from '../Resuable_Comp/ImageField';
import Button from '../Resuable_Comp/Button';
import { userContext } from '../ContextApi/userContextApi';
import { productContext } from '../ContextApi/productContext';
import { cartContext } from '../ContextApi/cartContext';

function ProudctDetails(){
    const {id}=useParams();
    const {AddItemsToCart}=useContext(cartContext);
    const {fetchProductById}=useContext(productContext);
    const {user}=useContext(userContext);
    const [product,setProduct]=useState(null);
    
    // fetch the product details with id
    useEffect(()=>{
        try {
            async function fetchData(){
                const response=await fetchProductById(id);
                setProduct(response.data.data[0]);
            }
            fetchData();
        } catch (error) {   
            toast(error.response.message);
        }
    },[id])

    // function for adding the product into cart
    async function handleAddToCart(){
        if(user){
            try {
                const detail={
                    product:product._id,
                    quantity:1
                }
                const response=await AddItemsToCart(detail);
                toast(response.data.message);
            } catch (error) {
                console.log(error);
                toast(error.response);
            }
        }
    }

    // if product is null then loader will be shown
    if (!product) {
        return <Loader/>
    }
    
    return(
        <div className='product-details-home'>
            <span>Go Back</span>
            <div className='product-subHome'>
                <div className='product-details-left'>
                    <ImageField image={product.image}/>
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
                   <Button onclick={handleAddToCart} value={'ADD TO CART'}/>
                </div>
            </div>
        </div>
    )
}

export default ProudctDetails;