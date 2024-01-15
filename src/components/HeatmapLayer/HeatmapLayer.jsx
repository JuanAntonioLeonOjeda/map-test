import { useState } from "react"
import { GeoJSON } from "react-leaflet"
import { useGeoJsonData } from "../../hooks/useGeoJsonData"
import { states } from "../../../data.json"

const HeatmapLayer = () => {
  const data = useGeoJsonData()
  const [selectedRegion, setSelectedRegion] = useState(null)
  // const [ hoverState, setHoverState ] = useState('')

  const selectedStyle = {
    opacity: 0.7,
    fillOpacity: 1,
    fillColor: '#1C6E00',
  }

  const lowLimitStyle = {
    opacity: 0.3,
    fillOpacity: 0.8,
    color: 'black',
    fillColor: '#90B1DB',
  }

  const mediumLimitStyle = {
    opacity: 0.3,
    fillOpacity: 0.8,
    color: 'black',
    fillColor: '#00569D',
  }

  const highLimitStyle = {
    opacity: 0.3,
    fillOpacity: 0.8,
    color: 'black',
    fillColor: '#002F5C',
  }

  function getPopulationByState(stateName) {
  // Buscar el estado en el conjunto de datos
    const state = states.find(function (s) {
      return s.id_3 === stateName;
    });

    // Devolver la población si se encuentra el estado, de lo contrario, devolver un valor predeterminado
    return state ? state.population : 0; // Puedes cambiar el valor predeterminado según tu necesidad
  }

  const onEachFeature = (feature, layer) => {
    layer.on("click", () => {
      setSelectedRegion((prevSelectedRegion) => {
        return prevSelectedRegion && prevSelectedRegion.feature.properties.ID_3 === feature.properties.ID_3
          ? null
          : layer;
      });
    });

    /* layer.on('mouseover', function (e) {
      // e = event
      //console.log(e.sourceTarget.feature.properties.NAME_1);
      setHoverState(e.sourceTarget.feature.properties.ID_1)
    });

    layer.on('mouseout', function () {
      // e = event
      //console.log(e.sourceTarget.feature.properties.NAME_1);
      setHoverState('')
    }); */
    // console.log(feature.properties.ID_3, feature.properties.NAME_3)
  }

  const setStyle = (feature) => {
    // Obtener la población del estado actual
    const population = getPopulationByState(feature.properties.ID_3); // Necesitarías implementar esta función para obtener la población real

    // Definir los límites de los tramos de población
    const lowLimit = 300000;
    const mediumLimit = 600000;

    // Asignar colores en función de los tramos de población
    if (selectedRegion && selectedRegion.feature.properties.ID_3 == feature.properties.ID_3) {
      return selectedStyle
    /* } else if (hoverState == feature.properties.ID_1) {
      return {
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.3,
        fillColor: '#0000FF'
      }; */
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
      />
    )
  } else {
    return null
  }
}

export default HeatmapLayer