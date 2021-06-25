import styled from "styled-components";
import Link from "next/link";
import React from "react";

const StyledLink = styled(Link)`
  background-color: black;
  padding: 15px;
  color: white;
  border-radius: 15px;

  &:hover {
    color: #ffd700;
    text-decoration: none;
  }
`;
export default StyledLink;
