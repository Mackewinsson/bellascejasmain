import React, { useEffect } from "react";
import * as servicesActions from "../store/actions/services";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const servicios = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(servicesActions.getServices());
  }, []);

  const renderList = () => {
    return (
      <Container>
        {Object.keys(services).map((el) => {
          return (
            <div key={el}>
              <h4>{el.charAt(0).toUpperCase() + el.slice(1)}</h4>
              <ul>
                {(services[el] || []).map((section) => {
                  return (
                    <li key={section.title}>
                      <small>
                        {section.title} · <strong>{section.price}</strong>
                      </small>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </Container>
    );
  };

  return (
    <>
      <Title>Lista de Servicios</Title>
      {renderList()}
      <LinkWrapper>
        <a href="https://api.whatsapp.com/send?phone=56981491853&text=Hola%20tengo%20preguntas%20sobre%20los%20servicios%20de%20bellas%20cejas">
          Preguntas y reservas
        </a>
      </LinkWrapper>
    </>
  );
};

export default servicios;

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
  margin-bottom: 50px;
`;
