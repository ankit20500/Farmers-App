function Cart({index,tip}){
    return(
        <div key={index} className="farming-section-grid-cart">
            <img src={tip.image} alt={tip.title} className="grid-card-image" />
            <h4>{tip.title}</h4>
            <p>{tip.description}</p>
        </div>
    )
}

export default Cart;