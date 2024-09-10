import styled from "styled-components";

import { H2Title } from "../Text/titles";
import { Description } from "../Text/text";
import { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { communityPositionState } from "../../atoms/atom";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #ccc;
  box-sizing: border-box;
  margin-top: 100px;
`;

export default function Community() {
  const setCommunityPosition = useSetRecoilState(communityPositionState);

  const communityRef = useRef();

  useEffect(() => {
    if (communityRef.current) {
      setCommunityPosition(
        communityRef.current.offsetTop - window.innerHeight * 0.15
      );
    }
  }, [communityRef, setCommunityPosition]);

  return (
    <Container ref={communityRef}>
      <H2Title>Community Detection</H2Title>
      <Description>
        The communities were classified using the Girvan-Newman method as
        follows:{" "}
      </Description>
      <Description>
        - The bicycle trip network was converted into a weighted undirected
        graph (where the edge weight represents the number of trips between
        stations).
        <br />
        - To speed up the computation, trips between stations with a frequency
        of 8 or fewer were removed.
        <br />
        - Using edge betweenness centrality, edges were removed one by one in
        each iteration.
        <br />
        - Modularity was calculated at each iteration, and the combination with
        the highest value was selected.
        <br />
      </Description>
      <Description>
        A total of 130 communities were identified, and the top 20 were
        visualized based on the number of trips between stations.
        <br />
      </Description>
    </Container>
  );
}
