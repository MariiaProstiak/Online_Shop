import { useContext, useState } from "react";
import classes from "./Card.module.css";
import Spinner from "../components/ui/Spinner";
import { AppContext } from "../store/app-context";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";
import ItemForm from "./ItemForm";

export const Card = (props) => {
  const [favorite, setFavorite] = useState(props.favorite);
  const appCtx = useContext(AppContext);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const object = {
    id: props.id,
    title: props.title,
    imageUrl: props.imageUrl,
    price: props.price,
    images: props.images,
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

  const handleClickPlus = (amount) => {
    const obj = {
      id: props.id,
      title: props.title,
      imageUrl: props.imageUrl,
      price: props.price,
      amount: amount,
      images: props.images,
    };
    appCtx.onAddToCart(obj);
  };
  const onClickDelete = () => {
    appCtx.onDeleteProduct(props.id);
    navigate("/k");
  };
  const onClickUpdate = () => {
    navigate(`/update-product/${props.id}`);
    //appCtx.onUpdateProduct(props.id);
  };
  const openProductPageHandler = () => {
    navigate(`/product/${props.id}`);
  };

  return (
    <div className={classes.card}>
      {props.loading ? (
        <Spinner />
      ) : (
        <>
          <div className={classes.actions}>
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
            {authCtx.isAdmin && (
              <div onClick={onClickUpdate} className={classes.update}>
                <img src="/img/pen.png" alt="update" />
              </div>
            )}
            {authCtx.isAdmin && (
              <div onClick={onClickDelete} className={classes.delete}>
                <img src="/img/btn-remove.svg" alt="delete" />
              </div>
            )}
          </div>

          <div className={classes.image} onClick={openProductPageHandler}>
            <img src={props.images[0]} alt="" />{" "}
          </div>
          <h5>{props.title}</h5>
          <div className={classes.cardContent}>
            <div>
              <span>Price:</span>
              <b>{props.price} $</b>
            </div>
            {props.justInfo ? (
              <div className={classes.amount}>x{props.amount}</div>
            ) : (
              <ItemForm
                id={props.id}
                amount={props.amount}
                onAddToCart={handleClickPlus}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
