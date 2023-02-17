import * as d3 from "d3";
import "./styles.scss";

export default class CanvasD3 {
  containerEl;
  props;
  svg;

  constructor(containerEl, props) {
    // console.log(containerEl);
    console.log("props", props);
    this.props = props;
    this.containerEl = containerEl;
    //   this.props = props;
    const {
      dimensions: { width, height, margin },
      controller:{xScale,xScale0},
    } = props;

    this.xScale=xScale.copy()
    this.xScale0=xScale0.copy()
    console.log(xScale,xScale0);
    


   


    this.svg = d3
      .select(containerEl)
      .append("div")
      .classed("svg-container", true)
      .append("svg")
      .attr("id", "bg")
      .attr("width", width)
      .attr("height", height);

    var width_draw = width - margin.left - margin.right;
    var height_draw = height - margin.top - margin.bottom;

    this.svg
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", width_draw)
      .attr("height", height_draw);

    this.focus = this.svg
      .append("g")
      .attr("class", "focus")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("id", "focus")

      var zoom = d3
      .zoom()
      .scaleExtent([1, 100])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .extent([
        [0, 0],
        [width_draw, height_draw],
      ])
      .on("zoom", this.zoomed);


      this.focus
      .append("rect")
      .attr("class", "zoom")
      .attr("width", width_draw)
      .attr("height", height_draw)
      .style("fill", "blue")
      .style("opacity", .1)
      // .call(zoom);
      

    
      console.log('AAAAA',xScale,xScale0);

      // this.update()
  }

  update() {
    // const {
    //   dimensions: { width, height, margin },
    //   controller:{xScale,xScale0},
    // } = this.props;

    console.log(this.xScale);
    console.log(this.xScale0);
  }

  zoomed(event) {
    

    // if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return;
    var t = event.transform;
    console.log('dfgfd',this.xScale);
    this.xScale.domain(t.rescaleX(this.xScale0).domain());
    // focus.selectAll("path#Type1").attr("d", function(d) {
    //   return lineType1(Array.from(d.values())[1])
    // });
    // focus.selectAll("path#Type2").attr("d", function (d) {
    //   return line(Array.from(d.values())[1]);
    // });

    // this.focus.select(".axis--x").call(d3.axisBottom(this.xScale));
    // context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
  }
}
