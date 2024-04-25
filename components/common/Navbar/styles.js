import { Navbar } from "react-bootstrap";
import styled from "styled-components";

export const Ul = styled.ul`
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

export const NavBar = styled(Navbar)`
  grid-area: header !important;
`;

export const UlWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  height: 100%;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const ProfileImg = styled.img`
  display: flex;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-left: 5px;
`;

export const StyledATag = styled.a`
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

export const StyledATagLog = styled.a`
  color: ${(props) => (props.user ? "#fff" : "#ae9754")};
  text-decoration: none;
`;

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const LogoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > small :last-child {
    font-weight: 100;
    font-size: 0.7em;
  }
`;

export const WrapperLogout = styled.a`
  display: flex;
  color: ${(props) => (props.user ? "#fff" : "#ae9754")};
  cursor: pointer;
  :hover {
    color: #fff;
  }
`;
