import api from "./API";

export const login = async (payload) => {
  try {
    const response = await api.post("auth/login", JSON.stringify(payload));

    return response;
  } catch (error) {
    return error.response;
  }
};

