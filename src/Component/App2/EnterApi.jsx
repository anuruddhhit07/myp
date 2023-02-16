import React from "react";
import {testdata} from "./testdata";
import CanvasContainer from "./ChartCanvas/CanvasContainer";

const EnterApi = () => {
  const dimensions = {
    width: 600,
    height: 300,
    margin: { top: 30, right: 30, bottom: 30, left: 60 },
  };
  const data = testdata;

  return (
  <div>
    <CanvasContainer  dimensions={dimensions} data={data} />
    
    </div>
    
    );
};

export default EnterApi;
