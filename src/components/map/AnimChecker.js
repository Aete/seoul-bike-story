import styled from "styled-components";
import { animationBoolState } from "../../atoms/atom";
import { useRecoilState } from "recoil";

const Container = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  background-color: rgba(21, 21, 21, 0.8);
  color: #eee;
  padding: 10px;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    top: 5px;
    left: 5px;
    font-size: 14px;
  }
`;

export default function AnimChecker() {
  const [isAnim, setIsAnim] = useRecoilState(animationBoolState);

  const handleCheckboxChange = () => {
    setIsAnim(!isAnim);
  };

  return (
    <Container>
      <label>
        <input
          type="checkbox"
          checked={isAnim}
          onChange={handleCheckboxChange}
        />
        Play Animation
      </label>
    </Container>
  );
}
