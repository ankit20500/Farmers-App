import { useNavigate, useParams } from "react-router-dom";
import './Products.css';
import { useContext, useEffect, useState } from "react";
import { contextProvider } from "../ContextApi";
import { toast } from "react-toastify";
import Stars from "../StarComp/Star";
import Loader from "../Loader/Loader";

function Product() {
    const navigate=useNavigate();
    const { category, subCategory } = useParams(); // Extracting parameters
    const {fetchProduct}=useContext(contextProvider);
    const [product,setProduct]=useState([]);
    useEffect(()=>{
        async function fetchData(){
            try {
                const formattedCategory = category.replace(/_/g, ' '); // Convert "_" to " "
                const formattedSubCategory = subCategory.replace(/_/g, ' '); // Convert "_" to " "
                const response=await fetchProduct(formattedCategory,formattedSubCategory);
                setProduct(response.data.data);
            } catch (error) {
                toast(error.response.message);
            }
        }
        fetchData();
    },[category, subCategory, fetchProduct])

    // if product is null then spin will be shown
    if(!product){
        return <Loader/>
    }

    return (
        <>
            <div className="product-heading"><span>Products</span></div>
            <div className="products-home">
                {product.length>0?(
                    product.map((item,idx)=>(
                        <div onClick={()=>navigate(`/product/${item._id}`)} key={idx} className="product-cart">
                            <img src="https://i5.walmartimages.com/asr/e82d6b6d-b65d-4d3c-9cc2-8664a1f7042e_1.4489bf730cb2591f99d531aba0404700.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff"/>
                            <p>{item.productname}</p>
                            <p>{item.category}</p>
                            <p>₹{item.price}</p>
                            <div><Stars rating={item.ratings}/></div>
                        </div>
                    ))
                ):(<p>No product found</p>)}
            </div>
        </>
    );
}

export default Product;
