import ImageField from "../../Resuable_Comp/ImageField";

function SettlementCart({image,title,dis,alt}){
    return(
        <div className="disaster-box">
            <ImageField image={image} alt={alt}/>
            <h4>{title}</h4>
            <p>{dis}</p>
        </div>
    )
}

export default SettlementCart;