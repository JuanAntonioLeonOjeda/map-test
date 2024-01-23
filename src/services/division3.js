import api from "./api";

export const getDivision3DataAPI = async () => {
    try {
        const { data } = await api.get(`/division3`, {
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