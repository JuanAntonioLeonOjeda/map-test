import PropTypes from 'prop-types'
import { Popup } from "react-leaflet"

export default function PopupComponent({ data }) {
  return (
    <Popup>
      <h3>
        { data.name }
      </h3>
    </Popup>
  )
}

PopupComponent.propTypes = {
  data: PropTypes.object
}

