export const createOrder = async (token, data) => {
  try {
    const res = await fetch(`/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ order: data }),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const getOrders = async (token) => {
  try {
    const res = await fetch("/api/order", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const getStatus = async (token) => {
  try {
    const res = await fetch("/api/order/status", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const updateStatus = async (token, orderId, status) => {
  try {
    const res = await fetch(`/api/order/${orderId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};
