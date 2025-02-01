import Button from '../Resuable_Comp/Button';
import './Cart.css'
import CartPrice from './CartPrice';

function Cart(){
    return(
        <div className='cart-home'>
            <div className='cart-heading'>
                <span>Shopping Cart</span>
            </div>
            
            <div className='cart-subHome'>

                <CartPrice subtotal={"ITEMS"} quantity={'QTY'} price={'PRICE'}/>
                <hr/>

                <div className='cart-items'>
                    <div className='cart-img-section'>
                        <img src='https://th.bing.com/th/id/OIP.NmE6y7PPGqrTUTJLMX_bGwHaGa?rs=1&pid=ImgDetMain'/>
                        <div className='cart-items-content'>
                            <p>Herbicides</p>
                            <p>In-Stock</p>
                        </div>
                    </div>
                    <div className='quantity-price-section'>
                        <div className='quantity'>
                            <Button value={'-'}/>
                            <span>1</span>
                            <Button value={'+'}/>
                        </div>
                        <span>₹ 300</span>
                    </div>
                </div>

                <hr/>
                {/* subtotal amount calculate */}
                <CartPrice subtotal={"SubTotal"} quantity={2} items={"items"} symbol={'₹'} price={300}/>
                <hr/>

                {/* Delivary charge */}
                <CartPrice subtotal={"Delivary"} quantity={2} items={"items"} symbol={'₹'} price={40}/>
                <hr/>

                {/* Total amount calculate */}
                <CartPrice subtotal={"Total"}  symbol={'₹'} price={300}/>
                <hr/>

                {/* <div> */}
                    <Button value={"PROCEED TO CHECKOUT"}/>
                {/* </div> */}
            </div>
        </div>
    )
}

export default Cart;