import { useState, useContext, useEffect } from "react";
import * as API from "../store/api";
import AuthContext from "../store/auth-context";

import { Info } from "../components/Info";
import { useCart } from "../hooks/useCart";

import classes from "./Drawer.module.css";

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
  const auth = useContext(AuthContext);

  useEffect(() => {
    return () => {
      setIsCompleteOrdered(false);
    };
  }, []);

  const closeOrderHandler = () => {
    setIsCompleteOrdered(false);
  };

  const onClickOrdered = async () => {
    const thisOrder = {
      items: cartItems,
      user: auth.currentUser,
      orderDate: new Date(),
      totalPrice: price,
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
    setIsLoading(false);
  };

  return (
    <div
      className={`${classes.overlay} ${opened ? classes.overlayVisible : ""}`}
    >
      <div className={classes.drawer}>
        <h2>
          Cart
          <img
            onClick={onClose}
            style={{ cursor: "pointer" }}
            src="/img/btn-remove.svg"
            alt="Remove"
          />
        </h2>
        {items.length > 0 ? (
          <div className={classes.itemsWrapper}>
            <div className={classes.items}>
              {items.map((obj) => (
                <div key={obj.id} className={classes.cartItem}>
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
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
                onClick={onClickOrdered}
                className={classes.greenButton}
              >
                Place an order
                <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
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
