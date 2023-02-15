import React, { useEffect, useRef ,useState} from "react";
import NetGraph from "./ChartD3.jsx"

const NetGraphContainer2 = ({ data }) => {
	const netGraphRef = useRef(null)
	const [graph, setGraph] = useState(null)

	useEffect(() => {
		if (!graph) {
			setGraph(new NetGraph(netGraphRef.current))
		} else {
			graph.update(data)
		}
	}, [graph, data])

	return (
	    <div ref = { netGraphRef }> hi </div>
	)
}

export default class NetGraphContainer extends React.Component {
 constructor(props) {
   super(props);

   this.myReference = React.createRef();
   this.graph=new NetGraph(this.myReference)
}
componentDidMount(){
	
}

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
