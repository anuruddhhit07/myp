import React from "react";
import { curveCardinal, line } from "d3";

const Line = ({ xScale, yScale, data }) => {
  const lineGenerator = line()
    .x((d, index) => xScale(d.time))
    .y((d) => yScale(d.close))
    .curve(curveCardinal);

  return (
    <g className="line">
      <path
        d={lineGenerator(data)}
        stroke="red"
        style={{
          fill: "none",
          strokeWidth: "3px",
          strokeLinecap: "round"
        }}
      />
    </g>
  );
};

export default Line;