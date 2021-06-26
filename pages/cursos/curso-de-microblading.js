import React, { useState } from "react";
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
import Modal from "../../components/common/Modal";

import coursesData from "../../content/My-JSON-Content.json";

const StyledA = styled.a`
  padding: 0px;
  margin: 0px;
  text-decoration: none;
`;

const cursodemicroblading = () => {
  const curso = coursesData.courses[0];
  const modalidades = curso.modalidades;
  const [showModal, setShowModal] = useState(false);
  const [modalidad, setModalidad] = useState({});

  const modalidadCards = modalidades.map((modalidad) => {
    return (
      <StyledA
        href="#"
        onClick={() => {
          setShowModal(true);
          setModalidad(modalidad);
        }}
        key={modalidad._ID}
      >
        <StyledLiCard>
          <h4 style={{ paddingRight: "0.1em", paddingLeft: "0.1em" }}>
            {modalidad.name}
          </h4>
        </StyledLiCard>
      </StyledA>
    );
  });

  return (
    <Wrapper>
      <CenterContent>
        <MainTitle>Curso de Microblading</MainTitle>
        <DetailsSection>
          <h4>Modalidades</h4>
          <h7>👇 Haz click en cada uno para ver detalles 👇</h7>
          <StyledUl>{modalidadCards}</StyledUl>
        </DetailsSection>
      </CenterContent>
      <Modal
        onClose={() => setShowModal(false)}
        show={showModal}
        data={modalidad}
      ></Modal>
    </Wrapper>
  );
};

export default cursodemicroblading;
