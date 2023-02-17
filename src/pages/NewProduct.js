import { useNavigate } from "react-router-dom";
import { NewProductForm } from "../components/NewProductForm";
import { addProduct } from "../store/api";

export const NewProductPage = (props) => {
  const navigate = useNavigate();
  function addProductHandle(productData) {
    addProduct(productData).then(() => {
      navigate("/");
    });
  }

  return (
    <section style={{ padding: "2rem" }}>
      <h1>Add new product</h1>
      <NewProductForm onAddProduct={addProductHandle} />
    </section>
  );
};
