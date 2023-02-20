import React, { useEffect, useReducer, useRef, useMemo } from "react";
import * as d3 from "d3";
import "./styles.scss";
import CanvasDom from "./CanvasDom";
import UseController from "./Controller/Controller";
import { testdata,timesereiohlc } from "./Dummydata/dummydata";
import XAxis from "./xAxis";
import Chart from "./Chart";

// console.log(timesereisdata());

const initialDimenState = {
  width: 500,
  height: 400,
  margin: { top: 20, right: 50, bottom: 25, left: 50 },
};
const initialState = { data: timesereiohlc() };
const scaleState = {
  yTickFormat: null,
  xScale: null,
  xScale0: null,
  yScale: null,
  yScaleForAxis: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "init":
      return { data: action.data };
    case "addData":
      return { data: timesereiohlc() };
    default:
      throw new Error();
  }
}

function dimensionreducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        width: state.width + 10,
        height: state.height + 10,
        margin: state.margin,
      };
    case "decrement":
      return {
        width: state.width - 10,
        height: state.height - 10,
        margin: state.margin,
      };
    case "reset":
      return { width: 600, height: 500, margin: state.margin };
    default:
      throw new Error();
  }
}

function scalereducer(state, action) {
  console.log(state);

  switch (action.type) {
    case "update":
      return { msg: "testdata update" };

    default:
      throw new Error();
  }
}

//   function scalereducer(state, action) {
//     switch (action.type) {
//       case "update":
//         return { msg: "testdata update" };

//       default:
//         throw new Error();
//     }
//   }

const Maincall = () => {
  const refElement = useRef();

  const [dimstate, dispatchdim] = useReducer(
    dimensionreducer,
    initialDimenState
  );
  const [statedata, dispatch] = useReducer(reducer, initialState);
  const controller = null;
  const data = statedata.data;
  const width = dimstate.width;
  const height = dimstate.height;
  const margin = dimstate.margin;

  console.log("data:",statedata);

  // data.forEach(function (d) {
  //   d.time = new Date(d.time * 1000);
  // });

  const xMin = useMemo(
    () =>
      d3.min(data, function (d) {
        return Math.min(d.time);
      }),
    [data]
  );
  const xMax = useMemo(
    () =>
      d3.max(data, function (d) {
        return Math.max(d.time);
      }),
    [data]
  );

  const xScale = useMemo(
    () =>
      d3
        .scaleTime()
        .domain([xMin, xMax])
        .range([0, 300]),
    [xMin, xMax, width]
  );

  const xScale0 = useMemo(
    () =>
      d3
        .scaleTime()
        .domain([xMin, xMax])
        .range([0, width - margin.right]),
    [xMin, xMax, width]
  );

  console.log([xMin, xMax]);

  

  function handleDataClick() {
    dispatch({
      type: "addData",
    });
  }

  function handleDataClick_Increase() {
    dispatchdim({ type: 'increment'});
  }

  function handleDataClick_Dcrease() {
    dispatchdim({ type: 'decrement'});
  }
console.log(xScale);
  return (
    <div>
    <div>
      <button onClick={handleDataClick}>Add data</button>
      <button onClick={handleDataClick_Increase}>I++</button>
      <button onClick={handleDataClick_Dcrease}>D--</button>
      </div>
      <Chart
        svgRef={refElement}
        dimensions={dimstate}
        dispatchdim={dispatchdim}
        data={statedata.data}
        controller={controller}
      >
        <XAxis dimensions={dimstate} xScale={xScale} data={statedata.data} />

        
      </Chart>

      <CanvasDom 
      svgRef={refElement}
      dimensions={dimstate}
      dispatchdim={dispatchdim}
      data={statedata.data}
      controller={controller}
       />


    </div>
  );
};

export default Maincall;
