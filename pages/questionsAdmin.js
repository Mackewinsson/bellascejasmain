import React, {useEffect, useState} from "react";
import {Container, Row, Col, Modal, Button, Form, Spinner } from "react-bootstrap";
import Sidebar from "../components/common/Side";
import DataTable from "../components/common/Table";
import * as questionsActions from '../store/actions/questions';
import {useDispatch, useSelector} from 'react-redux'
import SweetAlert2 from 'react-sweetalert2';

const questionsAdmin = () => {
    const dispatch = useDispatch();
    const isLoadingData = useSelector(state => state.questions.loadingData);
    const [swalProps, setSwalProps] = useState({});
    const isLoading = useSelector(state => state.questions.loading);
    const errorQE = useSelector(state => state.questions.errorQE);
    const questions = useSelector(state => state.questions.questions);
    const [isData, setData] = useState([]);
    const isHeader = [{text: 'Date', key: 'date'}, {text: 'User', key: 'user'}, {text: 'Dni', key: 'dni'}, {text: 'Question', key: 'question'}];

    useEffect(() => {
        dispatch(questionsActions.getQuestions())
    }, []);

    useEffect(() => {
        if(errorQE) {
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
                    text: errorQE,
                    icon:'error'
                });
                dispatch(questionsActions.deleteError())
                clearInterval(timer)
              },100);
        }
    }, [errorQE]);

    useEffect(() => {
        if (questions && questions.length > 0) {
            let info = []
            setData([])
            questions.forEach(el=>{
                info.push({
                    date: el.date,
                    user: el.user,
                    dni: el.dni,
                    question: el.question
                })
            })
            setData(info)
        }
    }, [questions]);

    useEffect(() => {
        if (isLoadingData == "0") {
            setSwalProps({
                show: false,
                title: "",
                html: "",
                showConfirmButton: true,
                allowOutsideClick: true,
            });
        }
    }, [isLoadingData]);


    return (
        <>
         <Container fluid>
                <Row>
                    <Col xs={2}>      
                      <Sidebar />
                    </Col>
                    <Col xs={10} style={{marginTop: '40px'}}>
                        {isLoading ? (
                            <div style={{width: '100%', height: '100%', display: 'flex' ,justifyContent: 'center', alignItems: 'center', fontSize: 40}}>Loading...</div>
                        ) : (
                            <>
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
                                <DataTable headers={isHeader} data={isData} onClickV={null} onClickE={null} onClickD={null} />
                            </>
                        )}
                    </Col> 
                </Row>

            </Container>
        </>
        );
  };
  export default questionsAdmin