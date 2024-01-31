import { useEffect, useState } from "react"
import axios from "axios"

export const useDistrictsCoords = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('../../districtCoords.json')
        setData(res.data.districts)
      } catch (error) {
        console.error('Error fetching GeoJSON data: ', error)
      }
    }
    fetchData()
  }, [])

  return data
}