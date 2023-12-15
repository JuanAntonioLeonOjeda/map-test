import PropTypes from 'prop-types'
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid"

import './ConfigButton.css'

export default function Button ({ onClick }) {
  return (
    <button className="config-button rounded-lg bg-secondary w-12 h-12" onClick={onClick}>
      <AdjustmentsHorizontalIcon/>
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func
}
