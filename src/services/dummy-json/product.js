import API from "./API.js";

export const fetchProducts = async (payload) => {
  try {
    const response = await API.get("products", {
      params: payload
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

