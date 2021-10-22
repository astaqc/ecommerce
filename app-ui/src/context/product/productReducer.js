export default (state, action) => {
  switch (action.type) {
    case "CREATE":
      return {
        ...state,
        error: "",
        success: true,
        products: [...state.products, action.payload],
      };

    case "GET_PRODUCTS_BY_DATE":
      return {
        ...state,
        byArrival: action.payload,
      };
    case "GET_PRODUCTS_BY_SOLD":
      return {
        ...state,
        bySell: action.payload,
      };
    case "PRODUCTS_BY_CATEGORY":
      return {
        ...state,
        products: action.payload,
      };
    case "GET_PRODUCT":
      return {
        ...state,
        product: action.payload,
      };
    case "RELATED_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "CREATE_FAIL":
    case "GET_FAIL":
      return {
        ...state,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
