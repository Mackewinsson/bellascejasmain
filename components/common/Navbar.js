import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

const Nav = styled.nav`
  grid-area: header;
  width: 100%;
  height: 50px;
  background-color: #2a2a2a;
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: white;
  font-size: small;
  list-style: none;
  margin: 0;
  height: 100%;
  padding: 0px;
  @media (max-width: 768px) {
    padding: 0px;
  }

  > li {
    font-weight: bold;
    display: flex;
  }

  > li:hover {
    font-size: 1em;
    font-weight: bold;
    color: #2997ff;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const UlWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  height: 100%;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const ProfileImg = styled.img`
  display: flex;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-left: 5px;
`;

const StyledATag = styled.a`
  color: white;
  text-decoration: none;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const LogoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > small :last-child {
    font-weight: 100;
    font-size: 0.7em;
  }
`;

const Navbar = () => {
  const { user, isLoading } = useUser();
  console.log(user);
  return (
    <Nav>
      <UlWrapper>
        <Ul>
          <li>
            <Link href="/">
              <span>Inicio</span>
            </Link>
          </li>
          <li>
            {user ? (
              <Link href="/academia">
                <span style={{ color: "yellow" }}>Academia</span>
              </Link>
            ) : (
              <Link href="/yuleximarquez">
                <span>Yulexi Marquez</span>
              </Link>
            )}
          </li>
          <li>
            <StyledATag href="#cursos">
              <span>Cursos</span>
            </StyledATag>
          </li>
          <li>
            {!isLoading && !user && (
              <StyledATag href="/api/auth/login">
                <small>Iniciar Sesion</small>
              </StyledATag>
            )}
            {user && (
              <LoginWrapper>
                <StyledATag href="/api/auth/logout">
                  <LogoutWrapper>
                    <small>Cerrar Sesion</small>
                    <small>{user.name}</small>
                  </LogoutWrapper>
                </StyledATag>
                {/* <ProfileImg src={user.picture} alt="Profile" /> */}
              </LoginWrapper>
            )}
          </li>
        </Ul>
      </UlWrapper>
    </Nav>
  );
};

export default Navbar;
