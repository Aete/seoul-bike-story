import styled from "styled-components";
import { H1Title, H2Title, H3Title } from "../Text/titles";
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

export default function Header() {
  return (
    <Container>
      <H1Title>Seoul Public Bike Vizualization</H1Title>
      <Chapter>
        <H3Title>Data</H3Title>
        <UL>
          <Li>
            Seoul Public Bike Rental History (Jul. 2022 ~ Dec. 2022,{" "}
            <AText>link</AText>)
          </Li>
          <Li>
            Seoul Public Bike Station Information (<AText>link</AText>)
          </Li>
          <Li>
            Building Usability Dataset (<AText>link</AText>)
          </Li>
        </UL>
      </Chapter>
      <Chapter>
        <H3Title>Tool</H3Title>
        <UL>
          <Li>(Data Processing) Pandas, GeoPandas</Li>
          <Li>(Route Finding) Kakao Map API</Li>
          <Li>(Visualization) Deck.gl</Li>
        </UL>
      </Chapter>
      <Chapter>
        <H3Title>Researchers</H3Title>
        <UL>
          <Li>Seunggyun Han</Li>
          <Li>Woowon Jung</Li>
        </UL>
      </Chapter>
    </Container>
  );
}
