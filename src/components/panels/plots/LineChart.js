import { useEffect, useRef } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import houlyCount from "../../../utils/data/2023_weekday_count_by_hour.json";

// 스타일 정의
const LineChartContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-top: 50px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function LineChart() {
  const svgRef = useRef();

  useEffect(() => {
    // SVG 설정
    const margin = { top: 60, right: 60, bottom: 50, left: 60 }; // top과 bottom 마진을 더 줌
    const width = window.innerWidth * 0.35 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // x축은 시간(0~23), y축은 이동 수
    const x = d3
      .scaleLinear()
      .domain([0, 23]) // 0시부터 23시까지
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(houlyCount, (d) => d.count)]) // y축은 이동 수
      .range([height, 0]);

    // 라인 생성기
    const line = d3
      .line()
      .x((d) => x(d.rent_hour))
      .y((d) => y(d.count))
      .curve(d3.curveMonotoneX); // 곡선 형태로 그리기

    // SVG 초기화
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // x축 그리기
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(24)); // 24시간을 0~23의 정수로 표현

    // y축 그리기
    svg.append("g").call(d3.axisLeft(y));

    // 라인 그리기
    svg
      .append("path")
      .datum(houlyCount)
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 2)
      .attr("d", line);

    // 데이터 포인트 추가 (원으로 표시)
    svg
      .append("g")
      .selectAll("circle")
      .data(houlyCount)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.rent_hour))
      .attr("cy", (d) => y(d.count))
      .attr("r", 4)
      .attr("fill", "#69b3a2");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10) // x축 아래에 배치
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("fill", "#fff")
      .text("Time (Hour in a Day)");

    // y축 제목 추가
    svg
      .append("text")
      .attr("transform", "rotate(-90)") // y축 제목을 세로로 회전
      .attr("x", -height / 2)
      .attr("y", -margin.left + 10) // y축 왼쪽에 배치
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("fill", "#fff")
      .text("Number of Trips");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", -40)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Trips by Hour in a Day")
      .attr("fill", "#fff");
  }, []);

  return (
    <LineChartContainer>
      <svg ref={svgRef}></svg>
    </LineChartContainer>
  );
}
