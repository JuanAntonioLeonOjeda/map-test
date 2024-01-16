import api from "./api";

export const uploadCsv = async (data) => {
  try {
    const res = await api.post(
      `/data`,
      data,
    );
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Cannot send data");
  }
};
