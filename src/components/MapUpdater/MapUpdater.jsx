import PropTypes from "prop-types"
import { useEffect } from "react"
import { useMap } from "react-leaflet"

export default function MapUpdater({ center }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center)
  }, [center, map])

  return null
}

MapUpdater.propTypes = {
  center: PropTypes.array
}