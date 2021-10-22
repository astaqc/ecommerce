import React, { useState, useEffect } from "react";
import { getOrders, getStatus, updateStatus } from "../../../api/order";
import { isAuthenticated } from "../../../api/auth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    getOrders(isAuthenticated() && isAuthenticated().token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
    getStatus(isAuthenticated() && isAuthenticated().token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatus(data);
      }
    });
  }, []);

  const handleChange = (e, orderId) => {
    updateStatus(
      isAuthenticated() && isAuthenticated().token,
      orderId,
      e.target.value
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders();
      }
    });
  };

  return (
    <div>
      {orders && orders.map((order) => (
        <div className="card mt-4" key={order._id}>
          <div className="card-header">
            <h3>Order ID: {order._id}</h3>
          </div>
          <ul className="list-group">
            <li className="list-group-item">
              Status: {order.status}
              <select
                className="form-control"
                onChange={(e) => handleChange(e, order._id)}
              >
                <option value="">Update Status</option>
                {status.map((el) => (
                  <option value={el} key={el}>
                    {el}
                  </option>
                ))}
              </select>
            </li>
            <li className="list-group-item">
              Transaction ID: {order.transaction_id}
            </li>
            <li className="list-group-item">
              Created At: {new Date(order.createdAt).toDateString()}
            </li>

            <li className="list-group-item">Amount: {order.amount}</li>
            <li className="list-group-item">
              User ID: {order.user && order.user._id}
            </li>
            <li className="list-group-item">
              User Name: {order.user && order.user.name}
            </li>

            <li className="list-group-item">Address: {order.address}</li>
          </ul>
          <h5 className="mt-2">Total Products: {order.products.length}</h5>
          {order.products.map((product) => (
            <ul className="list-group" key={product._id}>
              <li className="list-group-item">Product ID: {product._id}</li>
              <li className="list-group-item">Product: {product.title}</li>
              <li className="list-group-item">Price: {product.price}</li>
              <li className="list-group-item">Quantity: {product.count}</li>
            </ul>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Orders;
