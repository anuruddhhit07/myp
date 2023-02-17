import React, { Component, useEffect, useState, useRef } from "react";
import CanvasD3 from './CanvasD3'
import PropTypes from "prop-types";

export default function CanvasContainer(props) {
  const { dimensions, data } = props;
  const [datael, setData] = useState(null);
  const [width, setWidth] = useState(dimensions.width);
  const [height, setHeight] = useState(dimensions.height);
  const [active, setActive] = useState(null);
  const refElement = useRef(null);

  useEffect(fetchData, []);
  useEffect(initVis, [ dimensions ]);


  function fetchData() {
    Promise.resolve().then(() => setData(data));
  }

  function initVis() {
    if(dimensions) {
      const d3Props = {
        data,
        dimensions,
        onDatapointClick2: function(value){ return setActive(value) }
      };

      let vis = new CanvasD3(refElement.current, d3Props);
    //   console.log('vis',vis);
    }
  }

  

  return (
    <>
   
      {/* <div> hello</div> */}
      <div ref={refElement} />
    </>
  );
}

// CanvasContainer.propTypes = {
//     name: PropTypes.string.isRequired
//   }
