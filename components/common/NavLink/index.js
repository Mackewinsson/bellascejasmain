import Link from "next/link";
import { SLink } from "./styles";

// This creates a custom component that wraps an <a> tag

function NavLink({ href, name, user }) {
  // Must add passHref to Link
  return (
    <Link href={href} passHref>
      <SLink user={user}>{name}</SLink>
    </Link>
  );
}

export default NavLink;
