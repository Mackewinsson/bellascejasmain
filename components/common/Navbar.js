import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Nav = styled.nav`
  width: 100%;
  height: 61px;
  background-color: #2a2a2a;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: small;
  list-style: none;
  width: 30%;
  padding-right: 50px;
  margin: 0;
  height: 100%;
  > li {
    font-weight: 100;
    display: flex;
  }

  > li:hover {
    font-size: 1.1em;
    font-weight: bold;
  }
`;

const UlWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  height: 100%;
`;

const Navbar = () => {
  return (
    <Nav>
      <UlWrapper>
        <Ul>
          <li>
            <Link href="/">
              <span>INICIO</span>
            </Link>
          </li>
          <li>
            <Link href="/">
              <span> MICROBLADING</span>
            </Link>
          </li>
          <li>
            <Link href="/">
              <span>STAFF</span>
            </Link>
          </li>
          <li>
            <Link href="/cursos">
              <span>CURSOS</span>
            </Link>
          </li>
        </Ul>
      </UlWrapper>
    </Nav>
  );
};

export default Navbar;
