import styled from "styled-components";
import Viz from "./Viz";
import Panel from "./panels/Panel";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 99.5vh;
  justify-content: space-between;
  flex-direction: row;
`;

export default function Main() {
  return (
    <Container>
      <Panel />
      <Viz />
    </Container>
  );
}
