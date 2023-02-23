import OrdersList from "../components/OrdersList";
import { useState, useEffect, useContext } from "react";
import * as API from "../store/api";
import { PageWrapper } from "../components/ui/PageWrapper";
import AuthContext from "../store/auth-context";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    try {
      setIsLoading(true);
      API.getUserOrders(authCtx.currentUser)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // const orders = [];
          // for (const key in data) {
          //   for (const item in data[key].items) {
          //     const product = {
          //       ...data[key].items[item],
          //     };

          //     orders.push(product);
          //   }

          const orders = [];
          for (const key in data) {
            const order = {
              name: key,
              ...data[key],
            };

            orders.push(order);
          }
          setOrders(orders);
          setIsLoading(false);
        });
    } catch (error) {
      alert("Error in order request");
      console.error(error);
    }
  }, [authCtx.currentUser]);

  if (orders.length === 0) {
    return (
      <PageWrapper title="My Orders">
        <p>You have not placed any orders yet.</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="My Orders">
      {!isLoading && <OrdersList orders={orders} />}
    </PageWrapper>
  );
};
