import { useState } from "react"
import { Circle, LayerGroup, LayersControl, TileLayer } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import HeatmapLayer from "../HeatmapLayer/HeatmapLayer"

const LayersControlComponent = ({ markers, mapDivision }) => {

  return (
    <LayersControl position="topleft">
      <TileLayer
        attribution='© OpenStreetMap, © CartoDB'
        url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png"
      />

      {/* <TileLayer
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

      <LayersControl.Overlay name="Populations">
        <LayerGroup>
          <Circle
            center={[48.78, 9.18]}
            pathOptions={{ fillColor: 'blue', stroke: false }}
            radius={20000} />     
          <Circle
            center={[48.58, 7.75]}
            pathOptions={{ fillColor: 'blue', stroke: false }}
            radius={15000} />
          <Circle
            center={[48.48, 9.21]}
            pathOptions={{ fillColor: 'blue', stroke: false }}
            radius={8000} />
        </LayerGroup>
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Heatmap" checked>
        <MarkerClusterGroup chunkedLoading>
          <HeatmapLayer mapDivision={mapDivision} />
        </MarkerClusterGroup>
      </LayersControl.Overlay>

    </LayersControl>
  )
}

export default LayersControlComponent