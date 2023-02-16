<ChartCanvas
  ratio={ratio}
  width={width}
  height={400}
  margin={{ left: 80, right: 10, top: 20, bottom: 30 }}
  type={type}
  seriesName="Fruits"
  xExtents={(list) => list.map((d) => d.x)}
  data={data}
  xAccessor={(d) => d.x}
  xScale={scalePoint()}
  padding={1}
>
  <Chart id={1} yExtents={(d) => [0, d.y]}>
    <XAxis axisAt="bottom" orient="bottom" />
    <YAxis axisAt="left" orient="left" />
    <BarSeries yAccessor={(d) => d.y} />
  </Chart>
</ChartCanvas>;



<div style={{ position: "relative", width, height }} className={className} onClick={onSelect}>
<CanvasContainer ref={this.saveCanvasContainerNode}
					type={type}
					ratio={ratio}
					width={width} height={height} zIndex={zIndex}/>

{this.props.children}

</div>


