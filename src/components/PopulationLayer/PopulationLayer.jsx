import { Circle } from "react-leaflet"
import { useDistrictsCoords } from "../../hooks/useDistrictsCoords"

const PopulationLayer = () => {
    const data = useDistrictsCoords({})

    return (
        <section>
            {data && data.map((item, index) => (
                <Circle
                    key={index}
                    center={[item.latitude, item.longitude]}
                    pathOptions={{ fillColor: 'orange', stroke: false, fillOpacity: 0.6 }}
                    radius={item.districtPopulation / 500}
                />
            ))}
        </section>
    )
}

export default PopulationLayer
