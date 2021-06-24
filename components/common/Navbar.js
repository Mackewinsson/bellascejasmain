import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
  width: 100%;
  height: 50px;
  background-color: #2a2a2a;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
  font-size: small;
  list-style: none;
  width: 30%;
  padding-right: 50px;
  padding-top: 20px;

  > li {
    font-weight: 100;
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
`;

const Navbar = () => {
  return (
    <Nav>
      <UlWrapper>
        <Ul>
          <li>INICIO</li>
          <li>MICROBLADING</li>
          <li>STAFF</li>
          <li>CURSOS</li>
        </Ul>
      </UlWrapper>
    </Nav>
  );
};

export default Navbar;
