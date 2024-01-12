import { useState, useEffect, useRef } from "react"
import { MapContainer } from "react-leaflet"

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
        return selectedCategories[marker.props.info.Employees]
      })
      .map(marker => {
        return marker
      })
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
        zoom={7.3}
        minZoom={7.3}
        doubleClickZoom={false}
        style={{ height: "100vh", width: "100vw", zIndex: 0 }}
        ref={mapRef}
      >

      <CoordsDisplay />
      <ContourLayer />
      
      
      <LayersControlComponent action={displayMarkers} />

        <MapUpdater center={mapCenter} />
        <SearchBar />
        <ConfigButton onClick={toggleShowControls} />
        {showControls && (
          <MapControls
            categories={employeeCategories}
            selected={selectedCategories}
            changeCheck={handleCheckboxChange}
          />
        )}
      </MapContainer>
    </searchContext.Provider>
  );
}