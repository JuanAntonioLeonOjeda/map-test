import { useRef, useEffect } from 'react'
import { states } from '../../../data.json'
import * as d3 from 'd3'

const HorizontalBars = () => {
  const chartRef = useRef()

  useEffect(() => {
    if (states) {
      drawChart()
    }
  }, [states])

  const drawChart = () => {
    const svg = d3.select(chartRef.current);
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 1000 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .domain(states.map((d) => d.name_3))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(states, (d) => d.population)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg.selectAll("rect")
    .data(states)
    .enter().append("rect")
    .attr("x", (d) => x(d.name_3))
    .attr("y", (d) => y(d.population))
    .attr("height", (d) => height - y(d.population) - margin.bottom)
    .attr("width", x.bandwidth())
    .attr("fill", "steelblue");

    svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickFormat(d3.format(".2s")))  
  }
  return (
    <section>
      <svg ref={chartRef} width={1000} height={400}></svg>
    </section>
  )
}

export default HorizontalBars

