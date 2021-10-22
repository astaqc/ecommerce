export const getBraintreeToken = async (token) => {
  try {
    const res = await fetch(`/api/braintree/gettoken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const makePayment = async (token, data) => {
  try {
    const res = await fetch(`/api/braintree/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};
