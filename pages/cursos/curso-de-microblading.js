import React from "react";
import coursesData from "../../content/My-JSON-Content.json";
import Curso from "../../components/common/Curso";

const cursodemicroblading = () => {
  return <Curso data={coursesData.courses[0]} />;
};

export default cursodemicroblading;
