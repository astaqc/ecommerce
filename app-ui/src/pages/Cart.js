import React, { useEffect, useState } from "react";
import { getCart, removeItem } from "../utils";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import Checkout from "../components/Checkout";

const Cart = ({ history }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
    items !== getCart() && setItems(getCart());
  }, []);

  const handleRemove = (id) => {
    removeItem(id);
    setItems(getCart());
  };

  return (
    <div>
      {items.length === 0 && (
        <h3 className="text-center">
          Your cart is empty. <Link to="/">Shop Now</Link>
        </h3>
      )}
      {items.length > 0 && (
        <div className="row">
          <div className="col-sm-6">
            <h3 className="text-center mb-5 text-muted">Your Cart Details</h3>
            {items.map((item) => (
              <CartItem
                item={item}
                key={item._id}
                handleRemove={handleRemove}
              />
            ))}
          </div>
          <div className="col-sm-6">
            <Checkout items={items} history={history} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
