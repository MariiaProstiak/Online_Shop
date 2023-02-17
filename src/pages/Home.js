import { useState, useEffect, useContext } from "react";
import Spinner from "../components/ui/Spinner";
import { ProductsList } from "../components/ProductsList";
import { PageWrapper } from "../components/ui/PageWrapper";
import { AppContext } from "../store/app-context";
import { getUsersFavoriteProductsId } from "../store/api";
import AuthContext from "../store/auth-context";

export const Home = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favIds, setFavIds] = useState([]);
  const ctx = useContext(AppContext);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    (async () => {
      if (authCtx.currentUser) {
        const fIds = await getUsersFavoriteProductsId(authCtx.currentUser);
        setFavIds(fIds);
      }
    })();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://shop-a0ba3-default-rtdb.europe-west1.firebasedatabase.app/products.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const products = [];
        for (const key in data) {
          const product = {
            id: key,
            ...data[key],
          };
          console.log(favIds);
          if (favIds.includes(key)) {
            product.favorite = true;
          } else {
            product.favorite = false;
          }
          console.log(product);
          products.push(product);
        }
        ctx.setFavoritesList(products.filter((item) => item.favorite));
        setLoadedProducts(products);

        setIsLoading(false);
      });
  }, [favIds]);

  const filterHandler = (value) => {
    console.log("Filter: " + value);
    setSearchValue(value);
  };
  let filterItems = [];
  if (searchValue !== "") {
    filterItems = loadedProducts.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  if (isLoading) {
    return (
      <PageWrapper>
        <Spinner />
      </PageWrapper>
    );
  }
  return (
    <PageWrapper
      onSearchChanged={filterHandler}
      title={searchValue ? `Search by: '${searchValue}'` : "All products"}
      addSearch={true}
    >
      <ProductsList products={searchValue ? filterItems : loadedProducts} />
    </PageWrapper>
  );
};
