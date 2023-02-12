import React, { useRef, useEffect, Component } from "react";
import * as d3 from "d3";
const data = [
  ["January", 123432, 80342],
  ["February", 19342, 10342],
  ["March", 17443, 15423],
  ["April", 26342, 18432],
  ["May", 34213, 29434],
  ["June", 50321, 45343],
  ["July", 54273, 90002],
  ["August", 60000, 30344],
  ["September", 44432, 32444],
  ["October", 21332, 9974],
  ["November", 79105, 48711],
  ["December", 45246, 21785],
].map((item, i) => {
  return {
    index: i,
    month: item[0],
    revenue: item[1],
    profit: item[2],
  };
});

class Canvss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      margin: { top: 0, bottom: 20, left:20, right: 10 },
      cvwidth: 600,
      cvheight: 500,
    };
    this.canvasRef = React.createRef();
  }
  componentDidMount() {
      const canvas=this.canvasRef.current
    const width =
      this.state.cvwidth - this.state.margin.left - this.state.margin.right;
    const height =
      this.state.cvheight - this.state.margin.top - this.state.margin.bottom;
      
    const context = canvas.getContext("2d");
    this.drawChart(context,width,height);
  }

  drawChart(ctx,width,height) {
    const xScale=d3.scaleLinear().range([0,width]).domain([0,d3.max(data, (d) => d.index)])
    
    //const xaxis=xScale.domain(data.map((d) => d.index))
    
    ctx.translate(this.state.margin.left,this.state.margin.bottom)
    
    ctx.beginPath()
    ctx.moveTo(0,height-this.state.margin.bottom)
    ctx.lineTo(width,height-this.state.margin.bottom)
    ctx.stroke()
    
    data.forEach((d)=>{
      console.log("mylog",d.index,xScale(d.index))
      console.log("exter",width,xScale(11))
      ctx.moveTo( xScale(d.index), height-this.state.margin.bottom );
			ctx.lineTo( xScale(d.index), height-this.state.margin.bottom/2 );
		ctx.stroke();
      
    })
    
    
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, 2 * Math.PI);
    ctx.fill();
    
    // Initialize path
ctx.beginPath();

// Go to the starting coordinate
ctx.moveTo(100, 50);

// Draw 2 segments
ctx.lineTo(300, 50);
ctx.lineTo(200, 370);

// Fill the shape
ctx.fill();
ctx.stroke();
  }

  render() {
    return (
      <>
        <canvas
          className="canvas-container"
          ref={this.canvasRef}
          width={this.state.cvwidth}
          height={this.state.cvheight}
        />
      </>
    );
  }
}

export default Canvss;
