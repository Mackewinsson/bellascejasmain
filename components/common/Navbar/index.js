import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../../store/actions/auth";
import NavLink from "../NavLink";
import { useRouter } from "next/router";
import { NavBar, StyledATag, Ul, UlWrapper, WrapperLogout } from "./styles";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Link from "next/link";

const NavbarComponent = ({ rol }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [login, setLogin] = useState(false);

  const user = useSelector((state) => state.user.user);
  const clientLinks = [{ title: `Hola! ${user?.name} 👋`, link: "/usuario" }];
  const adminLinks = [{ title: "Admin", link: "" }];
  const loggedOutLinks = [{ title: "Home", link: "/" }];
  const getLinksByRole = (rol) => {
    switch (rol) {
      case "client":
        return clientLinks;
      case "admin":
        return adminLinks;
      default:
        return loggedOutLinks;
    }
  };

  const onPress = async () => {
    await dispatch(authActions.signout());
    router.push("/");
  };

  useEffect(() => {
    if (user && user.email) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [user]);

  const links = getLinksByRole(rol);

  return (
    <NavBar collapseOnSelect expand="xxl" bg="light">
      <Container fluid>
        <NavBar.Brand as={Link} href="/">
          Microblading Academy
        </NavBar.Brand>
        <NavBar.Toggle aria-controls="responsive-navbar-nav" />
        <NavBar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {links.map((link, index) => (
              <NavLink
                href={link.link}
                name={link.title}
                user={login}
                key={index}
              />
            ))}

            <NavDropdown title="Academia" id="collapsible-nav-dropdown">
              {login ? (
                <NavDropdown.Item onClick={onPress}>
                  Cerrar sesion
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Iniciar Sesion
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
          {/* <Nav>
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
            </Nav> */}
        </NavBar.Collapse>
      </Container>
    </NavBar>
  );
};

export default NavbarComponent;
