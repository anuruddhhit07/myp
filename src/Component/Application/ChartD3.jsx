import * as d3 from 'd3';

class NetGraph {
	constructor(element) {
		//initialize graph
		let vis = this
		vis.g = d3.select(element)
		vis.update()
	}
	//update the graph when props change
	update() {
		let vis = this
	}
}
export default NetGraph