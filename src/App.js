import Main from "./components/Main";
import { GlobalStyles } from "./styles/GlobalStyles";
import { RecoilRoot } from "recoil";
function App() {
  return (
    <RecoilRoot>
      <GlobalStyles />
      <Main />
    </RecoilRoot>
  );
}

export default App;
