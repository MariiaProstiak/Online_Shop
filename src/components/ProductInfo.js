import classes from "./ProductInfo.module.css";

import ItemForm from "../components/ItemForm";
import { AppContext } from "../store/app-context";
import { useContext } from "react";
import ImageSlider from "./ui/ImageSlider";

const ProductInfo = (props) => {
  const appCtx = useContext(AppContext);
  const handleClickPlus = (amount) => {
    const obj = {
      id: props.product.id,
      title: props.product.title,
      price: props.product.price,
      images: props.product.images,
      amount: amount,
    };
    appCtx.onAddToCart(obj);
  };

  return (
    <div className={classes.info}>
      {props.product.images && (
        <div className={classes.image}>
          <ImageSlider images={props.product.images} />
        </div>
      )}
      <div className={classes.details}>
        <div>
          <span>
            <b>Price:</b> {props.product.price} $
          </span>
        </div>
        <ItemForm
          id={props.product.id}
          onAddToCart={handleClickPlus}
          addButtonText={true}
        />
      </div>
      <div>
        <span>
          <b>Details:</b>{" "}
        </span>
        <br />
        {props.product.details !== undefined ? (
          <p>{props.product.details}</p>
        ) : (
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In illo
            aliquam inventore, eveniet doloremque iusto numquam neque id quis
            consectetur natus odit sit eaque, molestiae odio, voluptatum
            repellat mollitia! Deleniti, quis, alias velit officia ullam
            repudiandae odit voluptas cumque aspernatur qui ea unde illum hic
            placeat laborum doloribus. Doloremque, voluptate.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
