export const SET_PRODUCTS = "SET_PRODUCTS";

export const setProducts = (data) => {
  return {
    type: "SET_PRODUCTS",
    payload: data,
  };
};
