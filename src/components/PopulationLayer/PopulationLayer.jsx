import { Circle } from "react-leaflet"
import { useEffect, useState } from 'react'
import { getAtrineoCollectionAPI } from "../../services/atrineo"

const PopulationLayer = () => {
    const [collection, setCollection] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAtrineoCollectionAPI()
            setCollection(result.collection)
        }
        fetchData()
    }, [])

    return (
        <section>
{/*             {datas && datas.map((data, index) => (
                <Circle
                    key={index}
                    center={[data.latitude, data.longitude]}
                    pathOptions={{ fillColor: 'blue', stroke: false }}
                    radius={data.districtPopulation / 500}
                />
            ))} */}
{/*             {collection && collection.map((data, index) => {
                <Circle
                    key={index}
                    center={[data.latitude, data.longitude]}
                    pathOptions={{ fillColor: 'blue', stroke: false }}
                    radius={data.districtPopulation / 500}
                />
            })} */}
        </section>
    )
}

export default PopulationLayer
