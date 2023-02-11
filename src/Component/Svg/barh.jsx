import React, { Component } from 'react'
import * as d3 from 'd3'

class BarChart extends Component {
    
    constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  
    componentDidMount() {
        this.drawChart();
    }
    drawChart() {
        const data = [12, 5, 6, 6, 9, 10];
    

        const svg = d3.select(this.myRef.current)
                    .append("svg")
                    .attr("width", 700)
                    .attr("height", 300);

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 70)
            .attr("y", (d, i) => 300 - 10 * d)
            .attr("width", 65)
            .attr("height", (d, i) => d * 10)
            .attr("fill", "green");
    }
    render() {
        return <div className={"vis-container"} ref={this.myRef}></div>
    }
}
export default BarChart;
