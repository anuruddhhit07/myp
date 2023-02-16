import React, { useState } from "react";
import { testdata } from "./testdata";
import CanvasContainer from "./CanvasContainer/CanvasContainer";
import Collector from "./Collector";
import Chart from "./Chart/Chart";
import Axis from "./Axis/Axis";
import Scaterplot from "./Chart/ScaterPlot"
import useController from "./Controller/Controller";
import * as d3 from "d3";

// const CollectorMemo = React.memo(Collector)

const EnterApi = () => {
  const dimensions = {
    width: 600,
    height: 600,
    margin: { top:20, right: 15, bottom: 20, left: 40 },
  };
  const { width, height, margin = {} } = dimensions;
  const data = testdata;
  console.log(margin);
  const controller = useController({ data, width, height,margin });
  // const { yTickFormat, xScale, yScale, yScaleForAxis } = controller
  d3.selectAll("svg > *").remove()
  return (
    <div>
      {/* <CanvasContainer  dimensions={dimensions} data={data} /> */}
      <Collector dimensions={dimensions} data={data} controller={controller}>
        <Chart msg={"hi Chart 1"} />
        <Axis msg={"hi Axis 1"} />
        <Scaterplot msg={"hii"} />
      </Collector>
    </div>
  );
};

export default EnterApi;
