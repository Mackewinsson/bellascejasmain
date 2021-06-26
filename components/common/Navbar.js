import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Nav = styled.nav`
  grid-area: header;
  width: 100%;
  height: 50px;
  background-color: #2a2a2a;
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: small;
  list-style: none;
  width: 40%;
  padding-right: 50px;
  margin: 0;
  height: 100%;

  > li {
    font-weight: bold;
    display: flex;
  }

  > li:hover {
    font-size: 1em;
    font-weight: bold;
    color: lightblue;
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
`;

const StyledATag = styled.a`
  color: white;
  text-decoration: none;
`;

const Navbar = () => {
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
            <Link href="/">
              <span> Microblading</span>
            </Link>
          </li>
          <li>
            <Link href="/">
              <span>Staff</span>
            </Link>
          </li>
          <li>
            <StyledATag href="#cursos">
              <span>Cursos</span>
            </StyledATag>
          </li>
        </Ul>
      </UlWrapper>
    </Nav>
  );
};

export default Navbar;
