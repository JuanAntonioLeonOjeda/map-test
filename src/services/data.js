import api from "./api";

export const getDataAPI = async () => {
  try {
    const { data } = await api.get(`/data`, {
      headers: {
        token: localStorage.getItem("token"),
      }
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Cannot send data");
  }
};