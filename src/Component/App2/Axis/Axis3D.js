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
    const { yTickFormat, xScale, yScale, xScale0, yScaleForAxis } =
      props.controller;
    console.log(width, height, data, xScale);

    this.height = height;
    this.width = width;
    this.margin = margin;

    this.width_draw = width - margin.left - margin.right;
    this.height_draw = height - margin.top - margin.bottom;

    this.xScale = xScale;
    this.xScale0 = xScale0;
    this.yScale = yScale;

    this.rendorxaxis();
    this.rendoryaxis();
  }

  defineXaxis() {
    let xAxisGenerator = d3.axisBottom(this.xScale);
    return xAxisGenerator;
  }

  defineYaxis() {
    let yAxisGenerator = d3.axisLeft(this.yScale);
    return yAxisGenerator;
  }

  rendorxaxis() {
    // var zoom = d3
    //       .zoom()
    //       .scaleExtent([1, 100])
    //       .translateExtent([
    //         [0, 0],
    //         [this.width, this.height],
    //       ])
    //       .extent([
    //         [0, 0],
    //         [this.width_draw, this.height_draw],
    //       ])
    //       .on("zoom",this.zoomed);

    // let zoom = d3.zoom().on("zoom", zoomed);

    // console.log('asfsdgfd',this.xScale);
    // let xs=this.xScale
    // let xs0=this.xScale0

    let xAxisGenerator = this.defineXaxis();
    this.svgx = d3.select("#focus").append("g").attr("id", "axis-x")
    // .call(zoom);
    this.svgx
      // .attr("transform", `translate(0, ${this.height - this.margin.bottom})`)
      .attr("transform", `translate(0, ${this.height_draw})`)
      .call(xAxisGenerator);

    // function zoomed(event) {
    //   console.log(xs);
    //   var t = event.transform;
    //   xs.domain(t.rescaleX(xs0).domain());
    //   d3.select("axis-x").call(d3.axisBottom(xs));

      // focus.select(".axis--x").call(xAxis);
    // }
  }

  rendoryaxis() {
    let yAxisGenerator = this.defineYaxis();
    this.svgy = d3.select("#focus").append("g").attr("id", "axis-y");
    this.svgy
      // .attr("transform", `translate(${this.margin.left}, ${0})`)
      .call(yAxisGenerator);
  }

  mouseDown = (d, i) => {
    console.log("node", d);
    d3.select(d.target).style("fill", "blue");
    // this.props.onDatapointClick(node.target);
  };
}
