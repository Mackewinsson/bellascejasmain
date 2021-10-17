import React from "react";

import styled from "styled-components";

export const Wrapper = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
`;

export const MainTitle = styled.h1`
  font-weight: bold;
  margin-top: 50px;
  letter-spacing: 0.3em;
  font-size: 1.5em;
`;

export const Subtitle = styled.h3`
  font-weight: 400;
  margin-top: 0;
`;

export const CenterContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

export const ALink = styled.a`
  text-decoration: none;
  color: #2a2a2a;
  font-weight: bold;
  margin: 20px 10px;
  &:hover {
    font-size: 1.1em;
    background-color: #2a2a2a;
    color: #fff;
    border-radius: 50px;
    padding: 10px;
  }
`;

export const StyledUl = styled.ul`
  text-decoration: none;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
`;

export const StyledLiCard = styled.li`
  width: 130px;
  height: 130px;
  background-color: #2a2a2a;
  border-radius: 25px;
  margin: 5px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  position: relative;
`;

export const FeaturedLiCard = styled.div`
  background-color: #2997ff;
  width: 100%;
  position: absolute;
  bottom: 0;
  border-radius: 0px 0px 25px 25px;
  font-size: 0.7em;
  font-weight: normal;
  padding: 2px 0px;
`;

export const Button = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  background-color: transparent;
  border-radius: 25px;
  font-size: 1em;
  color: #2997ff;
  border: 1px solid #2a2a2a;
  margin-top: ${(props) => (props.marginTop ? "10px" : "0px")};
  &:hover {
    font-weight: bold;
    font-size: 1em;
  }
`;

export const GoUpButton = styled.a`
  width: 30px;
  height: 30px;
  background-color: #2a2a2a;
  color: #fff;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-size: 1em;
`;

export const ColorTitle = styled.h4`
  color: #ae9754;
  margin-bottom: 0px;
`;

export const SectionSubtile = styled.p`
  color: black;
  font-weight: 100;
  font-style: italic;
  font-size: 0.8em;
`;

export const StyledButton = styled.a`
  width: 40%;
  border: 1px solid white;
  background-color: ${(props) => (props.bg ? props.bg : "transparent")};
  color: ${(props) => (props.color ? props.color : "white")};
  border-radius: 50px;
  padding: 1em 1em;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  border-color: ${(props) => (props.color ? props.color : "white")};

  &:hover {
    color: #ae9754;
    text-decoration: none;
    font-weight: bold;
  }

  &:visited {
    color: #ae9754;
    text-decoration: none;
  }
  @media (min-width: 768px) {
    width: 200px;
  }
  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`;
