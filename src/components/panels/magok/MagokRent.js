import styled from "styled-components";
import { H2Title } from "../../Text/titles";
import { Description } from "../../Text/text";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export default function MagokRent() {
  return (
    <Container>
      <H2Title>Rental</H2Title>
      <Description>
        An analysis of the heatmap reveals a significant pattern in the
        bike-sharing system's usage.
      </Description>
      <Description>
        The map on the right is a heat map based on the number of bike rentals.
        The hot spot for bike rentals is located in the center of the district.
        The two subway stations situated in the southern part of the area also
        show relatively high rental activity.
      </Description>
    </Container>
  );
}
