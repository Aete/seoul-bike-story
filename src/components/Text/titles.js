import styled from "styled-components";

export const H2Title = styled.h2`
  font-size: 40px;
  font-weight: 600;
  margin: 0 0 60px 0;
  line-height: 1.4;

  @media screen and (max-width: 1280px) {
    font-size: 28px;
    margin: 20px 0 30px 0;
  }

  @media screen and (max-width: 768px) {
    font-size: 20px;
    margin: 0 0 20px 0;
  }
`;

export const H3Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  display: inline;
  width: max-content;
  text-decoration: underline;
  margin: 0 0 15px 0;
  color: #ccc;
`;
