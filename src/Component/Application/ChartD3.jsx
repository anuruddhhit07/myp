import * as d3 from 'd3';

class NetGraph {
	constructor(element) {
		//initialize graph
		let vis = this
		vis.g = d3.select(element)
		this.elnode=d3.select(element)
		//this.data=[1,2,4]
		//vis.update()
		//this.update=this.update.bind(this)
	}
	componentDidMount(){
		this.update();
	}
	
	//update the graph when props change
	update() {
		//let vis = this
		
		var data = [10, 20, 30];
		
	this.elnode
	.selectAll("p")
     .data(data)
     .enter()
     .append("p")
     .text(function(d) {
       return "Value is " + d;
      });
	}
}
export default NetGraph