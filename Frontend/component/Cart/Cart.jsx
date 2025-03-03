import React from 'react';
import { useContext, useEffect, useState } from 'react';
import Button from '../Resuable_Comp/Button';
import './Cart.css'
import CartPrice from './CartPrice';
import { MdRemoveShoppingCart,MdOutlineRemoveShoppingCart,MdDeleteForever } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import { userContext } from '../ContextApi/userContextApi';
import { cartContext } from '../ContextApi/cartContext';

function Cart(){
    const {fetchCartItems,AddItemsToCart,decreaseItemsToCart,deleteCartProduct}=useContext(cartContext);
    const {user}=useContext(userContext);
    const navigate=useNavigate();
    const [cart,setCart]=useState([]);
    const [loading,setLoading]=useState(true);
    
    // useeffect is fetch the cart items when any user go to cart section
    useEffect(()=>{
        try {
            async function fetchItems(){
                if(user){
                    const response=await fetchCartItems(user.data._id);
                    setCart(response.data.data.items);
                }
                setLoading(false);
            }
            fetchItems();
        }catch (error) {
            console.log(error);
            toast(error.response.data.message);
        }
    },[user])

    // loading is running
    if(loading){
        return <Loader/>
    }

    // if user is not logged in then in cart it says please login
    if(!user){
        return(
            <div className='cart-not-login'>
                <MdOutlineRemoveShoppingCart className='empty-cart'/>
                <p>Missing Cart items?</p>
                <p>Login to see the items you added previously</p>
                <Button onclick={()=>navigate("/auth/login")} value={"Login"}/>
            </div>
        )
    }

    // if cart is empty then show this
    if(cart && cart.length===0){
        return(
            <div className='cart-not-login'>
                <MdRemoveShoppingCart className='empty-cart'/>
                <p>Your Cart is Empty</p>
                <p>First add the items in your cart</p>
                <Button onclick={()=>navigate("/")} value={'ADD ITEMS'}/>
            </div>
        )
    }

    async function handleDecreaseQuantity(product,quantity){
        try {
            if(quantity>1){
                quantity-=1;
                const response=await decreaseItemsToCart({product,quantity});
                setCart(response.data.data.items);
                toast(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast(error.response.data.error.message);
        }
    }
    async function handleIncreaseQuantity(product,quantity){
        try {
            quantity+=1;
            const response=await AddItemsToCart({product,quantity});
            setCart(response.data.data.items);
            toast(response.data.message);
        } catch (error) {
            console.log(error);
            toast(error.response.data.error.message);
        }
    }
    async function handleDelete(productId,quantity){
        const response=await deleteCartProduct({productId,quantity});
        setCart(response.data.data.items);
    }

    return(
        <div className='cart-home'>
            <div className='cart-heading'>
                <span>Shopping Cart</span>
            </div>
            
            <div className='cart-subHome'>

                <CartPrice subtotal={"ITEMS"} quantity={'QTY'} price={'PRICE'}/>
                <hr/>

                {cart && cart.map((item,idx)=>{
                    return(
                        <React.Fragment key={idx}>
                            <div className='cart-items'>
                                <div className='cart-img-section'>
                                    <img src={item.product.image}/>
                                    <div className='cart-items-content'>
                                        <p>{item.product.productname}</p>
                                        <p>{item.product.stock>0?"In-Stock":"Out Of Stock"}</p>
                                        <p>₹{item.product.price}/kg</p>
                                        <span onClick={()=>handleDelete(item.product._id,item.quantity)}><MdDeleteForever/></span>
                                    </div>
                                </div>
                                <div className='quantity-price-section'>
                                    <div className='quantity'>
                                        <Button onclick={()=>handleDecreaseQuantity(item.product._id,item.quantity)} value={'-'}/>
                                        <span>{item.quantity}</span>
                                        <Button onclick={()=>handleIncreaseQuantity(item.product._id,item.quantity)} value={'+'}/>
                                    </div>
                                    <span>₹ {item.product.price*item.quantity}</span>
                                </div>
                            </div>
                            <hr/>
                        </React.Fragment>
                        
                    )
                })}
                {/* subtotal amount calculate */}
                <CartPrice subtotal={"SubTotal"} 
                            quantity={cart.reduce((total,item)=>total+item.quantity,0)} 
                            items={"items"} 
                            symbol={'₹'} 
                            price={cart.reduce((total,item)=>total+item.product.price*item.quantity,0)}
                        />          
                <hr/>

                {/* Delivary charge */}
                <CartPrice subtotal={"Delivary"} symbol={'₹'} price={40}/>
                <hr/>

                {/* Total amount calculate */}
                <CartPrice subtotal={"Total"}  symbol={'₹'} 
                            price={cart.reduce((total,item)=>total+item.product.price*item.quantity,0)+40}
                        />
                <hr/>

                {/* <div> */}
                    <Button value={"PROCEED TO CHECKOUT"}/>
                {/* </div> */}
            </div>
        </div>
    )
}

export default Cart;