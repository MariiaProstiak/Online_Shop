import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import AuthContext from "../../store/auth-context";
import Button from "./Button";
import classes from "./Header.module.css";
import Modal from "./Modal";

export const Header = (props) => {
  const { price } = useCart();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const isAdmin = authCtx.isAdmin;
  const [logout, setLogout] = useState(false);

  const logoutHandler = () => {
    authCtx.logout();
    setLogout(false);
  };
  const notLogoutHandler = () => {
    setLogout(false);
  };
  const openModalHandler = () => {
    setLogout(true);
  };

  if (logout) {
    return (
      <Modal headerText="Logout" mainText="Do you really want to log out?">
        <Button type="success" onClick={logoutHandler}>
          Ok
        </Button>
        <Button type="danger" onClick={notLogoutHandler}>
          Close
        </Button>
      </Modal>
    );
  }

  return (
    <header className={classes.Header}>
      <Link to="/">
        <div className={classes.Logo}>
          <img
            width={50}
            height={50}
            src="/img/logo.png"
            alt="Logo"
            className={classes.Logo_img}
          />
          <div>
            <h3 className={classes.Logo_header}>My Shop</h3>
            <p className={classes.Logo_text}>The best shop ever</p>
          </div>
        </div>
      </Link>
      <ul>
        <li onClick={props.onClickCart}>
          <img
            className={classes.tooltip}
            width={18}
            height={18}
            src="/img/cart.svg"
            alt="Cart"
          />
          <span className={classes.tooltiptext}>Cart</span>
          {price !== 0 && <span>{price.toFixed(2)} $</span>}
        </li>
        <li>
          <Link to="/favorites">
            <img
              className={classes.tooltip}
              width={18}
              height={18}
              src="/img/heart.svg"
              alt="Favorite"
            />
            <span className={classes.tooltiptext}>Favorite</span>
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img
              className={classes.tooltip}
              width={18}
              height={18}
              src="/img/orderHistory.svg"
              alt="Orders"
            />
            <span className={classes.tooltiptext}>Orders</span>
          </Link>
        </li>
        {isAdmin && (
          <li>
            <Link to="/new-product">
              <img
                className={classes.tooltip}
                width={18}
                height={18}
                src="/img/plus.svg"
                alt="Add product"
              />
              <span className={classes.tooltiptext}>Add product</span>
            </Link>
          </li>
        )}

        {!isLoggedIn && (
          <li>
            <Link to="/auth">
              <img
                className={classes.tooltip}
                onClick={logoutHandler}
                width={18}
                height={18}
                src="/img/login.svg"
                alt="Login"
              />
              <span className={classes.tooltiptext}>Login</span>
            </Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <img
              className={classes.tooltip}
              onClick={openModalHandler}
              width={18}
              height={18}
              src="/img/logout.svg"
              alt="Logout"
            />
            <span className={classes.tooltiptext}>Logout</span>
            {/* <button onClick={logoutHandler}>Logout</button> */}
          </li>
        )}
      </ul>
    </header>
  );
};
