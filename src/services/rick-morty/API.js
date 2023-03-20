import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_RICK_MORTY,
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default api;
