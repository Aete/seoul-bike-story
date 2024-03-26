import styled from "styled-components";

import { H1Title, H3Title } from "../Text/titles";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SubChapter = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export default function Movement() {
  return (
    <Container>
      <H1Title>Chapter 3. Movement</H1Title>
      <SubChapter></SubChapter>
    </Container>
  );
}
