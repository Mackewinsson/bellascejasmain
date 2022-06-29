import React, {useEffect, useState} from "react";
import {Container, Row, Col, Modal, Button, Form, Spinner, ButtonGroup, ToggleButton } from "react-bootstrap";
import Sidebar from "../components/common/Side";
import DataTable from "../components/common/Table";
import * as userActions from '../store/actions/user';
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

const cursosAdmin = () => {
    const dispatch = useDispatch();
    const isLoadingData = useSelector(state => state.user.loadingData);
    const [swalProps, setSwalProps] = useState({});
    const isLoading = useSelector(state => state.user.loading);
    const errorU = useSelector(state => state.user.errorU);
    const users = useSelector(state => state.user.users);
    const coursesL = useSelector(state => state.courses.courses);
    const [edit, setEdit] = useState(false);
    const [isData, setData] = useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [dni, setDni] = useState("");
    const [rol, setRol] = useState("");
    const [courses, setCourses] = useState([]);
    const [idI, setIdI] = useState("");
    const [editEmail, setEditEmail] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [show, setShow] = useState(false);
    const [showI, setShowI] = useState(false);
    const [isDataSelect, setDataSelect] = useState([]);
    const isHeader = [{text: 'Id', key: 'id'}, {text: 'Name', key: 'name'}, {text: 'Dni', key: 'dni'}, {text: 'Email', key: 'email'}, , {text: 'Rol', key: 'rol'}];
    const isHeaderI = [{text: 'Id', key: 'idI'}, {text: 'Course', key: 'courseI'}];

    const [radioValue, setRadioValue] = useState('0');
    const radios = [
      { name: 'No', value: '0' },
      { name: 'Si', value: '1' },
    ];

    const handleClose = () => {
        setId("");
        setName("");
        setEmail("");
        setPhone("");
        setDni("");
        setRol("");
        setPassword("");
        setCourses([]);
        setShow(false);
        setEdit(false);
    }
    const handleShow = () => setShow(true);
    const handleShowI = () => setShowI(true);

    const handleCloseI = () => {
        setIdI("");
        setShowI(false);
    }

    useEffect(() => {
        dispatch(userActions.getAllUsers())
        dispatch(courseActions.getCourses())
    }, []);

    useEffect(() => {
        if(errorU) {
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
                    text: errorU,
                    icon:'error'
                });
                dispatch(userActions.deleteError())
                clearInterval(timer)
              },100);
        }
    }, [errorU]);

    useEffect(() => {
        if (users && users.length > 0) {
            let info = []
            setData([])
            users.forEach(el=>{
                info.push({
                    id: el.id,
                    name: el.name,
                    dni: el.dni,
                    email: el.email,
                    rol: el.rol
                })
            })
            setData(info)
        }
        if (coursesL && coursesL.length > 0) {
            let info = []
            setDataSelect([])
            coursesL.forEach(el=>{
                info.push({
                    id: el.id,
                    title: el.title,
                })
            })
            setDataSelect(info)
        }
    }, [users, coursesL]);

    useEffect(() => {
        if (isLoadingData == "0") {
            handleClose()
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
        users.forEach((el, i)=>{
            if (i == index) {
                setId(el.id);
                setName(el.name);
                setEmail(el.email);
                setPassword("");
                setPhone(el.phone);
                setDni(el.dni);
                setRol(el.rol);
                setCourses(el.courses ? el.courses : []);
            }
        });
        setShow(true);
        setEdit(true);
    }

    const onDeleteI = (e, index) => {
        var data = [];
        courses.forEach((el, i)=>{
            if (index != i) data.push(el)
        })
        setCourses(data)
    }

    const verifyData = () => {
        if (edit) {
            if (id && name && email && phone && dni && rol) {
                if (radioValue == "1") {
                    if (password && email) {
                        return true
                    } else return false
                } else return true
            } else return false
        } else {
            if (name && email && phone && dni && rol && courses.length > 0 && password && password.length >= 8) {
                return true
            } else return false
        }
    }

    const addUser = async () => {
        if (edit) {
            if (verifyData()) {
                let arry = [];
                courses.forEach(el=>{
                    arry.push({
                        generalProgress: 0,
                        id: el.idI,
                        seenClasses: [],
                        seenQuizz: []
                    })
                })
                let info = {
                    id: id,
                    name: name,
                    email: email,
                    phone: phone,
                    password: password,
                    dni: dni,
                    rol: rol,
                    courses: arry,
                    credent: radioValue
                }
                dispatch(userActions.editUser(info))
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
                let arry = [];
                courses.forEach(el=>{
                    arry.push({
                        generalProgress: 0,
                        id: el.idI,
                        seenClasses: [],
                        seenQuizz: []
                    })
                })
                let info = {
                    name: name,
                    email: email,
                    phone: phone,
                    password: password,
                    dni: dni,
                    rol: rol,
                    courses: arry
                }
                dispatch(userActions.setUser(info))
            } else {
                if (password && password.length >= 8) {
                    setSwalProps({
                        show: true,
                        title: '¡Atención',
                        text: 'Para poder continuar con la operación debe ingresar todos los datos solicitados.',
                        icon:'error'
                    }); 
                } else {
                    setSwalProps({
                        show: true,
                        title: '¡Atención',
                        text: 'Estimado usuario, la contraseña debe contener por lo menos 8 caracteres.',
                        icon:'error'
                    }); 
                }
            }
        }
    }

    const addCourses = () => {
        let data = courses
        let nameT
        isDataSelect.forEach(el=>{
            if (idI == el.id) nameT = el.title
        })
        data.push({
            idI: idI,
            courseI: nameT
        })
        setCourses(data)
        setIdI("")
        setShowI(false);
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
                                        <Modal.Title>New User</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="name">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter your name"
                                                    onChange={(e) => {setName(e.target.value)}}
                                                    value={name}
                                                    autoFocus
                                                />
                                            </Form.Group>
                                            {!edit &&
                                                <Form.Group className="mb-3" controlId="email">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter your email"
                                                        onChange={(e) => {setEmail(e.target.value)}}
                                                        value={email}
                                                    />
                                                </Form.Group>
                                            }
                                            {!edit &&
                                                <Form.Group className="mb-3" controlId="password">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter your password"
                                                        onChange={(e) => {setPassword(e.target.value)}}
                                                        value={password}
                                                    />
                                                </Form.Group>
                                            }
                                            <Form.Group className="mb-3" controlId="phone">
                                                <Form.Label>Phone</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter your phone"
                                                    onChange={(e) => {setPhone(e.target.value)}}
                                                    value={phone}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="dni">
                                                <Form.Label>Dni</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter your dni"
                                                    onChange={(e) => {setDni(e.target.value)}}
                                                    value={dni}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="rol">
                                                <Form.Label>Rol</Form.Label>
                                                <Form.Select onChange={(e) => {setRol(e.target.value)}} value={rol}>
                                                    <option key="H" value={""}>Select your rol</option>
                                                    <option key="A" value="admin">Admin</option>
                                                    <option key="C" value="client">Cliente</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Form>
                                        {!edit &&
                                            <>
                                                <Button variant="primary" className="mb-3" onClick={handleShowI}>
                                                    Add courses
                                                </Button>
                                                <DataTable 
                                                    headers={isHeaderI}
                                                    data={courses}
                                                    onClickV={null}
                                                    onClickE={null} 
                                                    onClickD={onDeleteI} 
                                                />
                                            </>
                                        }
                                        {/* {edit && 
                                            <>
                                                <Form.Group className="mb-3" controlId="emai" style={{display: 'flex', flexDirection: 'column'}}>
                                                    <Form.Label>¿Editar credenciales?</Form.Label>
                                                    <ButtonGroup className="mb-2">
                                                        {radios.map((radio, idx) => (
                                                            <ToggleButton
                                                                key={idx+"e"}
                                                                id={`radio-${idx+"e"}`}
                                                                type="radio"
                                                                variant="secondary"
                                                                name="radio"
                                                                value={radio.value}
                                                                checked={radioValue === radio.value}
                                                                onChange={(e) => setRadioValue(e.currentTarget.value)}
                                                            >
                                                                {radio.name}
                                                            </ToggleButton>
                                                        ))}
                                                    </ButtonGroup>
                                                </Form.Group>
                                            </>
                                        }
                                        {radioValue == "1" &&
                                            <>
                                                <Form.Group className="mb-3" controlId="email">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter your email"
                                                        onChange={(e) => {setEmail(e.target.value)}}
                                                        value={email}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="password">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter your password"
                                                        onChange={(e) => {setPassword(e.target.value)}}
                                                        value={password}
                                                    />
                                                </Form.Group>
                                            </>
                                        } */}
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
                                                <Button variant="primary" onClick={addUser}>
                                                    Save Changes
                                                </Button>
                                            </>
                                        )}
                                    </Modal.Footer>
                                </Modal>
                                <Modal show={showI} onHide={handleCloseI}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>New Course</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                        <Form.Group className="mb-3" controlId="idI">
                                                <Form.Label>Course</Form.Label>
                                                <Form.Select autoFocus aria-label="Default select example" onChange={(e) => {setIdI(e.target.value)}} value={idI}>
                                                    <option key="H" value={""}>Select your course</option>
                                                    {isDataSelect.map((item, i) => 
                                                        <option key={i} value={item.id}>{item.title}</option>
                                                    )}
                                                </Form.Select>
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseI}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={addCourses}>
                                            Save Changes
                                        </Button>
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
                                <BtnNew onClick={handleShow}>New User</BtnNew>
                                <DataTable headers={isHeader} data={isData} onClickV={null} onClickE={onEdit} onClickD={null} />
                            </>
                        )}
                    </Col> 
                </Row>

            </Container>
        </>
        );
  };
  export default cursosAdmin