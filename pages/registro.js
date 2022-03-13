import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import {
  CenterContent,
  MainTitle,
} from "../components/common/StyledComponents/Styles";
import { useAuth } from "../context/authContext";

const registro = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(email, password);
  };

  useEffect(() => {}, []);
  const { user } = useAuth();
  console.log(user);
  return (
    <CenterContent>
      <MainTitle>Registrate</MainTitle>
      <Form onSubmit={onSubmit}>
        <label htmlFor="name">Nombre:</label>
        <Input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="lastname">Apellido:</label>
        <Input
          type="text"
          id="lastname"
          name="lastname"
          onChange={(e) => setLastname(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <Input
          type="email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="email">Create your password:</label>
        <Input
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton type="submit" />
      </Form>
    </CenterContent>
  );
};

export default registro;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  width: 70%;
  align-items: center;
  justify-content: center;
  height: 50%;
  border-radius: 10px;
  background-color: lightgray;
`;

const Input = styled.input`
  height: 30px;
  border-radius: 15px;
  margin-bottom: 20px;
  padding-left: 10px;
  width: 80%;
`;

const SubmitButton = styled.input`
  height: 40px;
  background-color: gray;
  border-radius: 15px;
  font-weight: bold;
  width: 80%;
  margin-top: 20px;
`;
