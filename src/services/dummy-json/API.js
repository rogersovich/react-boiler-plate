import axios from "axios"
import { useDispatch } from "react-redux"
import { unsetToken, unsetProfile, unsetError } from "store/auth"

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
  async function (error) {
    const dispatch = useDispatch()

    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      // localStorage.removeItem("persist:rogersovich")
      dispatch(unsetToken())
      dispatch(unsetProfile())
      dispatch(unsetError())
      return api(originalRequest)
    }
    return Promise.reject(error)
  }
)

export default api
