import styled from "styled-components";
import { peakBoolState } from "../../atoms/atom";
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

export default function PeakChecker() {
  const [isPeak, setIsPeak] = useRecoilState(peakBoolState);

  const handleCheckboxChange = () => {
    setIsPeak(!isPeak);
  };

  return (
    <Container>
      <label>
        <input
          type="checkbox"
          checked={isPeak}
          onChange={handleCheckboxChange}
        />
        Peak Hour (08 ~ 09)
      </label>
    </Container>
  );
}
