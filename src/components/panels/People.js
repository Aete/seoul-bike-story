import styled from "styled-components";
import { H2Title } from "../Text/titles";
import { AText, Description } from "../Text/text";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export default function People() {
  return (
    <Container>
      <H2Title>People</H2Title>
      <Description>
        This project is a side project of{" "}
        <span style={{ fontWeight: 700 }}>Seunggyun Han</span> (
        <AText href="https://han.codes/">link</AText>) developed between 2024
        and 2025.
      </Description>
      <Description>
        It was originally part of the 2024 summer mentorship program at the Data
        Visualization Society, mentored by{" "}
        <span style={{ fontWeight: 700 }}>Diana MacDonald</span> (
        <AText href="https://didoesdigital.com/">link</AText>). The project is
        continuously being updated to deliver clearer and more meaningful
        insights.
      </Description>
    </Container>
  );
}
