import React from "react";

import { LoggedOut } from "../components/principal/LoggedOut";
import { LoggedIn } from "../components/principal/LoggedIn";

import { useSelector } from "react-redux";

const index = () => {
  const user = useSelector((state) => state.user.user);
  if (user) {
    return <LoggedIn />;
  }
  return <LoggedOut />;
};

export default index;
