const { check, validationResult } = require("express-validator");

exports.validateProduct = [
  [
    check("title").notEmpty().withMessage("Title is required"),
    check("description").notEmpty().withMessage("Description is required"),
    check("price").notEmpty().withMessage("Price is required"),
    check("price").isNumeric().withMessage("Price must be a number"),
    check("quantity").isNumeric().withMessage("Quantity must be a number"),
    check("photo")
      .isByteLength({ max: 1000000 })
      .withMessage("Image must be less than or equal to 1mb"),
  ],
];

exports.validationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
