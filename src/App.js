import styled from "styled-components";
import Main from "./components/Main";
import { GlobalStyles } from "./styles/GlobalStyles";
import { RecoilRoot } from "recoil";
import Title from "./components/Title/Title";
import { tablet } from "./utils/styles";

const Container = styled.div`
  position: relative;
  display: flex;
  box-sizing: border-box;
  margin: 0;
  width: 100vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #0e0e0e;

  @media (max-width: 1280px) {
    padding: 0 40px;
  }

  @media (max-width: ${tablet}px) {
    padding: 0 20px;
  }
`;

function App() {
  return (
    <RecoilRoot>
      <GlobalStyles />
      <Container>
        <Title />
        <Main />
      </Container>
    </RecoilRoot>
  );
}

export default App;
