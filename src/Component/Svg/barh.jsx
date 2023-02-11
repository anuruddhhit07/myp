import React, { Component } from "react";
import * as d3 from "d3";

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      margin: { top: 10, right: 10, bottom: 10, left: 10 },
      leftmargin: 30,
      barwidth: 50,
      bargap: 5,
      bargapy: 50,
      tickheight: 100,
      yscalefactor:3
    };
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.drawChart();
  }
  drawChart() {
    const width = 500 - this.state.margin.left - this.state.margin.right;
    const height = 500 - this.state.margin.top - this.state.margin.bottom;

    const data = [120, 50, 60, 70, 90, 100, 55, 85, 95];
    const datalength = data.length;
    const autobarwidth =
      (width -
        2 * this.state.leftmargin -
        this.state.bargap * (datalength - 1)) /
      datalength;

    const svg = d3
      .select(this.myRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "graph-svg-component");

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr(
        "x",
        (d, i) => this.state.leftmargin + i * (autobarwidth + this.state.bargap)
      )
      .attr("y", (d, i) => height - d*this.state.yscalefactor - this.state.bargapy)
      .attr("width", autobarwidth)
      .attr("height", (d, i) => d*this.state.yscalefactor)
      .attr("fill", "green");

    // Create the scale
    var xScale = d3
      .scaleBand()
      .domain(data) // This is what is written on the Axis: from 0 to 100
      .range([
        this.state.leftmargin,
        this.state.leftmargin +
          autobarwidth * datalength +
          this.state.bargap * (datalength - 1),
      ]); // This is where the axis is placed: from 100px to 800px

    let xAxisGenerator = d3.axisBottom(xScale).tickSize(-this.state.tickheight);
    svg
      .append("g")
      .call(xAxisGenerator)
      .attr("transform", `translate(${0},${height - this.state.bargapy})`);

    var yScale = d3.scaleLinear().domain([120, 0]).range([height-d3.max(data)*this.state.yscalefactor-this.state.bargapy, height-this.state.bargapy]);

    let yAxisGenerator = d3.axisLeft(yScale).tickSize(-width)
    svg.append("g").call(yAxisGenerator)
    .attr("transform",`translate(${this.state.leftmargin},${0})`);

    // Draw the axis
  }
  render() {
    return <div className={"vis-container"} ref={this.myRef}></div>;
  }
}
export default BarChart;
