import Link from "next/link";
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
  // console.log(user)
  return (
    <Link href={href} passHref>
      <SLink user={user}>{name}</SLink>
    </Link>
  );
}

export default NavLink;
