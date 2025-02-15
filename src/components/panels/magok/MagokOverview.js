import styled from "styled-components";
import { H2Title } from "../../Text/titles";
import { Description } from "../../Text/text";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export default function MagokOverview() {
  return (
    <Container>
      <H2Title>Community 1: Magok</H2Title>
      <Description>
        Magok District, located adjacent to Gimpo Airport, is one of Seoul's
        newer areas. As a result, it boasts an exceptionally well-developed
        network of bicycle paths (marked in green) compared to other parts of
        the city.
      </Description>
      <Description>
        On the map, subway stations are depicted as white circles. The radius of
        each circle is proportional to the number of subway lines passing
        through that particular station.
      </Description>
    </Container>
  );
}
