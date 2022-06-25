import React, {useEffect, useState} from "react";
import {Container, Row, Col, Modal, Button, Form, Spinner } from "react-bootstrap";
import Sidebar from "../components/common/Side";
import DataTable from "../components/common/Table";
import * as modulesActions from '../store/actions/modules';
import * as courseActions from '../store/actions/courses';
import * as classesActions from '../store/actions/classes';
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

const classesAdmin = () => {
    const dispatch = useDispatch();
    const isLoadingData = useSelector(state => state.classes.loadingData);
    const [swalProps, setSwalProps] = useState({});
    const isLoading = useSelector(state => state.modules.loading);
    const classes = useSelector(state => state.classes.classes);
    const modules = useSelector(state => state.modules.modules);
    const courses = useSelector(state => state.courses.courses);
    const errorCL = useSelector(state => state.classes.errorCL);
    const [edit, setEdit] = useState(false);
    const [isData, setData] = useState([]);
    const [isDataSelectC, setDataSelectC] = useState([]);
    const [isDataSelectM, setDataSelectM] = useState([]);
    const [isDataFilterC, setDataFilterC] = useState([]);
    const [isDataFilterM, setDataFilterM] = useState([]);
    const [isSelectFilterC, setSelectFilterC] = useState("");
    const [isSelectFilterM, setSelectFilterM] = useState("");
    const [id, setId] = useState("");
    const [classNotes, setClassNotes] = useState("");
    const [title, setTitle] = useState("");
    const [courseId, setCourseId] = useState("");
    const [moduloId, setModuloId] = useState("");
    const [order, setOrder] = useState(0);
    const [orderModule, setOrderModule] = useState(0);
    const [videoUrl, setVideoUrl] = useState("");
    const [show, setShow] = useState(false);
    const isHeader = [{text: 'Id', key: 'id'}, {text: 'Course', key: 'course'},{text: 'Module', key: 'module'}, {text: 'Title', key: 'title'}, {text: 'Order', key: 'order'}];

    const handleClose = () => {
        setId("");
        setTitle("");
        setClassNotes("");
        setCourseId("");
        setModuloId("");
        setVideoUrl("");
        setDataSelectM([])
        setOrder(0);
        setOrderModule(0);
        setShow(false);
        setEdit(false);
    }
    const handleShow = () => setShow(true);

    useEffect(() => {
        dispatch(classesActions.getClasses())
        dispatch(modulesActions.getModules())
        dispatch(courseActions.getCourses())
    }, []);

    useEffect(() => {
        if(errorCL) {
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
                    text: errorCL,
                    icon:'error'
                });
                dispatch(classesActions.deleteError())
                clearInterval(timer)
              },100);
        }
    }, [errorCL]);

    const getTitleCourse = async (courses, id) => {
        return await new Promise(async (resolve) =>{
            let course = ""
            courses.filter(el2=>{
                if (el2.id == id) course = el2.title
            })
            resolve(course)
        })
    }

    const getTitleModule = async (modules, id) => {
        return await new Promise(async (resolve) =>{
            let module = ""
            modules.filter(el2=>{
                if (el2.id == id) module = el2.title
            })
            resolve(module)
        })
    }

    useEffect(() => {
        (async () => {
            if (classes && classes.length > 0 && modules && modules.length > 0 && courses && courses.length > 0) {
                let info = []
                setData([])
                for (let i = 0; i < classes.length; i++) {
                    const el = classes[i];
                    let course = await getTitleCourse(courses, el.courseId)
                    let module = await getTitleModule(modules, el.moduloId)
                    info.push({
                        id: el.id,
                        course: course,
                        module: module,
                        title: el.title,
                        order: el.order
                    })
                }
                setData(info)
            }
    
            if (courses && courses.length > 0) {
                let info = []
                let info2 = []
                setDataSelectC([])
                setDataFilterC([])
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
                setDataFilterC(info2)
                setDataSelectC(info)
            }
    
            if (modules && modules.length > 0) {
                let info2 = []
                setDataSelectM([])
                setDataFilterM([])
                info2.push({id: "", title: "All"})
                modules.forEach(el=>{
                    info2.push({
                        id: el.id,
                        title: el.title,
                    })
                })
                setDataFilterM(info2)
            }
        })();
    }, [classes, modules, courses]);

    useEffect(() => {
        if (isLoadingData == "0") {
            handleClose()
            setSelectFilterC("")
            setSelectFilterM("")
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
        classes.forEach((el, i)=>{
            if (i == index) {
                console.log(el)
                setId(el.id ? el.id : "");
                setTitle(el.title ? el.title : "");
                setClassNotes(el.classNotes ? el.classNotes : "");
                setOrder(el.order ? el.order : 0);
                setOrderModule(el.orderModule ? el.orderModule : 0);
                setCourseId(el.courseId ? el.courseId : "");
                let info = []
                modules.forEach(el2=>{
                    if (el.courseId == el2.courseId) {
                        info.push({
                            id: el2.id,
                            title: el2.title,
                        })
                    }
                })
                setDataSelectM(info)
                setModuloId(el.moduloId ? el.moduloId : "");
                setVideoUrl(el.videoUrl ? el.videoUrl : "");
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
        dispatch(classesActions.deleteClass(e.id))
    }

    const verifyData = () => {
        if (edit) {
            if (id && title && classNotes && order !== null && orderModule !== null && courseId && moduloId && videoUrl) {
                return true
            } else return false
        } else {
            if (title && classNotes && order !== null && orderModule !== null && courseId && moduloId && videoUrl) {
                return true
            } else return false
        }
    }

    const addClasses = async () => {
        if (edit) {
            if (verifyData()) {
                let info = {
                    id: id,
                    title: title,
                    classNotes: classNotes,
                    moduloId: moduloId,
                    courseId: courseId,
                    order: order,
                    orderModule: orderModule,
                    videoUrl: videoUrl
                }
                dispatch(classesActions.editClass(info))
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
                    classNotes: classNotes,
                    moduloId: moduloId,
                    courseId: courseId,
                    order: order,
                    orderModule: orderModule,
                    videoUrl: videoUrl
                }
                dispatch(classesActions.setClass(info))
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

    const changeFilterC = async (e) => {
        setSelectFilterC(e)
        setSelectFilterM("")
        if (!e) {
            let info = []
            let info2 = []
            setData([])
            for (let i = 0; i < classes.length; i++) {
                const el = classes[i];
                let course = await getTitleCourse(courses, el.courseId)
                let module = await getTitleModule(modules, el.moduloId)
                info.push({
                    id: el.id,
                    course: course,
                    module: module,
                    title: el.title,
                    order: el.order
                })
            }
            info2.push({id: "", title: "All"})
            modules.forEach(el=>{
                info2.push({
                    id: el.id,
                    title: el.title,
                })
            })
            setDataFilterM(info2)
            setData(info)
        } else {
            let info = []
            let info2 = []
            setData([])
            for (let i = 0; i < classes.length; i++) {
                const el = classes[i];
                if (el.courseId == e) {
                    let course = await getTitleCourse(courses, el.courseId)
                    let module = await getTitleModule(modules, el.moduloId)
                    info.push({
                        id: el.id,
                        course: course,
                        module: module,
                        title: el.title,
                        order: el.order
                    })
                }
            }
            info2.push({id: "", title: "All"})
            modules.forEach(el=>{
                if (el.courseId == e) {
                    info2.push({
                        id: el.id,
                        title: el.title,
                    })
                }
            })
            setDataFilterM(info2)
            setData(info)
        }
    }

    const changeFilterM = async (e) => {
        setSelectFilterM(e)
        if (!e) {
            let info = []
            setData([])
            for (let i = 0; i < classes.length; i++) {
                const el = classes[i];
                if (isSelectFilterC == el.courseId) {
                    let course = await getTitleCourse(courses, el.courseId)
                    let module = await getTitleModule(modules, el.moduloId)
                    info.push({
                        id: el.id,
                        course: course,
                        module: module,
                        title: el.title,
                        order: el.order
                    })
                }
            }
            setData(info)
        } else {
            let info = []
            setData([])
            for (let i = 0; i < classes.length; i++) {
                const el = classes[i];
                if (e == el.moduloId) {
                    let course = await getTitleCourse(courses, el.courseId)
                    let module = await getTitleModule(modules, el.moduloId)
                    info.push({
                        id: el.id,
                        course: course,
                        module: module,
                        title: el.title,
                        order: el.order
                    })
                }
            }
            setData(info)
        }
    }

    const changeSelectAddC = (e) => {
        setCourseId(e)
        let info = []
        modules.forEach(el=>{
            if (e == el.courseId) {
                info.push({
                    id: el.id,
                    title: el.title,
                })
            }
        })
        setDataSelectM(info)
    }

    const changeSelectAddM = (e) => {
        setModuloId(e)
        if (!e) {
            setOrderModule(0)
        } else {
            modules.forEach(el=>{
                if (e == el.id) setOrderModule(el.order)
            })
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
                                        <Modal.Title>New Class</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="courseId">
                                                <Form.Label>Class</Form.Label>
                                                <Form.Select autoFocus onChange={(e) => {changeSelectAddC(e.target.value)}} value={courseId}>
                                                    <option key="H" value={""}>Select your class</option>
                                                    {isDataSelectC.map((item, i) => 
                                                        <option key={i} value={item.id}>{item.title}</option>
                                                    )}
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="moduloId">
                                                <Form.Label>Module</Form.Label>
                                                <Form.Select onChange={(e) => {changeSelectAddM(e.target.value)}} value={moduloId}>
                                                    <option key="M" value={""}>Select your module</option>
                                                    {isDataSelectM.map((item, i) => 
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
                                            <Form.Group className="mb-3" controlId="videoUrl">
                                                <Form.Label>Video url</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter your video url"
                                                    onChange={(e) => {setVideoUrl(e.target.value)}}
                                                    value={videoUrl}
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
                                            <Form.Group
                                                className="mb-3"
                                                controlId="classNotes"
                                                >
                                                <Form.Label>Class notes</Form.Label>
                                                <Form.Control 
                                                    as="textarea" 
                                                    // rows={3}
                                                    placeholder="Enter your class notes"
                                                    onChange={(e) => {setClassNotes(e.target.value)}}
                                                    value={classNotes}
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
                                                <Button variant="primary" onClick={addClasses}>
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
                                        <BtnNew onClick={handleShow}>New Class</BtnNew>
                                    </Col>
                                    <Col xs={4}>
                                        <div style={{display: 'flex'}}>
                                            <Form.Select style={{marginRight: 5}} onChange={(e) => {changeFilterC(e.target.value)}} value={isSelectFilterC}>
                                                {isDataFilterC.map((item, i) => 
                                                    <option key={i} value={item.id}>{item.title}</option>
                                                )}
                                            </Form.Select>
                                            <Form.Select style={{marginLeft: 5}}onChange={(e) => {changeFilterM(e.target.value)}} value={isSelectFilterM}>
                                                {isDataFilterM.map((item, i) => 
                                                    <option key={i} value={item.id}>{item.title}</option>
                                                )}
                                            </Form.Select>
                                        </div>
                                    </Col>
                                </Row>
                                <DataTable headers={isHeader} data={isData} onClickE={onEdit} onClickD={onDelete} />
                            </>
                        )}
                    </Col> 
                </Row>

            </Container>
        </>
    );
  };
  export default classesAdmin