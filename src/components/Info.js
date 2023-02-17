import { useContext } from "react";
import { AppContext } from "../store/app-context";
import classes from "./Info.module.css";

export const Info = (props) => {
  const { setCartOpened } = useContext(AppContext);

  return (
    <div className={classes.cartEmpty}>
      <img
        style={{ marginBottom: "20px" }}
        width={120}
        src={props.image}
        alt="Empty"
      />
      <h2>{props.title}</h2>
      <p style={{ opacity: "0.6" }}>{props.description}</p>
      <button
        onClick={() => {
          props.onClose();
          setCartOpened(false);
        }}
        className={classes.greenButton}
      >
        <img src="/img/arrow.svg" alt="Arrow" />
        Go back
      </button>
    </div>
  );
};
