import React, { useState } from "react";
import {
  Wrapper,
  MainTitle,
  CenterContent,
  Button,
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

const DetailsSection = styled.div``;
const P = styled.p`
  text-align: justify;
`;

const StyledUlList = styled.ul`
  padding-left: 20px;
  text-align: left;

  > li {
    margin-top: 15px;
  }
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
          <h4>Modalidades disponibles</h4>
          <small>👇 Haz click para ver detalle, fecha y valores👇</small>
          <StyledUl style={{ marginBottom: "50px" }}>{modalidadCards}</StyledUl>
          <hr />
          <h4>¿Qué es el microblading?</h4>
          <P>
            El microblading es la técnica de maquillaje permanente mas demandada
            y lucrativa en la actualidad. En este curso aprenderás la técnica de
            microblading para la construcción parcial o total de cejas pelo a
            pelo. Mediante un lenguaje ameno y cercano podrás ir descubriendo
            cada una de las secciones de aprendizaje que hemos diseñado
            especialmente para ti
          </P>
          <br />
          <br />
          <hr />
          <h4>{curso.details.section1.heading}</h4>
          <StyledUlList>
            {curso.details.section1.bullets.map((el, i) => {
              return (
                <li key={el} className="text-justify">
                  {el}
                </li>
              );
            })}
            <br />
            <br />
            <hr />
          </StyledUlList>
          <h4>{curso.details.section2.heading}</h4>
          <StyledUlList>
            {curso.details.section1.bullets.map((el, i) => {
              return <li key={el}>{el}</li>;
            })}
          </StyledUlList>
          <br />
          <br />
          <hr />
          <h4>{curso.details.section3.heading}</h4>
          <StyledUlList>
            {curso.details.section3.bullets.map((el) => {
              return (
                <li className="text-justify" key={el}>
                  {el}
                </li>
              );
            })}
          </StyledUlList>
          <small>
            * El kit esta incluido en modalidad presencial y personalizado
          </small>
          <br />
          <br />
          <hr />
          <h4>Instrucciones para reservar</h4>
          <StyledUlList style={{ listStyle: "decimal" }}>
            <li>
              Leer los detalles de la modalidad que mas te acomode, es decir;
              presencial, personalizado, online y online pro
            </li>
            <li>
              Cuando estes lista para reservar, dentro de cada modalidad hay un
              boton que dice <b>reservar cupo</b>. debes hacer click ahi.
            </li>
            <li>Luego llegaras a la pasarela de pago FLOW / WEBPAY.</li>
            <li>Elige tu forma de pago preferida y sigue los pasos.</li>
            <li>
              Una vez completada la compra debes tomar una captura de pantalla.
            </li>
            <li>
              Enviar captura de pantalla junto con tu nombre completo, rut y
              correo electronico a este numero: +56949363030.
            </li>
            <li>
              Si ya terminaste de hacer el pago o si tienes dudas puedes usar
              este boton de asistencia para ser atendida
            </li>
            <Button>Necesito ayuda</Button>
          </StyledUlList>
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
