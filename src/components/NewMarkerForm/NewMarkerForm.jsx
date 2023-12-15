import { useState } from "react";
import PropTypes from "prop-types";

export default function NewMarkerForm({ categories }) {
  const [markerData, setMarkerData] = useState({
    name: "",
    description: "",
    category: "",
    employees: "",
    coordinates: "",
    address: "",
  });

  const handleChange = (e) => {
    setMarkerData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const selectCategory = (cat) => {
    setMarkerData((prev) => ({ ...prev, employees: cat }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('De locos')
    console.log(markerData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create new marker</h3>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        onChange={handleChange}
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        onChange={handleChange}
      />
      <h3 className="employee-section">Employees</h3>
      <div className="employee-select">
        {categories.map((category, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`radio-${index}`}
              name="EmployeeCategory"
              value={category}
              checked={markerData.employees === category}
              onChange={() => selectCategory(category)}
            />
            <label htmlFor={`radio-${index}`}>{category}</label>
          </div>
        ))}
      </div>
      <h3>Insert Address</h3>
      <input
        defaultValue={markerData.coordinates}
        name="coordinates"
        placeholder="Coordinates (lon,lat)"
        disabled
      />
      {/* <button type="button" onClick={selectFromMap}>
        Select from map
      </button> */}
      <button type="submit">Add Marker</button>
    </form>
  );
}

NewMarkerForm.propTypes = {
  categories: PropTypes.array
}