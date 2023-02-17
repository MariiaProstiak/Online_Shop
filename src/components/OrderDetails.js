import { useParams } from "react-router-dom";
import { ProductsList } from "./ProductsList";
import * as API from "../store/api";
import { useEffect, useState } from "react";

const OrderDetails = (props) => {
  let { name } = useParams();
  console.log(name);

  const [isLoading, setIsLoading] = useState(true);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      setIsLoading(true);
      API.getOrder(name)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const orders = [];
          for (const key in data) {
            for (const item in data[key].items) {
              const product = {
                ...data[key].items[item],
              };

              orders.push(product);
            }
          }
          setOrders(orders);
          setIsLoading(false);
        });
    } catch (error) {
      alert("Error in order request");
      console.error(error);
    }
  }, []);
  return <ProductsList products={props.products} />;
};

export default OrderDetails;
