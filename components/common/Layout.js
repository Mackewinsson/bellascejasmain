import React from "react";
import styled from "styled-components";
import Nav from "./Navbar";
import Footer from "./Footer";

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
      "header"
      "content"
      "footer";
  }
`;

const Wrapper = styled.main`
  display: flex;
  width: 100%;
  grid-area: content;
  flex-direction: column;
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
