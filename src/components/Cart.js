import { useState } from "react";
import CartItem from "./CartItem";

const Cart = (props) => {
  const animationClasses = props.isOpenCart
    ? "open-cart-animation"
    : "close-cart-animation";

  console.log(props.cart);
  return (
    <div className={`cart ${animationClasses}`}>
      <div className="exit" role="button" onClick={props.toggleCart}>
        X
      </div>
      <div className="cart-top">
        <div className="cart-img-wrapper">
          <div className="cart-logo">
            <img src="/images/cart-icon.png" alt="cart" />
            <span className="cart-amount">0</span>
          </div>
          <h2>Cart</h2>
        </div>
        {!props.cart.length && (
          <p className="cart-text">Add some product in the cart :)</p>
        )}
        <ul className="cart-items">
          {props.cart.map((item) => (
            <CartItem item={item} key={item.id} />
          ))}
        </ul>
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <span className="subtotal">SUBTOTAL</span>
          <div className="cart-price">$ 0.00</div>
        </div>
        <button className="cart-btn">CHECKOUT</button>
      </div>
    </div>
  );
};

export default Cart;