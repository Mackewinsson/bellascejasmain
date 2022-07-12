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
    const classes = useSelector(state => state.classes.classes);
    const modules = useSelector(state => state.modules.modules);
    const courses = useSelector(state => state.courses.courses);
    const [isDataFilterC, setDataFilterC] = useState([]);
    const [isDataFilterM, setDataFilterM] = useState([]);
    const [isDataFilterCL, setDataFilterCL] = useState([]);
    const [isSelectFilterC, setSelectFilterC] = useState("");
    const [isSelectFilterM, setSelectFilterM] = useState("");
    const [isSelectFilterCL, setSelectFilterCL] = useState("");
    const [isData, setData] = useState([]);
    const isHeader = [{text: 'Date', key: 'date'},  {text: 'Course', key: 'course'}, {text: 'Module', key: 'module'},{text: 'Class', key: 'class'},{text: 'User', key: 'user'}, {text: 'Question', key: 'question'}];

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

    const getTitleClasses = async (classes, id) => {
        return await new Promise(async (resolve) =>{
            let classT = ""
            classes.filter(el2=>{
                if (el2.id == id) classT = el2.title
            })
            resolve(classT)
        })
    }

    useEffect(() => {
        (async () => {
            if (questions && questions.length > 0 && classes && classes.length > 0 && modules && modules.length > 0 && courses && courses.length > 0) {
                let info = []
                setData([])
                for (let i = 0; i < questions.length; i++) {
                    const el = questions[i];
                    let course = await getTitleCourse(courses, el.courseId)
                    let module = await getTitleModule(modules, el.moduloId)
                    let classT = await getTitleClasses(classes, el.classId)
                    info.push({
                        date: el.date,
                        course: course,
                        module: module,
                        class: classT,
                        user: el.user,
                        question: el.question,
                    })
                }
                setData(info)
            }
            if (courses && courses.length > 0) {
                let info2 = []
                setDataFilterC([])
                info2.push({id: "", title: "All"})
                courses.forEach(el=>{
                    info2.push({
                        id: el.id,
                        title: el.title,
                    })
                })
                setDataFilterC(info2)
            }
    
            if (modules && modules.length > 0) {
                let info2 = []
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
    
            if (classes && classes.length > 0) {
                let info2 = []
                setDataFilterCL([])
                info2.push({id: "", title: "All"})
                classes.forEach(el=>{
                    info2.push({
                        id: el.id,
                        title: el.title,
                    })
                })
                setDataFilterCL(info2)
            }
        })();
    }, [questions, classes, modules, courses]);

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

    const changeFilterC = async (e) => {
        setSelectFilterC(e)
        setSelectFilterM("")
        setSelectFilterCL("")
        if (!e) {
            let info = []
            let info2 = []
            let info3 = []
            setData([])
            for (let i = 0; i < questions.length; i++) {
                const el = questions[i];
                let course = await getTitleCourse(courses, el.courseId)
                let module = await getTitleModule(modules, el.moduloId)
                let classT = await getTitleClasses(classes, el.classId)
                info.push({
                    date: el.date,
                    course: course,
                    module: module,
                    class: classT,
                    user: el.user,
                    question: el.question,
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
            info3.push({id: "", title: "All"})
            classes.forEach(el=>{
                info3.push({
                    id: el.id,
                    title: el.title,
                })
            })
            setDataFilterCL(info3)
            setData(info)
        } else {
            let info = []
            let info2 = []
            let info3 = []
            setData([])
            for (let i = 0; i < questions.length; i++) {
                const el = questions[i];
                if (el.courseId == e) {
                    let course = await getTitleCourse(courses, el.courseId)
                    let module = await getTitleModule(modules, el.moduloId)
                    let classT = await getTitleClasses(classes, el.classId)
                    info.push({
                        date: el.date,
                        course: course,
                        module: module,
                        class: classT,
                        user: el.user,
                        question: el.question,
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
            info3.push({id: "", title: "All"})
            classes.forEach(el=>{
                if (el.courseId == e) {
                    info3.push({
                        id: el.id,
                        title: el.title,
                    })
                }
            })
            setDataFilterCL(info3)
            setData(info)
        }
    }

    const changeFilterM = async (e) => {
        setSelectFilterM(e)
        setSelectFilterCL("")
        if (!e) {
            let info = []
            let info2 = []
            setData([])
            for (let i = 0; i < questions.length; i++) {
                const el = questions[i];
                if (isSelectFilterC == el.courseId) {
                    let course = await getTitleCourse(courses, el.courseId)
                    let module = await getTitleModule(modules, el.moduloId)
                    let classT = await getTitleClasses(classes, el.classId)
                    info.push({
                        date: el.date,
                        course: course,
                        module: module,
                        class: classT,
                        user: el.user,
                        question: el.question,
                    })
                }
            }
            info2.push({id: "", title: "All"})
            classes.forEach(el=>{
                info2.push({
                    id: el.id,
                    title: el.title,
                })
            })
            setDataFilterCL(info2)
            setData(info)
        } else {
            let info = []
            let info2 = []
            setData([])
            for (let i = 0; i < questions.length; i++) {
                const el = questions[i];
                if (e == el.moduloId) {
                    let course = await getTitleCourse(courses, el.courseId)
                    let module = await getTitleModule(modules, el.moduloId)
                    let classT = await getTitleClasses(classes, el.classId)
                    info.push({
                        date: el.date,
                        course: course,
                        module: module,
                        class: classT,
                        user: el.user,
                        question: el.question,
                    })
                }
            }
            info2.push({id: "", title: "All"})
            classes.forEach(el=>{
                if (e == el.moduloId) {
                    info2.push({
                        id: el.id,
                        title: el.title,
                    })
                }
            })
            setDataFilterCL(info2)
            setData(info)
        }
    }

    const changeFilterCL = async (e) => {
        setSelectFilterCL(e)
        if (!e) {
            let info = []
            setData([])
            for (let i = 0; i < questions.length; i++) {
                const el = questions[i];
                if (isSelectFilterCL == el.classId) {
                    let course = await getTitleCourse(courses, el.courseId)
                    let module = await getTitleModule(modules, el.moduloId)
                    let classT = await getTitleClasses(classes, el.classId)
                    info.push({
                        date: el.date,
                        course: course,
                        module: module,
                        class: classT,
                        user: el.user,
                        question: el.question,
                    })
                }
            }
            setData(info)
        } else {
            let info = []
            setData([])
            for (let i = 0; i < questions.length; i++) {
                const el = questions[i];
                if (e == el.classId) {
                    let course = await getTitleCourse(courses, el.courseId)
                    let module = await getTitleModule(modules, el.moduloId)
                    let classT = await getTitleClasses(classes, el.classId)
                    info.push({
                        date: el.date,
                        course: course,
                        module: module,
                        class: classT,
                        user: el.user,
                        question: el.question,
                    })
                }
            }
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
                                    <Col xs={6}>
                                    </Col>
                                    <Col xs={6}>
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
                                            <Form.Select style={{marginLeft: 5}}onChange={(e) => {changeFilterCL(e.target.value)}} value={isSelectFilterCL}>
                                                {isDataFilterCL.map((item, i) => 
                                                    <option key={i} value={item.id}>{item.title}</option>
                                                )}
                                            </Form.Select>
                                        </div>
                                    </Col>
                                </Row>
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