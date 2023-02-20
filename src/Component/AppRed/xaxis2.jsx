import React, { useEffect, useRef } from "react";
import * as d3 from "d3"

export default function Axis({ scale, orientation, ticks }) {
  const axisRef = useRef(null);

  useEffect(() => {
    const axisGenerator = orientation === "bottom" ? 
      d3.axisBottom(scale) : d3.axisLeft(scale);
    axisGenerator.ticks(ticks);
    
    d3.select(axisRef.current)
      .call(axisGenerator);
  }, [scale, orientation, ticks]);

  return (
    <g ref={axisRef} />
  );
}

//return (
   // <svg width={width} height={height}>
    //  <Axis scale={xScale} orientation="bottom" ticks={10} />
     // <Axis scale={yScale} orientation="left" ticks={5} />
 //   </svg>