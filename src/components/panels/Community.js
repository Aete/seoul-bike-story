import styled from "styled-components";
import { H2Title } from "../Text/titles";
import { Description } from "../Text/text";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export default function Community() {
  return (
    <Container>
      <H2Title>Community Detection</H2Title>
      <Description>
        To divide the entire network into meaningful segments, I adopted the
        concept of 'Community Detection' from Network Science. The Louvain
        method was applied to identify communities within the public bike
        network.
      </Description>
      {window.innerWidth > 768 && (
        <Description>
          A total of 83 communities were identified, and the top 10 were
          visualized based on the number of trips between bike stations. A
          community within Magok district was found to have the highest trip
          volume. Yeongdeungpo and Mok-dong were also identified as strong
          communities.
        </Description>
      )}
      <Description>
        For this project, I focused on analyzing the three communities with the
        highest trip volumes.
      </Description>
    </Container>
  );
}
