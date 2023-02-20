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
  onDeleteProduct: (id) => {},
  onUpdateProduct: (obj) => {},
});

export function AppContextProvider(props) {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [cartOpened, setCartOpened] = useState(false);
  const authCtx = useContext(AuthContext);

  const onAddToCart = async (obj, isInCart = false) => {
    let index;
    if (isInCart) {
      index = cartItems.findIndex((el) => el.id === obj.id);
    } else {
      index = cartItems.findIndex((el) => el.idProduct === obj.id);
    }
    if (index === -1) {
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
    } else {
      const updatedCart = [...cartItems];
      updatedCart[index].amount += obj.amount;
      setCartItems(updatedCart);
      try {
        API.updateInCart(updatedCart[index]);
      } catch (error) {
        alert("Error when adding an item to cart!");
        console.error(error);
      }
    }
  };

  const onRemoveItem = (id, removeAll = false) => {
    let updatedCart = [...cartItems];
    const index = updatedCart.findIndex((el) => el.id === id);
    if (updatedCart[index].amount === 1 || removeAll) {
      updatedCart = updatedCart.filter((el) => el.id !== id);
      API.deleteFromCart(id);
    } else {
      updatedCart[index].amount -= 1;
      API.updateInCart(updatedCart[index]);
    }
    setCartItems(updatedCart);
  };
  const onDeleteProduct = (id) => {
    try {
      // setItems((prev) => prev.filter((item) => item.id !== id));
      API.deleteProduct(id);
    } catch (error) {
      alert("Error when removing an item!");
      console.error(error);
    }
  };
  const onUpdateProduct = (obj) => {
    try {
      API.updateProduct(obj);
    } catch (error) {
      alert("Error when removing an item!");
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
    onDeleteProduct,
    onUpdateProduct,
  };

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
}
