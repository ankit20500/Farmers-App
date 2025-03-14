import { GiSplitCross } from "react-icons/gi";
import Button from "../Resuable_Comp/Button";
import { useState } from "react";
import ReviewCart from "./ReviewCart";

function ReviewSection({reviews,setShowReviewInput}){
      const [visibleReviews, setVisibleReviews] = useState(3); // Initially show 3 reviews
      const [allReviewsLoaded, setAllReviewsLoaded] = useState(false);

    // Function to show more reviews in batches of 10
    const handleLoadMore = () => {
        if (visibleReviews + 10 >= reviews.length) {
        setVisibleReviews(reviews.length);
        setAllReviewsLoaded(true);
        } else {
        setVisibleReviews(visibleReviews + 10);
        }
    };

    // Function to reset review count back to 3
    const handleShowLess = () => {
        setVisibleReviews(3);
        setAllReviewsLoaded(false);
    };


    return(
        <>
            <div className="review-heading">
                <span>Customers Reviews</span>
            </div>

            {/* Displaying Reviews */}
            {reviews.length > 0 ? (
                <>
                {reviews.slice(0, visibleReviews).map((review, index) => (
                    <ReviewCart key={index} review={review} setShowReviewInput={setShowReviewInput}/>
                ))}

                {/* Show Load More Button */}
                {!allReviewsLoaded && reviews.length > visibleReviews && (
                    <Button onclick={handleLoadMore} value={"Show More Reviews"} />
                )}

                {/* Show Less Button */}
                {visibleReviews > 3 && (
                    <Button onclick={handleShowLess} value={"Show Less"} />
                )}
                </>
            ) : (
                <div className="no-review">
                <GiSplitCross className="no-review-icon"/>
                <p className="no-review-heading">No reviews yet.</p>
                </div>
            )}
        </>
    )
}

export default ReviewSection;