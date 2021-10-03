import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import NavLink from "./NavLink";

const Nav = styled.nav`
  grid-area: header;
  width: 100%;
  height: 50px;
  background-color: ${(props) => (props.user ? "#00A7C2" : "#2a2a2a")};
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
  width: 40%;
  padding: 0px;
  @media (max-width: 768px) {
    padding: 0px;
  }

  > li {
    font-weight: bold;
    display: flex;
    height: 100%;
    :hover {
      border-bottom: 5px solid #fff;
    }
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
  display: flex;
  color: ${(props) => (props.user ? "#fff" : "#ae9754")};
  text-decoration: none;
  :active {
    color: #fff;
  }
  :hover {
    color: #fff;
  }
`;

const StyledATagLog = styled.a`
  color: ${(props) => (props.user ? "#fff" : "#ae9754")};
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

//construir logged in nav

const Navbar = () => {
  const { user, isLoading } = useUser();
  return (
    <Nav user={user}>
      <UlWrapper>
        <Ul>
          <li>
            <NavLink href="/" name="Inicio" user={user} />
          </li>
          <li>
            {user ? (
              <NavLink href="/academia" name="Academia" user={user} />
            ) : (
              <NavLink
                href="/yuleximarquez"
                name="Yulexi Marquez"
                user={user}
              />
            )}
          </li>
          <li>
            <StyledATag href="#cursos" user={user}>
              <span>Cursos</span>
            </StyledATag>
          </li>
          <li>
            {!isLoading && !user && (
              <StyledATag href="/api/auth/login" user={user}>
                <small>Iniciar Sesion</small>
              </StyledATag>
            )}
            {user && (
              <LoginWrapper>
                <StyledATagLog href="/api/auth/logout" user={user}>
                  <LogoutWrapper>
                    <small>Cerrar Sesion</small>
                    <small>{user.nickname}</small>
                  </LogoutWrapper>
                </StyledATagLog>
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
