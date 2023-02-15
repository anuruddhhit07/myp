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
	    <div ref = { netGraphRef }> </div>
	)
}

export default NetGraphContainer