import API from "./API.js";

export const getCharaters = async (payload) => {
  try {
    const response = await API.get("character", {
      params: payload,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};
export const getLocations = async (payload) => {
  try {
    const response = await API.get("location", {
      params: payload,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};
