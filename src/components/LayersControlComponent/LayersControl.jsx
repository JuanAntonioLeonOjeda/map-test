import { Circle, LayerGroup, LayersControl, TileLayer } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import HeatmapLayer from "../HeatmapLayer/HeatmapLayer"

const LayersControlComponent = ({ markers }) => {
  return (
    <LayersControl position="topleft">
      <TileLayer
        attribution='© OpenStreetMap, © CartoDB'
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
      />

      <TileLayer
        attribution='© OpenStreetMap, © CartoDB'
        url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
      />
      <LayersControl.Overlay name="Tech companies">
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
          <HeatmapLayer />
        </MarkerClusterGroup>
      </LayersControl.Overlay>

    </LayersControl>
  )
}

export default LayersControlComponent