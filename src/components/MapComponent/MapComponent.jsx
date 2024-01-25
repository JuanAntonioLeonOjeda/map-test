import { useState, useEffect, useRef } from "react"
import { booleanPointInPolygon, point, polygon } from "@turf/turf";
import { MapContainer, FeatureGroup } from "react-leaflet"

import MarkerComponent from "../MarkerComponent/MarkerComponent"
import MapControls from "../MapControls/MapControls"
import ConfigButton from '../ConfigButton/ConfigButton'
import SearchBar from "../SearchBar/SearchBar"
import MapUpdater from "../MapUpdater/MapUpdater"

import searchContext from "../../context/searchContext"

import './MapComponent.css'
import LayersControlComponent from "../LayersControlComponent/LayersControl"
import ContourLayer from "../MapContour/MapContour"
import CoordsDisplay from "../CoordsDisplay/CoordsDisplay"
import { getDataAPI } from "../../services/data"
import DrawComponent from "../DrawComponent/DrawComponent";

export default function MapComponent() {
  const mapRef = useRef()
  const [mapCenter, setMapCenter] = useState([48.6, 9])
  const [markers, setMarkers] = useState([])

  const [selectedCategories, setSelectedCategories] = useState({})
  const [showControls, setShowControls] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [ searchPolygon, setSearchPolygon ] = useState(null)
  const [ onlyShowSelected, setOnlyShowSelected ] = useState(false)
  const [ mapDivision, setMapDivision ] = useState("division3")

  const handleClick = (data) => {
    setMapCenter([data.latitude, data.longitude])
  }

  const connectToDB = async () => {
    const { datas } = await getDataAPI()

    const filteredDatas = datas.map(row => {
       return (
        <MarkerComponent
          key={row.name}
          info={row}
          onClick={() => handleClick(row)}
        />
      )
    })

    setMarkers(filteredDatas)
  }

  useEffect(() => {
    connectToDB()
  }, [])

  useEffect(() => {
    if (searchQuery) {
      console.log(searchQuery)
      const coords = [searchQuery.lat, searchQuery.lon];
      setMapCenter(coords)
    }
  }, [searchQuery]);

  const displayMarkers = () => {
    if(markers) {

      return markers
         .filter(marker => {
          const markerCoords = [parseFloat(marker.props.info.longitude), parseFloat(marker.props.info.latitude)];
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

  return (
    <searchContext.Provider value={{ searchQuery, setSearchQuery }}>
      <MapContainer
        center={mapCenter}
        zoom={2}
        minZoom={8}
        doubleClickZoom={false}
        style={{ height: "100vh", width: "100vw", zIndex: 0 }}
        ref={mapRef}
      >

      <CoordsDisplay />
      <ContourLayer mapDivision={mapDivision} />
      
      
      <LayersControlComponent markers={displayMarkers} mapDivision={mapDivision} />

        <MapUpdater center={mapCenter} />
        <SearchBar />
        <ConfigButton onClick={toggleShowControls} />

         {/* FeatureGroup */}
        <FeatureGroup>
          {/* Componente de control de edición para dibujar */}
        <DrawComponent searchPolygon={searchPolygon} setSearchPolygon={setSearchPolygon}/>

        </FeatureGroup>
        {showControls && (
          <MapControls
            mapDivision={mapDivision}
            setMapDivision={setMapDivision}
            onlyShowSelected={onlyShowSelected}
            setOnlyShowSelected={setOnlyShowSelected}
            selected={selectedCategories}
            changeCheck={handleCheckboxChange}
          />
        )}
      </MapContainer>
    </searchContext.Provider>
  );
}