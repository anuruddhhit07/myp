import * as d3 from 'd3';

class NetGraph {
	constructor(element,props) {
		//initialize graph
		//let vis = this
		//vis.g = d3.select(element)
		//this.elnode=d3.select(element)
		//this.data=[1,2,4]
		//vis.update()
		//this.update=this.update.bind(this)
	this.svg = d3.select(element).append('svg')
     .attr('class', 'd3')
	 .style('background-color','white')
     .attr('width', props.width)
     .attr('height', props.height);
	const data=[1,2,3]
	
	this.svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .style('fill', 'red')
      .attr('cx', () => Math.random() * props.width)
      .attr('cy', () => Math.random() * props.height)
      .attr('r', 10)
	  
//	this.svg.selectAll("p")
//	.data(dataa)
//	.enter()
//	.append("p")
//	.text(function(d){
//		return "vaule"+ d
//	})
	}
	
	//componentDidMount(){
		//this.update();
//	}
	
	//update the graph when props change
	//update() {
		//let vis = this
		
		//var data = [10, 20, 30];
		
//	this.elnode
//	.selectAll("p")
 //    .data(data)
//     .enter()
//     .append("p")
  //   .text(function(d) {
  //     return "Value is " + d;
 //()     });
	//}
}
export default NetGraph