import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import styled from "styled-components";

const Modal = ({ show, onClose, children, title, data }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const { name, disponibilidad, date, maxStudents, place, price, time } = data;
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
          <span>
            <b>Modalidad: </b>
            {name}
          </span>
          <br />
          <span>
            <b>Disponibilidad: </b>
            {disponibilidad ? "Si" : "No"}
          </span>
          <br />
          <span>
            <b>Fecha: </b>
            {date}
          </span>
          <br />
          <span>
            <b>Capacidad: </b>
            {maxStudents}
          </span>
          <br />
          <span>
            <b>Inversion: </b>
            {price}
          </span>
          <br />
          <span>
            <b>Lugar: </b>
            {place}
          </span>
          <br />
          <span>
            <b>Horario: </b>
            {time}
          </span>
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

const StyledModalBody = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
  > a {
    font-size: 0.7em;
    background-color: #2a2a2a;
    border-radius: 50px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    text-decoration: none;
  }
`;

const StyledModal = styled.div`
  background: white;
  width: 65%;
  height: 400px;
  border-radius: 25px;
  padding: 2em;
`;
const StyledModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default Modal;
