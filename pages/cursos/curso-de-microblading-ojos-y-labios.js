import React from "react";
import coursesData from "../../content/My-JSON-Content.json";
import Curso from "../../components/common/Curso";

const cursodemicrobladingojosylabios = () => {
  return <Curso data={coursesData.courses[1]} />;
};

export default cursodemicrobladingojosylabios;
