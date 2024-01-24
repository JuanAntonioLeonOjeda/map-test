import { useEffect, useState } from "react"
import { GeoJSON } from "react-leaflet"
import { useGeoJsonData } from "../../hooks/useGeoJsonData"
import usePopulationData from "../../hooks/usePopulationData"
import { selectedStyle, lowLimitStyle, mediumLimitStyle, highLimitStyle } from './Styles'

const HeatmapLayer = ({ mapDivision }) => {
  const data = useGeoJsonData(mapDivision)
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [key, setKey] = useState(0); // clave única

  const { groupedDataWithDivision3, groupedDataWithoutDivision3 } = usePopulationData({})

  const getPopulationByDivision3 = () => {
    const populationByDivision3 = {}
    for (const key in groupedDataWithDivision3) {
      const id = key;
      const totalPopulation = groupedDataWithDivision3[key].totalPopulation;
      populationByDivision3[id] = totalPopulation
    }
    return populationByDivision3
  }

  const setStyle = (feature) => {
    // Obtener la población del estado actual
    const populationByDivision3 = getPopulationByDivision3()
    const currentGroupId = feature.properties.ID_3

    const population = populationByDivision3[currentGroupId]
    
    // Definir los límites de los tramos de población
    const lowLimit = 10000000
    const mediumLimit = 30000000

    // Asignar colores en función de los tramos de población
    if (selectedRegion && selectedRegion.feature.properties.ID_3 == currentGroupId) {
      return selectedStyle
    } else {
      if (population < lowLimit) {
        return lowLimitStyle
      } else if (population < mediumLimit) {
        return mediumLimitStyle
      } else {
        return highLimitStyle
      }
    }
  }


  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [data]);

  useEffect(() => {
    setSelectedRegion(null)
  }, [mapDivision])
  
  const onEachFeature = (feature, layer) => {
    layer.on("click", () => {
      console.log(feature)
      if (mapDivision == "country") {
        setSelectedRegion((prevSelectedRegion) => {
          return prevSelectedRegion && prevSelectedRegion.feature.properties.ID_0 === feature.properties.ID_0
          ? null
          : layer
        })
      } else if (mapDivision == "division1") {
        setSelectedRegion((prevSelectedRegion) => {
          return prevSelectedRegion && prevSelectedRegion.feature.id === feature.id
          ? null
          : layer
        })
      } else if (mapDivision == "division2" ){
        setSelectedRegion((prevSelectedRegion) => {
          return prevSelectedRegion && prevSelectedRegion.feature.properties.ID_2 === feature.properties.ID_2
          ? null
          : layer
        })
      } else {
        setSelectedRegion((prevSelectedRegion) => {
          return prevSelectedRegion && prevSelectedRegion.feature.properties.ID_3 === feature.properties.ID_3
          ? null
          : layer
        })
      }
    });
  }

  const filteredRegions = () => {
    return data?.features.filter((region) => region.properties.NAME_1 === 'Baden-Württemberg')
  }

  // render react-leaflet GeoJSON when the data is ready
  if (data) {
    const filteredData = { ...data, features: filteredRegions() }

    return (
      <GeoJSON
        data={filteredData}
        style={(feature) => setStyle(feature)}
        onEachFeature={onEachFeature}
        key={key} // Usa la clave única
      />
    )
  } else {
    return null
  }
}

export default HeatmapLayer