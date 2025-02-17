import styled from "styled-components";
import { returnBoolState, rentBoolState } from "../../atoms/atom";
import { useRecoilState } from "recoil";

const Container = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  background-color: rgba(21, 21, 21, 0.8);
  color: #eee;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  & label {
    margin-bottom: 5px;
  }

  @media screen and (max-width: 768px) {
    top: 5px;
    left: 5px;
    font-size: 14px;
  }
`;

export default function RentChecker() {
  const [isReturn, setIsReturn] = useRecoilState(returnBoolState);
  const [isRent, setIsRent] = useRecoilState(rentBoolState);

  const handleReturnCheckboxChange = () => {
    setIsReturn(!isReturn);
  };

  const handleRentCheckboxChange = () => {
    setIsRent(!isRent);
  };

  return (
    <Container>
      <label>
        <input
          type="checkbox"
          checked={isRent}
          onChange={handleRentCheckboxChange}
        />
        Rent at the hotspot
      </label>
      <label>
        <input
          type="checkbox"
          checked={isReturn}
          onChange={handleReturnCheckboxChange}
        />
        Return at the hotspot
      </label>
    </Container>
  );
}
