import React from "react";
import styled from "styled-components";
import Nav from "./Navbar";

const Wrapper = styled.main`
  display: flex;
  justify-content: start;
  height: 100vh;
  width: 100%;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default Layout;
