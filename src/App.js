import { useState } from "react";
import { useQuery } from "react-query";
import { getItems } from "./api/index.js";
import "./App.css";
import Card from "./components/Card.js";
import Cart from "./components/Cart.js";

function App() {
  const { data, isLoading } = useQuery(["cards"], getItems);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [cart, setCart] = useState([]);

  const toggleCart = () => {
    setIsOpenCart((prevState) => !prevState);
  };

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
    setIsOpenCart("true");
  };

  return (
    <div className="App">
      <header>
        <nav>
          <div className="cart-wrapper" role="button" onClick={toggleCart}>
            <div className="cart-logo">
              <img src="/images/cart-icon.png" alt="cart" />
              <span className="cart-amount">0</span>
            </div>
          </div>
        </nav>
      </header>

      <div className="container">
        <main className="main">
          <div className="sidebar">
            <h2>Sizes:</h2>
            <div className="sizes">
              <div className="size">
                <label htmlFor="xs">
                  <input type="checkbox" name="xs" id="xs" />
                  <span className="checkmark"> XS</span>
                </label>
              </div>
              <div className="size">
                <label htmlFor="s">
                  <input type="checkbox" name="s" id="s" />
                  <span className="checkmark">S</span>
                </label>
              </div>
              <div className="size">
                <label htmlFor="m">
                  <input type="checkbox" name="m" id="m" />
                  <span className="checkmark">M</span>
                </label>
              </div>
              <div className="size">
                <label htmlFor="ml">
                  <input type="checkbox" name="ml" id="ml" />
                  <span className="checkmark">ML</span>
                </label>
              </div>
              <div className="size">
                <label htmlFor="l">
                  <input type="checkbox" name="l" id="l" />
                  <span className="checkmark">L</span>
                </label>
              </div>
              <div className="size">
                <label htmlFor="xl">
                  <input type="checkbox" name="xl" id="xl" />
                  <span className="checkmark">Xl</span>
                </label>
              </div>
              <div className="size">
                <label htmlFor="xxl">
                  <input type="checkbox" name="xxl" id="xxl" />
                  <span className="checkmark">XXL</span>
                </label>
              </div>
            </div>
          </div>
          <div className="cards">
            {isLoading && <p>Loading...</p>}
            {!isLoading &&
              data.map((item) => (
                <Card
                  item={item}
                  title={item.title}
                  price={item.price}
                  key={item.id}
                  isFreeShipping={item.isFreeShipping}
                  sku={item.sku}
                  variant={1}
                  addToCart={addToCart}
                />
              ))}
          </div>
        </main>
      </div>
      {isOpenCart && (
        <Cart toggleCart={toggleCart} isOpenCart={isOpenCart} cart={cart} />
      )}
    </div>
  );
}

export default App;
