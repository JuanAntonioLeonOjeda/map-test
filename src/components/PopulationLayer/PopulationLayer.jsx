import { Circle } from "react-leaflet"
import { getDataAPI } from "../../services/data"
import { useEffect, useState } from 'react'
import { getDivision3DataAPI } from "../../services/division3"
import { getDivision4DataAPI } from "../../services/division4"

const PopulationLayer = () => {
    const [datas, setDatas] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await getDataAPI()
            setDatas(result.datas)
        }
        fetchData()
    }, [])

    //////////////////////////////////////////////

    const [division3, setDivision3] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await getDivision3DataAPI()
            setDivision3(result)
        }
        fetchData()
    }, [])

    ///////////////////////////////////////////////////
    
    const [division4, setDivision4] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await getDivision4DataAPI()
            setDivision4(result)
        }
        fetchData()
    }, [])

    const districtNames = [...new Set(division4.map(item => item.name))]
    const districtPopulation = division4 && division4.map(item => item.districtPopulation)

    // console.log(districtNames)
    console.log(districtPopulation)

    return (
        <section>
            {datas && datas.map((data, index) => (
                <Circle
                    key={index}
                    center={[data.latitude, data.longitude]}
                    pathOptions={{ fillColor: 'blue', stroke: false }}
                    radius={data.districtPopulation / 500}
                />
            ))}
        </section>
    )
}

export default PopulationLayer
