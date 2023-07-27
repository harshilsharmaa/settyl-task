import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data, width, height }) => {
  // console.log(data);
  const svgRef = useRef();

  useEffect(() => {
    // Remove any previous chart before rendering a new one
    d3.select(svgRef.current).selectAll('*').remove();

    // Set up the D3 chart
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Define the margins and chart area
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Parse the date strings to Date objects
    const parseDate = d3.timeParse('%Y-%m-%d');
    data.forEach(d => {
      d.label = parseDate(d.label);
    });

    // Create scales for x and y axes
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.label))
      .range([0, chartWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)])
      .range([chartHeight, 0]);

    // Create line generator
    const line = d3.line()
      .x(d => xScale(d.label))
      .y(d => yScale(d.count));

    // Create chart group
    const chart = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Draw the line
    chart.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line);

    // Draw x-axis
    const xAxis = d3.axisBottom(xScale);
    chart.append('g')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(xAxis);

    // Draw y-axis
    const yAxis = d3.axisLeft(yScale);
    chart.append('g')
      .call(yAxis);
  }, [data, width, height]);

  return <svg ref={svgRef}></svg>;
};

export default LineChart;