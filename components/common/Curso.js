import React, { useState } from "react";
import {
  Wrapper,
  MainTitle,
  CenterContent,
  Button,
  StyledUl,
  StyledLiCard,
  GoUpButton,
  FeaturedLiCard,
} from "../../components/common/StyledComponents/Styles";
import styled from "styled-components";
import Modal from "../../components/common/Modal";
import Image from "next/image";

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
const GoUpWrapper = styled.div`
  display: flex;
  width: 40%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SideBySide = styled.div`
  margin-top: 50px;
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 50px;
`;

const Curso = ({ data }) => {
  const curso = data;
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
          {modalidad.featured ? (
            <FeaturedLiCard>★ Popular ★</FeaturedLiCard>
          ) : (
            ""
          )}
        </StyledLiCard>
      </StyledA>
    );
  });
  return (
    <Wrapper>
      <CenterContent id="modalidades">
        <MainTitle>{curso.name}</MainTitle>
        <DetailsSection>
          <h4>Modalidades disponibles</h4>
          <small>👇 Haz click para ver detalle, fecha y valores👇</small>
          <StyledUl style={{ marginBottom: "50px" }}>{modalidadCards}</StyledUl>
          <hr />
          <h4>Te explico de que se trata el curso 😊👇</h4>
          <iframe
            src="https://www.youtube-nocookie.com/embed/tzYylHyaerw"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <br />
          <br />
          <hr />
          <h4>{curso.details.section0.heading}</h4>
          <P>{curso.details.section0.content}</P>
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
            {curso.details.section2.bullets.map((el, i) => {
              return <li key={el}>{el}</li>;
            })}
          </StyledUlList>
          <br />
          <br />
          <hr />
          <h4>{curso.details.section3.heading}</h4>
          <StyledUlList>
            {curso.details.section3.bullets.map((el) => {
              return <li key={el}>{el}</li>;
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
            <Image src="/img/webpay.png" width="70" height="40" />
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
          </StyledUlList>
          <SideBySide>
            <Button
              target="_blank"
              rel="noreferrer"
              href="https://api.whatsapp.com/send?phone=56949363030&text=Hola necesito asistencia con el curso de microblading"
            >
              Necesito ayuda
            </Button>
            <GoUpWrapper>
              <GoUpButton href="#modalidades">↑</GoUpButton>

              <small style={{ color: "lightgray", marginTop: "7px" }}>
                Ir arriba
              </small>
            </GoUpWrapper>
          </SideBySide>
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

export default Curso;
