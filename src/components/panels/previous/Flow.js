import styled from "styled-components";

import { H2Title } from "../../Text/titles";
import { Description } from "../../Text/text";
import { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { flowPositionState } from "../../../atoms/atom";
import LineChart from "../plots/LineChart";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #ccc;
  box-sizing: border-box;
  margin-top: 100px;
`;

export default function Flow() {
  const setflowPosition = useSetRecoilState(flowPositionState);

  const flowRef = useRef();

  useEffect(() => {
    if (flowRef.current) {
      setflowPosition(flowRef.current.offsetTop - window.innerHeight * 0.4);
    }
  }, [flowRef, setflowPosition]);
  return (
    <Container ref={flowRef}>
      <H2Title>Analysis 2. Flow</H2Title>
      <Description>
        An analysis of movement within the clusters shows that peak activity
        occurs during commuting hours. Comparing this with the cluster hub
        analysis suggests that citizens are likely using public bikes as a
        complementary mode of transportation to the subway, particularly for
        commuting purposes.
      </Description>
      <LineChart />
    </Container>
  );
}
