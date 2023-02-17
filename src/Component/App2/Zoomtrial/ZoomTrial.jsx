import React, { Component } from "react";
import * as d3 from "d3";
import "./styles.scss";
import { datapluck } from "../testdata";

export default class ZoomTrial extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    const data = datapluck;
    this.update(data);
  }

  update(data) {
    var aa = 154467;
    console.log(data);
    var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");

    data.forEach(function (d) {
      d.Datum = parseDate(d.Datum);
      d.Summe = +d.Summe;
    });

    var svg = d3
      .select(this.myRef.current)
      .append("div")
      .classed("svg-container", true)
      .append("svg")
      .attr("width", 600)
      .attr("height", 400);

    var margin = {
        top: 20,
        right: 20,
        bottom: 130,
        left: 60,
      },
      margin2 = {
        top: 300,
        right: 20,
        bottom: 30,
        left: 60,
      },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      height2 = +svg.attr("height") - margin2.top - margin2.bottom;

    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height);

    var focus = svg
      .append("g")
      .attr("class", "focus")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var context = svg
      .append("g")
      .attr("class", "context")
      .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

    //Zoom & Brush
    var brush = d3
      .brushX()
      .extent([
        [0, 0],
        [width, height2],
      ])
      .handleSize(10);
    //   .on("start brush", brushed)
    //   .on("end", brushended);

    var zoom = d3
      .zoom()
      .scaleExtent([1, 100])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .extent([
        [0, 0],
        [width, height],
      ])
      .on("zoom", zoomed);

    var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");

    var x = d3.scaleTime().range([0, width]),
      x2 = d3.scaleTime().range([0, width]),
      y = d3.scaleLinear().range([height, 0]);
    var y2 = d3.scaleLinear().range([height2, 0]);

    var xAxis = d3.axisBottom(x),
      xAxis2 = d3.axisBottom(x2),
      yAxis = d3.axisLeft(y);

    //Linien
    var line = d3
      .line()
      .x(function (d) {
        console.log("d", d);
        return x(d.Datum);
      })
      //    .y0(height) //nur area-chType
      .y(function (d) {
        return y(d.Summe);
      });
    //    .y1(function(d) { return y(d.Summe); }); //nur area-chType
    var lineType1 = d3
      .line()
      .curve(d3.curveStepAfter)
      .x(function (d) {

        return x(d.Datum);
      })
      .y(function (d) {
        return y(d.Summe);
      });

    // var line2 = d3
    //   .line()
    //   .x(function (d) {
    //     return x2(d.Datum);
    //   })
    //   .y(function (d) {
    //     return y2(d.Summe);
    //   });

    x.domain([
      d3.min(data, function (d) {
        return d.Datum;
      }),
      d3.max(data, function (d) {
        return d.Datum;
      }),
    ]).nice(d3.timeYear);
    y.domain([
      d3.min(data, function (d) {
        return d.Summe;
      }),
      1.1 *
        d3.max(data, function (d) {
          return d.Summe;
        }),
    ]).nice();
    x2.domain(x.domain());
    y2.domain(y.domain());

    //   var dataGroup = d3.group()
    //   .key(function(d) {
    //     return d.Type;
    //   })
    //   .entries(data);
    //   console.log(dataGroup);

    // var dataGroup2 = d3.group(data, d => d.Type)
    // console.log(dataGroup2);

    // var dataGroup = d3.group(data, d => d.Type).get("Type1")
    // console.log(dataGroup);

    const dataGroup = d3.group(data, (d) => d.Type);

    // var aa=dataGroup.get("Type1")
    console.log(dataGroup);

    focus
      .append("rect")
      .attr("class", "zoom")
      .attr("width", width)
      .attr("height", height)
      .call(zoom);

    focus
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    focus.append("g").attr("class", "axis axis--y").call(yAxis);

   

    focus
      .selectAll("path#Type2")
      .data(dataGroup)
      .enter()
      .append("path")
      .filter(function(d) {
        return d[0] == "Type2"
      })
      .attr("class", "data-line")
      .attr("fill", "none")
      .attr("stroke-width", 1.5)
      .attr("d", (d) => line(Array.from(d.values())[1]))
      .attr("id", function(d) {
        return d[0]
      });

      focus
      .selectAll("path#Type1")
      .data(dataGroup)
      .enter()
      .append("path")
      .filter(function(d) {
        return d[0] == "Type1"
      })
      .attr("class", "data-line")
      .attr("fill", "none")
      .attr("stroke-width", 1.5)
      .attr("d", (d) => lineType1(Array.from(d.values())[1]))
      .attr("id", function(d) {
        return d[0]
      });




    // ===Funktionen===

    // function brushed() {
    //     if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
    //     var s = d3.event.selection || x2.range();
    //     x.domain(s.map(x2.invert, x2));
    //     focus.selectAll("path#Type1").attr("d", function(d) {
    //       return lineType1(d.values);
    //     });
    //     focus.selectAll("path#Type2").attr("d", function(d) {
    //       return line(d.values);
    //     });
    //     focus.select(".axis--x").call(xAxis);

    //     setTimeout(function(){
    //       svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
    //         .scale(width / (s[1] - s[0]))
    //         .translate(-s[0], 0));
    //     });
    //   }

    //   function brushcentered() {
    //     var dx = 30, // Use a fixed width when recentering, = ca 2 Monate
    //       cx = d3.mouse(this)[0],
    //       x0 = cx - dx / 2,
    //       x1 = cx + dx / 2;
    //     d3.select(this.parentNode).call(brush.move, x1 > width ? [width - dx, width] : x0 < 0 ? [0, dx] : [x0, x1]);
    //   }

    //   function brushended() {
    //     if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
    //     if (!d3.event.selection) return; // Ignore empty selections.

    //     var d0 = d3.event.selection.map(x2.invert), //=Datum, linker+rechter Brush-Rand
    //       d1 = d0.map(d3.timeMonth.round);

    //     // If empty when rounded, use floor & ceil instead.
    //     if (d1[0] >= d1[1]) {
    //       d1[0] = d3.timeMonth.floor(d0[0]);
    //       d1[1] = d3.timeMonth.offset(d1[0]);
    //     };

    //     var s = d1.map(x2);
    //     setTimeout(function(){
    //       svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
    //         .scale(width / (s[1] - s[0]))
    //         .translate(-s[0], 0));
    //     });
    //   }

    function zoomed(event) {
      //if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return;
      var t = event.transform;
      console.log('object,x',this);
      x.domain(t.rescaleX(x2).domain());
      focus.selectAll("path#Type1").attr("d", function(d) {
        return lineType1(Array.from(d.values())[1])
      });
      focus.selectAll("path#Type2").attr("d", function (d) {
        return line(Array.from(d.values())[1]);
      });
      
      focus.select(".axis--x").call(xAxis);
      //context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
    }
  }

  render() {
    return <div ref={this.myRef}>{/* dfghgfgh */}</div>;
  }
}
