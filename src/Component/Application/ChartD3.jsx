import * as d3 from "d3";

class NetGraph {
  containerEl;
  props;
  svg;
  constructor(containerEl, props) {
    this.containerEl = containerEl;
    this.props = props;
    const { width, height } = props;
    this.svg = d3
      .select(containerEl)
      .append("svg")
      .style("background-color", "white")
      .attr("width", width)
      .attr("height", height);
    this.updateDatapoints();
  }

  updateDatapoints = () => {
    const {
      svg,
      props: { data, width, height },
    } = this;
    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .style("fill", "red")
      .attr("cx", () => Math.random() * width)
      .attr("cy", () => Math.random() * height)
      .attr("r", 10)
      .on("mouseup", (d, i) => this.setActiveDatapoint(d,i))
      .on("mousedown",(d, i) => this.mouseDown(d,i))
    //   .on("click", this.mouseClick)
    //   .on("click", function(){
    // 	console.log(this);
    //     d3.select(this)
    //         .attr("fill", 'yellow');
    // })
    // .on("mousedown",(d,i) => this.mouseDown(d,i))
  };

  setActiveDatapoint = (d, i) => {
    console.log("node", d,i);
    d3.select(d.target).style("fill", "yellow");
    this.props.onDatapointClick2(i);
  };

    mouseDown = (d, i) => {
		console.log("node", d);
		d3.select(d.target).style("fill", "blue");
  	// this.props.onDatapointClick(node.target);
    };

  //   mouseUp = () => {
  //     console.log("mouseUp");
  //   };

  //   mouseClick = () => {
  //     console.log("mouseClick");
  // 	// d3.select(node.target).attr("fill", 'yellow')
  // 	// this.props.onDatapointClick(node.target);
  //   };
}
export default NetGraph;
