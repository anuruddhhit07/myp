import React, { useRef } from 'react';
import "./styles.scss";

export default function MyVisComponent() {
  const refElement = useRef(null);

  return (
    <>
    <h1>I am from MyVisComponent </h1>
    <div className= 'vis-container' ref={refElement} >
    <svg>
        <circle cx={50} cy={50} r={10} fill="red" />
      </svg>
      </div>

    </>
  );
}