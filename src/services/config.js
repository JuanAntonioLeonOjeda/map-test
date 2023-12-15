import axios from 'axios'

const geoapify = axios.create({
  baseURL:
    "https://api.geoapify.com/v1/geocode",
})

export default geoapify