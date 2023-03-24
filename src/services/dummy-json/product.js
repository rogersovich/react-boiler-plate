import API from "./API.js";

export const fetchProducts = async () => {
  try {
    const response = await API.get("products");

    return response;
  } catch (error) {
    return error.response;
  }
};

