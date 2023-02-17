import { useContext, useState } from "react";
import classes from "./Card.module.css";
import Spinner from "../components/ui/Spinner";
import { AppContext } from "../store/app-context";
import AuthContext from "../store/auth-context";

export const Card = (props) => {
  const [favorite, setFavorite] = useState(props.favorite);
  const appCtx = useContext(AppContext);
  const authCtx = useContext(AuthContext);
  const object = {
    id: props.id,
    title: props.title,
    imageUrl: props.imageUrl,
    price: props.price,
  };

  function onClickFavorite() {
    const itemIsFavorite = appCtx.itemIsFavorite(props.id);
    setFavorite(!favorite);
    if (itemIsFavorite) {
      appCtx.removeFavorite(props.id, authCtx.currentUser);
    } else {
      appCtx.onAddToFavorite(object, authCtx.currentUser);
    }
  }

  const handleClickPlus = () => {
    appCtx.onAddToCart(object);
  };

  return (
    <div className={classes.card}>
      {props.loading ? (
        <Spinner />
      ) : (
        <>
          {appCtx.onAddToFavorite && (
            <div onClick={onClickFavorite} className={classes.favorite}>
              <img
                src={
                  favorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"
                }
                alt="unlike"
              />
            </div>
          )}
          <img width={133} height={112} src={props.imageUrl} alt="" />
          <h5>{props.title}</h5>
          <div className={classes.cardContent}>
            <div>
              <span>Price:</span>
              <b>{props.price} $</b>
            </div>
            {appCtx.onAddToCart && (
              <img
                className={classes.plus}
                onClick={handleClickPlus}
                src={
                  appCtx.isItemAdded(props.id)
                    ? "/img/btn-checked.svg"
                    : "/img/btn-plus.svg"
                }
                alt="Plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
