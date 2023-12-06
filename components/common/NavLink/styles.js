import styled from "styled-components";

export const SLink = styled.a`
  display: flex;
  color: ${(props) => (props.user ? "#fff" : "#ae9754")};
  :hover {
    color: #fff;
  }
`;
