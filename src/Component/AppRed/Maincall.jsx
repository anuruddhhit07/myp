import React, { useEffect, useReducer, useRef, useMemo ,useState} from "react";
import * as d3 from "d3";
import "./styles.scss";
import CanvasDom from "./CanvasDom";
import UseController from "./Controller/Controller";
import { testdata, timesereiohlc } from "./Dummydata/dummydata";
import XAxis from "./xAxis";
import Chart from "./Chart";
import Axis from "./xaxis2";

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
  const  svgRef = useRef();
  const [currentGlobalZoomState, setCurrentGlobalZoomState] = useState(
    d3.zoomIdentity
  );
  const [currentYZoomState, setCurrentYZoomState] = useState(d3.zoomIdentity);
  const [currentXZoomState, setCurrentXZoomState] = useState(d3.zoomIdentity);


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

  console.log("data:", statedata);

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
        .range([0, width - margin.right - margin.left]),
    [xMin, xMax, width,currentXZoomState]
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

  const yMin = useMemo(
    () =>
      d3.min(data, function (d) {
        return Math.min(d.low);
      }),
    [data]
  );
  const yMax = useMemo(
    () =>
      d3.max(data, function (d) {
        return Math.max(d.high);
      }),
    [data]
  );
  const yScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([yMin, yMax])
        .range([height - margin.top - margin.bottom, 0]),
    [height, yMin, yMax,currentXZoomState]
  );
  
  if (currentXZoomState) {
    const newXScale = currentXZoomState.rescaleX(xScale);
    xScale.domain(newXScale.domain());
  }

  if (currentYZoomState) {
    const newYScale = currentYZoomState.rescaleY(yScale);
    yScale.domain(newYScale.domain());
  }

  
  
  useEffect(() => {
      const svg = d3.select(svgRef.current);
    const resetListener = d3.select(".focus");

    // center the action (handles multitouch)
    const center = (event, target) => {
      if (event.sourceEvent) {
        const p = d3.pointers(event, target);
        return [d3.mean(p, (d) => d[0]), d3.mean(p, (d) => d[1])];
      }
      return [width / 2, height / 2];
    };
    
     const zoomGlobal = d3.zoom()
      .scaleExtent([0.1, 500])
      .on("zoom", (event) => {
        console.log("Eventtyy",event.transform);
        const { k: newK, x: newX, y: newY } = event.transform;
        const { k: prevK, x: prevX, y: prevY } = currentGlobalZoomState;
        const point = center(event, svg);

        const isZoomingX =
          point[0] > dimstate.margin.left + 50 && point[0] < width;
        const isZoomingY =
          point[1] > dimstate.margin.top && point[1] < height - 50;

        /* 
          Getting the transformations arguments from the new and the previous
          transforms objects, in order to apply it to currentXZoomState & currentYZoomState
          See https://github.com/d3/d3-zoom#transform_translate
          && https://github.com/d3/d3-zoom#transform_scale for details
        */
        isZoomingX &&
          setCurrentXZoomState(
            currentXZoomState
              .translate((newX - prevX) / prevK, 0)
              .scale(newK / prevK)
          );
        isZoomingY &&
          setCurrentYZoomState(
            currentYZoomState
              .translate(0, (newY - prevY) / prevK)
              .scale(newK / prevK)
          );

        // Keeping track of the previous transform object
        setCurrentGlobalZoomState(event.transform);
      });

    svg.call(zoomGlobal);
    
  },[
    currentXZoomState,
    currentYZoomState,
    currentGlobalZoomState,
    xScale,
    yScale
  ])
  
  
  

  function handleDataClick() {
    dispatch({
      type: "addData",
    });
  }

  function handleDataClick_Increase() {
    dispatchdim({ type: "increment" });
  }

  function handleDataClick_Dcrease() {
    dispatchdim({ type: "decrement" });
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
        svgRef={svgRef}
        dimensions={dimstate}
        dispatchdim={dispatchdim}
        data={statedata.data}
        controller={controller}
      >
        <XAxis dimensions={dimstate} xScale={xScale} data={statedata.data} />
        <Axis scale={xScale} orientation="bottom" ticks={5} />
        <Axis scale={yScale} orientation="left" ticks={5} />
        
         <rect
            className="reset-listening-rect"
               x="0"
                y="0"
                width={dimstate.width-dimstate.margin.left-dimstate.margin.right}
                height={dimstate.height-dimstate.margin.top-dimstate.margin.bottom}
            fill="transparent"
          />
      </Chart>
    </div>
  );
};

export default Maincall;
