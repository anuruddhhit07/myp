import React, { useEffect, useReducer } from 'react';
import * as d3 from 'd3';

const initialState = { data: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'init':
      return { data: action.data };
    case 'addData':
      return { data: [...state.data, action.data] };
    default:
      throw new Error();
  }
}

function LineChart() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.value));

    const svg = d3.select('svg')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    x.domain(d3.extent(state.data, d => d.date));
    y.domain(d3.extent(state.data, d => d.value));

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));

    svg.append('path')
      .datum(state.data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);
  }, [state.data]);

  function handleDataClick() {
    dispatch({ type: 'addData', data: { date: new Date(), value: Math.random() * 100 } });
  }

  return (
    <div>
      <button onClick={handleDataClick}>Add Data</button>
      <svg width="600" height="400"></svg>
    </div>
  );
}

export default LineChart;
