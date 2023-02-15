import React, { useEffect, useRef ,useState} from "react";
import NetGraph from "./ChartD3.jsx"

const NetGraphContainer = ({ data }) => {
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

export default NetGraphContainer