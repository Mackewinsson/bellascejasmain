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

const MainTitleCourse = styled.h1`
  @media (min-width: 768px) {
    margin-top: 100px;
    font-size: 4em;
  }
`;
const DetailsSection = styled.div``;
const P = styled.p`
  text-align: justify;
`;

const StyledUlList = styled.ul`
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
const GoUpWrapper = styled.div`
  display: flex;
  width: 40%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (min-width: 768px) {
    width: 20%;
  }
`;

const SideBySide = styled.div`
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

const StyledH4 = styled.h4`
  @media (min-width: 768px) {
    font-size: 2em;
  }
`;

const VideoWrapper = styled.div`
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

const SectionWrapper = styled.div`
  @media (min-width: 768px) {
    padding-bottom: 50px;
  }
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
        <MainTitleCourse>{curso.name}</MainTitleCourse>
        <DetailsSection>
          <StyledH4>Modalidades disponibles</StyledH4>
          <small>👇 Haz click para ver detalle, fecha y valores👇</small>
          <StyledUl style={{ marginBottom: "50px" }}>{modalidadCards}</StyledUl>
          <hr />
          <SectionWrapper>
            <StyledH4>Te explico de que se trata el curso 😊👇</StyledH4>
            <VideoWrapper>
              <iframe
                src="https://www.youtube-nocookie.com/embed/tzYylHyaerw"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </VideoWrapper>
          </SectionWrapper>
          <hr />
          <SectionWrapper>
            <StyledH4>{curso.details.section0.heading}</StyledH4>
            <P>{curso.details.section0.content}</P>
          </SectionWrapper>
          <hr />
          <SectionWrapper>
            <StyledH4>{curso.details.section1.heading}</StyledH4>
            <StyledUlList>
              {curso.details.section1.bullets.map((el, i) => {
                return (
                  <li key={el} className="text-justify">
                    {el}
                  </li>
                );
              })}
            </StyledUlList>
          </SectionWrapper>
          <hr />
          <SectionWrapper>
            <StyledH4>{curso.details.section2.heading}</StyledH4>
            <StyledUlList>
              {curso.details.section2.bullets.map((el, i) => {
                return <li key={el}>{el}</li>;
              })}
            </StyledUlList>
          </SectionWrapper>
          <hr />
          <SectionWrapper>
            <StyledH4>{curso.details.section3.heading}</StyledH4>
            <StyledUlList>
              {curso.details.section3.bullets.map((el) => {
                return <li key={el}>{el}</li>;
              })}
            </StyledUlList>
            <small>
              * El kit esta incluido en modalidad presencial y personalizado
            </small>
          </SectionWrapper>
          <hr />
          <SectionWrapper>
            <StyledH4>Instrucciones para reservar</StyledH4>
            <StyledUlList style={{ listStyle: "decimal" }}>
              <li>
                Leer los detalles de la modalidad que mas te acomode, es decir;
                presencial, personalizado, online y online pro
              </li>
              <li>
                Cuando estes lista para reservar, dentro de cada modalidad hay
                un boton que dice <b>reservar cupo</b>. debes hacer click ahi.
              </li>
              <li>
                <span style={{ marginRight: "20px" }}>
                  Luego llegaras a la pasarela de pago FLOW / WEBPAY.
                </span>
                <Image src="/img/webpay.png" width="70" height="40" />
              </li>

              <li>Elige tu forma de pago preferida y sigue los pasos.</li>
              <li>
                Una vez completada la compra debes tomar una captura de
                pantalla.
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
          </SectionWrapper>
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
