import { useState } from "react";
import CartItem from "./CartItem";

const Cart = (props) => {
  const animationClasses = props.isOpenCart
    ? "open-cart-animation"
    : "close-cart-animation";

  const cartTotal = props.cart
    .map((item) => parseFloat(item.price))
    .reduce((num, acc) => (num += acc), 0)
    .toFixed(2);
  // console.log(props.cart);
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
            <CartItem
              item={item}
              key={item.id}
              deleteCartItem={props.deleteCartItem}
              // reduceItemQuantity={reduceItemQuantity}
              increaseItemQuantity={props.increaseItemQuantity}
              quantity={item.quantity}
            />
          ))}
        </ul>
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <span className="subtotal">SUBTOTAL</span>
          <div className="cart-price">$ {cartTotal}</div>
        </div>
        <button className="cart-btn">CHECKOUT</button>
      </div>
    </div>
  );
};

export default Cart;
