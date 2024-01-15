import { useEffect, useRef, useState } from "react"
import * as Plot from "@observablehq/plot"
import { states } from '../../../data.json'

const PlotFigure = () => {
  const containerRef = useRef()
  const [data, setData] = useState(states)

  useEffect(() => {
    if (data === undefined) return
    const plot = Plot.plot({
      marginLeft: 120,
      x: {label: "Population", transform: (x) => x},
      y: {label: null},
      marks: [
        Plot.ruleX([0]),
        Plot.tickX(
          states,
          {x: "population", y: "name_3", strokeOpacity: 0.3}
        ),
        Plot.tickX(
          states,
          Plot.groupY(
            {x: "median"},
            {x: "population", y: "name_3", stroke: "red", strokeWidth: 4, sort: {y: "x"}}
          )
        )
      ]
    })
    containerRef.current.innerHTML = '' // Limpia el contenedor antes de agregar el gráfico
    containerRef.current.appendChild(plot)
  }, [data])

  return (
    <div ref={containerRef}></div>
  )
}

export default PlotFigure