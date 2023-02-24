import { Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { Favorites } from "./pages/Favorites";
import { Orders } from "./pages/Orders";
import { Layout } from "./components/layout/Layout";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import AuthPage from "./pages/AuthPage";
import { NewProductPage } from "./pages/NewProduct";
import { OrderPage } from "./pages/OrderPage";
import { UpdateProductPage } from "./pages/UpdateProductPage";
import ProductPage from "./pages/ProductPage";

// export const AppContext = React.createContext({});

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        {!authCtx.isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
        <Route path="/favorites" element={<Favorites />} />
        {authCtx.isLoggedIn && (
          <Route path="/orders" element={<Orders />}></Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/orders/:name" element={<OrderPage />} />
        )}
        {!authCtx.isLoggedIn && (
          <Route path="/orders" element={<Navigate replace to="/auth" />} />
        )}

        {authCtx.isLoggedIn && (
          <Route path="/new-product" element={<NewProductPage />} />
        )}
        {authCtx.isLoggedIn && (
          <Route path="/update-product/:name" element={<UpdateProductPage />} />
        )}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;
