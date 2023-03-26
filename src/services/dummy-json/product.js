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

export const searchProducts = async (payload) => {
  try {
    const response = await API.get("products/search", {
      params: payload
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const fetchProduct = async (ID) => {
  try {
    const response = await API.get(`products/${ID}`);

    return response;
  } catch (error) {
    return error.response;
  }
};

