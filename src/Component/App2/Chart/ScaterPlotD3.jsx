
import * as d3 from "d3";

import { arraydata } from "../testdata";

//let dataset = arraydata();

export default class ScaterPlotD3 {
  containerEl;
  props;
  svg;

  constructor(containerEl, props) {
    // console.log(containerEl);
    console.log("asxddis3d", props);
    this.containerEl = containerEl;
    //   this.props = props;
    const {
      msg,
      data,
      dimensions: { width, height, margin },
    } = props;
    const { yTickFormat, xScale, yScale, yScaleForAxis } = props.controller;
    console.log(width, height, data, xScale);

    this.svg = d3.select("#bg").append("g").attr("id", "lineid");
   // this.svgy = d3.select("#bg").append("g").attr("id", "axis-y");

   // let xAxisGenerator = d3.axisBottom(xScale);
    //let yAxisGenerator = d3.axisLeft(yScale);

  //  this.svgx.attr("transform", `translate(0, ${height+margin.top})`).call(xAxisGenerator);
   // this.svgy.attr("transform", `translate(${margin.left}, ${margin.top})`).call(yAxisGenerator);
    // //   this.updateDatapoints();
    this.svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScale(d.time); } )
        .attr("cy", function (d) { return yScale(d.close); } )
        .attr("r", 5)
        //.attr("transform", "translate(" + 100 + "," + 100 + ")")
        .style("fill", "#CC0000")
        
        var line = d3.line()
        .x(function(d) { return xScale(d.time); }) 
        .y(function(d) { return yScale(d.close); }) 
       // .curve(d3.curveMonotoneX)
        
        this.svg.append("path")
        .datum(data) 
        .attr("class", "line") 
        //.attr("transform", "translate(" + 100 + "," + 100 + ")")
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "#CC0000")
        .style("stroke-width", "2");
    
    
  }

  mouseDown = (d, i) => {
    console.log("node", d);
    d3.select(d.target).style("fill", "blue");
    // this.props.onDatapointClick(node.target);
  };
}
