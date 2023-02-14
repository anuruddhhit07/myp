import React, { useRef, Component } from "react";
import "./styles.scss";
import * as d3 from "d3";

import { cdata, cdataohlc, OHLC2 } from "../Utilityfn/fancy";
import { drawSVGCandle, drawSVGCandleohlc } from "./Draw/drawSVGCandle";
import * as _ from "underscore";

export function MyVisComponent() {
  const refElement = useRef(null);

  return (
    <>
      <h1>I am from MyVisComponent </h1>
      <div className="vis-container" ref={refElement}>
        <svg>
          <circle cx={50} cy={50} r={10} fill="red" />
        </svg>
      </div>
    </>
  );
}

export default class svgchart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      margin: { top: 40, right: 20, bottom: 20, left: 40 },
      barwidth: 50,
      bargap: 5,
      tickheight: 100,
      yscalefactor1: 0.4,
      svgwidth: 500,
      svgheight: 500,
    };
    this.myRef = React.createRef();
    //  this.redraw = this.redraw.bind(this)
  }
  componentDidMount() {
    // const data=cdata()
    const data = cdataohlc();
    console.log(data);
    console.log(OHLC2);
    const dataa = Array.from({ length: 100 }, () => [
      100 * Math.random(),
      Math.random(),
    ]);

    this.drawChart(OHLC2);
  }
  drawChart(data) {
    const width = this.state.svgwidth;
    const height = Math.min(this.state.svgwidth * 0.8, 500);
    const svg = d3
      .select(this.myRef.current)
      .append("svg")
      .attr("viewBox", [0, 0, width, height]);
    const vo = svg.append("path");
    const gx = svg.append("g");
    const gy = svg.append("g");
    
    //const dots = svg.append("g")
    const dots = svg.append("g")
    .selectAll("ellipse")
    .data(data)
    .join("ellipse")
      .attr("fill", () => 0);

    
        // find data range
    var xMin = d3.min(OHLC2, function (d) {
      return Math.min(d.time);
    });
    var xMax = d3.max(OHLC2, function (d) {
      return Math.max(d.time);
    });

    var yMin = d3.min(data, function (d) {
      return Math.min(d.low);
    });
    var yMax = d3.max(data, function (d) {
      return Math.max(d.high);
    });

    var x = d3
      .scaleLinear()
     .domain(
       //[xMin,xMax]
       d3.extent(data, function (d,index) {
         return index;
       })
      )
      .range([30, width - 10])
      .nice();

    var y = d3.scaleLinear().domain([yMin, yMax]).range([height, 0]).nice();

    // var x = d3.scaleLinear()
    //.domain(d3.extent(data, d => d[0]))
    //.range([30, width - 10])
    //.nice()

    // var y = d3.scaleLinear()
    // .domain([yMin,yMax])
    //.domain(d3.extent(data, d => d[1]))
    //.range([height - 20, 10])
    // .nice()

    const xAxis = (g, scale) =>
      g
        .attr("transform", `translate(0,${y(yMin)})`)
        .call(d3.axisBottom(scale).ticks(12))
        .call((g) => g.select(".domain").attr("display", "none"));

    const yAxis = (g, scale) =>
      g
        .attr("transform", `translate(${x(0)},0)`)
        .call(d3.axisLeft(scale).ticks(12 * (height / width)))
        .call((g) => g.select(".domain").attr("display", "none"));
        
        
  

    // xAxis(gx,x)
    //yAx
    // z holds a copy of the previous transform, so we can track its changes
    let z = d3.zoomIdentity;

    // set up the ancillary zooms and an accessor for their transforms
    const zoomX = d3.zoom().scaleExtent([0.1, 10]);
    const zoomY = d3.zoom().scaleExtent([0.2, 5]);
    const tx = () => d3.zoomTransform(gx.node());
    const ty = () => d3.zoomTransform(gy.node());
    gx.call(zoomX).attr("pointer-events", "none");
    gy.call(zoomY).attr("pointer-events", "none");

    // active zooming
    const zoom = d3.zoom().on("zoom", function (e) {
      const t = e.transform;
      const k = t.k / z.k;
      const point = center(e, this);

      // is it on an axis? is the shift key pressed?
      const doX = point[0] > x.range()[0];
      const doY = point[1] < y.range()[0];
      const shift = e.sourceEvent && e.sourceEvent.shiftKey;

      if (k === 1) {
        // pure translation?
        doX && gx.call(zoomX.translateBy, (t.x - z.x) / tx().k, 0);
        doY && gy.call(zoomY.translateBy, 0, (t.y - z.y) / ty().k);
      } else {
        // if not, we're zooming on a fixed point
        doX && gx.call(zoomX.scaleBy, shift ? 1 / k : k, point);
        doY && gy.call(zoomY.scaleBy, k, point);
      }

      z = t;

      redraw();
    });
    return svg
      .call(zoom)
      .call(zoom.transform, d3.zoomIdentity.scale(0.8))
      .node();

    function redraw() {
      const xr = tx().rescaleX(x);
      const yr = ty().rescaleY(y);

      gx.call(xAxis, xr);
      gy.call(yAxis, yr);
      
      
      dots
      .attr("cx", function(d,index) {return xr(index)})
      .attr("cy", function(d) {return yr(d.close)})
      .attr("rx", 6 * Math.sqrt(tx().k))
      .attr("ry", 6 * Math.sqrt(ty().k));

      
     // var line = d3
    //  .line()
    //  .x(function (d,index) {
   //     return xr(index) ;
 //     })
  //    .y(function (d) {
   //     return yr(d.close);
   //   });
      
   //   dots.append("path")
   //   .datum(data)
   //   .attr("class", "data-line")
   //   .attr("d", linde)
   //   .style("stroke-width", 1)
  //    .style("stroke", "black")
    //  .style("fill", "None")
      
      

      // dots
      //.attr("cx", d => xr(d[0]))
      // .attr("cy", d => yr(d[1]))
      // .attr("rx", 6 * Math.sqrt(tx().k))
      //.attr("ry", 6 * Math.sqrt(ty().k));

      //  vo.attr(
      //   "d",
      //  d3.Delaunay.from(data.map(d => [xr(d[0]), yr(d[1])]))
      //   .voronoi([35, 0, width, height - 25])
      //  .render()
      //  )
      // .attr("fill", "none")
      // .attr("stroke", "#ccc")
      // .attr("stroke-width", 0.5);
    }

    // center the action (handles multitouch)
  //  function center(event, target) {
  //    if (event.sourceEvent) {
 //       const p = d3.pointers(event, target);
  //      return [d3.mean(p, d => d[0), d3.mean(p, d => d[1])];
      //  return [
        //  d3.mean(p, function (d, index) {
        //    return index;
    //      }),
     //     d3.mean(p, function (d) {
     //       return d.high;
   //       }),
   //     ];
 //     }
   //   return [width / 2, height / 2];
  //  }
  
  function center(event, target) {
    if (event.sourceEvent) {
      const p = d3.pointers(event, target);
      //return [d3.mean(p, d => d[0]), d3.mean(p, d => d[1])];
    }
    return [width / 2, height / 2];
  }
  
  
  
  }

  render() {
    return <div className={"svgcd-container"} ref={this.myRef}></div>;
  }
}
