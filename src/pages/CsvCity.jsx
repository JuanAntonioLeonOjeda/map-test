import CSVReader from 'react-csv-reader';
import { uploadCsvCity } from '../services/uploadData';

function CsvCity() {
  const handleCSVUpload = async (data, fileInfo) => {
    console.log("Data:", data);
    await uploadDataFile(data)
    console.log("File Information:", fileInfo);
  };

  const uploadDataFile = async (data) => {
    try {
      const res = await uploadCsvCity(data)
      if(res) {
        console.log(res)
      }
    } catch (error) {
      console.error(error)
    }
  }
  

  return (
    <div>
      <CSVReader
        onFileLoaded={handleCSVUpload}
        parserOptions={{ header: true, dynamicTyping: true, skipEmptyLines: true }}
      />
    </div>
  )
}

export default CsvCity