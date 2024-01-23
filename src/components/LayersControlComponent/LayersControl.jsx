import { useState } from "react"
import { Circle, LayerGroup, LayersControl, TileLayer } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import HeatmapLayer from "../HeatmapLayer/HeatmapLayer"
import PopulationLayer from "../PopulationLayer/PopulationLayer"

const LayersControlComponent = ({ markers, mapDivision }) => {

  return (
    <LayersControl position="topleft">
      <TileLayer
        attribution='© OpenStreetMap, © CartoDB'
        url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png"
      />

      <TileLayer
        attribution='© OpenStreetMap, © CartoDB'
        url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
      />
      
      <LayersControl.Overlay name="Tech companies" checked>
        <LayerGroup>
          <MarkerClusterGroup chunkedLoading>
            { markers() }
          </MarkerClusterGroup>
        </LayerGroup>
      </LayersControl.Overlay>

      <PopulationLayer />

      <LayersControl.Overlay name="Heatmap">
        <MarkerClusterGroup chunkedLoading>
          <HeatmapLayer mapDivision={mapDivision} />
        </MarkerClusterGroup>
      </LayersControl.Overlay>

    </LayersControl>
  )
}

export default LayersControlComponent