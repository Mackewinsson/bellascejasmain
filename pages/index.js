import React from "react";
import { Wrapper } from "../components/common/StyledComponents/Styles";
import styled from "styled-components";
import Image from "next/image";
import ImageWrapperMobile from "../components/common/ImageWrapperMobile";

const BackgroundWrapper = styled.div`
  background-color: #2a2a2a;
  width: 100%;
`;

const StyledBody = styled.div`
  background-color: #2a2a2a;
  padding-top: 15%;
  padding-right: 20%;
  padding-left: 20%;

  @media (max-width: 768px) {
    padding-top: 50%;
  }
`;

const StyledTitle = styled.h1`
  color: white;
  font-size: 3.7em;
  position: relative;

  &:before {
    content: "";
    display: block;
    width: 100px;
    height: 1px;
    background-color: white;
    position: absolute;
    top: 45px;
    left: -120px;

    @media (max-width: 768px) {
      font-size: 2em;
      top: 30px;
      left: -80px;
      width: 70px;
    }
  }

  @media (max-width: 768px) {
    font-size: 2em;
  }
`;

const StyledButton = styled.a`
  border: 1px solid white;
  background-color: transparent;
  color: white;
  border-radius: 50px;
  padding: 1em 2em;
  margin-top: 10px;

  &:hover {
    color: white;
    text-decoration: none;
    font-size: 1.1em;
    font-weight: bold;
  }

  &:visited {
    color: white;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`;
const Ring = styled.div`
  position: absolute;
  top: -50px;
  left: 150px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Cone = styled.div`
  position: absolute;
  top: 300px;
  right: 0px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const Cube = styled.div`
  position: absolute;
  bottom: 0px;
  left: 150px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const index = () => {
  return (
    <BackgroundWrapper>
      <ImageWrapperMobile />
      <Ring>
        <Image src="/img/ring.png" alt="ring" width="200" height="200" />
      </Ring>
      <Cone>
        <Image src="/img/cone.png" alt="cone" width="200" height="200" />
      </Cone>
      <Cube>
        <Image src="/img/cube.png" alt="cube" width="200" height="200" />
      </Cube>
      <Wrapper>
        <StyledBody>
          <StyledTitle>
            {" "}
            Cejas Perfectas
            <br /> en todo momento
          </StyledTitle>
          <StyledButton>Reserva tu hora</StyledButton>
        </StyledBody>
      </Wrapper>
    </BackgroundWrapper>
  );
};

export default index;
