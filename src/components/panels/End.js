import styled from "styled-components";
import { H2Title, H3Title } from "../Text/titles";

import { Li, UL } from "../Text/bullet";
import { AText, Description } from "../Text/text";

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

export default function End() {
  return (
    <Container>
      <H2Title>Sources</H2Title>
      <Chapter>
        {" "}
        <H3Title>Data</H3Title>
        <UL>
          <Li>
            Seoul Public Bike Rental History (Jan. 2023 ~ Dec. 2023,{" "}
            <AText>link</AText>)
          </Li>
          <Li>
            Seoul Public Bike Station Information (<AText>link</AText>)
          </Li>
          <Li>
            Seoul Bike Lane Information (<AText>link</AText>)
          </Li>
          <Li>
            Seoul Subway Station Information (<AText>link</AText>)
          </Li>
        </UL>
        <H3Title>Tool</H3Title>
        <UL>
          <Li>(Data Processing) Pandas, GeoPandas</Li>
          <Li>(Visualization) Deck.gl</Li>
        </UL>
      </Chapter>
      <Chapter>
        <H2Title>People</H2Title>
        <Description>
          (This project is part of the 2024 summer mentorship program at the
          Data Visualization Society.)
        </Description>
        <H3Title>Mentee</H3Title>
        <UL>
          <Li>Seunggyun Han</Li>
        </UL>
        <H3Title>Mentor</H3Title>
        <UL>
          <Li>
            Diana MacDonald (
            <AText href="https://didoesdigital.com/">link</AText>)
          </Li>
        </UL>
      </Chapter>
    </Container>
  );
}
