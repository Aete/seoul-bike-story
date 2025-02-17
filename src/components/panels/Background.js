import styled from "styled-components";
import { H2Title } from "../Text/titles";
import { Description } from "../Text/text";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Chapter = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export default function Title() {
  return (
    <Container>
      <Chapter>
        <H2Title>Patterns in Public Bike Usage?</H2Title>
        <Description>
          When analyzing public bike usage data in a city, the vast amount of
          information can often make the analysis challenging and complex.
        </Description>
        <Description>
          This project, therefore, began with a fundamental question: 'How can
          we effectively divide the extensive bike-sharing network within the
          city into meaningful sub-networks?'
        </Description>
        {window.innerWidth > 390 && (
          <Description>
            By addressing this question, we aim to uncover insights into bike
            mobility patterns, dynamics, and the relationship between bike usage
            and built environment in Seoul.
          </Description>
        )}
      </Chapter>
    </Container>
  );
}
