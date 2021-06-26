import React from "react";
import CourseCard from "../common/CourseCard";
import coursesData from "../../content/My-JSON-Content.json";
import {
  Wrapper,
  MainTitle,
  CenterContent,
  Subtitle,
} from "../common/StyledComponents/Styles";
import styled from "styled-components";

const CardWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const CursosComponent = () => {
  const coursesCards = coursesData.courses.map((course, i) => {
    return (
      <CourseCard
        key={course.id}
        name={course.name}
        price={course.price}
        date={course.modalidades[0].date}
        place={course.place}
        description={course.description}
        index={i + 1}
        path={course.path}
        img={course.courseImage}
      />
    );
  });

  return (
    <Wrapper id="cursos">
      <CenterContent>
        <MainTitle>MICROBLADING ACADEMY</MainTitle>
        <Subtitle>Cursos presenciales</Subtitle>
        <CardWrapper>{coursesCards}</CardWrapper>
      </CenterContent>
    </Wrapper>
  );
};
export default CursosComponent;
