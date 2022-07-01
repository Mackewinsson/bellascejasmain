import React, {useEffect, useState} from "react";
import {Container, Row, Col, Modal, Button, Form, Spinner } from "react-bootstrap";
import Sidebar from "../components/common/Side";
import DataTable from "../components/common/Table";
import * as modulesActions from '../store/actions/modules';
import * as courseActions from '../store/actions/courses';
import {useDispatch, useSelector} from 'react-redux'
import styled from "styled-components";
import SweetAlert2 from 'react-sweetalert2';

const BtnNew = styled.button`
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-bottom: 20px;
  &:hover {
    background-color: white;
  }
`;

const modulesAdmin = () => {
    const dispatch = useDispatch();
    const isLoadingData = useSelector(state => state.modules.loadingData);
    const [swalProps, setSwalProps] = useState({});
    const isLoading = useSelector(state => state.modules.loading);
    const errorM = useSelector(state => state.modules.errorM);
    const modules = useSelector(state => state.modules.modules);
    const courses = useSelector(state => state.courses.courses);
    const [edit, setEdit] = useState(false);
    const [isData, setData] = useState([]);
    const [isDataSelect, setDataSelect] = useState([]);
    const [isDataFilter, setDataFilter] = useState([]);
    const [isSelectFilter, setSelectFilter] = useState("");
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [courseId, setCourseId] = useState("");
    const [order, setOrder] = useState(0);
    const [show, setShow] = useState(false);
    const isHeader = [{text: 'Id', key: 'id'}, {text: 'Course', key: 'course'},{text: 'Title', key: 'title'}, {text: 'Order', key: 'order'}];

    const handleClose = () => {
        setId("");
        setTitle("");
        setCourseId("");
        setOrder(0);
        setShow(false);
        setEdit(false);
    }
    const handleShow = () => setShow(true);

    useEffect(() => {
        dispatch(modulesActions.getModules())
        dispatch(courseActions.getCourses())
    }, []);

    useEffect(() => {
        if(errorM) {
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
                    text: errorM,
                    icon:'error'
                });
                dispatch(modulesActions.deleteError())
                clearInterval(timer)
              },100);
        }
    }, [errorM]);

    useEffect(() => {
        if (modules && modules.length > 0 && courses && courses.length > 0) {
            let info = []
            setData([])
            courses.forEach(el2=>{
                modules.forEach(el=>{
                    if (el2.id == el.courseId) {
                        info.push({
                            id: el.id,
                            course: el2.title,
                            title: el.title,
                            order: el.order
                        })
                    }
                })
            })
            setData(info)
        }
        if (courses && courses.length > 0) {
            let info = []
            let info2 = []
            setDataSelect([])
            setDataFilter([])
            info2.push({id: "", title: "All"})
            courses.forEach(el=>{
                info.push({
                    id: el.id,
                    title: el.title,
                })
                info2.push({
                    id: el.id,
                    title: el.title,
                })
            })
            setDataFilter(info2)
            setDataSelect(info)
        }
    }, [modules, courses]);

    useEffect(() => {
        if (isLoadingData == "0") {
            handleClose()
            setSelectFilter("")
            setSwalProps({
                show: false,
                title: "",
                html: "",
                showConfirmButton: true,
                allowOutsideClick: true,
            });
        }
    }, [isLoadingData]);

    const onEdit = (e, index) => {
        modules.forEach((el, i)=>{
            if (i == index) {
                setId(el.id);
                setTitle(el.title);
                setOrder(el.order);
                setCourseId(el.courseId);
            }
        });
        setShow(true);
        setEdit(true);
    }

    const onDelete = (e, index) => {
        setSwalProps({
            show: true,
            title: "Cargando...",
            html: "Esperando respuesta del servidor",
            showConfirmButton: false,
            allowOutsideClick: false,
        });
        dispatch(modulesActions.deleteModule(e.id))
    }

    const verifyData = () => {
        if (edit) {
            if (id && title && order !== null && courseId) {
                return true
            } else return false
        } else {
            if (title && order !== null && courseId) {
                return true
            } else return false
        }
    }

    const addModule = async () => {
        if (edit) {
            if (verifyData()) {
                let info = {
                    id: id,
                    title: title,
                    courseId: courseId,
                    order: order,
                }
                dispatch(modulesActions.editModule(info))
            } else {
                setSwalProps({
                    show: true,
                    title: '¡Atención',
                    text: 'Para poder continuar con la operación debe ingresar todos los datos solicitados.',
                    icon:'error'
                }); 
            }
        } else {
            if (verifyData()) {
                let info = {
                    title: title,
                    courseId: courseId,
                    order: order,
                }
                dispatch(modulesActions.setModule(info))
            } else {
                setSwalProps({
                    show: true,
                    title: '¡Atención',
                    text: 'Para poder continuar con la operación debe ingresar todos los datos solicitados.',
                    icon:'error'
                }); 
            }
        }
    }

    const changeFilter = async (e) => {
        setSelectFilter(e)
        if (!e) {
            let info = []
            setData([])
            courses.forEach(el2=>{
                modules.forEach(el=>{
                    if (el2.id == el.courseId) {
                        info.push({
                            id: el.id,
                            course: el2.title,
                            title: el.title,
                            order: el.order
                        })
                    }
                })
            })
            setData(info)
        } else {
            let info = []
            setData([])
            courses.forEach(el2=>{
                if (el2.id == e) {
                    modules.forEach(el=>{
                        if (el2.id == el.courseId) {
                            info.push({
                                id: el.id,
                                course: el2.title,
                                title: el.title,
                                order: el.order
                            })
                        }
                    })
                }
            })
            setData(info)
        }
    }

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
                                <Modal size="lg" show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>New Module</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="courseId">
                                                <Form.Label>Course</Form.Label>
                                                <Form.Select autoFocus aria-label="Default select example" onChange={(e) => {setCourseId(e.target.value)}} value={courseId}>
                                                    <option key="H" value={""}>Select your course</option>
                                                    {isDataSelect.map((item, i) => 
                                                        <option key={i} value={item.id}>{item.title}</option>
                                                    )}
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="title">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter your title"
                                                    onChange={(e) => {setTitle(e.target.value)}}
                                                    value={title}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="order">
                                                <Form.Label>Order</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Enter your order"
                                                    onChange={(e) => {setOrder(e.target.value)}}
                                                    value={order}
                                                />
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        {isLoadingData == '1' ? 
                                        (
                                            <>
                                                <Spinner animation="border" variant="primary" />
                                            </>
                                        ) 
                                        :
                                        (
                                            <>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" onClick={addModule}>
                                                    Save Changes
                                                </Button>
                                            </>
                                        )}
                                    </Modal.Footer>
                                </Modal>
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
                                <Row>
                                    <Col xs={8}>
                                        <BtnNew onClick={handleShow}>New Module</BtnNew>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Select autoFocus aria-label="Default select example" onChange={(e) => {changeFilter(e.target.value)}} value={isSelectFilter}>
                                            {isDataFilter.map((item, i) => 
                                                <option key={i} value={item.id}>{item.title}</option>
                                            )}
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <DataTable headers={isHeader} data={isData} onClickV={null} onClickE={onEdit} onClickD={onDelete} />
                            </>
                        )}
                    </Col> 
                </Row>

            </Container>
        </>
    );
  };
  export default modulesAdmin