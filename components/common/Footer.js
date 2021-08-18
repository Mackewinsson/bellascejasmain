import React from "react";
import styled from "styled-components";

const FooterArea = styled.footer`
  grid-area: footer;
  display: flex;
  justify-content: center;
  height: 50px;
  align-items: center;
  background-color: #2a2a2a;
  color: #fff;
  font-weight: bold;
  font-size: 0.8em;
`;
const FooterComponent = () => {
  return <FooterArea>By Yulexi Marquez & Mackewinsson P.</FooterArea>;
};

export default FooterComponent;
