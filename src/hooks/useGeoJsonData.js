import { useEffect, useState } from "react"
import axios from "axios"

const geoJsonUrl = "https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/4_kreise/1_sehr_hoch.geo.json"

export const useGeoJsonData = (url) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(geoJsonUrl)
        setData(res.data)
      } catch (error) {
        console.error('Error fetching GeoJSON data: ', error)
      }
    }
    fetchData()
  }, [url])

  return data
}