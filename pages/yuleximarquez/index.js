import React from "react";
import {
  Wrapper,
  CenterContent,
  ColorTitle,
  SectionSubtile,
  StyledButton,
} from "../../components/common/StyledComponents/Styles";
import styled from "styled-components";
import { InlineWidget } from "react-calendly";
import Image from "next/image";

const ProfilePhoto = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  width: ${(props) => (props.size ? props.size : "70px")};
  height: ${(props) => (props.size ? props.size : "70px")};
  border-radius: 50%;
  background-image: url(${(props) => (props.imageUrl ? props.imageUrl : "")});
  background-repeat: no-repeat;
  background-size: cover;
`;

const SectionWrapper = styled.div`
  width: 100%;
  height: auto;

  > div > .section1 {
    border-radius: 25%;
  }
`;

const ImageCard = styled.div`
  width: 100%;
  height: 150px;
  background-color: lightgray;
  border-radius: 30px;
  position: relative;

  > div > img {
    border-radius: 25px;
  }
`;

const GalleryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const GalleryImg = styled.div`
  width: 48%;
  height: 100px;
  background-color: lightgray;
  border-radius: 30px;
  margin-top: 10px;
  position: relative;

  > div > img {
    border-radius: 25px;
  }
`;

const PointList = styled.ul`
  position: relative;
  list-style: none;
  margin-left: 0;
  padding-left: 1.2em;
`;

const Point = styled.li`
  :before {
    content: "✔";
    position: absolute;
    left: 0;
  }
`;

const YulexiMarquez = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  > h4 {
    margin-top: 0px;
    margin-bottom: 0px;
  }
`;

const Ul = styled(PointList)``;

const yuleximarquez = () => {
  return (
    <>
      <Wrapper>
        <SectionWrapper>
          <ColorTitle>Microblading</ColorTitle>
          <SectionSubtile>Tus cejas siempre perfectas</SectionSubtile>
          <YulexiMarquez>
            <ProfilePhoto imageUrl={"/img/yulexiperfil.png"} size="100px" />
            <NameWrapper>
              <h4>Yulexi Marquez 🇻🇪</h4>
              <small>Microblading Master</small>
            </NameWrapper>
          </YulexiMarquez>
          <Ul>
            <Point>Master en microblading en cejas, ojos y labios</Point>
            <Point>Master en micropigmentacion</Point>
            <Point>20 años de experiencia</Point>
          </Ul>
          <ButtonWrapper>
            <StyledButton
              color="black"
              href="https://instagram.com/bellascejascl"
            >
              Mis trabajos
            </StyledButton>
            <StyledButton color="#ae9754" bg="#2a2a2a" href="#reserva">
              Tomar cita
            </StyledButton>
          </ButtonWrapper>
          <br />
          <br />
          <ImageCard>
            <Image
              src="/img/IMG_2430.jpg"
              alt="ring"
              layout="fill"
              objectFit="cover"
            />
          </ImageCard>
          <GalleryWrapper>
            <GalleryImg>
              <Image
                src="/img/IMG_8324.jpg"
                alt="ring"
                layout="fill"
                objectFit="cover"
              />
            </GalleryImg>
            <GalleryImg>
              <Image
                src="/img/IMG_9383.jpg"
                alt="ring"
                layout="fill"
                objectFit="cover"
              />
            </GalleryImg>
          </GalleryWrapper>
          <br />
          <h4>El microblading es para ti si...</h4>
          <PointList>
            <Point>Tienes las cejas despobladas de cabello</Point>
            <Point>Tienes alopesia parcial o total en tus cejas</Point>
            <Point>Quieres lucir unas cejas hermosas y siempre listas</Point>
          </PointList>
          <ButtonWrapper>
            <StyledButton color="black" href="https://wa.link/1bm6yt">
              Mas info
            </StyledButton>
            <StyledButton color="#ae9754" bg="#2a2a2a" href="#reserva">
              Tomar cita
            </StyledButton>
          </ButtonWrapper>
        </SectionWrapper>
        <CenterContent id="reserva">
          <ProfilePhoto imageUrl={"/img/yulexiperfil.png"} />
          <InlineWidget url="https://calendly.com/yuleximarquez/microblading-a-domicilio" />
        </CenterContent>
        <br />
        <br />
        <br />
      </Wrapper>
    </>
  );
};

export default yuleximarquez;
