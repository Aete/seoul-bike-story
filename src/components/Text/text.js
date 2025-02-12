import styled from "styled-components";

export const AText = styled.a`
  display: inline;
  cursor: pointer;
  text-decoration: underline;
  opacity: 50%;
`;

export const Description = styled.p`
  margin: 0 0 15px 0;
  font-size: 20px;
  line-height: 1.6;
  font-weight: 300;
  color: #ccc;

  @media screen and (max-width: 1280px) {
    font-size: 18px;
  }

  @media screen and (max-width: 768px) {
    font-size: 14px;
    margin: 0 0 5px 0;
  }
`;
