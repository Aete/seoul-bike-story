import styled from "styled-components";
import { landuseBoolState } from "../../atoms/atom";
import { useRecoilState } from "recoil";

const Container = styled.div`
  position: absolute;
  top: 90px;
  left: 40px;
  background-color: rgba(21, 21, 21, 0.8);
  color: #eee;
  padding: 10px;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    top: 55px;
    left: 5px;
    font-size: 14px;
  }
`;

export default function LandChecker() {
  const [isLand, setIsLand] = useRecoilState(landuseBoolState);

  const handleCheckboxChange = () => {
    setIsLand(!isLand);
  };

  return (
    <Container>
      <label>
        <input
          type="checkbox"
          checked={isLand}
          onChange={handleCheckboxChange}
        />
        Show Land Use
      </label>
    </Container>
  );
}
