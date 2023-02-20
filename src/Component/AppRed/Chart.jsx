import "./styles.scss";

const Chart = ({svgRef, dimensions, dispatchdim,data,controller, children }) => {
    // console.log(dimstate);
    // console.log(dispatchdim);
    // console.log(data);
    // console.log(controller);
    // console.log(svgRef);

    // console.log(dispatchdim);
    
   // this.focus
  //    .append("rect")
  //    .attr("class", "zoom")
 //     .attr("width", width_draw)
//      .attr("height", height_draw)
 //     .style("fill", "blue")
 //     .style("opacity", .1)
    
  



    return (
<div className="svg-container">
      
      <svg className="mainsvg" id={"bg1"} ref={svgRef} width={dimensions.width} height={dimensions.height}>

        <g className="focus"
          transform={`translate(${dimensions.margin.left}, ${dimensions.margin.top})`}
        >
           <rect x="0" y="0" width={dimensions.width-dimensions.margin.left-dimensions.margin.right} height={dimensions.height-dimensions.margin.top-dimensions.margin.bottom} stroke="blue" fill="purple"
       fill-opacity="0.5" stroke-opacity="0.8"/>

          <defs>
            <clipPath className="clip-path" id="clip">
              <rect
                x="0"
                y="0"
                width={dimensions.width-dimensions.margin.left-dimensions.margin.right}
                height={dimensions.height-dimensions.margin.top-dimensions.margin.bottom}
              />
            </clipPath>
          </defs>

          {children}
        </g>
      </svg>

      </div>
   
    );
  };
  
  export default Chart;