import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import SideBar from "./Sidebar";
import FooterComponent from "./Footer";

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
  height: 100%;
  grid-area: content;
  flex-direction: column;
`;

const Layout = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  return (
    <MainWrapper>
      <Navbar rol={user?.rol} />
      <Wrapper>{children}</Wrapper>
      <FooterComponent />
    </MainWrapper>
  );
};

export default Layout;
