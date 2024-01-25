import { useRef } from 'react'
import { downloadCsv, uploadCsv } from '../../firebase/queries'
import PropTypes from 'prop-types'

import './MapControls.css'

export default function MapControls ({ selected, changeCheck, onlyShowSelected, setOnlyShowSelected, mapDivision, setMapDivision }) {
  const fileInputRef = useRef(null)

  const handleUpload = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    uploadCsv(file);
  }

  return (
    <div className="controls">
      <p className='text-2xl'>Preferences</p>
      <div className="employee-filter">
        <h3>Tipo de Division en el Mapa</h3>
          <div className='flex flex-col'>
            <label>
              <input
                type="radio"
                name="mapDivision"
                checked={mapDivision == "country" ? true : false}
                onChange={() => setMapDivision("country")}
              />
              Pais
            </label>
            <label>
              <input
                type="radio"
                name="mapDivision"
                checked={mapDivision == "division1" ? true : false}
                onChange={() => setMapDivision("division1")}
              />
              Estados Federados
            </label>
            <label>
              <input
                type="radio"
                name="mapDivision"
                checked={mapDivision == "division2" ? true : false}
                onChange={() => setMapDivision("division2")}
              />
              Distritos/Ciudades independientes
            </label>
            <label>
              <input
                type="radio"
                name="mapDivision"
                checked={mapDivision == "division3" ? true : false}
                onChange={() => setMapDivision("division3")}
              />
              Municipios
            </label>
          </div>
      </div>

      Mostrar solo el seleccionado?
      <div>
        <label>
          <input
            type="radio"
            name="filterShow"
            value={true}
            checked={onlyShowSelected}
            onChange={() => setOnlyShowSelected(true)}
          />
         Si
        </label>

        <label>
          <input
            type="radio"
            name="filterShow"
            value={false}
            checked={!onlyShowSelected}
            onChange={() => setOnlyShowSelected(false)}
          />
          No
        </label>
      </div>
      <div className="control-actions">
        <button onClick={downloadCsv}>Download CSV</button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <button onClick={handleUpload}>Upload CSV</button>
      </div>
    </div>
  );
}

MapControls.propTypes = {
  categories: PropTypes.array,
  selected: PropTypes.object,
  changeCheck: PropTypes.func,
  onlyShowSelected: PropTypes.bool,
  setOnlyShowSelected: PropTypes.func,
}