import styled from "styled-components";
import { H2Title } from "../../Text/titles";
import { Description } from "../../Text/text";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export default function MagokReturn() {
  return (
    <Container>
      <H2Title>Hot spots: Return</H2Title>
      <Description>
        Otherwise, let's see a heat map of the number of bike returns. The heat
        map of bike returns shows active returns around subway stations and in
        business areas during morning peak hours.
      </Description>
      <Description>
        This suggests a mixed pattern in Magok during peak times: 1) trips from
        residential areas to subway stations, and 2) trips from subway stations
        to business areas
        {window.innerWidth > 390 && (
          <span>
            , indicating the system's role in facilitating last-mile
            connectivity for commuters
          </span>
        )}
        .
      </Description>
    </Container>
  );
}
