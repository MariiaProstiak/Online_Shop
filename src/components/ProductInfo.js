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
      imageUrl: props.product.imageUrl,
      price: props.product.price,
      amount: amount,
    };
    appCtx.onAddToCart(obj);
  };

  const imagesArray = [
    {
      url: "https://ir.ozone.ru/s3/multimedia-c/c1000/6383381868.jpg",
      name: "jacket black",
    },
    {
      url: "https://content.rozetka.com.ua/goods/images/big/200038189.jpg",
      name: "jacket rose",
    },
    {
      url: "https://b-k.net.ua/images/detailed/13/kurtka-maximus-red-561.jpg",
      name: "jacket rouge",
    },
    {
      url: "https://content.rozetka.com.ua/goods/images/big/200038189.jpg",
      name: "jacket rose",
    },
    {
      url: "https://b-k.net.ua/images/detailed/13/kurtka-maximus-red-561.jpg",
      name: "jacket rouge",
    },
  ];

  const firstImage = {
    url: props.product.imageUrl,
  };

  imagesArray.unshift(firstImage);

  return (
    <div className={classes.info}>
      <div className={classes.image}>
        <ImageSlider images={imagesArray} />
        {/* <img src={props.product.imageUrl} alt={props.product.title}></img> */}
      </div>
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
