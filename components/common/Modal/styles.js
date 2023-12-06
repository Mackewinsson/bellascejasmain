import styled from "styled-components";

export const GiftWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  > h4 {
    margin-bottom: 0;
  }
  > h5 {
    margin-top: 0;
  }
`;
export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const StyledModalBody = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
  > a {
    font-size: 0.6em;
    background-color: #2a2a2a;
    border-radius: 50px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    text-decoration: none;
  }
`;

export const StyledModal = styled.div`
  background: white;
  width: 70%;
  min-height: 300px;
  border-radius: 25px;
  padding: 2em;
`;

export const StyledModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;
