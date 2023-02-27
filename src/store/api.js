export const deleteFromCart = (id) => {
  return fetch(
    `https://shop-a0ba3-default-rtdb.europe-west1.firebasedatabase.app/cart/${id}.json`,

    {
      method: "DELETE",
    }
  );
};

export const addToCart = (obj) => {
  //console.log(JSON.stringify(obj));
  const res = fetch(
    "https://shop-a0ba3-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
    {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res;
};

export const updateInCart = (obj) => {
  //console.log(JSON.stringify(obj));
  const res = fetch(
    `https://shop-a0ba3-default-rtdb.europe-west1.firebasedatabase.app/cart/${obj.id}.json`,
    {
      method: "PATCH",
      body: JSON.stringify({ amount: obj.amount }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res;
};

export const addProduct = (obj) => {
  return fetch(
    "https://shop-a0ba3-default-rtdb.europe-west1.firebasedatabase.app/products.json",
    {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
export const addToFavorite = async (obj) => {
  return await fetch(
    "https://shop-a0ba3-default-rtdb.europe-west1.firebasedatabase.app/favorites.json",
    {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const getFavorite = () => {
  return fetch(
    'https://shop-a0ba3-default-rtdb.europe-west1.firebasedatabase.app/products.json?orderBy="favorite"&equalTo=true'
  );
};
export const removeFromFavorite = (obj, user) => {
  fetch(
    'https://shop-a0ba3-default-rtdb.europe-west1.firebasedatabase.app/favorites.json?orderBy="id"&orderBy="user"&equalTo="' +
      obj +
      '"&equalTo="' +
      user +
      '"'
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const favorites = [];
      for (const key in data) {
        favorites.push(key);
      }
      favorites.forEach((id) => {
        fetch(
          `https://shop-a0ba3-default-rtdb.europe-west1.firebasedatabase.app/favorites/${id}.json`,

          {
            method: "DELETE",
          }
        );
      });
    });
};

export const getOrders = () => {
  return fetch(
    "https://shop-a0ba3-default-rtdb.europe-west1.firebasedatabase.app/orders.json"
  );
};

export const addOrder = (obj) => {
  return fetch(
    "https://shop-a0ba3-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
    {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const getUserOrders = (user) => {
  return fetch(
    'https://shop-a0ba3-default-rtdb.europe-west1.firebasedatabase.app/orders.json?orderBy="user"&equalTo="' +
      user +
      '"'
  );
};

export const getOrdersItems = (id) => {
  return fetch(
    "https://shop-a0ba3-default-rtdb.europe-west1.firebasedatabase.app/orders/" +
      id +
      "/items.json"
  );
};

export const getUsersFavorite = (user) => {
  return fetch(
    'https://shop-a0ba3-default-rtdb.europe-west1.firebasedatabase.app/favorites.json?orderBy="user"&equalTo="' +
      user +
      '"'
  );

  //console.log(favorites);
};

export const getUsersFavoriteProductsId = async (user) => {
  return fetch(
    'https://shop-a0ba3-default-rtdb.europe-west1.firebasedatabase.app/favorites.json?orderBy="user"&equalTo="' +
      user +
      '"'
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const ids = [];
      for (const key in data) {
        ids.push(data[key].id);
      }
      return ids;
    });
};

export const getProduct = (id) => {
  return fetch(
    `https://shop-a0ba3-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`
  );
};

export const deleteProduct = (id) => {
  return fetch(
    `https://shop-a0ba3-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`,

    {
      method: "DELETE",
    }
  );
};

export const updateProduct = (obj) => {
  return fetch(
    `https://shop-a0ba3-default-rtdb.europe-west1.firebasedatabase.app/products/${obj.id}.json`,
    {
      method: "PATCH",
      body: JSON.stringify({
        title: obj.title,
        price: obj.price,
        imageUrl: obj.imageUrl,
        details: obj.details,
        images: obj.images,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
