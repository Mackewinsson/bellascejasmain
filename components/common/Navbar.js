import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from 'react-redux'
import * as authActions from '../../store/actions/auth';
import NavLink from "./NavLink";
import { useRouter } from 'next/router'


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


const Nav = styled.nav`
  grid-area: header;
  width: 100%;
  height: 50px;
  background-color: ${(props) => (props.user ? "#00A7C2" : "#2a2a2a")};
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

const WrapperLogout = styled.a`
  display: flex;
  color: ${(props) => (props.user ? "#fff" : "#ae9754")};
  cursor: pointer;
  :hover {
    color: #fff;
  }
`;

//construir logged in nav

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const router = useRouter()
  const [isAdmin, setAdmin] = useState(false);
  const [login, setLogin] = useState(false);

  const onPress = async () => {
    await dispatch(authActions.signout());
    router.push("/")
  };

  useEffect(() => {
    if (user && user.email) {
      if (user.rol == "admin") setAdmin(true)
      setLogin(true)
    } else {
      setLogin(false)
    }
  }, [user]);

  return (
    <>
      {!isAdmin && (
        <Nav user={login}>
          <UlWrapper>
            <Ul>
              <li>
                <NavLink href="/" name="Inicio" user={login} />
              </li>
              <li>
                {login ? (
                  <NavLink href="/academia" name="Academia" user={login} />
                ) : (
                  <NavLink
                    href="/yuleximarquez"
                    name="Yulexi Marquez"
                    user={login}
                  />
                )}
              </li>
              <li>
                <StyledATag href="#cursos" user={login}>
                  <span>Cursos</span>
                </StyledATag>
              </li>
              { login ? (
                  <li>
                    <WrapperLogout onClick={onPress} user={login}> Cerrar sesión </WrapperLogout>
                  </li>
                ) : (
                  <li>
                    <WrapperLogout onClick={()=> {router.push("/login")}} user={login}> Login</WrapperLogout>
                  </li>
                )
              }
            </Ul>
          </UlWrapper>
        </Nav>
      )}
    </>
  );
};

export default Navbar;
