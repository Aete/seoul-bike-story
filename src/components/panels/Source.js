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
          Public Bike Rental History (
          <AText
            href="https://data.seoul.go.kr/dataList/OA-15182/F/1/datasetView.do"
            target="_blank"
          >
            link
          </AText>
          )
        </Li>
        <Li>
          Public Bike Station Location (
          <AText
            href="https://data.seoul.go.kr/dataList/OA-21235/S/1/datasetView.do"
            target="_blank"
          >
            link
          </AText>
          )
        </Li>
        <Li>
          Bike Lane Location (
          <AText
            href="https://map.seoul.go.kr/smgis2/themeGallery/detail?theme_id=1657588761062"
            target="_blank"
          >
            link
          </AText>
          )
        </Li>
        <Li>
          Subway Station Location (
          <AText
            href="https://data.seoul.go.kr/dataList/OA-21232/S/1/datasetView.do"
            target="_blank"
          >
            link
          </AText>
          )
        </Li>
        <Li>
          Land Use (
          <AText
            href="https://www.vworld.kr/dtmk/dtmk_ntads_s002.do?svcCde=NA&dsId=4"
            target="_blank"
          >
            link
          </AText>
          )
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
