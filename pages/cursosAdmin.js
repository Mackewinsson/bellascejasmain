import React from "react";
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Sidebar from "../components/common/Side";

const cursosAdmin = () => {
   

    return (
        <>
         <Container fluid>
                <Row>
                    <Col xs={2}>      
                      <Sidebar />
                    </Col>
                    <Col  xs={10}>
                        this is a test
                    </Col> 
                </Row>

            </Container>
        </>
        );
  };
  export default cursosAdmin