import React, { useState, useEffect, useContext } from "react";
import { isAuthenticated } from "../../../api/auth";
import { CategoryCtx } from "../../../context/category/categoryContext";
import { ProductCtx } from "../../../context/product/productContext";

const CreateProduct = ({ history }) => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    photo: "",
    category: "",
    loading: false,
    error: "",
    formData: new FormData(),
  });

  const {
    title,
    description,
    price,
    quantity,
    photo,
    category,
    loading,
    error,
    formData,
  } = product;

  const { token } = isAuthenticated();

  const { getCategories, categories } = useContext(CategoryCtx);
  const { createProduct } = useContext(ProductCtx);

  useEffect(() => {
    getCategories();
  }, []);

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProduct({ ...product, error: "", loading: true });

    if (!title || !description || !price || !quantity || !category || !photo) {
      setProduct({ ...product, error: "All fields are required" });
      return;
    }

    createProduct(token, formData);
    setProduct({
      title: "",
      description: "",
      price: "",
      quantity: "",
      photo: "",
      category: "",
      loading: false,
      error: "",
      formData: new FormData(),
    });
    history.push("/admin/dashboard");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error !== "" ? <div className="alert alert-danger">{error}</div> : null}
      <h3 className="text-muted text-center mb-5">Create Product</h3>
      <div className="form-group text-center">
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleChange("photo")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={handleChange("title")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          value={description}
          onChange={handleChange("description")}
        />
      </div>

      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={handleChange("price")}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={handleChange("quantity")}
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select className="form-control" onChange={handleChange("category")}>
          <option value="">Please select Category</option>
          {categories &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
        </select>
      </div>
      <div className="text-center">
        <button
          className="btn btn-outline-secondary"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>{" "}
              Creating...
            </>
          ) : (
            "Create"
          )}
        </button>
      </div>
    </form>
  );
};

export default CreateProduct;
