import { useState, useEffect } from "react"
import { useMap } from "react-leaflet"

import './CoordsDisplay.css'

const CoordsDisplay = () => {
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 })

  const map = useMap()

  useEffect(() => {
    const showCoordinates = (e) => {
      const { lat, lng } = e.latlng
      setCoordinates({ lat, lng })
    }
    map.on('mousemove', showCoordinates)
    return () => {
      map.off('mousemove', showCoordinates)
    }
  }, [map])
  
  return (
    <section className="coords">
      <div>
        Coordenadas: {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
      </div>
    </section>
  )
}

export default CoordsDisplay