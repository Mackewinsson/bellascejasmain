import React from "react";
import coursesData from "../../content/My-JSON-Content.json";
import Curso from "../../components/common/Curso";

const cursodeextensionesdepestanas = () => {
  return <Curso data={coursesData.courses[2]} />;
};

export default cursodeextensionesdepestanas;
