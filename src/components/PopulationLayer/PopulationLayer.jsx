import { Circle } from "react-leaflet"
import { useEffect, useState } from 'react'
import { useDistrictsCoords } from "../../hooks/useDistrictsCoords"

const PopulationLayer = () => {
    const data = useDistrictsCoords({})

    console.log(data)


    return (
        <section>
            {data && data.map((item, index) => (
                <Circle
                    key={index}
                    center={[item.latitude, item.longitude]}
                    pathOptions={{ fillColor: 'blue', stroke: false }}
                    radius={item.districtPopulation / 500}
                />
            ))}
        </section>
    )
}

export default PopulationLayer
