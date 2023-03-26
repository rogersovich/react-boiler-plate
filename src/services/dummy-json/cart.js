import API from "./API.js"

export const fetchCartUser = async (payload) => {
  try {
    const response = await API.get(`carts/user/${payload.user_id}`)

    return response
  } catch (error) {
    return error.response
  }
}

export const updateCartUser = async (payload) => {
  try {
    const response = await API.put(
      `carts/${payload.cart_id}`,
      JSON.stringify(payload.data)
    )

    return response
  } catch (error) {
    return error.response
  }
}

export const deleteCartUser = async (cartID) => {
  try {
    const response = await API.delete(`carts/${cartID}`)

    return response
  } catch (error) {
    return error.response
  }
}
