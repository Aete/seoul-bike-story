import { useEffect, useRef } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import countSample from "../../../utils/data/2023_weekday_cluster_count_by_node.json";

const ScatterPlotContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-top: 50px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ScatterPlot() {
  const svgRef = useRef();

  useEffect(() => {
    // SVG를 위한 기본 설정
    const margin = { top: 60, right: 60, bottom: 50, left: 60 }; // top과 bottom 마진을 더 줌
    const width = window.innerWidth * 0.35 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // SVG 초기화
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // x축은 'dist_to_subway' (지하철역과의 거리), y축은 'count'
    const x = d3
      .scaleLinear()
      .domain([0, d3.max(countSample, (d) => d.dist_to_subway)]) // x축 데이터는 dist_to_subway
      .range([0, width]);
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(countSample, (d) => d.count)]) // y축 데이터는 count
      .range([height, 0]);

    // 그래프 제목 추가
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", -40)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Scatterplot of rents vs Distance to Subway Station")
      .attr("fill", "#fff");

    // x축 그리기
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // x축 제목 추가
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Distance to Subway Station (m)")
      .attr("fill", "#fff");

    // y축 그리기
    svg.append("g").call(d3.axisLeft(y));

    // y축 제목 추가
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -height / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("# of rents")
      .attr("fill", "#fff");

    // 데이터 포인트 그리기 (scatter plot)
    svg
      .append("g")
      .selectAll("circle")
      .data(countSample) // 데이터를 직접 사용
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.dist_to_subway))
      .attr("cy", (d) => y(d.count))
      .attr("r", 5)
      .style("fill", "#69b3a2");
  }, []);

  return (
    <ScatterPlotContainer>
      <svg ref={svgRef}></svg>
    </ScatterPlotContainer>
  );
}
