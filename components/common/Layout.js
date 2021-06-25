import React from "react";
import styled from "styled-components";
import Nav from "./Navbar";
import Footer from "./Footer";
import Downfooter from "./Downfooter";

const MainWrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "content content content"
    "footer footer footer";

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      "content"
      "footer";
  }
`;

const Wrapper = styled.main`
  display: flex;
  justify-content: start;
  width: 100%;
  height: 100vh;
  grid-area: content;
`;

const Layout = ({ children }) => {
  return (
    <MainWrapper>
      <Nav />
      <Wrapper>{children}</Wrapper>
      {/* <Downfooter /> */}
      <Footer />
    </MainWrapper>
  );
};

export default Layout;
