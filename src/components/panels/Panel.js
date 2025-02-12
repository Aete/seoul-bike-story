import styled from "styled-components";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { scrollPositionState } from "../../atoms/atom";

import Background from "./Background";
import Community from "./Community";
import AnalysisHub from "./Analysis";
import Flow from "./Flow";
import End from "./End";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 45%;
  height: 100vh;
  background-color: #0e0e0e;
  color: #fff;
  margin: 0;
  padding: 40px 0;
  box-sizing: border-box;

  @media screen and (max-width: 1280px) {
    width: 100%;
    height: 40vh;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 20px 0;
  }
`;

export default function Panel() {
  const setScrollPosition = useSetRecoilState(scrollPositionState);

  const handleScroll = (e) => {
    const currentScrollPosition = e.target.scrollTop;
    setScrollPosition(currentScrollPosition);
  };

  const handleClick = (buttonType, e) => {
    e.preventDefault();
    if (buttonType === "prev") setPageNumber((prev) => prev - 1);
    if (buttonType === "next") setPageNumber((prev) => prev + 1);
    console.log(pageNumber);
  };

  const [pageNumber, setPageNumber] = useState(0);

  return (
    <Container onScroll={handleScroll}>
      {pageNumber === 0 && <Background />}
      {pageNumber === 1 && <Community />}
      {pageNumber === 2 && <AnalysisHub />}
      {pageNumber === 3 && <Flow />}
      {pageNumber === 4 && <End />}
      <ButtonGroup handleClick={handleClick} currentPage={pageNumber} />
    </Container>
  );
}

const ButtonContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 100px;
  z-index: 2;
  display: flex;
  width: 200px;
  padding: 0;
  box-sizing: border-box;

  @media screen and (max-width: 1280px) {
    top: 40px;
    left: calc(100% - 200px);
    justify-content: flex-end;
  }

  @media screen and (max-width: 768px) {
    top: calc(40vh - 30px);
    left: calc(100% - 200px);
    font-size: 12px;
  }
`;

const Button = styled.button`
  width: 80px;
  height: 30px;
  border: 1px solid #ccc;
  color: #ccc;
  margin-right: 20px;

  &:hover {
    color: #0e0e0e;
    background: #ccc;
  }

  @media screen and (max-width: 768px) {
    width: 60px;
    height: 20px;
    margin-right: 10px;
  }
`;

function ButtonGroup({ handleClick, currentPage }) {
  return (
    <ButtonContainer>
      {currentPage !== 0 && <PrevButton handleClick={handleClick} />}
      {currentPage !== 4 && <NextButton handleClick={handleClick} />}
    </ButtonContainer>
  );
}

function PrevButton({ handleClick }) {
  return <Button onClick={(e) => handleClick("prev", e)}>Previous</Button>;
}

function NextButton({ handleClick }) {
  return <Button onClick={(e) => handleClick("next", e)}>Next</Button>;
}
