import { useParams } from "react-router-dom";
import "./Products.css";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Stars from "../StarComp/Star";
import Loader from "../Loader/Loader";
import ImageField from "../Resuable_Comp/ImageField";
import Button from "../Resuable_Comp/Button";
import { userContext } from "../ContextApi/userContextApi";
import { productContext } from "../ContextApi/productContext";
import { cartContext } from "../ContextApi/cartContext";
import ReviewSection from "./ReviewSection";
import ReviewInput from "./ReviewInput";

function ProductDetails() {
  const { id } = useParams();
  const { AddItemsToCart } = useContext(cartContext);
  const { fetchProductById } = useContext(productContext);
  const { user } = useContext(userContext);
  const [loader, setLoader] = useState(true);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]); // State for reviews
  const [showReviewInput, setShowReviewInput] = useState(false); // Review modal state


  // Fetch product details
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchProductById(id);
        setProduct(response.data.data);
        setReviews(response.data.data.reviews || []); // Fetch reviews
        setLoader(false);
      } catch (error) {
        toast(error.response.message);
      }
    }
    fetchData();
  }, [id]);

  // Function to add product to cart
  async function handleAddToCart() {
    if (user) {
      try {
        const detail = {
          product: product._id,
          quantity: 1,
        };
        const response = await AddItemsToCart(detail);
        toast(response.data.message);
      } catch (error) {
        console.log(error);
        toast(error.response);
      }
    } else {
      toast("Please login for this functionality");
    }
  }


  // If product is null, show loader
  if (loader) {
    return <Loader />;
  }

  return (
    <div className={`product-details-home ${showReviewInput ? "blur-background" : ""}`}>
      
      <span>Go Back</span>

      <div className="product-subHome">
        {/* product image */}
        <div className="product-details-left">
          <ImageField image={product.image} />
        </div>

        {/* product details */}
        <div className="product-details-right">
          <p>{product.productname}</p>
          <p>Category: {product.category}</p>
          <p>SubCategory: {product.subcategory}</p>
          <div>
            <Stars rating={product.ratings} /> 
            ({reviews.length} reviews)
          </div>
          <p>Description: {product.description}</p>
          <Button onclick={() => setShowReviewInput(true)} value={"ADD REVIEW"} />
        </div>

        <div className="product-details-right-2">
          <div>
            <span>Price:</span>
            <span>₹{product.price}</span>
          </div>
          <div>
            <span>Stock:</span>
            <span>{product.stock > 0 ? "In Stock" : "Out of Stock"}</span>
          </div>
          <Button onclick={handleAddToCart} value={"ADD TO CART"} />
        </div>

      </div>


      {/* Write your Review */}
      {showReviewInput&&
        <ReviewInput 
          setShowReviewInput={setShowReviewInput}
          reviews={reviews}
          setProduct={setProduct}
          setReviews={setReviews}
          />
        }

        
      {/* Show all the review */}
      <ReviewSection 
          reviews={reviews}
          setShowReviewInput={setShowReviewInput}
          />

      
    </div>
  );
}

export default ProductDetails;
