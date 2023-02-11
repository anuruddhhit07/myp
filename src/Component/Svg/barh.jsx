import React, { Component } from "react";
import * as d3 from "d3";

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      margin: { top: 10, right: 50, bottom: 50, left: 30 },
      barwidth: 50,
      bargap: 5,
      tickheight: 100,
      yscalefactor: 4,
      svgwidth: 600,
      svgheight: 600,
    };
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.drawChart();
  }
  drawChart() {
    const width =
      this.state.svgwidth - this.state.margin.left - this.state.margin.right;
    const height =
      this.state.svgheight - this.state.margin.top - this.state.margin.bottom;

    const data = [120, 50, 60, 70, 90, 100, 55, 85, 95];
    const datalength = data.length;
    const autobarwidth =
      (width - this.state.bargap * (datalength - 1)) / datalength;

    const xAxislength =
      autobarwidth * datalength + this.state.bargap * (datalength - 1);
    const yAxislength = d3.max(data) * this.state.yscalefactor;
    const svg = d3
      .select(this.myRef.current)
      .append("svg")
      .attr("width", width + this.state.margin.left + this.state.margin.right)
      .attr("height", height + this.state.margin.top + this.state.margin.bottom)
      .attr("class", "graph-svg-component")
      .append("g")
      .attr(
        "transform",
        `translate(${this.state.margin.left}, ${this.state.margin.top})`
      );

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * (autobarwidth + this.state.bargap))
      .attr("y", (d, i) => height - d * this.state.yscalefactor)
      .attr("width", autobarwidth)
      .attr("height", (d, i) => d * this.state.yscalefactor)
      .attr("fill", "green");

    // Create the scale
    var xScale = d3
      .scaleBand()
      .domain(data) // This is what is written on the Axis: from 0 to 100
      .range([0, xAxislength]); // This is where the axis is placed: from 100px to 800px

    let xAxisGenerator = d3.axisBottom(xScale).tickSize(-yAxislength);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxisGenerator);

    var yScale = d3
      .scaleLinear()
      .domain([d3.max(data), 0])
      .range([this.state.margin.top + this.state.margin.bottom, height]);

    let yAxisGenerator = d3.axisLeft(yScale).tickSize(-xAxislength);
    svg.append("g").call(yAxisGenerator);

    // Draw the axis
  }
  render() {
    return <div className={"vis-container"} ref={this.myRef}></div>;
  }
}
export default BarChart;
