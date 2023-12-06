import styled from "styled-components";

export const StyledA = styled.a`
  padding: 0px;
  margin: 0px;
  text-decoration: none;
`;

export const MainTitleCourse = styled.h1`
  @media (min-width: 768px) {
    margin-top: 100px;
    font-size: 4em;
  }
`;
export const DetailsSection = styled.div``;
export const P = styled.p`
  text-align: justify;
`;

export const StyledUlList = styled.ul`
  padding-left: 20px;
  text-align: left;
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  > li {
    margin-top: 15px;
  }
`;
export const GoUpWrapper = styled.div`
  display: flex;
  width: 40%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (min-width: 768px) {
    width: 20%;
  }
`;

export const SideBySide = styled.div`
  margin-top: 50px;
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 50px;
  @media (min-width: 768px) {
    justify-content: center;
  }
`;

export const StyledH4 = styled.h4`
  @media (min-width: 768px) {
    font-size: 2em;
  }
`;

export const VideoWrapper = styled.div`
  @media (min-width: 768px) {
    display: flex;
    width: 100%;
    height: 720px;
    justify-content: center;
  }

  > iframe {
    width: 100%;
  }
`;

export const SectionWrapper = styled.div`
  @media (min-width: 768px) {
    padding-bottom: 50px;
  }
`;
