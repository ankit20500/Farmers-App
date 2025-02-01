import './Cart.css'

function CartPrice({subtotal,quantity,items,symbol,price}){
    return(
        <div className='cart-strip'>
            <span>{subtotal}</span>
            <div>
                <span id='qty'>{quantity} {items}</span>
                <span>{symbol} {price}</span>
            </div>
        </div>
    )
}

export default CartPrice;