import React, {useEffect, useState} from "react";
import {Container, Row, Col, Modal, Button, Form, Spinner } from "react-bootstrap";
import Sidebar from "../components/common/Side";
import DataTable from "../components/common/Table";
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
    const isLoadingData = useSelector(state => state.courses.loadingData);
    const [swalProps, setSwalProps] = useState({});
    const isLoading = useSelector(state => state.courses.loading);
    const errorC = useSelector(state => state.courses.errorC);
    const courses = useSelector(state => state.courses.courses);
    const [edit, setEdit] = useState(false);
    const [isData, setData] = useState([]);
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [teacher, setTeacher] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [instructions, setInstructions] = useState([]);
    const [descriptionI, setDescriptionI] = useState("");
    const [image, setImageI] = useState("");
    const [show, setShow] = useState(false);
    const [showI, setShowI] = useState(false);
    const isHeader = [{text: 'Id', key: 'id'}, {text: 'Title', key: 'title'}, {text: 'Teacher', key: 'teacher'}, {text: 'Amount', key: 'amount'}];
    const isHeaderI = [{text: 'Description', key: 'description'}, {text: 'Url Img', key: 'image'}];

    const handleClose = () => {
        setId("");
        setTitle("");
        setThumbnail("");
        setTeacher("");
        setDescription("");
        setAmount(0);
        setInstructions([]);
        setShow(false);
        setEdit(false);
    }
    const handleShow = () => setShow(true);
    const handleShowI = () => setShowI(true);

    const handleCloseI = () => {
        setDescriptionI("");
        setImageI("");
        setShowI(false);
    }

    useEffect(() => {
        dispatch(courseActions.getCourses())
    }, []);

    useEffect(() => {
        if(errorC) {
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
                    text: errorC,
                    icon:'error'
                });
                dispatch(courseActions.deleteError())
                clearInterval(timer)
              },100);
        }
    }, [errorC]);

    useEffect(() => {
        if (courses && courses.length > 0) {
            let info = []
            setData([])
            courses.forEach(el=>{
                info.push({
                    id: el.id,
                    title: el.title,
                    teacher: el.teacher,
                    amount: el.amount
                })
            })
            setData(info)
        }
    }, [courses]);

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
        courses.forEach((el, i)=>{
            if (i == index) {
                setId(el.id);
                setTitle(el.title);
                setThumbnail(el.thumbnail);
                setTeacher(el.teacher);
                setDescription(el.description);
                setAmount(el.amount);
                setInstructions(el.instructions);
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
        dispatch(courseActions.deleteCourse(e.id))
    }

    const onDeleteI = (e, index) => {
        var data = [];
        instructions.forEach((el, i)=>{
            if (index != i) data.push(el)
        })
        setInstructions(data)
    }

    const verifyData = () => {
        if (edit) {
            if (id && title && thumbnail && teacher && description && amount && instructions.length > 0 ) {
                return true
            } else return false
        } else {
            if (title && thumbnail && teacher && description && amount && instructions.length > 0 ) {
                return true
            } else return false
        }
    }

    const addCourse = async () => {
        if (edit) {
            if (verifyData()) {
                let info = {
                    id: id,
                    title: title,
                    thumbnail: thumbnail,
                    teacher: teacher,
                    description: description,
                    amount: amount,
                    instructions: instructions
                }
                dispatch(courseActions.editCourse(info))
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
                    thumbnail: thumbnail,
                    teacher: teacher,
                    description: description,
                    amount: amount,
                    instructions: instructions
                }
                dispatch(courseActions.setCourse(info))
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

    const addInstructions = () => {
        let data = instructions
        data.push({
            description: descriptionI,
            image: image
        })
        setInstructions(data)
        setDescriptionI("")
        setImageI("")
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
                                        <Modal.Title>New Course</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="title">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter your title"
                                                    onChange={(e) => {setTitle(e.target.value)}}
                                                    value={title}
                                                    autoFocus
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="thumbnail">
                                                <Form.Label>Thumbnail</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter your thumbnail"
                                                    onChange={(e) => {setThumbnail(e.target.value)}}
                                                    value={thumbnail}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="teacher">
                                                <Form.Label>Teacher</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter your teacher"
                                                    onChange={(e) => {setTeacher(e.target.value)}}
                                                    value={teacher}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="amount">
                                                <Form.Label>Amount</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Enter your amount"
                                                    onChange={(e) => {setAmount(e.target.value)}}
                                                    value={amount}
                                                />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="description"
                                                >
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control 
                                                    as="textarea" 
                                                    rows={3}
                                                    placeholder="Enter your description"
                                                    onChange={(e) => {setDescription(e.target.value)}}
                                                    value={description}
                                                />
                                            </Form.Group>
                                        </Form>
                                        <Button variant="primary" className="mb-3" onClick={handleShowI}>
                                            Add instructions
                                        </Button>
                                        <DataTable 
                                            headers={isHeaderI}
                                            data={instructions}
                                            onClickE={null} 
                                            onClickD={onDeleteI} 
                                        />
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
                                                <Button variant="primary" onClick={addCourse}>
                                                    Save Changes
                                                </Button>
                                            </>
                                        )}
                                    </Modal.Footer>
                                </Modal>
                                <Modal show={showI} onHide={handleCloseI}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>New Instructions</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="description"
                                                >
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control 
                                                    as="textarea" 
                                                    rows={3}
                                                    placeholder="Enter your description"
                                                    onChange={(e) => {setDescriptionI(e.target.value)}}
                                                    value={descriptionI}
                                                    autoFocus
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="title">
                                                <Form.Label>Url image</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter your url image"
                                                    onChange={(e) => {setImageI(e.target.value)}}
                                                    value={image}
                                                />
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseI}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={addInstructions}>
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
                                <BtnNew onClick={handleShow}>New Course</BtnNew>
                                <DataTable headers={isHeader} data={isData} onClickE={onEdit} onClickD={onDelete} />
                            </>
                        )}
                    </Col> 
                </Row>

            </Container>
        </>
        );
  };
  export default cursosAdmin