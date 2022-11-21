const BASE_PATH = "http://localhost:3000/assets/images/";

const CartItem = (props) => {
  return (
    <li className="cart-item">
      <div className="cart-item__left">
        <img
          src={BASE_PATH + props.item.sku + "-1-cart.webp"}
          alt="item"
          className="cart-item__img"
        />
        <div className="cart-item__description">
          <h4 className="cart-item__title">{props.item.title}</h4>
          <div>Size: {props.item.availableSizes[0]}</div>
          <div>Quantity:1</div>
        </div>
      </div>
      <div className="cart-item__right">
        <span className="cart-item__price">${props.item.price.toFixed(2)}</span>
        <div className="cart-item__buttons">
          <button className="cart-item__btn">-</button>
          <button className="cart-item__btn">+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
