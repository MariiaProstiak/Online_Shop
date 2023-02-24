import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProduct } from "../store/api";
import Spinner from "../components/ui/Spinner";
import { PageWrapper } from "../components/ui/PageWrapper";
import ProductInfo from "../components/ProductInfo";

const ProductPage = () => {
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProduct(id)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCurrentProduct({ ...data, id: id });
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error.message);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <PageWrapper isBackArrow={true}>
        <Spinner />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title={currentProduct.title} isBackArrow={true}>
      <ProductInfo product={currentProduct} />
    </PageWrapper>
  );
};

export default ProductPage;
