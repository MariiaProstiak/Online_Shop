import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NewProductForm } from "../components/NewProductForm";
import { getProduct } from "../store/api";
import { AppContext } from "../store/app-context";

export const UpdateProductPage = (props) => {
  const params = useParams();
  const ctx = useContext(AppContext);
  const [productInfo, setProductInfo] = useState({});
  useEffect(() => {
    getProduct(params.name)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const product = {
          price: data.price,
          title: data.title,
          imageUrl: data.imageUrl,
          images: data.images,
          details: data.details,
        };
        setProductInfo(product);
      });
  }, []);
  function updateProductHandle(productData) {
    const updatedProduct = { ...productData, id: params.name };
    console.log(updatedProduct);
    ctx.onUpdateProduct(updatedProduct);
  }

  return (
    <section style={{ padding: "2rem" }}>
      <h1>Update product {params.name}</h1>
      {productInfo.images && (
        <NewProductForm
          onAddProduct={updateProductHandle}
          product={productInfo}
          updateForm={true}
        />
      )}
    </section>
  );
};
