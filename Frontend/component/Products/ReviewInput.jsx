import { useContext, useEffect, useState } from "react";
import Button from "../Resuable_Comp/Button";
import { toast } from "react-toastify";
import { FaRegStar,FaStar } from "react-icons/fa";
import { productContext } from "../ContextApi/productContext";
import { userContext } from "../ContextApi/userContextApi";
import { useParams } from "react-router-dom";

function ReviewInput({setShowReviewInput,reviews,setProduct,setReviews}){
  const {id}=useParams();
  const { user } = useContext(userContext);
  const {writeProductReview,fetchProductById}=useContext(productContext);

    const [reviewText, setReviewText] = useState(""); // State for user input
    const [selectedRating, setSelectedRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);

    useEffect(()=>{
      if(user&&reviews.length>0){
        const existingReview=reviews.find((review)=>review.user._id===user.data._id);
        if(existingReview){
          setReviewText(existingReview.comment);
          setSelectedRating(existingReview.rating);
        }else{
          setReviewText("");
          setSelectedRating(0);
        }
      }
    },[reviews,user])

    // Function to submit the review
    const handleSubmitReview =async () => {
        // if user will be logged in
        if(user){
          // if input field will be empty
          if (!reviewText.trim()) {
            toast("Review cannot be empty!");
            return;
          }
          const obj={
            productId:id,
            comment:reviewText,
            rating:selectedRating
          }
          await writeProductReview(obj);
          const updatedProduct=await fetchProductById(id);
          setProduct(updatedProduct.data.data);
          setReviews(updatedProduct.data.data.reviews);
          setReviewText("");
          setShowReviewInput(false);
          toast("Review submitted successfully!");
        }
        else{
          toast("plase login for giving any review");
        }
    };

    return(
        <>
            <div className="review-input-modal">
                <span className="review-input-heading">Write a Review</span>
                <div className="review-select-star-container">
                  <span>ratings</span>

                  <div className="review-stars-wrapper">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`review-select-star ${
                          star <= (hoveredRating || selectedRating) ? "selected" : ""
                        }`}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => setSelectedRating(star)}
                      >
                        {star <= (hoveredRating || selectedRating) ? <FaStar /> : <FaRegStar />}
                      </span>
                    ))}
                  </div>
                </div>

                <textarea 
                  placeholder="Write your review here..." 
                  rows="5"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                ></textarea>
                <div className="review-input-buttons">
                  <Button onclick={handleSubmitReview} value={"Submit Review"} />
                  <Button onclick={() => setShowReviewInput(false)} value={"Cancel"} />
                </div>
            </div>
        </>
    )
}

export default ReviewInput;
