import React, { Component } from "react";
import * as d3 from "d3";

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      leftmargin:30,
      barwidth:65,
      bargap:5
    };
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.drawChart();
  }
  drawChart() {
    const width = 500 - this.state.margin.left - this.state.margin.right;
    const height = 500 - this.state.margin.top - this.state.margin.bottom;

    const data = [120, 50, 60, 70, 90, 100];

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
      .attr("x", (d, i) => this.state.leftmargin + i * (this.state.barwidth+this.state.bargap))
      .attr("y", (d, i) => 300 - d - 10)
      .attr("width", this.state.barwidth)
      .attr("height", (d, i) => d)
      .attr("fill", "green");

    const yScale = d3.scaleLinear().range([height, 0]);

    // Create the scale
    var xScale = d3
      .scaleBand()
      .domain(data) // This is what is written on the Axis: from 0 to 100
      .range([this.state.leftmargin, this.state.leftmargin+this.state.barwidth*data.length+this.state.bargap*(data.length-1)]); // This is where the axis is placed: from 100px to 800px

    let xAxisGenerator = d3.axisBottom(xScale).tickSize(-200);
    let xAxis =  svg.append("g")
              .call(xAxisGenerator)
              .attr("transform",`translate(${0},${height - 20})`)

    // Draw the axis

  }
  render() {
    return <div className={"vis-container"} ref={this.myRef}></div>;
  }
}
export default BarChart;
