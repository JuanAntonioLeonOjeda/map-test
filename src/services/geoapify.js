import geoapify from "./config"

export const search = async (text) => {
  try {
    const { data } = await geoapify.get(
      `/search?text=${text}&apiKey=3aed3ab3be72482e8519c5b007bf5d46`
    );
    return data
  } catch (error) {
    console.error(error)
  }
}

