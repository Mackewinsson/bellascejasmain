import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CardBody,
  CardTitle,
  CardTitleContainer,
  ImageWrapper,
  LinkWrap,
  StyledCard,
} from "./styles";

const CourseCard = ({ name, date, description, path, img }) => {
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
        <LinkWrap>
          <Link href={path}>{"> Ver detalles"}</Link>
        </LinkWrap>
      </CardBody>
    </StyledCard>
  );
};

export default CourseCard;
