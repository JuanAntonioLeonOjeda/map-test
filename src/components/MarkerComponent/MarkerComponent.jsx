import { Marker } from "react-leaflet";
import { Icon } from "leaflet"
import PropTypes from 'prop-types'

import PopupComponent from "../PopupComponent/PopupComponent";

export default function MarkerComponent ({ info, onClick }) {
  const lon = parseFloat(info.longitude)
  const lat = parseFloat(info.latitude);

  const icon = new Icon({
    iconUrl: '/marker.svg',
    iconSize: [ 30, 30 ],
    iconAnchor: [ 15, 15 ]
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