import React, { useRef, useEffect, Component } from "react";

class Canvss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      margin: { top: 10, bottom: 20, left: 20, right: 20 },
      cvwidth: 500,
      cvheight: 500,
    };
    this.canvasRef = React.createRef();
  }
  componentDidMount() {
      const canvas=this.canvasRef.current
    const width0 =
      this.state.cvwidth - this.state.margin.left - this.state.margin.right;
    const height0 =
      this.state.cvheight - this.state.margin.top - this.state.margin.bottom;
      
    const context = canvas.getContext("2d");
    this.drawChart(context);
  }

  drawChart(ctx) {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(300, 200, 20, 0, 2 * Math.PI);
    ctx.fill();
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
