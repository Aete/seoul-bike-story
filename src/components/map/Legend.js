import styled from "styled-components";

const LegendContainer = styled.div`
  position: absolute;
  top: 40px;
  right: 40px;
  background-color: rgba(21, 21, 21, 0.8);
  color: #eee;
  padding: 10px;
  box-sizing: border-box;

  & p {
    margin: 0;
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 10px;
  }

  & li:first-child {
    margin-bottom: 5px;
  }

  @media screen and (max-width: 768px) {
    top: 5px;
    right: 5px;

    & p {
      font-size: 14px;
    }

    & li {
      font-size: 14px;
    }
  }
`;

const BikeSquare = styled.span`
  color: rgba(76, 175, 80, 0.8);
  margin-right: 5px;
`;

const SubwayCircle = styled.span`
  color: rgba(255, 255, 255, 1);
  margin-right: 5px;
`;

export default function Legend() {
  return (
    <LegendContainer>
      <p>Legend</p>
      <ul>
        <li>
          <BikeSquare>■</BikeSquare>Bike Lane
        </li>
        <li>
          <SubwayCircle>●</SubwayCircle>Subway Station
        </li>
      </ul>
    </LegendContainer>
  );
}
