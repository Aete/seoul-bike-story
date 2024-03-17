import styled from "styled-components";
import Viz from "./Viz";
import Anno from "./Anno";

const Container = styled.div`
  display: flex;
  width: 1280px;
  height: 99.5vh;
  justify-content: space-between;
  flex-direction: row;
`;

export default function Main() {
  return (
    <Container>
      <Anno />
      <Viz />
    </Container>
  );
}
