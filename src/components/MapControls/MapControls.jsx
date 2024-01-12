import { useRef } from 'react'
import { downloadCsv, uploadCsv } from '../../firebase/queries'
import PropTypes from 'prop-types'

import NewMarkerForm from '../NewMarkerForm/NewMarkerForm'

import './MapControls.css'

export default function MapControls ({ categories, selected, changeCheck }) {
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
        <h3>Employees</h3>
        {categories.map((category, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`checkbox-${index}`}
              checked={selected[category]}
              onChange={() => changeCheck(category)}
            />
            <label htmlFor={`checkbox-${index}`}>{category}</label>
          </div>
        ))}
      </div>
      <NewMarkerForm categories={ categories }/>
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
  changeCheck: PropTypes.func
}