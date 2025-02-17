import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 140px;
  left: 40px;
  background-color: rgba(21, 21, 21, 0.8);
  color: #eee;
  padding: 10px;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    top: 95px;
    left: 5px;
    font-size: 14px;
  }
`;

export default function Timer({ time }) {
  return (
    <Container>
      <span>
        Current time:{" "}
        {`0${Math.floor(time / 3600)}: ${
          Math.floor((time % 3600) / 60) >= 10
            ? Math.floor((time % 3600) / 60)
            : "0" + Math.floor((time % 3600) / 60)
        }`}
      </span>
    </Container>
  );
}
