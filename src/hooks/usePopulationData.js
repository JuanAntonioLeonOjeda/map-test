import { useEffect, useState } from "react"
import { getAtrineoCollectionAPI } from '../services/atrineo'

const usePopulationData = () => {
  const [groupedDataWithDivision3, setGroupedDataWithDivision3] = useState({});
  const [groupedDataWithoutDivision3, setGroupedDataWithoutDivision3] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAtrineoCollectionAPI()
      if (result) {
        const groupedDataWith3 = {};
        const groupedDataWithout3 = {};

        result.collection.data.forEach((item) => {
          const key = item.locationId.division3 ? item.locationId.division3.geojsonId : item.locationId.division1.geojsonId;

          if (item.locationId.division3) {
            groupedDataWith3[key] = groupedDataWith3[key] || { districts: [], totalPopulation: 0 };
            groupedDataWith3[key].districts.push({ name: item.locationId.division4.name, population: item.districtPopulation });
            groupedDataWith3[key].totalPopulation += item.districtPopulation;
          } else {
            groupedDataWithout3[key] = groupedDataWithout3[key] || { districts: [], totalPopulation: 0 };
            groupedDataWithout3[key].districts.push({ name: item.locationId.division4.name, population: item.districtPopulation });
            groupedDataWithout3[key].totalPopulation += item.districtPopulation;
          }
        });

        setGroupedDataWithDivision3(groupedDataWith3);
        setGroupedDataWithoutDivision3(groupedDataWithout3);
      }
    }
    fetchData()
  }, [])

  return { groupedDataWithDivision3, groupedDataWithoutDivision3 };
}

export default usePopulationData;