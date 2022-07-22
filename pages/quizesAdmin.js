import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  Form,
  Spinner,
  ToggleButton,
  ButtonGroup,
} from "react-bootstrap";
import Sidebar from "../components/common/Side";
import DataTable from "../components/common/Table";
import * as modulesActions from "../store/actions/modules";
import * as courseActions from "../store/actions/courses";
import * as quizesActions from "../store/actions/quizes";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import SweetAlert2 from "react-sweetalert2";

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

const quizesAdmin = () => {
  const dispatch = useDispatch();
  const isLoadingData = useSelector((state) => state.quizes.loadingData);
  const [swalProps, setSwalProps] = useState({});
  const isLoading = useSelector((state) => state.modules.loading);
  const quizes = useSelector((state) => state.quizes.quizes);
  const modules = useSelector((state) => state.modules.modules);
  const courses = useSelector((state) => state.courses.courses);
  const errorQ = useSelector((state) => state.quizes.errorQ);
  const [edit, setEdit] = useState(false);
  const [isData, setData] = useState([]);
  const [isDataSelectC, setDataSelectC] = useState([]);
  const [isDataSelectM, setDataSelectM] = useState([]);
  const [isDataFilterC, setDataFilterC] = useState([]);
  const [isDataFilterM, setDataFilterM] = useState([]);
  const [isSelectFilterC, setSelectFilterC] = useState("");
  const [isSelectFilterM, setSelectFilterM] = useState("");
  const [id, setId] = useState("");
  const [final, setFinal] = useState("0");
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [moduloId, setModuloId] = useState("");
  const [order, setOrder] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [show, setShow] = useState(false);
  const [showI, setShowI] = useState(false);
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [answer, setAnswer] = useState("");
  const isHeader = [
    { text: "Id", key: "id" },
    { text: "Course", key: "course" },
    { text: "Module", key: "module" },
    { text: "Title", key: "title" },
    { text: "Order", key: "order" },
  ];
  const isHeaderI = [
    { text: "Question", key: "question" },
    { text: "Answer", key: "answer" },
  ];
  const [radioValue, setRadioValue] = useState("0");
  const radios = [
    { name: "No", value: "0" },
    { name: "Si", value: "1" },
  ];

  const handleClose = () => {
    setId("");
    setTitle("");
    setFinal(false);
    setCourseId("");
    setModuloId("");
    setQuestions([]);
    setDataSelectM([]);
    setOrder(0);
    setShow(false);
    setEdit(false);
  };

  const handleShow = () => setShow(true);
  const handleShowI = () => setShowI(true);

  const handleCloseI = () => {
    setQuestion("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setAnswer("");
    setShowI(false);
  };

  useEffect(() => {
    dispatch(quizesActions.getQuizes());
    dispatch(modulesActions.getModules());
    dispatch(courseActions.getCourses());
  }, []);

  useEffect(() => {
    if (errorQ) {
      setSwalProps({
        show: false,
        title: "",
        html: "",
        showConfirmButton: true,
        allowOutsideClick: true,
      });
      let timer = setInterval(function () {
        setSwalProps({
          show: true,
          title: "¡Atención",
          text: errorQ,
          icon: "error",
        });
        dispatch(quizesActions.deleteError());
        clearInterval(timer);
      }, 100);
    }
  }, [errorQ]);

  const getTitleCourse = async (courses, id) => {
    return await new Promise(async (resolve) => {
      let course = "";
      courses.filter((el2) => {
        if (el2.id == id) course = el2.title;
      });
      resolve(course);
    });
  };

  const getTitleModule = async (modules, id) => {
    return await new Promise(async (resolve) => {
      let module = "";
      modules.filter((el2) => {
        if (el2.id == id) module = el2.title;
      });
      resolve(module);
    });
  };

  useEffect(() => {
    (async () => {
      if (
        quizes &&
        quizes.length > 0 &&
        modules &&
        modules.length > 0 &&
        courses &&
        courses.length > 0
      ) {
        let info = [];
        setData([]);
        for (let i = 0; i < quizes.length; i++) {
          const el = quizes[i];
          let course = await getTitleCourse(courses, el.courseId);
          let module = await getTitleModule(modules, el.moduloId);
          info.push({
            id: el.id,
            course: course,
            module: module,
            title: el.title,
            order: el.order,
          });
        }
        setData(info);
      }

      if (courses && courses.length > 0) {
        let info = [];
        let info2 = [];
        setDataSelectC([]);
        setDataFilterC([]);
        info2.push({ id: "", title: "All" });
        courses.forEach((el) => {
          info.push({
            id: el.id,
            title: el.title,
          });
          info2.push({
            id: el.id,
            title: el.title,
          });
        });
        setDataFilterC(info2);
        setDataSelectC(info);
      }

      if (modules && modules.length > 0) {
        let info2 = [];
        setDataSelectM([]);
        setDataFilterM([]);
        info2.push({ id: "", title: "All" });
        modules.forEach((el) => {
          info2.push({
            id: el.id,
            title: el.title,
          });
        });
        setDataFilterM(info2);
      }
    })();
  }, [quizes, modules, courses]);

  useEffect(() => {
    if (isLoadingData == "0") {
      handleClose();
      setSelectFilterC("");
      setSelectFilterM("");
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
    quizes.forEach((el, i) => {
      if (i == index) {
        setId(el.id ? el.id : "");
        setTitle(el.title ? el.title : "");
        setFinal(el.final ? el.final : "");
        setOrder(el.order ? el.order : 0);
        setQuestions(el.questions ? el.questions : []);
        setCourseId(el.courseId ? el.courseId : "");
        let info = [];
        modules.forEach((el2) => {
          if (el.courseId == el2.courseId) {
            info.push({
              id: el2.id,
              title: el2.title,
            });
          }
        });
        setDataSelectM(info);
        setModuloId(el.moduloId ? el.moduloId : "");
      }
    });
    setShow(true);
    setEdit(true);
  };

  const onDelete = (e, index) => {
    setSwalProps({
      show: true,
      title: "Cargando...",
      html: "Esperando respuesta del servidor",
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    dispatch(quizesActions.deleteQuizes(e.id));
  };

  const verifyData = () => {
    if (edit) {
      if (
        id &&
        title &&
        order !== null &&
        courseId &&
        moduloId &&
        questions &&
        questions.length > 0
      ) {
        return true;
      } else return false;
    } else {
      if (
        title &&
        order !== null &&
        courseId &&
        moduloId &&
        questions &&
        questions.length > 0
      ) {
        return true;
      } else return false;
    }
  };

  const addQuizes = async () => {
    if (edit) {
      if (verifyData()) {
        console.log(questions);
        let info = {
          id: id,
          title: title,
          final: final,
          moduloId: moduloId,
          courseId: courseId,
          order: order,
          questions: questions,
        };
        dispatch(quizesActions.editQuizes(info));
      } else {
        setSwalProps({
          show: true,
          title: "¡Atención",
          text: "Para poder continuar con la operación debe ingresar todos los datos solicitados.",
          icon: "error",
        });
      }
    } else {
      if (verifyData()) {
        let info = {
          title: title,
          final: final,
          moduloId: moduloId,
          courseId: courseId,
          order: order,
          questions: questions,
        };
        dispatch(quizesActions.setQuizes(info));
      } else {
        setSwalProps({
          show: true,
          title: "¡Atención",
          text: "Para poder continuar con la operación debe ingresar todos los datos solicitados.",
          icon: "error",
        });
      }
    }
  };

  const changeFilterC = async (e) => {
    setSelectFilterC(e);
    setSelectFilterM("");
    if (!e) {
      let info = [];
      let info2 = [];
      setData([]);
      for (let i = 0; i < quizes.length; i++) {
        const el = quizes[i];
        let course = await getTitleCourse(courses, el.courseId);
        let module = await getTitleModule(modules, el.moduloId);
        info.push({
          id: el.id,
          course: course,
          module: module,
          title: el.title,
          order: el.order,
        });
      }
      info2.push({ id: "", title: "All" });
      modules.forEach((el) => {
        info2.push({
          id: el.id,
          title: el.title,
        });
      });
      setDataFilterM(info2);
      setData(info);
    } else {
      let info = [];
      let info2 = [];
      setData([]);
      for (let i = 0; i < quizes.length; i++) {
        const el = quizes[i];
        if (el.courseId == e) {
          let course = await getTitleCourse(courses, el.courseId);
          let module = await getTitleModule(modules, el.moduloId);
          info.push({
            id: el.id,
            course: course,
            module: module,
            title: el.title,
            order: el.order,
          });
        }
      }
      info2.push({ id: "", title: "All" });
      modules.forEach((el) => {
        if (el.courseId == e) {
          info2.push({
            id: el.id,
            title: el.title,
          });
        }
      });
      setDataFilterM(info2);
      setData(info);
    }
  };

  const changeFilterM = async (e) => {
    setSelectFilterM(e);
    if (!e) {
      let info = [];
      setData([]);
      for (let i = 0; i < quizes.length; i++) {
        const el = quizes[i];
        if (isSelectFilterC == el.courseId) {
          let course = await getTitleCourse(courses, el.courseId);
          let module = await getTitleModule(modules, el.moduloId);
          info.push({
            id: el.id,
            course: course,
            module: module,
            title: el.title,
            order: el.order,
          });
        }
      }
      setData(info);
    } else {
      let info = [];
      setData([]);
      for (let i = 0; i < quizes.length; i++) {
        const el = quizes[i];
        if (e == el.moduloId) {
          let course = await getTitleCourse(courses, el.courseId);
          let module = await getTitleModule(modules, el.moduloId);
          info.push({
            id: el.id,
            course: course,
            module: module,
            title: el.title,
            order: el.order,
          });
        }
      }
      setData(info);
    }
  };

  const changeSelectAddC = (e) => {
    setCourseId(e);
    let info = [];
    modules.forEach((el) => {
      if (e == el.courseId) {
        info.push({
          id: el.id,
          title: el.title,
        });
      }
    });
    setDataSelectM(info);
  };

  const changeRadios = (e) => {
    setRadioValue(e);
    if (e == "0") {
      setFinal(false);
    } else setFinal(true);
  };

  const onDeleteI = (e, index) => {
    var data = [];
    questions.forEach((el, i) => {
      if (index != i) data.push(el);
    });
    setQuestions(data);
  };

  const addQuestion = () => {
    const optionsObject = { optionA, optionB, optionC, optionD };
    const reducedArray = Object.keys(optionsObject).reduce(
      (acc, el, i) => {
        if (optionsObject[el].length > 0) {
          return { ...acc, [el]: optionsObject[el] };
        } else {
          return { ...acc };
        }
      },
      { question: question, answer: answer }
    );
    setQuestions([...questions, reducedArray]);
    setQuestion("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setAnswer("");
    setShowI(false);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={2}>
            <Sidebar />
          </Col>
          <Col xs={10} style={{ marginTop: "40px" }}>
            {isLoading ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 40,
                }}
              >
                Loading...
              </div>
            ) : (
              <>
                <Modal size="lg" show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>New Quizes</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="courseId">
                        <Form.Label>Course</Form.Label>
                        <Form.Select
                          autoFocus
                          onChange={(e) => {
                            changeSelectAddC(e.target.value);
                          }}
                          value={courseId}
                        >
                          <option key="H" value={""}>
                            Select your course
                          </option>
                          {isDataSelectC.map((item, i) => (
                            <option key={i} value={item.id}>
                              {item.title}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="moduloId">
                        <Form.Label>Module</Form.Label>
                        <Form.Select
                          onChange={(e) => {
                            setModuloId(e.target.value);
                          }}
                          value={moduloId}
                        >
                          <option key="M" value={""}>
                            Select your module
                          </option>
                          {isDataSelectM.map((item, i) => (
                            <option key={i} value={item.id}>
                              {item.title}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your title"
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                          value={title}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="final"
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <Form.Label>Quiz final</Form.Label>
                        <ButtonGroup className="mb-2">
                          {radios.map((radio, idx) => (
                            <ToggleButton
                              key={idx}
                              id={`radio-${idx}`}
                              type="radio"
                              variant="secondary"
                              name="radio"
                              value={radio.value}
                              checked={radioValue === radio.value}
                              onChange={(e) =>
                                changeRadios(e.currentTarget.value)
                              }
                            >
                              {radio.name}
                            </ToggleButton>
                          ))}
                        </ButtonGroup>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="order">
                        <Form.Label>Order</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter your order"
                          onChange={(e) => {
                            setOrder(e.target.value);
                          }}
                          value={order}
                        />
                      </Form.Group>
                    </Form>
                    <Button
                      variant="primary"
                      className="mb-3"
                      onClick={handleShowI}
                    >
                      Add quizes
                    </Button>
                    <DataTable
                      headers={isHeaderI}
                      data={questions}
                      onClickV={null}
                      onClickE={null}
                      onClickD={onDeleteI}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    {isLoadingData == "1" ? (
                      <>
                        <Spinner animation="border" variant="primary" />
                      </>
                    ) : (
                      <>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={addQuizes}>
                          Save Changes
                        </Button>
                      </>
                    )}
                  </Modal.Footer>
                </Modal>
                <Modal show={showI} onHide={handleCloseI}>
                  <Modal.Header closeButton>
                    <Modal.Title>New question</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="question">
                        <Form.Label>Question</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your question"
                          onChange={(e) => {
                            setQuestion(e.target.value);
                          }}
                          value={question}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="optionA">
                        <Form.Label>Option A</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your option A"
                          onChange={(e) => {
                            setOptionA(e.target.value);
                          }}
                          value={optionA}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="optionB">
                        <Form.Label>Option B</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your option B"
                          onChange={(e) => {
                            setOptionB(e.target.value);
                          }}
                          value={optionB}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="optionC">
                        <Form.Label>Option C</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your option C"
                          onChange={(e) => {
                            setOptionC(e.target.value);
                          }}
                          value={optionC}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="optionD">
                        <Form.Label>Option D</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your option D"
                          onChange={(e) => {
                            setOptionD(e.target.value);
                          }}
                          value={optionD}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="answer">
                        <Form.Label>Answer</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your answer"
                          onChange={(e) => {
                            setAnswer(e.target.value);
                          }}
                          value={answer}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseI}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={addQuestion}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
                <SweetAlert2
                  {...swalProps}
                  onConfirm={(result) => {
                    setSwalProps({
                      show: false,
                      title: "",
                      text: "",
                      icon: "",
                    });
                  }}
                />
                <Row>
                  <Col xs={8}>
                    <BtnNew onClick={handleShow}>New Quizes</BtnNew>
                  </Col>
                  <Col xs={4}>
                    <div style={{ display: "flex" }}>
                      <Form.Select
                        style={{ marginRight: 5 }}
                        onChange={(e) => {
                          changeFilterC(e.target.value);
                        }}
                        value={isSelectFilterC}
                      >
                        {isDataFilterC.map((item, i) => (
                          <option key={i} value={item.id}>
                            {item.title}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Select
                        style={{ marginLeft: 5 }}
                        onChange={(e) => {
                          changeFilterM(e.target.value);
                        }}
                        value={isSelectFilterM}
                      >
                        {isDataFilterM.map((item, i) => (
                          <option key={i} value={item.id}>
                            {item.title}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  </Col>
                </Row>
                <DataTable
                  headers={isHeader}
                  data={isData}
                  onClickV={null}
                  onClickE={onEdit}
                  onClickD={onDelete}
                />
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default quizesAdmin;
