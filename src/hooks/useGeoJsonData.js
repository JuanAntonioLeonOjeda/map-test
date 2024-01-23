import { useEffect, useState } from "react"
import axios from "axios"






const urls = {
  country: "https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/1_deutschland/1_sehr_hoch.geo.json",
  division1: "https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/2_bundeslaender/1_sehr_hoch.geo.json",
  division2: "https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/3_regierungsbezirke/1_sehr_hoch.geo.json" ,
  division3: "https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/4_kreise/1_sehr_hoch.geo.json",
}

export const useGeoJsonData = (type) => {
  const [data, setData] = useState(null)
  console.log(type)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(urls[type])
        setData(res.data)
      } catch (error) {
        console.error('Error fetching GeoJSON data: ', error)
      }
    }
    fetchData()
  }, [type])

  return data
}