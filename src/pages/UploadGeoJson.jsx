import { useState } from 'react';
import { uploadGeojson } from '../services/uploadData';

function UploadGeoJson() {
  const [file, setFile] = useState(null);
  const [geoType, setGeoType] = useState('country');

  const uploadDataFile = async (data, type) => {
    try {
      const res = await uploadGeojson(data , type)
      if(res) {
        console.log(res)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          setFile(jsonData);
          console.log(jsonData);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };

      reader.readAsText(selectedFile);
    }
  };

  const handleRadioChange = (event) => {
    setGeoType(event.target.value);
  };

  const handleSubmit = async () => {
    // Aquí puedes realizar la lógica para enviar el formulario al backend
    console.log('Enviar formulario al backend:', file, geoType);
    await uploadDataFile(file, geoType)
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      
      <div>
        <label>
          <input
            type="radio"
            value="country"
            checked={geoType === 'country'}
            onChange={handleRadioChange}
          />
          País
        </label>
        <label>
          <input
            type="radio"
            value="region"
            checked={geoType === 'region'}
            onChange={handleRadioChange}
          />
          Región
        </label>
        <label>
          <input
            type="radio"
            value="district"
            checked={geoType === 'district'}
            onChange={handleRadioChange}
          />
          Distrito
        </label>
      </div>

      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
}

export default UploadGeoJson;
