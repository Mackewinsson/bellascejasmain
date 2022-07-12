import React, {useEffect, useState} from "react";
import {Container, Row, Col, Modal, Button, Form, Spinner } from "react-bootstrap";
import Sidebar from "../components/common/Side";
import DataTable from "../components/common/Table";
import * as paymentActions from '../store/actions/payment';
import {useDispatch, useSelector} from 'react-redux'
import SweetAlert2 from 'react-sweetalert2';

const paymentAdmin = () => {
    const dispatch = useDispatch();
    const isLoadingData = useSelector(state => state.payment.loadingData);
    const [swalProps, setSwalProps] = useState({});
    const isLoading = useSelector(state => state.payment.loading);
    const errorP = useSelector(state => state.payment.errorP);
    const payments = useSelector(state => state.payment.payments);
    const [isData, setData] = useState([]);
    const [id, setId] = useState("");
    const [requestDate, setRequestDate] = useState("");
    const [commerceOrder, setCommerceOrder] = useState("");
    const [flowOrder, setFlowOrder] = useState("");
    const [payer, setPayer] = useState("");
    const [amount, setAmount] = useState(0);
    const [currency, setCurrency] = useState("");
    const [merchantId, setMerchantId] = useState("");
    const [paymentData, setPaymentData] = useState(null);
    const [requestError, setRequestError] = useState("");
    const [requestStatus, setRequestStatus] = useState("");
    const [subject, setSubject] = useState("");

    const [show, setShow] = useState(false);
    const isHeader = [{text: 'Date', key: 'requestDate'}, {text: 'Order app', key: 'commerceOrder'}, {text: 'Flow order', key: 'flowOrder'}, {text: 'Payer', key: 'payer'}, {text: 'Amount', key: 'amount'}];

    const handleClose = () => {
        setId("");
        setRequestDate("");
        setCommerceOrder("");
        setFlowOrder("");
        setPayer("");
        setAmount(0);
        setCurrency("");
        setMerchantId("");
        setPaymentData(null);
        setRequestError("");
        setRequestStatus("");
        setSubject("");
        setShow(false);
    }

    useEffect(() => {
        dispatch(paymentActions.getPayment())
    }, []);

    useEffect(() => {
        if(errorP) {
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
                    text: errorP,
                    icon:'error'
                });
                dispatch(paymentActions.deleteError())
                clearInterval(timer)
              },100);
        }
    }, [errorP]);

    useEffect(() => {
        if (payments && payments.length > 0) {
            let info = []
            setData([])
            payments.forEach(el=>{
                info.push({
                    requestDate: el.requestDate,
                    commerceOrder: el.commerceOrder,
                    flowOrder: el.flowOrder,
                    payer: el.payer,
                    amount: el.amount
                })
            })
            setData(info)
        }
    }, [payments]);

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


    const onView = (e, index) => {
        payments.forEach((el, i)=>{
            if (i == index) {
                setId(el.id);
                setRequestDate(el.requestDate);
                setCommerceOrder(el.commerceOrder);
                setFlowOrder(el.flowOrder);
                setPayer(el.payer);
                setAmount(el.amount);
                setCurrency(el.currency);
                setMerchantId(el.merchantId);
                setPaymentData(el.paymentData);
                setRequestError(el.requestError);
                setRequestStatus(el.requestStatus);
                setSubject(el.subject);
            }
        });
        setShow(true);
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
                                        <Modal.Title>Payment</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            {requestDate &&
                                                <Form.Group className="mb-3" controlId="requestDate">
                                                    <Form.Label>Request date</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={requestDate}
                                                        readOnly
                                                    />
                                                </Form.Group>
                                            }
                                            <Form.Group className="mb-3" controlId="commerceOrder">
                                                <Form.Label>Commerce order</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={commerceOrder}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            {flowOrder &&
                                                <Form.Group className="mb-3" controlId="flowOrder">
                                                    <Form.Label>Flow order</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={flowOrder}
                                                        readOnly
                                                    />
                                                </Form.Group>
                                            }
                                            <Form.Group className="mb-3" controlId="currency">
                                                <Form.Label>Currency</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={currency}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            {merchantId &&
                                                <Form.Group className="mb-3" controlId="merchantId">
                                                    <Form.Label>Merchant id</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={merchantId}
                                                        readOnly
                                                    />
                                                </Form.Group>
                                            }
                                            <Form.Group className="mb-3" controlId="payer">
                                                <Form.Label>Payer</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={payer}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            {requestError &&
                                                <Form.Group className="mb-3" controlId="requestError">
                                                    <Form.Label>Request error</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={requestError}
                                                        readOnly
                                                    />
                                                </Form.Group>
                                            }
                                            <Form.Group className="mb-3" controlId="requestStatus">
                                                <Form.Label>Request status</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={requestStatus}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="subject">
                                                <Form.Label>Subject</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={subject}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="amount">
                                                <Form.Label>Amount</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={amount}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            {paymentData &&
                                                <>
                                                    <Form.Group className="mb-3" controlId="balance">
                                                        <Form.Label>Balance</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            value={paymentData?.balance}
                                                            readOnly
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="fee">
                                                        <Form.Label>Fee</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            value={paymentData?.fee}
                                                            readOnly
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="media">
                                                        <Form.Label>Media</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            value={paymentData?.media}
                                                            readOnly
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="taxes">
                                                        <Form.Label>Taxes</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            value={paymentData?.taxes}
                                                            readOnly
                                                        />
                                                    </Form.Group>
                                                </>
                                            }

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
                                <DataTable headers={isHeader} data={isData} onClickV={onView} onClickE={null} onClickD={null} />
                            </>
                        )}
                    </Col> 
                </Row>

            </Container>
        </>
        );
  };
  export default paymentAdmin