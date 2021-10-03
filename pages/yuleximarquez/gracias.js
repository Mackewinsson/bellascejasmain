import React from "react";
import {
  Wrapper,
  CenterContent,
  MainTitle,
} from "../../components/common/StyledComponents/Styles";
import styled from "styled-components";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfilePhoto = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-image: url(${(props) => (props.imageUrl ? props.imageUrl : "")});
  background-repeat: no-repeat;
  background-size: cover;
`;
const gracias = () => {
  return (
    <Wrapper>
      <CenterContent style={{ flex: 1, justifyContent: "center" }}>
        <ProfilePhoto imageUrl={"/img/yulexiperfil.png"} />
        <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 50 }} />
        <MainTitle style={{ marginTop: 10 }}>
          Tu reserva ha sido tomada con exito
        </MainTitle>
        <p>
          Si tienes dudas puedes comunicarte al{" "}
          <a href="tel:+56990422712">+56990422712</a>
        </p>
      </CenterContent>
    </Wrapper>
  );
};

export default gracias;
