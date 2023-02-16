
import * as d3 from "d3";

import { arraydata } from "../testdata";

let dataset = arraydata();

export default class AxisD3 {
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

    this.svgx = d3.select("#bg").append("g").attr("id", "axis-x");
    this.svgy = d3.select("#bg").append("g").attr("id", "axis-y");

    let xAxisGenerator = d3.axisBottom(xScale);
    let yAxisGenerator = d3.axisLeft(yScale);

    this.svgx.attr("transform", `translate(0, ${height+margin.top})`).call(xAxisGenerator);
    this.svgy.attr("transform", `translate(${margin.left}, ${margin.top})`).call(yAxisGenerator);
    // //   this.updateDatapoints();
  }

  mouseDown = (d, i) => {
    console.log("node", d);
    d3.select(d.target).style("fill", "blue");
    // this.props.onDatapointClick(node.target);
  };
}
