import React, {useState} from "react";
import {Nav} from "react-bootstrap";
import styled from "styled-components";
import {useDispatch} from 'react-redux'
import * as authActions from '../../store/actions/auth';
import { useRouter } from 'next/router'

const WrapperLogout = styled.a`
  display: flex;
  color: #02748c;
  padding: 0.5rem 1rem;
  cursor: pointer;
  :hover {
    color: #02748c;
  }
`;

const Side = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const [isSelected, setSelected] = useState(window.location.pathname);
    const onPress = async () => {
        await dispatch(authActions.signout());
        router.push("/")
    };

    return (
        <>
    
            <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
            activeKey={isSelected}
            onSelect={(selectedKey) => setSelected(selectedKey)}
            >
                <div className="sidebar-sticky"></div>
                <Nav.Item>
                    <Nav.Link href="/admin" style={{color: isSelected == "/admin" ? '#5c5f64' : '#02748c'}}>Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/cursosAdmin" style={{color: isSelected == "/cursosAdmin" ? '#5c5f64' : '#02748c'}}>Courses</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/modulesAdmin" style={{color: isSelected == "/modulesAdmin" ? '#5c5f64' : '#02748c'}}>Modules</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/classesAdmin" style={{color: isSelected == "/classesAdmin" ? '#5c5f64' : '#02748c'}}>Classes</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/quizesAdmin" style={{color: isSelected == "/quizesAdmin" ? '#5c5f64' : '#02748c'}}>Quizes</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/paymentAdmin" style={{color: isSelected == "/paymentAdmin" ? '#5c5f64' : '#02748c'}}>Payments</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/questionsAdmin" style={{color: isSelected == "/questionsAdmin" ? '#5c5f64' : '#02748c'}}>Questions</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <WrapperLogout onClick={onPress}> Cerrar sesión </WrapperLogout>
                </Nav.Item>
            </Nav>
          
        </>
        );
  };
  export default Side