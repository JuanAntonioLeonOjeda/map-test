import CSVReader from 'react-csv-reader';

function Csv() {
  const handleCSVUpload = (data, fileInfo) => {
    console.log("Data:", data);
    console.log("File Information:", fileInfo);
  };
  

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