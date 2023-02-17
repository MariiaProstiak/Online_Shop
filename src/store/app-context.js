import { createContext, useContext, useState } from "react";
import * as API from "./api";
import AuthContext from "./auth-context";

export const AppContext = createContext({
  isItemAdded: (id) => {},
  cartItems: [],
  favorites: [],
  items: [],
  cartOpened: false,
  onAddToFavorite: (obj) => {},
  onAddToCart: (obj) => {},
  onRemoveItem: (id) => {},
  setFavoritesList: (list) => {},
  itemIsFavorite: (id) => {},
  removeFavorite: (obj) => {},
  setCartOpened: (val) => {},
  setCartItems: (obj) => {},
});

export function AppContextProvider(props) {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [cartOpened, setCartOpened] = useState(false);
  const authCtx = useContext(AuthContext);

  const onAddToCart = async (obj) => {
    try {
      API.addToCart(obj)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setCartItems((prev) => [
            ...prev,
            { ...obj, idProduct: obj.id, id: data.name },
          ]);
        });
    } catch (error) {
      alert("Error when adding an item to cart!");
      console.error(error);
    }
  };

  const onRemoveItem = (id) => {
    try {
      API.deleteFromCart(id);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert("Error when removing an item from the cart!");
      console.error(error);
    }
  };
  async function onAddToFavorite(favoriteProduct, user) {
    if (user) {
      const ids = await API.getUsersFavoriteProductsId(user);

      if (!ids.includes(favoriteProduct.id)) {
        setFavorites((prevUserFavorites) => {
          return prevUserFavorites.concat({
            ...favoriteProduct,
            favorite: true,
          });
        });
        await API.addToFavorite({ id: favoriteProduct.id, user: user });
      }
    }
  }
  function removeFavoriteHandler(favoriteProductId, user) {
    API.removeFromFavorite(favoriteProductId, user);
    setFavorites((prevUserFavorites) => {
      return prevUserFavorites.filter((item) => item.id !== favoriteProductId);
    });
  }
  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  const setFavoritesList = (list) => {
    setFavorites((prevUserFavorites) => [...list]);
  };
  function itemIsFavoriteHandler(productId) {
    return favorites.some((item) => item.id === productId);
  }

  const context = {
    isItemAdded,
    cartItems,
    favorites,
    items,
    cartOpened,
    onAddToFavorite,
    itemIsFavorite: itemIsFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    onAddToCart,
    onRemoveItem,
    setFavoritesList,
    setCartOpened,
    setCartItems,
  };

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
}
