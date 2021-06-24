import React from "react";
import styled from "styled-components";
import Nav from "./Navbar";
import Footer from "./Footer";

const Wrapper = styled.main`
  display: flex;
  justify-content: start;
  height: 100vh;
  width: 100%;
`;

const MainWrapper = styled.div`
  width: 100%;
`;

const Layout = ({ children }) => {
  return (
    <MainWrapper>
      <Nav />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </MainWrapper>
  );
};

export default Layout;
