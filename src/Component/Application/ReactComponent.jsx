import React, { useState, useEffect, useRef } from 'react';
//import D3Component from './D3Component';
import D3Component from './ChartD3'

let vis;

export default function ReactComponent() {
  const [data, setData] = useState(null);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [active, setActive] = useState(null);
  const refElement = useRef(null);

  useEffect(fetchData, []);
   useEffect(handleResizeEvent, []);
  useEffect(initVis, [ data ]);
  // useEffect(updateVisOnResize, [ width, height ]);

  function fetchData() {
    Promise.resolve().then(() => setData(['a', 'b', 'c']));
  }

  function handleResizeEvent() {
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      }, 300);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }

  function initVis() {
    if(data && data.length) {
      const d3Props = {
        data,
        width,
        height,
        onDatapointClick: setActive,
        onDatapointClick2: function(value){ return setActive(value) }
      };
      vis = new D3Component(refElement.current, d3Props);
      console.log('vis',vis);
    }
  }

  function updateVisOnResize() {
    console.log(vis);
    vis && vis.resize(width, height);
  }

  return (
    <div className='react-world'>
      {console.log(active)}
      <div>{active}</div>
      <div ref={refElement}/>
    </div>
  );
}