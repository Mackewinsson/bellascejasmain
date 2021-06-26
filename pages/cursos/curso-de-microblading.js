import React from "react";
import coursesData from "../../content/My-JSON-Content.json";
const curso = coursesData.courses[0];
import {
  Wrapper,
  MainTitle,
  CenterContent,
  Subtitle,
  DetailsSection,
  StyledUl,
  StyledLiCard,
} from "../../components/common/StyledComponents/Styles";
import styled from "styled-components";

const cursodemicroblading = () => {
  return (
    <Wrapper>
      <CenterContent>
        <MainTitle>Curso de Microblading</MainTitle>
        <DetailsSection>
          <h4>Modalidades</h4>
          <StyledUl>
            <StyledLiCard></StyledLiCard>
            <StyledLiCard></StyledLiCard>
            <StyledLiCard></StyledLiCard>
            <StyledLiCard></StyledLiCard>
          </StyledUl>
        </DetailsSection>
      </CenterContent>
    </Wrapper>
  );
};

export default cursodemicroblading;
