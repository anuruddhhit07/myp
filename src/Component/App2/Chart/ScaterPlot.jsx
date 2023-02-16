import React, { useRef,useEffect } from "react";
import ScaterPlotD3 from "./ScaterPlotD3";


export default function ScaterPlot(props) {
  const { dimensions, data,msg,controller } = props;
  const refElement = useRef(null);
//   console.log('Axis',props);
    
  useEffect(initVis, [ dimensions ]);

  

  function initVis() {
    if(dimensions) {
      const d3Props = {
        msg,
        data,
        dimensions,
        controller
        // onDatapointClick2: function(value){ return setActive(value) }
      };

    //   upseprop=useController1(data,200,300)
    //   console.log(upseprop);
      let vis = new ScaterPlotD3(refElement.current, d3Props);
    //   console.log('vis',vis);
    }
  }

  return (
    <>
   
      {/* <div> {props.msg}</div> */}
      <div ref={refElement} />
    </>
  );
}
