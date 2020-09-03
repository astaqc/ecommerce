const Product = require("../models/product");
const fs = require("fs");
const formidable = require("formidable");

exports.create = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image could not be uploaded" });
    }

    let product = new Product(fields);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res
          .status(400)
          .json({ error: "Image size should not be more than 1mb" });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, data) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(201).json(data);
    });
  });
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }
    return res.json(product);
  } catch (err) {
    console.log(err);
  }
};

exports.updateProduct = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image could not be uploaded" });
    }
    Product.findByIdAndUpdate(req.params.productId, fields, {
      new: true,
    })
      .then((product) => {
        if (files.photo) {
          product.photo.data = fs.readFileSync(files.photo.path);
          product.photo.contentType = files.photo.type;
        }
        product.save((err, data) => {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          return res.status(201).json(data);
        });
      })
      .catch((err) => console.log("error updating product", err));
  });
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }
    await product.remove();
    return res.json({ message: "Product successfully deleted" });
  } catch (err) {
    console.log(err);
  }
};

exports.getProducts = async (req, res) => {
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let order = req.query.order ? req.query.order : "asc";
  let limit = req.query.limit ? parseInt(req.query.limit) : 5;

  try {
    const products = await Product.find()
      .select("-photo")
      .populate("category")
      .sort([[sortBy, order]])
      .limit(limit);
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

exports.getRelatedProducts = async (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 5;

  try {
    let product = await Product.findById(req.params.productId);
    let relatedProducts = await Product.find({
      _id: { $ne: product },
      category: product.category,
    })
      .limit(limit)
      .populate("category", "_id name");
    res.json(relatedProducts);
  } catch (err) {
    console.log(err);
  }
};
