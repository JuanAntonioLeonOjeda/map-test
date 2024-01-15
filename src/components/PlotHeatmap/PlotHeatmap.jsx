import { useEffect, useRef, useState } from "react"
import * as Plot from "@observablehq/plot"
import * as d3 from 'd3'

const PlotHeatmap = () => {
  const containerRef = useRef()
  const [data, setData] = useState(null)
  
  useEffect(() => {
    const fetchData = async () => {
      const loadedData = await d3.dsv(',', "../../../traffic.csv")
      setData(loadedData)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (data) {
      const plot = Plot.plot({
        marginLeft: 120,
        padding: 0,
        y: {label: null},
        color: {scheme: "turbo", legend: true, zero: true},
        marks: [
          Plot.cell(
            data,
            Plot.group(
              {fill: "median"},
              {x: (d) => new Date(parseInt(d.date) * 1000).getUTCHours(), y: "name", fill: "total_2", inset: 0.5, sort: {y: "fill"}}
            )
          )
        ]
      });
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(plot);
    }
  }, [data]);

  return (
    <div ref={containerRef}></div>
  )
}

export default PlotHeatmap