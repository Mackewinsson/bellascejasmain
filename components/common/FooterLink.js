import styled from "styled-components";
import React from "react";

const StyledFooterLink = styled((props) => <Link {...props} />)`
  font-weight: lighter;
  color: white;
  display: flex !important;
  flex-grow: 1;
  overflow: hidden;
  min-width: 50px;
  white-space: nowrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //Hover styles
  &:hover {
    color: #ffd700;
    text-decoration: none;
    font-weight: bolder;
    font-size: 1.1em;
    border-bottom: 5px solid #ffd700;
  }

  > span {
    display: flex;
  }
`;
export default StyledFooterLink;
