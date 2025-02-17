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
      <Description>
        I calculated routes of various bike trips occuring during the peak time.
        in Magok. This method helps us to simulate which roads will have the
        highest bicycle traffic volume at peak time.
      </Description>
      <Description>
        By breaking down the time intervals further and creating animations, I
        believe it will be possible to predict bicycle traffic flow on a
        minute-by-minute basis.{" "}
        {window.innerWidth > 390 &&
          `This approach offers a powerful tool for
        visualizing and anticipating bicycle movement patterns throughout Magok.`}
      </Description>
    </Container>
  );
}
