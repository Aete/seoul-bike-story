import styled from "styled-components";
import Header from "./organisms/Header";
import { Description } from "./Text/text";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 2;
  width: 25%;
  height: calc(100% - 40px);
  background-color: #0e0e0e;
  color: #fff;
  opacity: 90%;
  margin: 20px;
  border: 1px solid #fff;
  padding: 20px;
`;

export default function Anno() {
  return (
    <Container>
      <Header />
      <Description>
        This project aims to analyze and visualize the usage patterns of Seoul's
        public bike sharing system. It utilizes sampled data collected over
        approximately six months, with each day's data sampled on weekdays.
      </Description>
    </Container>
  );
}
