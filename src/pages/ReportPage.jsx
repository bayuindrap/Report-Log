import React from 'react';
import { API_URL } from '../helper';
import axios from 'axios';
import { Badge, Button, ModalHeader, ModalBody, ModalFooter, Input, InputGroupText } from 'reactstrap'
import { Form, InputGroup, FormGroup, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2'
import { CgSandClock } from "react-icons/cg";
import { AiOutlineCheck } from "react-icons/ai";
import { FaCheck, FaSearch } from "react-icons/fa";
import { connect } from 'react-redux';
import { reportAction, userAction } from '../redux/actions';
import lotteLoading from "../assets/Logo-Lotte.gif"



class ReportPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: ["On Check🔎", "On Progress⏳", "Solved✔"],
            dateNow: new Date(),
            modal: false,
            reportId: null
        }
    }


    btnProcess = (id) => {
        axios.patch(`${API_URL}/report/${id}`, {
            status: "On Progress⏳",
            cause: this.rootCause.value,
            solution: this.solution.value
        })
            .then((res) => {
                this.props.reportAction()
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Data has been saved.',
                    showConfirmButton: false,
                    timer: 1350,
                    width: "223px"
                })
                this.setState({ modal: false })
            }).catch((err) => {
                console.log(err)
            })
    }

    // btnSolved = (id) => {
    //     if(this.props.report.status === "On Check🔎") {
    //         console.log("cek status", this.props.report.status)
    //         return Swal.fire({
    //             position: 'center',
    //             icon: 'warning',
    //             title: 'Process The Report First.',
    //             showConfirmButton: false,
    //             timer: 875,
    //             width: "223px"
    //         })
    //         return
    //     }
    //     axios.patch(`${API_URL}/report/${id}`, {
    //         status: "Solved✔",
    //         solvedate: this.state.dateNow.toLocaleDateString(),
    //     })
    //         .then((res) => {
    //             this.props.reportAction()
    //         }).catch((error) => {
    //             console.log(error)
    //         })
    // }

    btnSolved = (id) => {
        const report = this.props.report.find((value) => value.id === id);

        if (report.status === "On Check🔎") {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Process The Report First.',
                showConfirmButton: false,
                timer: 875,
                width: "223px"
            });
            return
        }
        
        axios.patch(`${API_URL}/report/${id}`, {
            status: "Solved✔",
            solvedate: this.state.dateNow.toLocaleDateString(),
        })
            .then((res) => {
                this.props.reportAction();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    toggle = (id) => {
        // this.setState({
        //     modal: !this.state.modal,
        //     reportId: id
        // })
        this.setState(prevState => ({
            modal: !prevState.modal,
            reportId: id
        }));

        const body = document.getElementsByTagName("body")[0]
        body.classList.toggle("modal-open")

    }


    modalInput = () => {
        return (
            <Modal show={this.state.modal} toggle={this.toggle}
                backdrop="false"
                keyboard={false}
                >
                <Modal.Header toggle={this.toggle}>Input Cause & Solution</Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <Form.Label>Root Cause</Form.Label>
                        <InputGroup>
                            <Input type="text" placeholder="Input Root Cause"
                                innerRef={(element) => this.rootCause = element} />
                            <InputGroupText></InputGroupText>
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <Form.Label>Solution</Form.Label>
                        <InputGroup>
                            <Input type="text" placeholder="Input Solution"
                                innerRef={(element) => this.solution = element} />
                            <InputGroupText></InputGroupText>
                        </InputGroup>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
                    <Button color="warning" style={{ width: 110, color: "black" }} onClick={() => this.btnProcess(this.state.reportId)}><CgSandClock />Process</Button>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        )

    }


    printReport = () => {
        return this.props.report.map((value, index) => {
            let badgeColor = value.status.includes("On Progress⏳") ? "warning" : value.status.includes("Solved✔") ? "success" : "primary"

            return (

                <div className='shadow pb-3 rounded mb-5'>
                    <div className='shadow p-2 rounded mb-1' style={{ color: "black", backgroundColor: "#C9DBB2" }}>
                        <b>{value.name}'s Report</b>
                        <b> | {value.orderid}</b>
                        <b> | {value.corp} Corp</b>
                        <b style={{ float: "right" }}><Badge color={badgeColor}>{value.status}</Badge></b>
                    </div>

                    <div className='col'>
                        <div className='p-2'>
                            <div>
                                <p> TRANSACTION DATE : {value.datetransaction}</p>
                                <p> REPORT DATE : {value.reportdate}</p>
                                <p> PRODUCT CODE : {value.productcd}</p>
                                <p> DETAIL CASE : {value.detail}</p>
                            </div>
                        </div>

                        <div className='row'>
                            <img src={value.imgcorp} style={{ width: "20%" }} />
                        </div>

                    </div>

                    <div style={{ float: "right", marginTop: -30, marginRight: 5 }}>


                        {["On Check🔎"].includes(value.status) && (
                            <div>
                                {/* <Button color="warning" style={{ width: 110, color: "black" }} onClick={() => this.btnProcess(value.id)}><CgSandClock />Process</Button> */}
                                <Button color="warning" style={{ width: 110, color: "black" }} onClick={() => this.toggle(value.id)}><CgSandClock />Process</Button>
                                <Button color="success" style={{ width: 110, color: "black" }} onClick={() => this.btnSolved(value.id)}><FaCheck />Solved</Button>
                            </div>
                        )}
                        {["On Progress⏳"].includes(value.status) && (
                            <Button color="success" style={{ width: 110, color: "black" }} onClick={() => this.btnSolved(value.id)}><FaCheck />Solved</Button>
                        )}
                        {["Solved✔"].includes(value.status) && (
                            <div></div>
                        )}

                        {this.modalInput()}
                    </div>
                </div>

            )
        })
    }


    render() {
        return (
            <div className='container p-5 mt-4'>
                <h1 className='text-center'>Report Page Admin</h1>

                <div> 
                    {
                      this.props.report.length == 0 ? (
                        <h4 style={{textAlign: "center", marginTop: "200px", paddingBottom: "190px"}}>Data not found.</h4>
                      ) : this.printReport()
                        
                    }
                    {/* {this.printReport()} */}
                </div>

            </div>

        );
    }
}

const mapToProps = ({ userReducer }) => {
    console.log("tes report page", userReducer.reportList)
    // console.log("tes data", props.report)
    return {
        report: userReducer.reportList

    }
}


export default connect(mapToProps, { reportAction })(ReportPage);