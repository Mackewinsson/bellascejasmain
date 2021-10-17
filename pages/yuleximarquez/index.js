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
  width: 70px;
  height: 70px;
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

const yuleximarquez = () => {
  return (
    <>
      <Wrapper>
        <SectionWrapper>
          <ColorTitle>Microblading</ColorTitle>
          <SectionSubtile>Tus cejas siempre perfectas</SectionSubtile>
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
          <PointList>
            <Point>Primer punto</Point>
            <Point>Primer punto</Point>
            <Point>Primer punto</Point>
          </PointList>
          <ButtonWrapper>
            <StyledButton color="black">Mas info</StyledButton>
            <StyledButton color="#ae9754" bg="#2a2a2a">
              Tomar cita
            </StyledButton>
          </ButtonWrapper>
        </SectionWrapper>
        <CenterContent>
          <ProfilePhoto imageUrl={"/img/yulexiperfil.png"} />
          <InlineWidget url="https://calendly.com/yuleximarquez/microblading-a-domicilio" />
        </CenterContent>
      </Wrapper>
    </>
  );
};

export default yuleximarquez;
