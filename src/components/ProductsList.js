import { Card } from "./Card";
import classes from "./ProductsList.module.css";

export const ProductsList = (props) => {
  return (
    <div className={classes.List}>
      {props.products.map((item) => {
        return (
          <Card
            key={item.key || item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
            favorite={item.favorite}
          />
        );
      })}
    </div>
  );
};
