"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { addThousandSeparator } from "../utils";

const BarChartRace = ({ data }: any) => {
  const svgRef: any = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef?.current);
    const width = 500;
    const height = 350;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    svg.attr("width", width).attr("height", height);
    // Scales
    const xScale = d3.scaleLinear().range([margin.left, width - margin.right]);
    const yScale = d3
      .scaleBand()
      .range([margin.top, height - margin.bottom])
      .padding(0.1);

    // Set up initial bars, axes, etc.
    const updateChart = (newData: any) => {
      xScale.domain([0, d3.max(newData, (d) => d?.partyVote)]);
      yScale.domain(newData.map((d: any) => d?.partyName));

      svg
        .selectAll(".bar")
        .data(newData)
        .join("rect")
        .attr("class", "bar")
        .attr("x", xScale(0))
        .attr("y", (d) => yScale(d?.partyName))
        .attr("width", (d) => xScale(d?.partyVote) - xScale(0))
        .attr("height", yScale.bandwidth())
        .attr("fill", (d) => d?.partyColor);

      svg
        .selectAll(".label")
        .enter()
        .data(newData)
        .join("text")
        .attr("class", "label")
        .attr("x", (d) => xScale(d?.partyVote) + 5)
        .attr("y", (d) => yScale(d?.partyName) + yScale.bandwidth() / 2)
        .attr("dy", ".35em")
        .text((d) => `${d?.partyName} (${addThousandSeparator(d?.partyVote)})`);
    };
    // Initial update
    updateChart(data);

    // Animation logic (setInterval, etc.) can be added here
  }, [data]);

  return <svg className="w-full" ref={svgRef}></svg>;
};

export default BarChartRace;
