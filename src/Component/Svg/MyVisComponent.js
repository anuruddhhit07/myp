import React, { useRef } from 'react';
import "./styles.scss";

export default function MyVisComponent() {
  const refElement = useRef(null);

  return (
    <>
    <h1>I am from MyVisComponent </h1>
    <div id='vis-container' ref={refElement} />

    </>
  );
}