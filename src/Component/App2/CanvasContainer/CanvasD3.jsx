import * as d3 from "d3";

export default class CanvasD3 {
    containerEl;
  props;
  svg;
    
    constructor(containerEl, props) {
        // console.log(containerEl);
        // console.log(props);
        
      this.containerEl = containerEl;
    //   this.props = props;
      const { data,dimensions: { width, height,margin } } = props;
      
      this.svg = d3
        .select(containerEl)
        .append("svg")
        .attr("id", "bg")
        .style("background-color", "white")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height +margin.top + margin.bottom)
    // //   this.updateDatapoints();
    }

}