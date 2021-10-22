import React, { createContext, useReducer } from "react";
import productReducer from "./productReducer";
import axios from "axios";

export const ProductCtx = createContext();

const initialState = {
  products: [],
  bySell: [],
  byArrival: [],
  product: {},
};

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const createProduct = async (token, product) => {
    try {
      const res = await axios.post("/api/product/create", product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "CREATE", payload: res.data });
    } catch (err) {
      dispatch({ type: "CREATE_FAIL", payload: err.response.data.error });
    }
  };

  const getProducts = async (sortBy, limit = "") => {
    try {
      const res = await axios.get(
        `/api/product?sortBy=${sortBy}&order=desc&limit=${limit}`
      );
      if (sortBy === "createdAt") {
        dispatch({ type: "GET_PRODUCTS_BY_DATE", payload: res.data });
      } else {
        dispatch({ type: "GET_PRODUCTS_BY_SOLD", payload: res.data });
      }
    } catch (err) {
      dispatch({ type: "GET_FAIL", payload: err.response.data.error });
    }
  };

  const getProductsByCategory = async (
    categoryTitle,
    sortBy = "",
    order = "",
    limit = ""
  ) => {
    try {
      const res = await axios.get(
        `/api/product/category/${categoryTitle}?sortBy=${sortBy}&order=${order}&limit=${limit}`
      );
      dispatch({ type: "PRODUCTS_BY_CATEGORY", payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  const getProduct = async (productId) => {
    try {
      const res = await axios.get(`/api/product/${productId}`);
      dispatch({ type: "GET_PRODUCT", payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  const getRelatedProducts = async (productId) => {
    try {
      const res = await axios.get(`/api/product/related/${productId}`);
      dispatch({ type: "RELATED_PRODUCTS", payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProductCtx.Provider
      value={{
        products: state.products,
        byArrival: state.byArrival,
        bySell: state.bySell,
        product: state.product,
        createProduct,
        getProducts,
        getProductsByCategory,
        getProduct,
        getRelatedProducts,
      }}
    >
      {children}
    </ProductCtx.Provider>
  );
};

export default ProductProvider;
