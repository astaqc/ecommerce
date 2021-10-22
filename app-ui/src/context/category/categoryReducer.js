export default (state, action) => {
  switch (action.type) {
    case "CREATE":
      return {
        ...state,
        error: "",
        success: true,
        categories: [...state.categories, action.payload],
      };

    case "GET_CATEGORIES":
      return {
        ...state,
        error: "",
        success: true,
        categories: action.payload,
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
