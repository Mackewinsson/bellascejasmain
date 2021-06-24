import React from "react";
import Image from "next/image";
import styled from "styled-components";

const ImageWrapperMobileShow = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
`;

const Ring = styled.div`
  position: absolute;
  top: -20px;
  left: 70px;
`;

const Cone = styled.div`
  position: absolute;
  top: 150px;
  right: 0px;
`;
const Cube = styled.div`
  position: absolute;
  top: 550px;
  left: 120px;
`;

const ImageWrapperMobile = () => {
  return (
    <ImageWrapperMobileShow>
      <Ring>
        <Image src="/img/ring.png" alt="ring" width="100" height="100" />
      </Ring>
      <Cone>
        <Image src="/img/cone.png" alt="cone" width="80" height="80" />
      </Cone>
      <Cube>
        <Image src="/img/cube.png" alt="cube" width="100" height="100" />
      </Cube>
    </ImageWrapperMobileShow>
  );
};

export default ImageWrapperMobile;
