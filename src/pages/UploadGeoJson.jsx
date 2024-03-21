import { useState } from 'react';
import CSVReader from 'react-csv-reader'
import { uploadGeojson, addCoordinates } from '../services/uploadData';

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

  // const handleFileChange = (event) => {
  //   const selectedFile = event.target.files[0];

  //   if (selectedFile) {
      
  //     const reader = new FileReader();
      
  //     reader.onload = (e) => {
  //       try {
  //         const jsonData = JSON.parse(e.target.result);
  //         setFile(jsonData);
  //         console.log(jsonData);
  //       } catch (error) {
  //         console.error('Error parsing JSON:', error);
  //       }
  //     };

  //     reader.readAsText(selectedFile);
  //   }
  // };

  const handleFileChange = async (data, fileInfo) => {
    console.log("Data:", data);
    setFile(data)
    console.log("File Information:", fileInfo);
  };

  const handleRadioChange = (event) => {
    setGeoType(event.target.value);
  };

  const handleSubmit = async () => {
    // Aquí puedes realizar la lógica para enviar el formulario al backend
    console.log('Enviar formulario al backend:', file, geoType);

    const mapped = file.map(item => {
      if (item.division3?.includes('Kreisfreie')) {
        item.division3 = ''
      }
      return {
        ...item,
        division3: item.division3?.replace(/ a\.d\..*| a\..*| i\..*| am.*/, '')
      }
    })

    await uploadDataFile(mapped, geoType)
  };

  const handleCoords = async () => {
    await addCoordinates(file)
  }

  return (
    <div>
      {/* <input type="file" onChange={handleFileChange} /> */}
      <CSVReader
        onFileLoaded={handleFileChange}
        parserOptions={{ header: true, dynamicTyping: true, skipEmptyLines: true }}
      />
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
            value="division1"
            checked={geoType === 'division1'}
            onChange={handleRadioChange}
          />
          Division 1
        </label>
        <label>
          <input
            type="radio"
            value="division2"
            checked={geoType === 'division2'}
            onChange={handleRadioChange}
          />
          Division 2
        </label>
        <label>
          <input
            type="radio"
            value="division3"
            checked={geoType === 'division3'}
            onChange={handleRadioChange}
          />
          Division 3
        </label>
        <label>
          <input
            type="radio"
            value="division4"
            checked={geoType === 'division4'}
            onChange={handleRadioChange}
          />
          Division 4
        </label>
      </div>

      <button onClick={handleSubmit}>Enviar</button>

      <CSVReader
        onFileLoaded={handleFileChange}
        parserOptions={{ header: true, dynamicTyping: true, skipEmptyLines: true }}
      />
      <button onClick={handleCoords}>Add Coordinates</button>
    </div>
  );
}

export default UploadGeoJson;
