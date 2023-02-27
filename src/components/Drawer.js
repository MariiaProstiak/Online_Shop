import { useState, useContext, useEffect } from "react";
import * as API from "../store/api";
import AuthContext from "../store/auth-context";

import { Info } from "../components/Info";
import { useCart } from "../hooks/useCart";

import classes from "./Drawer.module.css";
import Checkout from "./Checkout";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const Drawer = ({
  items = [],
  onClose,
  onRemoveFromCart,
  onAdd,
  onRemove,
  opened,
}) => {
  const { cartItems, setCartItems, price } = useCart();
  const [isCompleteOrdered, setIsCompleteOrdered] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const auth = useContext(AuthContext);

  useEffect(() => {
    return () => {
      setIsCheckout(false);
      setIsCompleteOrdered(false);
    };
  }, []);

  const closeOrderHandler = () => {
    setIsCheckout(false);
    setIsCompleteOrdered(false);
  };

  const submitOrderHandler = async (userInfo) => {
    const thisOrder = {
      items: cartItems,
      user: auth.currentUser,
      orderDate: new Date(),
      totalPrice: price,
      userInfo: userInfo,
    };
    try {
      setIsLoading(true);
      if (auth.currentUser) {
        API.addOrder(thisOrder)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setOrderId(data.name);
            setIsCompleteOrdered(true);
            setCartItems([]);
          });

        for (let i = 0; i < cartItems.length; i++) {
          const item = cartItems[i];
          await API.deleteFromCart(item.id);
          await delay(1000);
        }
      } else {
        setCartItems([]);
        onClose();
        for (let i = 0; i < cartItems.length; i++) {
          const item = cartItems[i];
          await API.deleteFromCart(item.id);
        }

        throw Error(
          "To place your order, please log in with your account or sign up."
        );
      }
    } catch (e) {
      alert(e.message);
    }
    setIsCheckout(false);
    setIsLoading(false);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };
  const onCloseHandler = () => {
    setIsCheckout(false);
    setIsLoading(false);
    onClose();
  };
  return (
    <div
      className={`${classes.overlay} ${opened ? classes.overlayVisible : ""}`}
    >
      <div className={classes.drawer}>
        <h2>
          Cart
          <img
            onClick={onCloseHandler}
            style={{ cursor: "pointer" }}
            src="/img/btn-remove.svg"
            alt="Remove"
          />
        </h2>
        {items.length > 0 ? (
          <div>
            <div className={classes.itemsWrapper}>
              <div className={classes.items}>
                {items.map((obj) => (
                  <div key={obj.id} className={classes.cartItem}>
                    <div
                      style={{ backgroundImage: `url(${obj.images[0]})` }}
                      className={classes.cartItemImg}
                    ></div>
                    <div style={{ marginRight: "20px", flex: "1 1 0%" }}>
                      <p style={{ marginBottom: "5px" }}>{obj.title}</p>
                      <b>{obj.price} $</b>
                      <div className={classes.amount}>x{obj.amount}</div>
                    </div>
                    <div className={classes.actions}>
                      <button onClick={() => onRemove(obj.id)}>−</button>
                      <button onClick={() => onAdd(obj)}>+</button>
                      <img
                        onClick={() => onRemoveFromCart(obj.id, true)}
                        className={classes.removeBth}
                        src="/img/btn-remove.svg"
                        alt="Remove"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className={classes.cartTotalBlock}>
                <ul>
                  <li>
                    <span>Total:</span>
                    <div></div>
                    <b>{price} $</b>
                  </li>
                  <li>
                    <span>Tax 5%:</span>
                    <div></div>
                    <b>{((price / 100) * 5).toFixed(2)} $</b>
                  </li>
                </ul>
                <button
                  disabled={isLoading}
                  // onClick={onClickOrdered}
                  onClick={orderHandler}
                  className={classes.greenButton}
                >
                  Place an order
                  <img src="/img/arrow.svg" alt="Arrow" />
                </button>
              </div>
            </div>
            {isCheckout && (
              <Checkout
                onCancel={onCloseHandler}
                onConfirm={submitOrderHandler}
              />
            )}
          </div>
        ) : (
          <Info
            image={
              isCompleteOrdered
                ? "/img/complete-order.png"
                : "/img/empty-cart.png"
            }
            description={
              isCompleteOrdered
                ? `Your order #${orderId} will soon be transferred to shipping team`
                : "Add at least one product to place an order."
            }
            title={
              isCompleteOrdered
                ? "Your order has been placed!"
                : "Cart is empty "
            }
            onClose={closeOrderHandler}
          />
        )}
      </div>
    </div>
  );
};
