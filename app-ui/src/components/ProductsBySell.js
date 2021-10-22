import React, { useContext, useEffect } from "react";
import { ProductCtx } from "../context/product/productContext";
import Card from "./Card";

const ProductsBySell = () => {
  const { getProducts, bySell } = useContext(ProductCtx);

  useEffect(() => {
    getProducts("sold", 3);
  }, []);

  return (
    <div className="row">
      {bySell &&
        bySell.map((product) => <Card product={product} key={product._id} />)}
    </div>
  );
};

export default ProductsBySell;
