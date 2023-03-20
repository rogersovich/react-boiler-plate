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
// export const getType = async () => {
//   try {
//     const response = await API.get("bahan/get_type");

//     return response;
//   } catch (error) {
//     return error.response;
//   }
// };
