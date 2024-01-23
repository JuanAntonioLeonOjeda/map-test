import { Marker } from "react-leaflet";
import PropTypes from 'prop-types'
import { Icon } from "leaflet"

import PopupComponent from "../PopupComponent/PopupComponent";

export default function MarkerComponent ({ info, onClick }) {
  const lon = parseFloat(info.Lon)
  const lat = parseFloat(info.Lat);

  const icon = new Icon({
    iconUrl: '/marker.svg',
    iconAnchor: [ 50, 50 ]
  })

  return (
    <Marker position={[lat, lon]} eventHandlers={{ click: onClick }} icon={ icon }>
      <PopupComponent data={ info }/>
    </Marker>
  )
}

MarkerComponent.propTypes = {
  info: PropTypes.object,
  onClick: PropTypes.func
}