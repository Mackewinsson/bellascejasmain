import Link from "next/link";
import { Nav } from "react-bootstrap";
import styled from "styled-components";

// This creates a custom component that wraps an <a> tag
const SLink = styled.a`
  display: flex;
  color: ${(props) => (props.user ? "#fff" : "#ae9754")};
  :hover {
    color: #fff;
  }
`;

function NavLink({ href, name, user }) {
  // Must add passHref to Link
  return (
    <Link href={href} passHref>
      <Nav.Link as="a">{name}</Nav.Link>
    </Link>
  );
}

export default NavLink;
