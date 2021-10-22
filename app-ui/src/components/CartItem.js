import React, { useState } from "react";
import { updateCart, removeItem } from "../utils";

const CartItem = ({ item, handleRemove }) => {
  const [count, setCount] = useState(item.count);
  const handleChange = (e) => {
    setCount(e.target.value < 1 ? 1 : e.target.value);
    if (e.target.value >= 1) {
      updateCart(item._id, parseInt(e.target.value));
    }
  };
  return (
    <div style={{ display: "flex", marginTop: "10px" }}>
      <img
        src={`/api/product/photo/${item._id}`}
        alt={item.title}
        style={{ width: "60px", height: "60px" }}
      />
      <div className="row">

      
      <div className="col-sm-4">
        <h5>{item.title}</h5>
      </div>
      <div className="col-sm-4">
        <input
          type="number"
          style={{ width: "70px" }}
          value={count}
          onChange={handleChange}
        />
      </div>
      <div className="col-sm-3">
        <p>${count * item.price}</p>
      </div>
      <div className="col-sm-1">
        <button
          className="btn btn-danger btn-sm"
          onClick={()=>handleRemove(item._id)}
        >
          X
        </button>
      </div>
      </div>
    </div>
  );
};

export default CartItem;
