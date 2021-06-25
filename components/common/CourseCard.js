import React from "react";
import styled from "styled-components";
import { ALink } from "./StyledComponents/Styles";
import Link from "next/link";
import Image from "next/image";

const StyledCard = styled.div`
  /* NEOMORFISM */
  border-radius: 50px;
  /* background: #e0e0e0; */
  box-shadow: -20px -20px 60px #bebebe, 20px 20px 60px #ffffff;
  /* NEOMORFISM END */
  width: 300px;
  min-height: 300px;
  padding: 0px;
  margin-bottom: 50px;
  margin-top: 50px;
  margin-right: 20px;
  margin-left: 20px;
`;

const CardTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 130px;
  border-radius: 50px 50px 0px 0px;
  background-color: #2a2a2a;
  position: relative;

  &:after {
    border-radius: 50px 50px 0px 0px;
    display: block;
    position: absolute;
    content: "";
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
  }
`;

const CardTitle = styled.h2`
  color: #fff;
  z-index: 1000;
  font-size: 1.6em;
  margin: 0;
  padding: 0 40px;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
`;

const CardBody = styled.div`
  display: flex;
  padding: 20px 30px;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const LinkWrap = styled.div`
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  > a {
    display: flex;
    height: 100%;
    align-items: center;
    text-decoration: none;
    color: #2a2a2a;
    font-weight: bold;

    &:hover {
      font-size: 1.1em;
      text-decoration: underline;
    }
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
`;

const CourseCard = ({
  name,
  price,
  place,
  date,
  description,
  teacher,
  path,
  index,
  modalidad,
  img,
}) => {
  return (
    <StyledCard>
      <CardTitleContainer>
        <ImageWrapper>
          <Image src={img} alt="ring" width="120" height="120" />
        </ImageWrapper>
        <CardTitle>{name}</CardTitle>
      </CardTitleContainer>
      <CardBody>
        <p>{description}</p>
        <b>Fecha:</b>
        <small>{date}</small>
        <LinkWrap>
          <Link href={path}>{"> Ver Detalles"}</Link>
        </LinkWrap>
      </CardBody>
    </StyledCard>
  );
};

export default CourseCard;
