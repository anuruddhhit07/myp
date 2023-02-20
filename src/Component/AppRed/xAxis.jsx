import React, { useRef, useEffect } from "react";
import { format } from "d3";
import * as d3 from "d3";
// import { useDimensionsContext } from "./Chart";

const XAxis = ({ dimensions, xScale, data }) => {
  const refElement = useRef(null);
  console.log(dimensions);
  console.log(data);
  console.log(data.length);

  //   const numberOfTicks = dimensions.height / 70;
  const numberOfTicks = data.length;
    console.log(numberOfTicks);
  const ticks = xScale.ticks(15);
  const formatTick = format(",");
  console.log(xScale(data[29].time));
  //   console.log(ticks);

  //   let xAxisGenerator = d3.axisBottom(xScale)
  //   console.log(xAxisGenerator);

  //   let xAxisGenerator = d3.axisBottom(xScale)

  //   d3.select(refElement.current).append("g").attr("id", "axis-x")
  //   .attr("transform", `translate(0, ${dimensions.height-dimensions.margin.bottom-dimensions.margin.top})`)
  //   .call(xAxisGenerator);

  return (
    <React.Fragment>
      <div ref={refElement} />
      <g
        className="x-axis"
        transform={`translate(0, ${
          dimensions.height - dimensions.margin.bottom - dimensions.margin.top
        })`}
      >
        <line
          className="x-axis__line"
          stroke="#bdc3c7"
          x2={
            dimensions.width - dimensions.margin.left - dimensions.margin.right
          }
        />

        {data.map((t, idx) => (
          <React.Fragment key={`x-${idx}-${t}-container`}>
            <line
              className="x-axis__tick"
              key={`x-axis__tick-${idx}-${t}`}
              x1={xScale(t.time)}
              x2={xScale(t.time)}
              y1={0}
              y2={10}
              stroke="#bdc3c7"
            />
          </React.Fragment>
        ))}
      </g>
    </React.Fragment>
  );
};

export default XAxis;

// {ticks.map((t, idx) => (
//     <React.Fragment key={`x-${idx}-${t}-container`}>
//       <line
//         className="x-axis__tick"
//         key={`x-axis__tick-${idx}-${t}`}
//         x1={xScale(t)}
//         x2={xScale(t)}
//         y1={0}
//         y2={10}
//         stroke="#bdc3c7"
//       />
//       <text
//         key={`x-axis__tick__label-${idx}-${t}`}
//         className="x-axis__tick__label"
//         transform={`translate(${xScale(t)}, 25)`}
//       >
//         {formatTick(t)}
//         {console.log(t)}
//         {/* {idx} */}
//       </text>
//     </React.Fragment>
//   ))}
