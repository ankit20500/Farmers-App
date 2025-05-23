import { useContext, useEffect, useState } from "react";
import Button from "../Resuable_Comp/Button";
import ImageField from "../Resuable_Comp/ImageField";
import { FaRegStar,FaStar } from "react-icons/fa";
import { userContext } from "../ContextApi/userContextApi";

function ReviewCart({ review ,setShowReviewInput}) {
  const {user}=useContext(userContext);
  const [showFullText,setShowFullText]=useState(false);

  const dateFunctionn=()=>{
    const dateObj=new Date(review.updatedAt);
    const now=new Date();
    const diffn=now-dateObj;
    const diffInDays=Math.floor(diffn/(1000*60*60*24));
    if(diffInDays==0){
      return "Today"
    }
    if(diffInDays<=3){
      return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
    }
    const formatedDate=new Date(review.updatedAt).toLocaleDateString("en-IN",{
      timeZone:"Asia/Kolkata"
    });
    return formatedDate;
  }

  const words=review.comment.split(" ");
  const truncateText=words.slice(0,20).join(" ");
  const isLongComment=words.length>20;

  return (
    // <div className="review-container">
      <div className="review-card">
        <div className="review-content">
          {/* Avatar Section */}
          <div className="review-avatar">
            <ImageField image={review.userImage || "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20%2810%29.webp"} />
          </div>
          {/* Text Section */}
          <div className="review-text">

            <div className="review-name-star-container">

              <div>
                <p className="review-author">{review.user.name}</p>
                <p>{dateFunctionn()}</p>
              </div>

              <p className="review-rating-class">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} 
                        className={`review-ratings ${star <= review.rating ? "selected" : ""}`}
                    >
                    {star<=review.rating ? <FaStar /> : <FaRegStar />}
                  </span>
                ))}
              </p>
            </div>

            <p className="review-description">
              {showFullText?review.comment:truncateText}
              {isLongComment&&(
                <span onClick={()=>setShowFullText(!showFullText)} className="btn-see-more-less">
                  {showFullText?"See Less":"...See More"}
                </span>
              )}
            </p>
            {review.user._id==user?.data._id?<Button onclick={()=>setShowReviewInput(true)} value={"EDIT"}/>:""}
          </div>
        </div>
      </div>
    // </div>
  );
}

export default ReviewCart;
