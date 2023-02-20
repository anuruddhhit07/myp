import "./styles.scss";

const Chart = ({svgRef, dimensions, dispatchdim,data,controller, children }) => {
    // console.log(dimstate);
    // console.log(dispatchdim);
    // console.log(data);
    // console.log(controller);
    // console.log(svgRef);

    // console.log(dispatchdim);
    
  



    return (
<div className="svg-container">
      
      <svg className="mainsvg" id={"bg1"} ref={svgRef} width={dimensions.width} height={dimensions.height}>

        <g className="focus"
          transform={`translate(${dimensions.margin.left}, ${dimensions.margin.top})`}
        >
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