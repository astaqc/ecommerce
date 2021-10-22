import React from "react";
import { Link, withRouter } from "react-router-dom";
import { addToCart } from "../utils";

const Card = ({ product }) => {
  return (
    <div className="col-md-4 col-sm-6 mt-3">
      <div className="card">
        <img
          src={`/api/product/photo/${product._id}`}
          alt={product.title}
          className="card-img-top"
          style={{ maxHeight: "200px" }}
        />
        <div className="card-body">
          <h4 className="card-title">{product.title}</h4>
          <p className="card-text">${product.price}</p>
          <div className="btnContainer">
            <Link
              to={`/product/${product._id}`}
              className="btn btn-outline-primary mt-3"
            >
              View Product
            </Link>

            <button
              className="btn btn-outline-warning mt-3"
              onClick={() => addToCart(product)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Card);
