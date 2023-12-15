import PropTypes from 'prop-types'
import { Popup } from "react-leaflet"

export default function PopupComponent({ data }) {
  return (
    <Popup>
      <h3>
        { data.Label }
      </h3>
      <p>
        { data.Description }
      </p>
    </Popup>
  )
}

PopupComponent.propTypes = {
  data: PropTypes.object
}

