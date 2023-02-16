import * as d3 from "d3";

import { arraydata } from "../testdata";
let dataset=arraydata()

export default class ChartD3 {
    containerEl;
  props;
  svg;
    
    constructor(containerEl, props) {
        // console.log(containerEl);
        // console.log(props);
        
      this.containerEl = containerEl;
    //   this.props = props;
      const {dimensions: { width, height,margin } ,msg} = props;
      console.log(msg);
      console.log(dataset);
      

      this.svg = d3
          .select("#bg")
          .append("g")
          .attr("id", "chart")

          this.svg.selectAll("circle")
          .data(dataset)
          .enter().append("circle")
          .style("stroke", "gray")
          .style("fill", "white")
          .attr("r", 40)
          .attr("cx", function(d, i){return 50 + (i*80)})
          .attr("cy", 120)
          .on("mousedown",(d, i) => this.mouseDown(d,i))

    
    // //   this.updateDatapoints();
    }

    mouseDown = (d, i) => {
		console.log("node", d);
		d3.select(d.target).style("fill", "blue");
  	// this.props.onDatapointClick(node.target);
    };

}