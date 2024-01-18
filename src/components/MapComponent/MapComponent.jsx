import { useState, useEffect, useRef } from "react"
import { booleanPointInPolygon, point, polygon } from "@turf/turf";
import { MapContainer, FeatureGroup } from "react-leaflet"
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

import MarkerComponent from "../MarkerComponent/MarkerComponent"
import MapControls from "../MapControls/MapControls"
import ConfigButton from '../ConfigButton/ConfigButton'
import SearchBar from "../SearchBar/SearchBar"
import MapUpdater from "../MapUpdater/MapUpdater"

import searchContext from "../../context/searchContext"

import { getData } from "../../firebase/queries"

import './MapComponent.css'
import LayersControlComponent from "../LayersControlComponent/LayersControl"
import ContourLayer from "../MapContour/MapContour"
import CoordsDisplay from "../CoordsDisplay/CoordsDisplay"

export default function MapComponent() {
  const mapRef = useRef()
  const [mapCenter, setMapCenter] = useState([48.5, 8.5])
  const [markers, setMarkers] = useState([])
  const [employeeCategories, setEmployeeCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState({})
  const [showControls, setShowControls] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [ searchPolygon, setSearchPolygon ] = useState(null)
  const [ onlyShowSelected, setOnlyShowSelected ] = useState(false)

  const handleClick = (data) => {
    setMapCenter([data.Lat, data.Lon])
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
          const isInsidePolygon = booleanPointInPolygon(markerPoint, polygon([polygonCoordinates]));
          return isInsidePolygon;
        }
      }

      // If no search polygon or not enough coordinates, display all markers
      return true;
    })
    .map(marker => marker );
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

  return (
    <searchContext.Provider value={{ searchQuery, setSearchQuery }}>
      <MapContainer
        center={mapCenter}
        zoom={2}
        minZoom={6}
        doubleClickZoom={false}
        style={{ height: "100vh", width: "100vw", zIndex: 0 }}
        ref={mapRef}
      >

      <CoordsDisplay />
      <ContourLayer />
      
      
      <LayersControlComponent markers={displayMarkers} />

        <MapUpdater center={mapCenter} />
        <SearchBar />
        <ConfigButton onClick={toggleShowControls} />

         {/* FeatureGroup */}
        <FeatureGroup>
          {/* Componente de control de edición para dibujar */}
          <EditControl
            position="bottomright"
            onCreated={onDrawCreate}
            onDeleted={() => {
              setSearchPolygon(null);
            }}
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