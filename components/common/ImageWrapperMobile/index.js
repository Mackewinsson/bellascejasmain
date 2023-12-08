import React from "react";
import Image from "next/image";
import { Cone, Cube, ImageWrapperMobileShow, Ring } from "./styles";

const ImageWrapperMobile = () => {
  return (
    <ImageWrapperMobileShow>
      <Ring>
        <Image src="/img/ring.png" alt="ring" width="80" height="80" />
      </Ring>
      <Cone>
        <Image src="/img/cone.png" alt="cone" width="80" height="80" />
      </Cone>
      <Cube>
        <Image src="/img/cube.png" alt="cube" width="80" height="80" />
      </Cube>
    </ImageWrapperMobileShow>
  );
};

export default ImageWrapperMobile;
