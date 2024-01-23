import { GeoJSON } from "react-leaflet"
import { useGeoJsonData } from "../../hooks/useGeoJsonData";
import { useEffect, useState } from "react";

const style = {
  opacity: .8, 
  fillOpacity: 0.2,
  color: 'dimGray',
  weight: 2
}

const ContourLayer = ({ mapDivision }) => {
  const data = useGeoJsonData(mapDivision)
  const [key, setKey] = useState(0); // clave única

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [data]);


  // render react-leaflet GeoJSON when the data is ready
  if (data) {
    return (
      <section>
        <GeoJSON 
          data={data} 
          style={style}
          key={key} // Usa la clave única
          />
      </section>
      )
    } else {
      return null;
    }
  };
  
export default ContourLayer