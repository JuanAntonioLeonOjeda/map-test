import CSVReader from 'react-csv-reader';
import { uploadCsv } from '../services/uploadData';

function Csv() {
  const handleCSVUpload = async (data, fileInfo) => {
    console.log("Data:", data);
    await uploadDataFile(data)
    console.log("File Information:", fileInfo);
  };

  const uploadDataFile = async (data) => {
    try {
      const res = await uploadCsv(data)
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

export default Csv