import styled from "styled-components";
import Title from "./Title";
import Community from "./Community";
import AnalysisHub from "./Analysis";
import Flow from "./Flow";
import End from "./End";

import { useSetRecoilState } from "recoil";
import { scrollPositionState } from "../../atoms/atom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 2;
  width: 40%;
  height: 100vh;
  background-color: #0e0e0e;
  color: #fff;
  opacity: 90%;
  margin: 0;
  padding: 40px;
  overflow-y: scroll;

  /* Custom Scrollbar Styles */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #1a1a1a;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
    border: 2px solid #1a1a1a;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

export default function Panel() {
  const setScrollPosition = useSetRecoilState(scrollPositionState);

  const handleScroll = (e) => {
    const currentScrollPosition = e.target.scrollTop;
    setScrollPosition(currentScrollPosition);
  };

  return (
    <Container onScroll={handleScroll}>
      <Title />
      <Community />
      <AnalysisHub />
      <Flow />
      <End />
    </Container>
  );
}
