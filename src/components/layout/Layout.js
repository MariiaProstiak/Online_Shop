import { useContext } from "react";
import classes from "./Layout.module.css";
import { Header } from "./Header";
import { Drawer } from "../Drawer";
import { AppContext } from "../../store/app-context";

export const Layout = (props) => {
  const appCtx = useContext(AppContext);
  const cartItemRemoveHandler = (id) => {
    appCtx.onRemoveItem(id);
  };

  const cartItemAddHandler = (item) => {
    appCtx.onAddToCart({ ...item, amount: 1 }, true);
  };
  return (
    <div className={classes.Wrapper + " " + classes.Clear}>
      <Drawer
        items={appCtx.cartItems}
        onClose={() => appCtx.setCartOpened(false)}
        onRemoveFromCart={appCtx.onRemoveItem}
        opened={appCtx.cartOpened}
        onAdd={cartItemAddHandler}
        onRemove={cartItemRemoveHandler}
      />
      <Header onClickCart={() => appCtx.setCartOpened(true)} />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};
