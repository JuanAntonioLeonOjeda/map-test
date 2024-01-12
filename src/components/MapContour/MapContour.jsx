import { GeoJSON } from "react-leaflet"
import { useGeoJsonData } from "../../hooks/useGeoJsonData";

const style = {
  opacity: .8, 
  fillOpacity: 0.2,
  color: 'dimGray',
  weight: 2
}

const ContourLayer = () => {
  const data = useGeoJsonData()

  const onEachFeature = (region, layer) => {
    if (region.properties) {
      layer.on('mouseover', (e) => {
        const layer = e.target
        // console.log(region.properties.ID_3, region.properties.NAME_3)
      })
    }
  }

  const filteredRegions = () => {
    const result = data.features.filter((region) => region.properties.NAME_1 === 'Baden-Württemberg')                      
    return result
  }
  
  // render react-leaflet GeoJSON when the data is ready
  if (data) {
    const filteredData = { ...data, features: filteredRegions() }

    return (
      <section>
        <GeoJSON 
          data={filteredData} 
          style={style}
          onEachFeature={onEachFeature}
          />
      </section>
      )
    } else {
      return null;
    }
  };
  
export default ContourLayer