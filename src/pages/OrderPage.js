import { useState, useEffect, useContext } from "react";
import { getOrdersItems } from "../store/api";
import { PageWrapper } from "../components/ui/PageWrapper";
import { ProductsList } from "../components/ProductsList";
import { useParams } from "react-router-dom";
import Spinner from "../components/ui/Spinner";
import AuthContext from "../store/auth-context";
import { getUsersFavoriteProductsId } from "../store/api";

export const OrderPage = () => {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [favIds, setFavIds] = useState([]);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    (async () => {
      if (authCtx.currentUser) {
        const fIds = await getUsersFavoriteProductsId(authCtx.currentUser);
        setFavIds(fIds);
      }
    })();
  }, [authCtx.currentUser]);

  useEffect(() => {
    try {
      setIsLoading(true);
      getOrdersItems(params.name)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const products = [];
          for (const key in data) {
            const product = {
              key: key,
              id: data[key].idProduct,
              price: data[key].price,
              title: data[key].title,
              imageUrl: data[key].imageUrl,
              amount: data[key].amount,
            };
            if (favIds.includes(data[key].idProduct)) {
              product.favorite = true;
            } else {
              product.favorite = false;
            }

            products.push(product);
          }
          setProducts(products);
          setIsLoading(false);
        });
    } catch (error) {
      alert("Error in order request");
      console.error(error);
    }
  }, [favIds, params.name, authCtx.currentUser]);

  if (isLoading) {
    return (
      <PageWrapper title={"Order #" + params.name} isBackArrow={true}>
        <Spinner />
      </PageWrapper>
    );
  }

  if (products.length === 0) {
    return (
      <PageWrapper title={"Order #" + params.name} isBackArrow={true}>
        <p>This order is empty.</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title={"Order #" + params.name} isBackArrow={true}>
      {!isLoading && <ProductsList products={products} justInfo={true} />}
    </PageWrapper>
  );
};
