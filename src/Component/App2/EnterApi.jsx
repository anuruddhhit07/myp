import React, {useState} from "react";
import { testdata } from "./testdata";
import CanvasContainer from "./CanvasContainer/CanvasContainer";
import Collector from "./Collector";
import Chart1 from "./Chart/Chart";


// const CollectorMemo = React.memo(Collector)

const EnterApi = () => {
  const dimensions = {
    width: 600,
    height: 300,
    margin: { top: 30, right: 30, bottom: 30, left: 60 },
  };
  const data = testdata;
  const [state, setState] = useState();

  return (
    <div>
      {/* <CanvasContainer  dimensions={dimensions} data={data} /> */}
      <Collector dimensions={dimensions} data={data} 
      // children={() => <Chart1 />}
      
      
      >
        <Chart1 msg={"hi Chart 1"} />
        {/* <Chart1 msg={"hi childeren 2"} /> */}

        {/* <p key='1'>Helloooo </p> */}

        {/* {() => <p key='1'>Helloooo </p>} */}

        {/* <Chart1 /> */}

      </Collector>
    </div>
  );
};

export default EnterApi;
