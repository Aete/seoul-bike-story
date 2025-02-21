import styled from "styled-components";
import { tablet } from "../../utils/styles";
import ScrollDown from "./ScrollDown";

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: ${tablet}px) {
    margin-bottom: 80px;
  }
`;

const TitleText = styled.h1`
  font-size: 128px;
  font-weight: 700;
  text-align: center;
  line-height: 125%;
  color: #ffffff;
  letter-spacing: 0.05em;
  margin-bottom: 40px;

  @media (max-width: 1024px) {
    font-size: 108px;
    margin-bottom: 100px;
    line-height: 110%;
  }

  @media (max-width: ${tablet}px) {
    font-size: 48px;
    margin-bottom: 50px;
  }
`;

const PageSubTitle = styled.p`
  font-family: "Noto Serif", serif;
  font-weight: 400;
  font-size: 32px;
  color: #fff;
  text-align: center;
  line-height: 160%;
  letter-spacing: 0.05em;
  @media (max-width: ${tablet}px) {
    font-size: 18px;
  }
`;

const Warning = styled.p`
  font-family: "Noto Serif", serif;
  font-weight: 400;
  font-size: 13px;
  color: #424242;
  text-align: center;
  line-height: 160%;
  letter-spacing: 0.05em;
  margin-top: 20px;
`;

export default function Title() {
  return (
    <Container>
      <TitleText>Microflow</TitleText>
      <PageSubTitle>
        Exploring Community-Level Patterns in Seoul's Public Bike Network
      </PageSubTitle>
      {window.innerWidth < 768 && (
        <Warning>
          This application may have limited performance on mobile devices.
        </Warning>
      )}
      <ScrollDown />
    </Container>
  );
}
