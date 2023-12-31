import { useState, useEffect, useRef } from "react"
import { MapContainer, TileLayer } from "react-leaflet"

import MarkerComponent from "../MarkerComponent/MarkerComponent"
import MapControls from "../MapControls/MapControls"
import ConfigButton from '../ConfigButton/ConfigButton'
import SearchBar from "../SearchBar/SearchBar"
import MapUpdater from "../MapUpdater/MapUpdater"

import searchContext from "../../context/searchContext"

import { getData } from "../../firebase/queries"

import './MapComponent.css'

export default function MapComponent () {
  const mapRef = useRef()
  const [ mapCenter, setMapCenter ] = useState([ 48.5, 8.5 ])
  const [ markers, setMarkers ] = useState([])
  const [employeeCategories, setEmployeeCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState({})
  const [ showControls, setShowControls ] = useState(false)
  const [ searchQuery, setSearchQuery ] = useState('')

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
          onClick={ () => handleClick(data) }
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
        zoom={8}
        doubleClickZoom={false}
        style={{ height: "100vh", width: "100vw", zIndex: 0 }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater center={mapCenter} />
        <SearchBar />
        {displayMarkers()}
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