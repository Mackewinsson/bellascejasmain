import React, {useEffect} from 'react'
import * as servicesActions from "../store/actions/services";
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { CenterContent, Wrapper } from '../components/common/StyledComponents/Styles';

const servicios = () => {

    const dispatch = useDispatch();
    const {services} = useSelector(state => state.services)
    console.log(services);

useEffect(() => {
    dispatch(servicesActions.getServices())
}, [])


  return (
    <>
        <Title>Lista de Servicios</Title>
        <Container>
        <ul>
        {(services || []).map((el)=> (
            <li key={el.title}><small>{el.title} · <strong>{el.price}</strong></small></li>
        ))}
        </ul>
        </Container>
        <LinkWrapper>
            <a href='https://api.whatsapp.com/send?phone=56981491853&text=Hola%20tengo%20preguntas%20sobre%20los%20servicios%20de%20bellas%20cejas'>Preguntas y reservas</a>
        </LinkWrapper>
    </>
  )
}

export default servicios

const Title = styled.h2`
  margin-top: 50px;
  margin-bottom: 50px;
  text-align: center;
`;

const Container = styled.div`
  padding: 0px 10px;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
`;