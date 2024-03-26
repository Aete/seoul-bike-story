import styled from "styled-components";
import Anno from "./panels/Anno";
import { useState } from "react";
import Count from "./panels/Count";
import Movement from "./panels/Movment";
import Route from "./panels/Route";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 2;
  width: 25%;
  background-color: #0e0e0e;
  color: #fff;
  opacity: 90%;
  margin: 20px;
  border: 1px solid #fff;
  padding: 20px;
`;

const Button = styled.button`
  border: 1px solid #fff;
  background-color: none;
  color: #fff;
  padding: 10px 15px;
  width: fit-content;
  margin-top: 20px;
  transition: ease 0.1s;

  &:hover {
    background-color: #fff;
    color: #212121;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function Panel() {
  const [page, setPage] = useState(0);

  const handleNext = (e) => {
    setPage(page + 1);
  };

  const handlePrevious = (e) => {
    setPage(page - 1);
  };

  const pageLength = 3;

  return (
    <Container>
      {page === 0 && <Anno />}
      {page === 1 && <Count />}
      {page === 2 && <Route />}
      {page === 3 && <Movement />}
      <ButtonContainer>
        {page > 0 && <Button onClick={handlePrevious}>Previous</Button>}
        {page < pageLength && <Button onClick={handleNext}>Next</Button>}
      </ButtonContainer>
    </Container>
  );
}
