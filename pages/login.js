import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SweetAlert2 from 'react-sweetalert2';
import * as authActions from '../store/actions/auth';
import {
  CenterContent,
  MainTitle,
} from "../components/common/StyledComponents/Styles";
import { useRouter } from 'next/router'

import {useDispatch, useSelector} from 'react-redux'

const login = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);
  const errorAuth = useSelector(state => state.auth.errorAuth);
  const [swalProps, setSwalProps] = useState({});
  const router = useRouter()
  const user = useSelector(state => state.user.user);
  const [email, setEmail] = useState("peds.gado@gmail.com");
  const [password, setPassword] = useState("12345678");

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(authActions.signin(email, password));
    setEmail("")
    setPassword("")
  };

  useEffect(() => {
    if (user && user.email) {
      if (user.rol == "client") {
        router.push("/courses")
      } else {
        router.push("/admin")
      }
    }
  }, [user]);

  useEffect(() => {
    if(errorAuth) {
      setSwalProps({
          show: false,
          title: "",
          html: "",
          showConfirmButton: true,
          allowOutsideClick: true,
      }); 
      let timer = setInterval(function(){
          setSwalProps({
              show: true,
              title: '¡Atención',
              text: errorAuth,
              icon:'error'
          });
          dispatch(authActions.deleteError())
          clearInterval(timer)
        },100);
  }
  }, [errorAuth]);

  if (isLoading) {
    return <div style={{width: '100%', height: '100%', display: 'flex' ,justifyContent: 'center', alignItems: 'center', fontSize: 40}}>Loading...</div>
  }

  return (
    <CenterContent>
      <SweetAlert2 {...swalProps} 
          onConfirm={result => {
              setSwalProps({
                  show: false,
                  title: '',
                  text: '',
                  icon:''
              }); 
          }}
      />
      <MainTitle>Iniciar Sesión</MainTitle>
      <Form onSubmit={onSubmit}>
        <label htmlFor="email">Email:</label>
        <Input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="email">Password:</label>
        <Input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton type="submit" />
      </Form>
    </CenterContent>
  );
};

export default login;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  width: 60%;
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
