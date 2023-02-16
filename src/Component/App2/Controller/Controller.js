import { useMemo } from "react";
import * as d3 from "d3";
 
const useController = ({ data, width, height,margin }) => {
  const xMin = useMemo(
    () => d3.min(data, function (d) {
      return Math.min(d.time);
    }),
    [data]
  );
  const xMax = useMemo(
    () => d3.max(data, function (d) {
      return Math.max(d.time);
    }),
    [data]
  );

  const xScale = useMemo(
    () => d3.scaleTime().domain([xMin, xMax]).range([margin.left, width-margin.right]),
    [xMin, xMax, width]
  );


  const yMin = useMemo(
    () => d3.min(data, function (d) {
      return Math.min(d.low);
    }),
    [data]
  );
  const yMax = useMemo(
    () => d3.min(data, function (d) {
      return Math.min(d.high);
    }),
    [data]
  );
  const yScale = useMemo(() => {
    const indention = (yMax - yMin) * 0.5;
    return d3.scaleLinear()
      .domain([yMin - indention, yMax + indention])
      .range([height, 0]);
  }, [height, yMin, yMax]);


  const yScaleForAxis = useMemo(
    () => d3.scaleBand().domain([yMin, yMax]).range([height-margin.bottom, margin.top]),
    [height, yMin, yMax]
  );
  const yTickFormat = (d) =>
    `${parseFloat(d) > 0 ? "+" : ""}${d3.format(".2%")(d / 100)}`;
 
  return {
    yTickFormat,
    xScale,
    yScale,
    yScaleForAxis
  };
};
 
export default useController;