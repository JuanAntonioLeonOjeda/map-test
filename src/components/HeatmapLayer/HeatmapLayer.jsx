import { useState } from "react"
import { GeoJSON } from "react-leaflet"
import { useGeoJsonData } from "../../hooks/useGeoJsonData"

const HeatmapLayer = () => {
  const data = useGeoJsonData()
  const [selectedRegion, setSelectedRegion] = useState(null)

  const selectedStyle = {
    opacity: 0.7,
    fillOpacity: 0.7
  }

  const defaultStyle = {
    opacity: 0.3,
    fillOpacity: 0.,
    color: 'royalBlue'
  }

  const onEachFeature = (feature, layer) => {
    layer.on({
/*       mouseover: (e) => {
        if (selectedRegion !== layer) {
          highlightFeature(e, layer)
        }
      },
      mouseout: (e) => {
        if (selectedRegion !== layer) {
          resetHighlight(e, layer)
        }
      }, */
      click: (e) => {
        if (selectedRegion) {
          selectedRegion.setStyle(defaultStyle)
        }
        setSelectedRegion(feature)
        layer.setStyle(selectedStyle)

        console.log(feature.properties.ID_3, feature.properties.NAME_3)
      }
    })
  }

  const filteredRegions = () => {
    return data?.features.filter((region) => region.properties.NAME_1 === 'Baden-Württemberg')
  }

  // render react-leaflet GeoJSON when the data is ready
  if (data) {
    const filteredData = { ...data, features: filteredRegions() }

    console.log(selectedRegion)

    return (
      <GeoJSON
        data={filteredData}
        style={(feature) => (selectedRegion && selectedRegion === feature) ? selectedStyle : defaultStyle}
        onEachFeature={onEachFeature}
      />
    )
  } else {
    return null
  }
}

export default HeatmapLayer