import React, {useEffect} from "react";
import {Container, Row, Col} from "react-bootstrap";
import Sidebar from "../components/common/Side";
import styled from "styled-components";
import * as authActions from '../store/actions/auth';
import {useDispatch, useSelector} from 'react-redux'

const Logo = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 400px;
  height: 270px;
  background-image: url(${(props) => (props.imageUrl ? props.imageUrl : "")});
  background-repeat: no-repeat;
  background-size: cover;
`;

const admin = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);

  useEffect(() => {
    if (isLoading) {
      dispatch(authActions.loadingOff());
    }
  }, [isLoading]);

    return (
        <>
         	<Container fluid>
                <Row>
                    <Col xs={2}>      
                      <Sidebar />
                    </Col>
                    <Col  xs={10} style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Logo imageUrl={"/img/logo.png"} />
                    </Col> 
                </Row>

            </Container>
        </>
        );
  };
  export default admin