import React, { createContext, useReducer } from "react";
import categoryReducer from "./categoryReducer";
import axios from "axios";

export const CategoryCtx = createContext();

const initialState = {
  categories: [],
  error: "",
  success: false,
};

const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoryReducer, initialState);

  const createCategory = async (token, category) => {
    try {
      const res = await axios.post("/api/category/create", category, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "CREATE", payload: res.data });
    } catch (err) {
      dispatch({ type: "CREATE_FAIL", payload: err.response.data.error });
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios.get("/api/category");
      dispatch({ type: "GET_CATEGORIES", payload: res.data });
    } catch (err) {
      dispatch({ type: "GET_FAIL", payload: err.response.data.error });
    }
  };

  return (
    <CategoryCtx.Provider
      value={{
        categories: state.categories,
        error: state.error,
        success: state.success,
        createCategory,
        getCategories,
      }}
    >
      {children}
    </CategoryCtx.Provider>
  );
};

export default CategoryProvider;
