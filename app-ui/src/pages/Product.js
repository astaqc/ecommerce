import React, { useEffect, useContext } from "react";
import { ProductCtx } from "../context/product/productContext";
import { addToCart } from "../utils";
import Card from "../components/Card";

const Product = ({ match }) => {
  const { id } = match.params;

  const { getProduct, getRelatedProducts, product, products } = useContext(
    ProductCtx
  );

  useEffect(() => {
    getProduct(id);
    getRelatedProducts(id);
  }, [id]);

  const { title, price, quantity, createdAt, description } = product;
  return (
    <div>
      <div className="row">
        <div className="col-sm-6 col-xs-12 mt-3">
          <img
            src={`/api/product/photo/${product._id}`}
            alt={title}
            className="img-fluid"
          />
        </div>
        <div className="col-sm-6 col-xs-12 mt-3">
          <h3 className="text-muted">{title}</h3>
          <p className="text-lead">
            Uploaded on {new Date(createdAt).toDateString()}
          </p>
          <p className="text-lead">${price}</p>
          In Stock <span className="text-success">{quantity}</span>
          <div className="text-center">
            <button
              className="btn btn-outline-warning mt-3"
              onClick={() => addToCart(product)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      <hr />
      <div className="card mt-3">
        <div className="card-header">
          <h4>Description</h4>
        </div>
        <div className="card-body">{description}</div>
      </div>
      <h3 className="mt-5">Related Products</h3>
      <div className="row">
        {products.map((product) => (
          <Card product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default Product;
