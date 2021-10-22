import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../api/auth";
import { getBraintreeToken, makePayment } from "../api/payment";
import { createOrder } from "../api/order";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({ items, history }) => {
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  useEffect(() => {
    getBraintreeToken(isAuthenticated() && isAuthenticated().token).then(
      (res) => {
        if (res.error) {
          setData({ ...data, error: res.error });
        } else {
          setData({
            ...data,
            clientToken: res.clientToken,
            success: res.success,
          });
        }
      }
    );
  }, []);

  const total = () =>
    items.reduce((acc, i) => acc + i.count * i.price, 0).toFixed(2);

  const pay = async () => {
    try {
      let nonce;
      const res = await data.instance.requestPaymentMethod();
      nonce = res.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: total(items),
      };
      const response = await makePayment(
        isAuthenticated() && isAuthenticated().token,
        paymentData
      );
      const orderData = {
        products: items,
        transaction_id: response.transaction.id,
        amount: response.transaction.amount,
        address: data.address,
      };
      await createOrder(
        isAuthenticated() && isAuthenticated().token,
        orderData
      );
      setData({ ...data, success: true });
      localStorage.removeItem("cart");
      history.push("/");
    } catch (err) {
      console.log(err);
      setData({ ...data, error: err.message });
    }
  };

  return (
    <div>
      <h3 className="text-center text-muted">Checkout</h3>
      <p>{total()}</p>
      {isAuthenticated() ? (
        data.clientToken !== null && items.length > 0 ? (
          <div>
            <div className="form-group mb-3">
              <label htmlFor="address">Delivery Address</label>
              <textarea
                name="addredd"
                value={data.address}
                onChange={(e) => setData({ ...data, address: e.target.value })}
              />
            </div>
            <DropIn
              options={{
                authorization: data.clientToken,
              }}
              onInstance={(instance) => (data.instance = instance)}
            />
            <button className="btn btn-success" onClick={pay}>
              Checkout
            </button>
          </div>
        ) : null
      ) : (
        <Link to="/login" className="btn btn-primary">
          Login to checkout
        </Link>
      )}
    </div>
  );
};

export default Checkout;
