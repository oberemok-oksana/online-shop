import { useState } from "react";
import { useQuery } from "react-query";
import { getItems } from "./api/index.js";
import "./App.css";
import Card from "./components/Card.js";
import Cart from "./components/Cart.js";
import Modal from "./components/Modal.js";
import Confetti from "react-confetti";

function App() {
  const { data, isLoading } = useQuery(["cards"], getItems);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [size, setSize] = useState([]);

  const toggleSuccess = () => {
    setSuccess(true);
  };

  const toggleModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  const toggleCart = () => {
    setIsOpenCart((prevState) => !prevState);
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const alreadyExist = prev.find((el) => el.id === item.id);
      if (!alreadyExist) {
        const newItem = { ...item, quantity: 1 };
        return [...prev, newItem];
      } else {
        return [...prev];
      }
    });
    setIsOpenCart("true");
  };
  const deleteCartItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const reduceItemQuantity = (id) => {
    setCart((prev) => {
      const filtered = prev.map((el) => {
        if (el.id === id) {
          if (el.quantity > 1) {
            return { ...el, quantity: el.quantity - 1 };
          } else {
            return el;
          }
        } else {
          return el;
        }
      });
      return filtered;
    });
  };

  const increaseItemQuantity = (id) => {
    setCart((prev) => {
      const filtered = prev.map((el) => {
        if (el.id === id) {
          return { ...el, quantity: el.quantity + 1 };
        } else {
          return el;
        }
      });
      return filtered;
    });
  };

  const resetCart = () => {
    setCart([]);
    setIsOpenModal(false);
  };

  const changeSize = (size) => {
    setSize((prev) => {
      if (prev.includes(size)) {
        return prev.filter((el) => el !== size);
      } else {
        return [...prev, size];
      }
    });
  };

  const filterBySize = () => {
    if (!data) {
      return data;
    }
    if (!size.length) {
      return data;
    }
    const filtered = data.filter((el) => {
      for (let i of el.availableSizes) {
        if (size.includes(i)) {
          return el;
        }
      }
    });

    return filtered;
  };

  const filteredData = filterBySize();
  console.log(filteredData);

  return (
    <div className="App">
      <header>
        <nav>
          <div className="cart-wrapper" role="button" onClick={toggleCart}>
            <div className="cart-logo">
              <img src="/images/cart-icon.png" alt="cart" />
              <span className="cart-amount">{cart.length}</span>
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
                  <input
                    type="checkbox"
                    name="xs"
                    id="xs"
                    onChange={() => changeSize("XS")}
                  />
                  <span className="checkmark">XS</span>
                </label>
              </div>
              <div className="size">
                <label htmlFor="s">
                  <input
                    type="checkbox"
                    name="s"
                    id="s"
                    onChange={() => changeSize("S")}
                  />
                  <span className="checkmark">S</span>
                </label>
              </div>
              <div className="size">
                <label htmlFor="m">
                  <input
                    type="checkbox"
                    name="m"
                    id="m"
                    onChange={() => changeSize("M")}
                  />
                  <span className="checkmark">M</span>
                </label>
              </div>
              <div className="size">
                <label htmlFor="ml">
                  <input
                    type="checkbox"
                    name="ml"
                    id="ml"
                    onChange={() => changeSize("ML")}
                  />
                  <span className="checkmark">ML</span>
                </label>
              </div>
              <div className="size">
                <label htmlFor="l">
                  <input
                    type="checkbox"
                    name="l"
                    id="l"
                    onChange={() => changeSize("L")}
                  />
                  <span className="checkmark">L</span>
                </label>
              </div>
              <div className="size">
                <label htmlFor="xl">
                  <input
                    type="checkbox"
                    name="xl"
                    id="xl"
                    onChange={() => changeSize("XL")}
                  />
                  <span className="checkmark">XL</span>
                </label>
              </div>
              <div className="size">
                <label htmlFor="xxl">
                  <input
                    type="checkbox"
                    name="xxl"
                    id="xxl"
                    onChange={() => changeSize("XXL")}
                  />
                  <span className="checkmark">XXL</span>
                </label>
              </div>
            </div>
          </div>
          <div className="cards">
            {isLoading && <p>Loading...</p>}
            {!isLoading &&
              filteredData.map((item) => (
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
        <Cart
          toggleCart={toggleCart}
          isOpenCart={isOpenCart}
          cart={cart}
          deleteCartItem={deleteCartItem}
          increaseItemQuantity={increaseItemQuantity}
          reduceItemQuantity={reduceItemQuantity}
          toggleModal={toggleModal}
          size={size}
        />
      )}
      {isOpenModal && (
        <Modal
          resetCart={resetCart}
          toggleSuccess={toggleSuccess}
          toggleCart={toggleCart}
          toggleModal={toggleModal}
        />
      )}
      {success && <Confetti />}
    </div>
  );
}

export default App;
