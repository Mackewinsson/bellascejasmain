import React from "react";
import styled from "styled-components";

export const LoggedIn = () => {
  return (
    <MainWrapper>
      <Content>Content</Content>
      <Sidebar>Sidebar</Sidebar>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 400px 1fr;
  grid-template-rows: auto;
  grid-template-areas: "sidebar content";
`;

const Content = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
  grid-area: content;
  flex-direction: column;
  background-color: lightcoral;
`;
const Sidebar = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
  grid-area: sidebar;
  flex-direction: column;
  background-color: lightblue;
`;
