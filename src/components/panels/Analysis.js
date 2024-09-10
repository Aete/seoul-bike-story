import styled from "styled-components";

import { H2Title } from "../Text/titles";
import { Description } from "../Text/text";
import { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { analysisPositionState } from "../../atoms/atom";
import ScatterPlot from "./plots/ScatterplotDistCount";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #ccc;
  box-sizing: border-box;
  margin-top: 100px;
`;

export default function AnalysisHub() {
  const setAnalysisPosition = useSetRecoilState(analysisPositionState);

  const analysisRef = useRef();

  useEffect(() => {
    if (analysisRef.current) {
      setAnalysisPosition(
        analysisRef.current.offsetTop - window.innerHeight * 0.4
      );
    }
  }, [analysisRef, setAnalysisPosition]);
  return (
    <Container ref={analysisRef}>
      <H2Title>Analysis 1. Hub</H2Title>
      <Description>
        The heatmap reveals that most cluster hubs are located near subway
        stations, which are represented by white circles on the map, with the
        height of each circle indicating the number of subway lines at that
        station. This suggests that Seoul's public bike-sharing system likely
        serves as a micro-mobility solution to complement public transportation
        like the subway.
      </Description>
      <Description>
        Additionally, the bike lanes displayed as green polylines on the map
        appear to function as key routes connecting the hubs.
      </Description>
      <Description>
        <span style={{ color: "#969696" }}>
          (Explore different clusters by clicking the buttons on the map.)
        </span>
      </Description>
      <Description>
        The graph below illustrates the out-degree of stations within clusters
        in relation to their distance from the nearest subway station.
      </Description>

      <ScatterPlot />
    </Container>
  );
}
