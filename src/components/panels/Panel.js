import styled from "styled-components";
import { useRecoilState } from "recoil";
import { currentPageState } from "../../atoms/atom";
import { useState, useEffect } from "react";

import Background from "./Background";
import Community from "./Community";
import MagokOverview from "./magok/MagokOverview";
import MagokRent from "./magok/MagokRent";
import MagokReturn from "./magok/MagokReturn";
import MagokFlow from "./magok/MagokFlow";
import Reference from "./Source";
import People from "./People";
import MagokRoute from "./magok/MagokTrip";

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
  const [pageNumber, setPageNumber] = useRecoilState(currentPageState);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const handleClick = (buttonType, e) => {
    e.preventDefault();
    if (buttonType === "prev") {
      setPageNumber((prev) => prev - 1);
    }
    if (buttonType === "next") {
      setPageNumber((prev) => prev + 1);
      setIsNextDisabled(true);
    }
  };

  useEffect(() => {
    if (isNextDisabled) {
      const timer = setTimeout(() => {
        setIsNextDisabled(false);
      }, 1000); // 1 second

      return () => clearTimeout(timer);
    }
  }, [isNextDisabled]);

  return (
    <Container>
      {pageNumber === 0 && <Background />}
      {pageNumber === 1 && <Community />}
      {pageNumber === 2 && <MagokOverview />}
      {pageNumber === 3 && <MagokRent />}
      {pageNumber === 4 && <MagokReturn />}
      {pageNumber === 5 && <MagokFlow />}
      {pageNumber === 6 && <MagokRoute />}
      {pageNumber === 7 && <Reference />}
      {pageNumber === 8 && <People />}
      <ButtonGroup
        handleClick={handleClick}
        currentPage={pageNumber}
        isNextDisabled={isNextDisabled}
      />
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
  position: relative;

  &:disabled {
    border: 1px solid #333;
    color: #333;
    cursor: not-allowed;

    &:hover {
      color: #333;
      background: transparent;
    }
  }

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

const DisabledButton = styled.button`
  width: 80px;
  height: 30px;
  border: 1px solid #333;
  color: #333;
  margin-right: 20px;

  @media screen and (max-width: 768px) {
    width: 60px;
    height: 20px;
    margin-right: 10px;
  }
`;

const LoadingSpinner = styled.div`
  border: 2px solid #f3f3f3;
  border-top: 2px solid #333;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  display: inline-block;
  margin-right: 5px;
  position: absolute;
  z-index: 3;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @keyframes spin {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

function ButtonGroup({ handleClick, currentPage, isNextDisabled }) {
  return (
    <ButtonContainer>
      {currentPage === 0 && <DisabledPrevButton />}
      {currentPage !== 0 && <PrevButton handleClick={handleClick} />}
      {currentPage !== 8 && (
        <NextButton handleClick={handleClick} disabled={isNextDisabled} />
      )}
      {currentPage === 8 && <DisabledNextButton />}
    </ButtonContainer>
  );
}

function DisabledPrevButton() {
  return <DisabledButton disabled>Previous</DisabledButton>;
}

function DisabledNextButton() {
  return <DisabledButton disabled>Next</DisabledButton>;
}

function PrevButton({ handleClick }) {
  return <Button onClick={(e) => handleClick("prev", e)}>Previous</Button>;
}

function NextButton({ handleClick, disabled }) {
  return (
    <Button onClick={(e) => handleClick("next", e)} disabled={disabled}>
      {disabled ? <LoadingSpinner /> : null}
      Next
    </Button>
  );
}
