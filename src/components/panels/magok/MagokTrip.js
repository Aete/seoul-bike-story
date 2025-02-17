import styled from "styled-components";
import { H2Title } from "../../Text/titles";
import { Description } from "../../Text/text";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export default function MagokRoute() {
  return (
    <Container>
      <H2Title>Route</H2Title>
      <Description>////////</Description>
      <Description>/////////////</Description>
    </Container>
  );
}
