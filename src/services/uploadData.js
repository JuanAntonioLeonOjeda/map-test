import api from "./api";

export const uploadCsv = async (data) => {
  try {
    const payload = {
      body: data,
      collectionType: 'startups'
    }
    const res = await api.post(`/data/demo`, payload, {
      headers: {
        token: localStorage.getItem("token"),
      }
    })
    return res
  } catch (error) {
    console.error(error);
    throw new Error("Cannot send data");
  }
};

export const addCoords = async (data) => {
  try {
    const res = await api.patch("/division4/coord", { body: data });
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