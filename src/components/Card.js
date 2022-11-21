const BASE_PATH = "http://localhost:3000/assets/images/";

const Card = (props) => {
  return (
    <div className="card">
      <div className="img-wrapper">
        {props.isFreeShipping && (
          <span className="free-shipping">Free shipping</span>
        )}
        <img
          src={
            BASE_PATH +
            props.sku +
            "-" +
            props.variant +
            "-" +
            "product" +
            ".webp"
          }
          alt="item"
        />
      </div>
      <div className="card-description">
        <h3 className="card-title">{props.title}</h3>
        <div className="price">$ {props.price.toFixed(2)}</div>
        <button
          className="card-btn"
          onClick={() => props.addToCart(props.item)}
        >
          Add to card
        </button>
      </div>
    </div>
  );
};

export default Card;
