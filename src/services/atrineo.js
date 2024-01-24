import api from "./api";

export const getAtrineoCollectionAPI = async () => {
    const id = '65a94d09aa0a5c3a29f6306a'
    try {
        const { data } = await api.get(`/collection/${id}`, {
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