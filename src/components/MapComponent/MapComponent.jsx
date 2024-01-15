import { useState, useEffect, useRef } from "react"
import { booleanPointInPolygon, point, polygon } from "@turf/turf";
import { MapContainer, GeoJSON, FeatureGroup } from "react-leaflet"
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

import MarkerComponent from "../MarkerComponent/MarkerComponent"
import MapControls from "../MapControls/MapControls"
import ConfigButton from '../ConfigButton/ConfigButton'
import SearchBar from "../SearchBar/SearchBar"
import MapUpdater from "../MapUpdater/MapUpdater"
import axios from 'axios';

import searchContext from "../../context/searchContext"

import { getData } from "../../firebase/queries"

import './MapComponent.css'
import LayersControlComponent from "../LayersControlComponent/LayersControl"
import ContourLayer from "../MapContour/MapContour"
import CoordsDisplay from "../CoordsDisplay/CoordsDisplay"
import { states } from "./data.json"

export default function MapComponent() {
  const mapRef = useRef()
  const [mapCenter, setMapCenter] = useState([48.5, 8.5])
  const [markers, setMarkers] = useState([])
  const [employeeCategories, setEmployeeCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState({})
  const [showControls, setShowControls] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [ selectedState, setSelectedState ] = useState(null)
  const [ searchPolygon, setSearchPolygon ] = useState(null)
  // const [ hoverState, setHoverState ] = useState('')
  const [ onlyShowSelected, setOnlyShowSelected ] = useState(false)

  const handleClick = (data) => {
    setMapCenter([data.Lat, data.Lon])
  }

  const MyData = () => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState();

    // useEffect to fetch data on mount
    useEffect(() => {
      // async function!
      const getData = async () => {
        // 'await' the data
        const response = await axios.get("https://gist.githubusercontent.com/fegoa89/d33514a5e59eb5af812b909915bcb3da/raw/05ddd9064028f1218cf6a1efb797a1d903508ad5/germany-states.geojson");
        // save data to state
        setData(response.data);
      };
      getData();
    }, [])


    // render react-leaflet GeoJSON when the data is ready
    if (data) {
      return <GeoJSON data={data} onEachFeature={onEachFeature} style={style} filter={onlyShowSelected ? filter : null}/>;
    } else {
      return null;
    }
  }

  function onEachFeature(feature, layer) {
    //bind click
    layer.on('click', function (e) {
      // e = event
      // console.log(e)
      //console.log(e.sourceTarget.feature.properties.NAME_1);
      if (selectedState === layer.feature.properties.ID_1) {
        setSelectedState(null)
      } else {
        setSelectedState(layer.feature.properties.ID_1)
      }
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
  }

  function getPopulationByState(stateName) {
  // Buscar el estado en el conjunto de datos
    const state = states.find(function (s) {
      return s.name === stateName;
    });

    // Devolver la población si se encuentra el estado, de lo contrario, devolver un valor predeterminado
    return state ? state.population : 0; // Puedes cambiar el valor predeterminado según tu necesidad
  }

  function style(feature) {
    // Obtener la población del estado actual
    const population = getPopulationByState(feature.properties.NAME_1); // Necesitarías implementar esta función para obtener la población real

    // Definir los límites de los tramos de población
    const lowLimit = 2000000;
    const mediumLimit = 5000000;

    // Asignar colores en función de los tramos de población
    if (selectedState == feature.properties.ID_1) {
      return {
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.3,
        fillColor: '#ff0000'
      };
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
        return {
          weight: 1,
          opacity: 1,
          color: 'black',
          fillOpacity: 0.3,
          fillColor: '#66ff66'  // Verde para población baja
        };
      } else if (population < mediumLimit) {
        return {
          weight: 1,
          opacity: 1,
          color: 'black',
          fillOpacity: 0.3,
          fillColor: '#ffcc66'  // Amarillo para población media
        };
      } else {
        return {
          weight: 1,
          opacity: 1,
          color: 'black',
          fillOpacity: 0.3,
          fillColor: '#ff6666'  // Rojo para población alta
        };
      }
    }
  }

  function filter(feature, layer) {
    return (selectedState === feature.properties.ID_1)
  }
  

  const connectToDB = async () => {
    const result = await getData()

    const uniqueEmployeeCategories = new Set()
    const initialSelectedCategories = {}

    const arr = result.docs.map(row => {
      const data = row.data()

      uniqueEmployeeCategories.add(data.Employees)
      initialSelectedCategories[data.Employees] = true

      return (
        <MarkerComponent
          key={data.Label}
          info={data}
          onClick={() => handleClick(data)}
        />
      )
    })

    setMarkers(arr)
    setEmployeeCategories([...uniqueEmployeeCategories])
    setSelectedCategories(initialSelectedCategories)
  }

  useEffect(() => {
    connectToDB()
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const coords = [searchQuery.lat, searchQuery.lon];
      setMapCenter(coords)
    }
  }, [searchQuery]);

  const displayMarkers = () => {
    return markers
      .filter(marker => {
      const markerCoords = [parseFloat(marker.props.info.Lon), parseFloat(marker.props.info.Lat)];
      const markerPoint = point(markerCoords);


      // Check if the marker is inside the search polygon
      if (searchPolygon && searchPolygon.length > 0) {
        const polygonCoordinates = searchPolygon[0].map(coord => [coord.lng, coord.lat]);
        

        // Cierra el anillo lineal agregando la primera coordenada al final
        polygonCoordinates.push(polygonCoordinates[0]);

        // Verifica si hay al menos 4 pares de coordenadas
        if (polygonCoordinates.length >= 4) {

          const poly = polygon([polygonCoordinates]);

          const isInsidePolygon = booleanPointInPolygon(markerPoint, poly);

          return isInsidePolygon;
        }
      }

      // If no search polygon or not enough coordinates, display all markers
      return true;
    })
    .map(marker => {
      return marker;
    });
  }

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const toggleShowControls = () => {
    setShowControls(!showControls)
  }





  const onDrawCreate = (e) => {
    // Obtén la capa del evento
    const layer = e.layer;

    // Aquí puedes manejar la lógica adicional si es necesario
    const latlngs = layer.getLatLngs();
    setSearchPolygon(latlngs)

  };

  useEffect(() => {
    if (mapRef.current) {
      // Check if mapRef.current is available before accessing it
      mapRef.current.on('draw:deleted', () => {
        setSearchPolygon(null);
      });
    }
  }, [mapRef]);


  return (
    <searchContext.Provider value={{ searchQuery, setSearchQuery }}>
      <MapContainer
        center={mapCenter}
        zoom={7.3}
        minZoom={7.3}
        doubleClickZoom={false}
        style={{ height: "100vh", width: "100vw", zIndex: 0 }}
        ref={mapRef}
      >

      <CoordsDisplay />
      <ContourLayer />
      
      
      <LayersControlComponent action={displayMarkers} />

         {/* Agregar el componente GeoJSON */}
        <MyData />

        <MapUpdater center={mapCenter} />
        <SearchBar />
        <ConfigButton onClick={toggleShowControls} />

         {/* FeatureGroup */}
        <FeatureGroup>
          {/* Componente de control de edición para dibujar */}
          <EditControl
            position="bottomright"
            onCreated={onDrawCreate}
            draw={{
              rectangle: false,
              polyline: false,
              circle: false,
              marker: false,
              circlemarker: false,
              polygon: !searchPolygon ? {
                shapeOptions: {
                  color: 'blue', // Color de los polígonos
                },
              } : false,
            }}
            
          />
        </FeatureGroup>
        {showControls && (
          <MapControls
            onlyShowSelected={onlyShowSelected}
            setOnlyShowSelected={setOnlyShowSelected}
            categories={employeeCategories}
            selected={selectedCategories}
            changeCheck={handleCheckboxChange}
          />
        )}
      </MapContainer>
    </searchContext.Provider>
  );
}