import styled from "styled-components";
import { H1Title } from "../Text/titles";

import { Description } from "../Text/text";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Chapter = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export default function Title() {
  return (
    <Container>
      <H1Title>
        Communities in
        <br />
        Seoul Public Bike Network
      </H1Title>
      <Chapter>
        <Description>
          When analyzing public bike usage data in a city, the vast amount of
          data can sometimes make the analysis challenging. In such cases,
          breaking the network into manageable segments and analyzing each
          community separately can be more effective. This approach helps
          identify more specific and meaningful patterns, enabling a better
          understanding of usage trends and contributing to more efficient
          resource management and policy development.
        </Description>
        <Description>
          In this context, this project aims to apply the Girvan-Newman
          algorithm for community detection within Seoul's public bike usage
          network. Additionally, we plan to analyze the temporal and spatial
          usage patterns of some of the detected communities.
        </Description>
        <Description style={{ marginTop: "60px" }}>
          (This project is part of the 2024 summer mentorship program at the
          Data Visualization Society.)
        </Description>
      </Chapter>
    </Container>
  );
}
