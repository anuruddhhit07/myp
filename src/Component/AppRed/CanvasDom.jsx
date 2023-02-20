import React, { useEffect, useReducer,useRef } from 'react';
import * as d3 from 'd3';
import "./styles.scss";

// const initialState = { data: [] };
// // const initialDimenState = { width: 500,height:400 };

// function reducer(state, action) {
//   switch (action.type) {
//     case 'init':
//       return { data: action.data };
//     case 'addData':
//       return { data: [...state.data, action.data] };
//     default:
//       throw new Error();
//   }
// }

// function dimensionreducer(state, action) {
//     switch (action.type) {
//       case 'init':
//         return { width: 600,height:400 };
//       case 'addData':
//         return { data:{width: 600,height:400} };
//       default:
//         throw new Error();
//     }
//   }


//   function dimensionreducer(state, action) {
//     switch (action.type) {
//       case 'increment':
//         return { width: state.width + 10,height: state.height + 10 };
//       case 'decrement':
//         return { width: state.width - 10,height: state.height - 10 };
//       case 'reset':
//         return { width: 600 ,height:500};
//       default:
//         throw new Error();
//     }
//   }
  


function CanvasDom(props) {
//   const [state, dispatch] = useReducer(reducer, initialState);
  const refElement = useRef(null);
  const dimensions=props.dimensions
  const dispatchdim=props.dispatchdim

  const margin=props.dimensions.margin

  const data=props.data
  console.log(props.children);

  useEffect(() => {

    d3.select("#bg").remove()
    

 
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;

   

    const svg = d3
      .select(refElement.current)
      .classed("svg-container", true)
      .append("svg")
      .attr("id", "bg")
      .classed("mainsvg", true)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height);

    const focus = svg
      .append("g")
      .attr("class", "focus")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("id", "focus")
      
      focus
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height);


      const svgelemnt=d3.select("#bg")
      console.log(svgelemnt);
      

  
  }, [dimensions.width]);



  function handleDataClick_Increase() {
    dispatchdim({ type: 'increment'});
  }

  function handleDataClick_Dcrease() {
    dispatchdim({ type: 'decrement'});
  }

  return (
    <>
      <button onClick={handleDataClick_Increase}>I++</button>
      <button onClick={handleDataClick_Dcrease}>D--</button>
      <div ref={refElement}></div>
    </>
  );
}

export default CanvasDom;
