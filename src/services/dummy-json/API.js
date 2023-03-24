import axios from "axios"

const api = axios.create({
  baseURL: process.env.REACT_APP_DUMMY_JSON,
  headers: { "Content-Type": "application/json" },
})

// const ls = JSON.parse(localStorage.getItem("persist:root")).auth
// const tokenBearer = JSON.parse(ls).token

// api.interceptors.request.use(
//   (config) => {
//     const token = config.headers.Authorization || tokenBearer
//     if (token) {
//       config.headers.Authorization = token
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default api
