import Link from "next/link";
import { Nav } from "react-bootstrap";
// This creates a custom component that wraps an <a> tag

function NavLink({ href, name, user }) {
  // Must add passHref to Link
  return (
    <Link href={href} passHref>
      <Nav.Link as="a">{name}</Nav.Link>
    </Link>
  );
}

export default NavLink;
