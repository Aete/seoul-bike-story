import * as d3 from "d3";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const LegendContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 40px;
  right: 10px;
  z-index: 2;
  width: 160px;
  height: 50px;
  background-color: rgba(21, 21, 21, 0.5);

  @media screen and (max-width: 768px) {
    top: calc(100% - 100px);
    right: 5px;
  }
`;

export default function ColorLegend() {
  const legendWidth = 100;
  const legendHeight = 8;
  const cScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range(["rgb(209, 46, 71)", "rgb(1,152,189)"]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && !containerRef.current.querySelector("svg")) {
      const margins = { top: 10, right: 30, bottom: 20, left: 30 };
      const svg = d3
        .select(containerRef.current)
        .append("svg")
        .attr("width", legendWidth + margins.left + margins.right) // Add extra width for labels
        .attr("height", legendHeight + margins.top + margins.bottom); // Add extra height for labels

      const defs = svg.append("defs");
      const linearGradient = defs
        .append("linearGradient")
        .attr("id", "linear-gradient");
      const ticks = d3.range(0, 1.01, 0.01);
      linearGradient
        .selectAll("stop")
        .data(ticks)
        .enter()
        .append("stop")
        .attr("offset", (d) => `${d * 100}%`)
        .attr("stop-color", (d) => cScale(d));

      const g = svg
        .append("g")
        .attr("transform", `translate(${margins.left}, ${margins.top})`);

      g.append("rect")
        .attr("x", 0)
        .attr("y", -5)
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .style("fill", "url(#linear-gradient)");

      // Add percentage labels
      const displayTicks = ["Rent", "Return"];

      g.selectAll("text")
        .data(displayTicks)
        .enter()
        .append("text")
        .attr("x", (_, i, n) => (legendWidth * i) / (n.length - 1))
        .attr("y", legendHeight + 15)
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .text((d) => d)
        .attr("fill", "white");
    }
  }, [cScale]);

  return <LegendContainer ref={containerRef}></LegendContainer>;
}
