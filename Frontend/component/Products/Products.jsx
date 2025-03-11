import { useNavigate, useParams } from "react-router-dom";
import './Products.css';
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Stars from "../StarComp/Star";
import Loader from "../Loader/Loader";
import ImageField from "../Resuable_Comp/ImageField";
import { FaBan } from "react-icons/fa";
import { productContext } from "../ContextApi/productContext";

function Product() {
    const navigate=useNavigate();
    const { category, subCategory } = useParams(); // Extracting parameters
    const {fetchProduct}=useContext(productContext);
    const [product,setProduct]=useState([]);
    const [loader,setLoader]=useState(true);
    useEffect(()=>{
        async function fetchData(){
            try {
                const formattedCategory = category.replace(/_/g, ' '); // Convert "_" to " "
                const formattedSubCategory = subCategory.replace(/_/g, ' '); // Convert "_" to " "
                const response=await fetchProduct(formattedCategory,formattedSubCategory);
                setProduct(response.data.data);
                setLoader(false);
            } catch (error) {
                setLoader(false);
                toast(error.response.message);
            }
        }
        fetchData();
    },[category, subCategory, fetchProduct])

    // if product is null then spin will be shown
    if(loader){
        return <Loader/>
    }

    return (
        <>
            <div className="product-heading"><span>Products</span></div>
            <div className="products-home">
                {product.length>0?(
                    product.map((item,idx)=>(
                        <div onClick={()=>navigate(`/product/${item._id}`)} key={idx} className="product-cart">
                            <ImageField image={item.image}/>
                            <p>{item.productname}</p>
                            <p>{item.category}</p>
                            <p>₹{item.price}</p>
                            <div><Stars rating={item.ratings}/></div>
                        </div>
                    ))
                ):(<div className="no-product">
                    <p><FaBan/></p>
                    <p>Sorry!</p>
                    <p>We have no Product with this Category</p>
                </div>)}
            </div>
        </>
    );
}

export default Product;
