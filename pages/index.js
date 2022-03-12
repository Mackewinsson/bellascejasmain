import React from "react";
import { Wrapper } from "../components/common/StyledComponents/Styles";
import styled from "styled-components";
import Image from "next/image";
import ImageWrapperMobile from "../components/common/ImageWrapperMobile";
import Cursos from "../components/sections/Cursos";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import firebase from "../services/firebase/firebaseClient";

const auth = getAuth(firebase);

const login = () => {
  signInWithEmailAndPassword(auth, "mackewinsson@gmail.com", "123456");
};

const logout = () => {
  signOut(auth);
};

const index = () => {
  const [user, loading, error] = useAuthState(auth);
  console.log(user, loading, error);

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (user) {
    return (
      <div>
        <p>Current User: {user.email}</p>
        <button onClick={logout}>Log out</button>
      </div>
    );
  }
  return (
    <>
      <button onClick={login}>Log in</button>;
      {/* <SectionWrapper>
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
              Cambia tu vida
              <br /> desde casa
            </StyledTitle>
            <StyledButton href="#cursos">Cursos disponibles</StyledButton>
          </StyledBody>
        </Wrapper>
      </SectionWrapper>
      <CursosSection>
        <Cursos />
      </CursosSection> */}
    </>
  );
};

export default index;

const SectionWrapper = styled.div`
  @media (max-width: 768px) {
    background-color: #2a2a2a;
  }
  background-image: url("/img/model.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  position: relative;
`;

const CursosSection = styled.div`
  background-color: #fff;
  width: 100%;
`;

const StyledBody = styled.div`
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
  padding: 1em 1em;
  margin-top: 10px;
  display: flex;
  justify-content: center;

  &:hover {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }

  &:visited {
    color: white;
    text-decoration: none;
  }
  @media (min-width: 768px) {
    width: 200px;
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
