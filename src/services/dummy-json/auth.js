import api from "./API"

export const loginAPI = async (payload) => {
  const response = await api.post("auth/login", JSON.stringify(payload))

  return response
}