import styled from "styled-components";
import { H2Title, H3Title } from "../Text/titles";

import { Li, UL } from "../Text/bullet";
import { AText } from "../Text/text";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export default function Reference() {
  return (
    <Container>
      <H2Title>Sources</H2Title>
      <H3Title>Data</H3Title>
      <UL>
        <Li>
          Public Bike Rental History (<AText>link</AText>)
        </Li>
        <Li>
          Public Bike Station Location (<AText>link</AText>)
        </Li>
        <Li>
          Bike Lane Location (<AText>link</AText>)
        </Li>
        <Li>
          Subway Station Location (<AText>link</AText>)
        </Li>
        <Li>
          Land Use (<AText>link</AText>)
        </Li>
      </UL>
      {window.innerWidth > 768 && (
        <>
          <H3Title style={{ marginTop: "30px" }}>Tool</H3Title>
          <UL>
            <Li>(Data Processing) Numpy, Pandas, GeoPandas</Li>
            <Li>(Visualization) Deck.gl</Li>
          </UL>
        </>
      )}
    </Container>
  );
}
