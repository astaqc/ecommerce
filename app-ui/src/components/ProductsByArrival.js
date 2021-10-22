import React, { useContext, useEffect } from "react";
import { ProductCtx } from "../context/product/productContext";
import Card from "./Card";

const ProductsByArrival = () => {
  const { getProducts, byArrival } = useContext(ProductCtx);

  useEffect(() => {
    getProducts("createdAt", 3);
  }, []);

  return (
    <div className="row">
      {byArrival &&
        byArrival.map((product) => (
          <Card product={product} key={product._id} />
        ))}
    </div>
  );
};

export default ProductsByArrival;
