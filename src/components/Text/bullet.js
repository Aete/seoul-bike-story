import styled from "styled-components";

export const UL = styled.ul``;

export const Li = styled.li`
  list-style-type: disc;
  margin: 0 0 10px 20px;
  font-size: 15px;
  line-height: 18px;
  color: #ccc;

  @media screen and (max-width: 1280px) {
    font-size: 18px;
  }

  @media screen and (max-width: 768px) {
    font-size: 14px;
    margin: 0 0 5px 20px;
  }
`;
