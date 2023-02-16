import React, { useRef,useEffect } from "react";
import ChartD3 from "./ChartD3";

export default function Chart(props) {
  const { dimensions, msg } = props;
  const refElement = useRef(null);
  // console.log(props);
 
  useEffect(initVis, [ dimensions ]);


 

  function initVis() {
    if(dimensions) {
      const d3Props = {
        msg,
        dimensions,
        // onDatapointClick2: function(value){ return setActive(value) }
      };

      let vis = new ChartD3(refElement.current, d3Props);
      // console.log('vis',vis);
    }
  }

  return (
    <>
   
      {/* <div> {props.msg}</div> */}
      <div ref={refElement} />
    </>
  );
}