import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Button } from "../StyledComponents/Styles";
import Image from "next/image";
import {
  ButtonWrapper,
  GiftWrapper,
  StyledModal,
  StyledModalBody,
  StyledModalHeader,
  StyledModalOverlay,
} from "./styles";

const Modal = ({ show, onClose, children, title, data }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const {
    name,
    disponibilidad,
    date,
    maxStudents,
    place,
    price,
    time,
    daysOfAccess,
    featured,
    flow,
    onlineCourse,
  } = data;
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalHeader>
          <a href="#" onClick={handleCloseClick}>
            x
          </a>
        </StyledModalHeader>
        {title && <StyledModalTitle>{title}</StyledModalTitle>}
        <StyledModalBody>
          {/* CONTENIDO DE EL MODAL */}
          {children}
          <h4
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              marginBottom: "5px",
            }}
          >
            <b>Modalidad {name}</b>
          </h4>
          {onlineCourse ? (
            <small style={{ marginBottom: "1em", textAlign: "center" }}>
              * Solo disponible en Chile
            </small>
          ) : (
            ""
          )}
          <br />
          <span>
            <b>Disponibilidad: </b>
            {disponibilidad === true ? (
              <span style={{ color: "green", fontWeight: "bold" }}>
                Disponible
              </span>
            ) : (
              <span style={{ color: "red", fontWeight: "bold" }}>
                No disponible
              </span>
            )}
          </span>
          <span>
            <b>Fecha: </b>
            {date}
          </span>
          <span>
            <b>Capacidad: </b>
            {maxStudents}
          </span>
          <span>
            <b>Duración: </b>
            {daysOfAccess}
          </span>
          <span>
            <b>Inversion: </b>
            {price}
          </span>
          <span>
            <b>Lugar: </b>
            {place}
          </span>
          <span>
            <b>Horario: </b>
            {time}
          </span>

          {onlineCourse && (
            <GiftWrapper>
              <h4>Regalo 🎁</h4>
              <h5>🎉Curso online por 6 meses 🥳</h5>
            </GiftWrapper>
          )}
          {name === "Online PRO" && (
            <GiftWrapper>
              <h4>Regalo 🎁</h4>
              <h5>Acompañamiento personalizado por 3 meses via whatsapp</h5>
            </GiftWrapper>
          )}
          <ButtonWrapper>
            {onlineCourse ? (
              <Button marginTop href={flow}>
                Reservar cupo
              </Button>
            ) : (
              <>
                <Button marginTop href={flow}>
                  Comprar curso
                </Button>
                <br />
                <Image src="/img/webpay.png" width="70" height="40" />
              </>
            )}
          </ButtonWrapper>
        </StyledModalBody>
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

export default Modal;
