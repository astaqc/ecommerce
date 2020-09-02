const Category = require("../models/category");

exports.create = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    return res.status(201).json(category);
  } catch (err) {
    console.log(err);
  }
};
