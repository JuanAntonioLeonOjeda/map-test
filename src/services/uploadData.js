import api from "./api";

export const uploadCsv = async (data) => {
  try {
    const res = await api.post(`/data`, data, {
      headers: {
        token: localStorage.getItem("token"),
      }
    });
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Cannot send data");
  }
};

export const uploadGeojson = async (data, type) => {
  try {
    const res = await api.post(
      `/${type}`,
      data,
    );
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Cannot send data");
  }
};

export const uploadCsvCity = async (data) => {
  try {
    const res = await api.post(
      `/division4`,
      data,
    );
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Cannot send data");
  }
};