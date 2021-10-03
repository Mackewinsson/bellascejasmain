import React from "react";
import {
  Wrapper,
  CenterContent,
} from "../../components/common/StyledComponents/Styles";
import styled from "styled-components";
import { InlineWidget } from "react-calendly";

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
const yuleximarquez = () => {
  return (
    <Wrapper>
      <CenterContent>
        <ProfilePhoto imageUrl={"/img/yulexiperfil.png"} />
        <InlineWidget url="https://calendly.com/yuleximarquez/microblading-a-domicilio" />
      </CenterContent>
    </Wrapper>
  );
};

export default yuleximarquez;
