import { Circle } from "react-leaflet"
import { getDataAPI } from "../../services/data"
import { useEffect, useState } from 'react'

const PatentsLayer = () => {
    const [datas, setDatas] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await getDataAPI()
            setDatas(result.datas)
        }
        fetchData()
    }, [])

    return (
        <section>
            {datas && datas.map((data, index) => (
                <Circle
                    key={index}
                    center={[data.latitude, data.longitude]}
                    pathOptions={{ fillColor: 'red', stroke: false, fillOpacity: 0.3 }}
                    radius={data.patents * 100}
                />
            ))}
        </section>
    )
}

export default PatentsLayer
