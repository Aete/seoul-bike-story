import styled from "styled-components";
import { H2Title } from "../../Text/titles";
import { Description } from "../../Text/text";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export default function MagokFlow() {
  return (
    <Container>
      <H2Title>Flow</H2Title>
      <Description>
        This trend becomes more evident when I drew arches of bike trips between
        bike stations.{" "}
        {window.innerWidth > 768 &&
          `I focused on a subway station in the center of the
        district where is the most popular spot for public bike usage.`}
      </Description>
      <Description>
        During peak hours, bikes rented near the subway station were mostly
        returned in commercial areas. Conversely, bikes returned near the subway
        station were often rented from residential areas on the outskirts of the
        district.
      </Description>
    </Container>
  );
}
