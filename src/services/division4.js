import api from "./api";

export const getDivision4DataAPI = async () => {
    try {
        const { data } = await api.get(`/division4`, {
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