import { useGeoJsonData } from "../../hooks/useGeoJsonData"
import { Circle, LayersControl, LayerGroup } from "react-leaflet"

const PopulationLayer = () => {

    return (
        <LayersControl.Overlay name="Populations" checked>
            <LayerGroup>
                <Circle
                    center={[48.78, 9.18]}
                    pathOptions={{ fillColor: 'red', stroke: false }}
                    radius={20000} />
                <Circle
                    center={[48.58, 7.75]}
                    pathOptions={{ fillColor: 'red', stroke: false }}
                    radius={15000} />
                <Circle
                    center={[48.48, 9.21]}
                    pathOptions={{ fillColor: 'red', stroke: false }}
                    radius={8000} />
            </LayerGroup>
        </LayersControl.Overlay>
    )
}

export default PopulationLayer