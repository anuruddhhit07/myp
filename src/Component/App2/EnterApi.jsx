import React, { useState } from "react";
import { testdata } from "./testdata";
import CanvasContainer from "./CanvasContainer/CanvasContainer";
import Collector from "./Collector";
import Chart from "./Chart/Chart";
import Axis from "./Axis/Axis";
import useController from "./Controller/Controller";
import * as d3 from "d3";

// const CollectorMemo = React.memo(Collector)

const EnterApi = () => {
  const dimensions = {
    width: 600,
    height: 300,
    margin: { top:70, right: 50, bottom: 40, left: 70 },
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
      </Collector>
    </div>
  );
};

export default EnterApi;
