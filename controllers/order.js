const { CartItem, Order } = require("../models/order");
const User = require("../models/user");

exports.createOrder = async (req, res) => {
  console.log(req.user)
  try {
    const user = await User.findById(req.user._id).select("-password -__v");
    const order = new Order(req.body.order);
    req.body.order.user = user;
    await order.save();
    res.json(order);
  } catch (err) {
    console.log(err);
  }
};
