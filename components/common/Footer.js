import React from "react";
import styled from "styled-components";
import Link from "next/link";

const FooterMenu = styled.ul`
  display: flex;
  position: fixed;
  bottom: -15px;
  width: 100%;
  min-height: 70px;
  overflow-x: auto;
  list-style: none;
  padding: 0;
  border: 0.5px solid white;
  border-bottom: none;
  border-right: none;
  border-left: none;
  justify-content: space-around;
  background-color: #2a2a2a;

  @media (min-width: 768px) {
    display: none;
  }

  > li {
    display: flex;
    align-items: center;
    color: white;
  }
`;

const FooterComponents = () => {
  return (
    <FooterMenu>
      <li>
        <Link href="/">
          <span>HOME</span>
        </Link>
      </li>
      <li>
        <Link href="/cursos">
          <span>CURSOS</span>
        </Link>
      </li>
      <li>
        <Link href="/reservas">
          <span>RESERVAS</span>
        </Link>
      </li>
    </FooterMenu>
  );
};

export default FooterComponents;
