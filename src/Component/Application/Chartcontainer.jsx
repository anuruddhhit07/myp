import React, { useEffect, useRef ,useState} from "react";
import NetGraph from "./ChartD3.jsx"


export default class NetGraphContainer extends React.Component {
 constructor(props) {
   super(props);

   this.myReference = React.createRef();
  //var graph= NetGraph(this.myReference)
}

componentDidMount() {
   this.update();
 }

update(){
  var graph= NetGraph(this.myReference)
  
}
//componentDidMount(){
//	 NetGraph(this.myReference)
//}

 render() {
   return (
	   <>
	   <h2> Im in Container </h2>
     <div ref={this.myReference}>
     </div>
	 </>
  );
 }
}
