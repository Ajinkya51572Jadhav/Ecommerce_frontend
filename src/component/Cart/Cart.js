

import React, { Fragment } from 'react';
import {useDispatch,useSelector} from "react-redux";
import {Typography} from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

import "./Cart.css";
import CartItemCard from "./CartItemCard.js"
import { addItemsToCart , removeItemsFromCart } from '../../actions/cartAction'; 
import { NavLink, useNavigate } from 'react-router-dom';


const Cart = () => {
  
   const navigate = useNavigate(); 
   const dispatch = useDispatch();

      const {cartItems}=useSelector((state)=>state.cart);
         console.log(cartItems);
           
             const increaseQuantity = (id,quantity,stock)=>{
               const newQty = quantity + 1; 
                 if(stock <=quantity){
                    return ;
                 }
                   dispatch(addItemsToCart(id,newQty));
             };

            
             const decreaseQuantity = (id,quantity)=>{
               const newQty = quantity - 1; 
                 if(quantity <= 1 ){
                   return ;
                 }
                  dispatch(addItemsToCart(id,newQty));
             }

            const deleteCartItem=(productId)=>{
               dispatch(removeItemsFromCart(productId));
            }

       
      //  const item = {
      //          product : "productId",
      //          price   : "200",
      //          name    : "product1",
      //          quantity :1
      //  }
  
      function checkOutHandler(){
               navigate("/login?redirect=/shipping");
      }
  
    return (
  <Fragment>
  {
    cartItems.length ===0?(
          <div className='emptyCart'>
             <RemoveShoppingCartIcon/>
             <Typography> NO Product In Your Cart  </Typography>
             <NavLink to={"/products"}>View Products</NavLink>
          </div>
    ):(
      <Fragment>
      <div className='cartPage'>  
      
       <div className='cartHeader'>
         <p>Product</p>
            <p>Quantity</p>
          <p>Subtotal</p>
      </div>
  
     {
       cartItems && cartItems.map((item)=>(
         <div className='cartContainer'>
        <CartItemCard item={item} deleteCartItem={deleteCartItem}/>
              <div className='cartInput'>
                   <button onClick={()=>decreaseQuantity(item.product,item.quantity)}>-</button>
                      <span className='quantity'>{item.quantity}</span>
                   <button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
              </div>
              <p className='cartSubtotal'>{`₹ ${item.price * item.quantity}`}</p>
         </div>      
      ))
     }
  
         
  <div className='cartGrossProfit'>
  <div></div>
  <div className='cartGrossProfitBox'>
     <p>Gross Total</p>
     <p>{`₹ ${cartItems.reduce((acc,item)=>acc + item.quantity * item.price ,0)}`}</p> 
  </div>
  <div></div>
  <div className='checkOutBtn'>
      <button onClick={checkOutHandler}>Check Out</button>
  </div>
  </div>
      </div>
      </Fragment>
    )

  }
  
  </Fragment>
  )
}

export default Cart
