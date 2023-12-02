import React, { useState, useEffect } from "react";
import SweetAlert2 from "react-sweetalert2";
import * as authActions from "../store/actions/auth";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Image from "next/image";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const login = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const errorAuth = useSelector((state) => state.auth.errorAuth);
  const [swalProps, setSwalProps] = useState({});
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(authActions.signin(email, password));
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (user && user.email) {
      if (user.rol == "client") {
        router.push("/courses");
      } else {
        router.push("/admin");
      }
    }
  }, [user]);

  useEffect(() => {
    if (errorAuth) {
      setSwalProps({
        show: false,
        title: "",
        html: "",
        showConfirmButton: true,
        allowOutsideClick: true,
      });
      let timer = setInterval(function () {
        setSwalProps({
          show: true,
          title: "¡Atención",
          text: errorAuth,
          icon: "error",
        });
        dispatch(authActions.deleteError());
        clearInterval(timer);
      }, 100);
    }
  }, [errorAuth]);

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 40,
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <>
      <SweetAlert2
        {...swalProps}
        onConfirm={(result) => {
          setSwalProps({
            show: false,
            title: "",
            text: "",
            icon: "",
          });
        }}
      />

      <div className="login template d-flex justify-content-center align-items-center vh-100 bg-secondary-subtle">
        <div className="p-4 rounded bg-white">
          <Container>
            <Row>
              <Image
                width={250}
                height={250}
                src="/img/logo10.png"
                alt="Logo"
              />
            </Row>
          </Container>
          <Form onSubmit={onSubmit}>
            <h1 className="text-center h3">Iniciar Sesión</h1>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label htmlFor="email">Email:</Form.Label>
              <Form.Control
                placeholder="Enter email"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label htmlFor="email">Password:</Form.Label>
              <Form.Control
                placeholder="Password"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div className="d-grid">
              <Button type="submit" variant="dark">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default login;
