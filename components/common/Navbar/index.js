import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../../store/actions/auth";
import NavLink from "../NavLink";
import { useRouter } from "next/router";
import { Nav, StyledATag, Ul, UlWrapper, WrapperLogout } from "./styles";

const clientLinks = [
  { title: "Cursos", link: "" },
  { title: "Usuario", link: "" },
  { title: "Dashboard", link: "" },
];
const adminLinks = [{ title: "Admin", link: "" }];
const loggedOutLinks = [
  { title: "Home", link: "" },
  { title: "Cursos", link: "" },
  { title: "Academia", link: "" },
];

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

const Navbar = ({ rol }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const router = useRouter();
  const [login, setLogin] = useState(false);

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
    <>
      <Nav user={login}>
        <UlWrapper>
          <Ul>
            {links.map((link, index) => (
              <li key={index}>
                <NavLink href={link.link} name={link.title} user={login} />
              </li>
            ))}
            <li>
              {login ? (
                <WrapperLogout onClick={onPress} user={login}>
                  {" "}
                  Cerrar sesión{" "}
                </WrapperLogout>
              ) : (
                <WrapperLogout
                  onClick={() => {
                    router.push("/login");
                  }}
                  user={login}
                >
                  {" "}
                  Login
                </WrapperLogout>
              )}
            </li>
          </Ul>
        </UlWrapper>
      </Nav>
    </>
  );
};

export default Navbar;
