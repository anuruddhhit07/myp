import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function LineChart({ data, width, height, margin }) {
  const chartRef = useRef(null);

var line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });
    
    useEffect(()=>{
        
    },[])

svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);

svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function(d) { return x(d.date) - 2; })
    .attr("y", function(d) { return y(Math.max(d.open, d.close)); })
    .attr("width", 4)
    .attr("height", function(d) { return Math.abs(y(d.open) - y(d.close)); })
    .attr("fill", function(d) { return d.open > d.close ? "red" : "green"; });

svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

svg.append("g")
    .call(d3.axisLeft(y));


  return (
    <div> </div>
  );
}

export default Chart;
