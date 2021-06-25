import React from "react";
import styled from "styled-components";

const FooterArea = styled.footer`
  grid-area: footer;
  display: flex;
  justify-content: center;
  background-color: lightgray;
  height: 100px;
  align-items: center;

  @media (max-width: 768px) {
    /* display: none; */
  }
`;
const Downfooter = () => {
  return <FooterArea>By Mackewinsson P.</FooterArea>;
};

export default Downfooter;
