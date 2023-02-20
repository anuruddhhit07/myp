import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./styles.scss"

const LineChart=({svgRef,data,xScale,yScale }) =>{
  const chartRef = useRef(svgRef);
const x= xScale
const y= yScale


  var line = d3
    .line()
    .x(function (d) {
      return x(d.time);
    })
    .y(function (d) {
      return y(d.close);
    });

 // useEffect(() => {
    
    const svg = d3.select(chartRef.current);
   // svg.selectAll("#lc").remove();

   // svg.append("path").datum(data).attr("class", "line").attr("d", line);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x(d.time) - 2;
      })
      .attr("y", function (d) {
        return y(Math.max(d.open, d.close));
      })
      .attr("width", 4)
      .attr("height", function (d) {
        return Math.abs(y(d.open) - y(d.close));
      })
      .attr("fill", function (d) {
        return d.open > d.close ? "red" : "green";
      })
      .attr("id","lc")
 // }, [data,xScale]);

 // return <div ref={chartRef}> </div>;
}

export default LineChart;
