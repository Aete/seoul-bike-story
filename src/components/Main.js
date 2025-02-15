import styled from "styled-components";
import Viz from "./map/Viz";
import Panel from "./panels/Panel";

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: row;
  padding: 0 0 0 100px;

  @media screen and (max-width: 1280px) {
    flex-direction: column;
    height: 100vh;
    padding: 0;
  }
`;

export default function Main() {
  return (
    <Container>
      <Panel />
      <Viz />
    </Container>
  );
}
