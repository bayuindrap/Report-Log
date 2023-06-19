import React from 'react';
import { API_URL } from '../helper';
import axios from 'axios';
import { Badge, Button, ModalHeader, ModalBody, ModalFooter, Input, InputGroupText } from 'reactstrap'
import { Form, InputGroup, FormGroup, Modal, FormControl } from 'react-bootstrap';
import Swal from 'sweetalert2'
import { CgSandClock } from "react-icons/cg";
import { AiOutlineCheck } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { FaCheck, FaSearch } from "react-icons/fa";
import { connect } from 'react-redux';
import { reportAction, userAction } from '../redux/actions';
import lotteLoading from "../assets/Logo-Lotte.gif"
import { AiTwotoneDelete } from "react-icons/ai";



class ReportPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: ["On Check🔎", "On Progress⏳", "Solved✔"],
            dateNow: new Date(),
            modal: false,
            reportId: null,
            processedBy: null
        }
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevState.modal && !this.state.modal) {
            // Modal was closed, clear the input fields
            this.rootCause.value = "";
            this.solution.value = "";
        }
    }


    btnProcess = (id) => {
        axios.patch(`${API_URL}/report/${id}`, {
            status: "On Progress⏳",
            // cause: this.rootCause.value,
            // solution: this.solution.value
            handledby: this.props.username
        })
            .then((res) => {
                this.props.reportAction()
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Data has been updated.',
                    showConfirmButton: false,
                    timer: 1250,
                    width: "223px"
                })
                this.setState({ modal: false, processedBy: this.props.username })
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
                timer: 960,
                width: "223px"
            });
            return
        }

        // if (this.state.processedBy === this.props.username) {
        //     Swal.fire({
        //         position: 'center',
        //         icon: 'warning',
        //         title: 'You are not authorized to mark this report as solved.',
        //         showConfirmButton: false,
        //         timer: 1100,
        //         width: "250px"
        //     });
        //     return
        // }

        axios.patch(`${API_URL}/report/${id}`, {
            status: "Solved✔",
            solvedate: this.state.dateNow.toLocaleDateString(),
            cause: this.rootCause.value,
            solution: this.solution.value
        })
            .then((res) => {
                this.props.reportAction();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Data has been updated.',
                    showConfirmButton: false,
                    timer: 1250,
                    width: "223px"
                })
                // this.setState({ modal: false })
                this.toggleModal()
            })
            .catch((error) => {
                console.log(error);
            });
    }

    btnDelete = (id) => {
        axios.delete(`${API_URL}/report/${id}`)
            .then((res) => {
                this.props.reportAction();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Report has been deleted.',
                    showConfirmButton: false,
                    timer: 1250,
                    width: '223px'
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // toggle = (id) => {
    //     // this.setState({
    //     //     modal: !this.state.modal,
    //     //     reportId: id
    //     // })
    //     const { report, username } = this.props;
    //     const selectedReport = report.find((value) => value.id === id);
    //     // console.log("cek isi", this.props.report.handledby)
    //     // const selectedReport = this.props.report.find((value) => value.id === id);
    //     if (selectedReport.status === "On Check🔎") {
    //         Swal.fire({
    //             position: 'center',
    //             icon: 'warning',
    //             title: 'Process Report First.',
    //             showConfirmButton: false,
    //             timer: 875,
    //             width: "215px"
    //         });
    //         return
    //     }

    //     if (selectedReport.handledby !== username) {
    //         Swal.fire({
    //             position: 'center',
    //             icon: 'warning',
    //             title: 'You are not authorized to mark this report as solved.',
    //             showConfirmButton: false,
    //             timer: 1100,
    //             width: "250px"
    //         });
    //         return
    //     }
    //     this.setState(prevState => ({
    //         modal: !prevState.modal,
    //         reportId: id
    //     }));

    //     const body = document.getElementsByTagName("body")[0]
    //     body.classList.toggle("modal-open")

    // }

    toggle = (id) => {
        const { report, username } = this.props;
        const selectedReport = report.find((value) => value.id === id);

        if (selectedReport.status === "On Check🔎") {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Process Report First.',
                showConfirmButton: false,
                timer: 875,
                width: "215px"
            });
            return;
        }

        if (selectedReport.handledby !== username) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'You are not authorized to mark this report as solved.',
                showConfirmButton: false,
                timer: 1100,
                width: "250px"
            });
            return;
        }

        this.setState(prevState => ({
            modal: !prevState.modal,
            reportId: id
        }));

        const body = document.getElementsByTagName("body")[0];
        body.classList.toggle("modal-open");
    }

    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    modalInput = () => {
        return (
            <Modal show={this.state.modal} toggle={this.toggleModal}
                backdrop="false"
                keyboard={false}
            >
                <Modal.Header toggle={this.toggleModal}>Input Cause & Solution</Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <Form.Label>Root Cause</Form.Label>
                        <InputGroup>
                            <Input type="textarea" placeholder="Input Root Cause"
                                style={{
                                    height: "120px",
                                    resize: "vertical",
                                    padding: '10px 15px',
                                    overflow: 'auto',
                                    whiteSpace: 'pre-wrap',
                                    wordWrap: 'break-word',
                                }}
                                innerRef={(element) => this.rootCause = element} />
                            {/* <Form.Control
                                type="text"
                                placeholder="Input Root Cause"
                                style={{
                                    fontSize: '16px',
                                    padding: '10px 15px',
                                    width: '100%', // Set the width to 100% to make it a block element
                                    overflowY: 'auto',
                                    whiteSpace: 'pre-wrap',
                                    wordWrap: 'break-word',
                                }}
                                ref={(element) => (this.rootCause = element)}
                            /> */}
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <Form.Label>Solution</Form.Label>
                        <InputGroup>
                            <Input type="textarea" placeholder="Input Solution"
                                style={{ height: "120px", resize: "vertical" }}
                                innerRef={(element) => this.solution = element} />
                        </InputGroup>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
                    <Button color="secondary" style={{ width: 110, color: "black", borderRadius: 50 }} onClick={this.toggleModal}>Cancel <GiCancel /></Button>
                    <Button color="success" style={{ width: 110, color: "black", borderRadius: 50 }} onClick={() => this.btnSolved(this.state.reportId)}>Solved <FaCheck /></Button>
                </Modal.Footer>
            </Modal>
        )

    }

    // btnDelete = (id) => {
    //     Swal.fire({
    //         title: 'Do you want to delete report?',
    //         confirmButtonText: 'Delete',
    //         showCancelButton: true,
    //       }).then((result) => {
    //         if (result.isConfirmed) {
    //             axios.delete(`${API_URL}/report/${id}`)
    //                 .then((res) => {
    //                     this.props.reportAction();
    //                     Swal.fire({
    //                         position: 'center',
    //                         icon: 'success',
    //                         title: 'Report has been deleted.',
    //                         showConfirmButton: false,
    //                         timer: 1350,
    //                         width: '223px'
    //                     });
    //                 })
    //                 .catch((error) => {
    //                     console.log(error);
    //                 });

    //         } 
    //       })
    // }

    btnDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Do you want to delete this report?',
            confirmButtonText: 'Delete',
            showCancelButton: true,
            reverseButtons: true,
            buttonsStyling: true,
            confirmButtonColor: 'red',
            cancelButtonColor: 'blue',
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${API_URL}/report/${id}`);
                this.props.reportAction();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Report has been deleted.',
                    showConfirmButton: false,
                    timer: 1350,
                    width: '223px',
                });
            } catch (error) {
                console.log(error);
            }
        }
    };


    
    printReport = () => {
        // const renderValue = (label, field) => {
        //     if (field && field.trim() !== "") {
        //         return <p>{field} : {label}</p>;
        //     }
        //     return null;
        // };

        
        const renderValue = (field, label) => {
            if (field && field.trim() !== "") {
              return <p>{label} : {field}</p>;
            }
            return null;
          };
        return this.props.report.map((value, index) => {
            
            if (value.status === "Solved✔") {
                return <div></div>
            }


            let badgeColor = value.status.includes("On Progress⏳") ? "warning" : value.status.includes("Solved✔") ? "success" : "primary"

            // if(this.props.report.length ==)

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
                                {/* <p> INVOICE NO : {value.invoice}</p>
                                <p> PRODUCT CODE : {value.productcd}</p>
                                <p> TRANSACTION DATE : {value.datetransaction}</p>
                                <p> REPORT DATE : {value.reportdate}</p>
                                <p> DETAIL CASE : {value.detail}</p> */}
                                {renderValue(value.invoice, "INVOICE NO")}
                                {renderValue(value.productcd, "PRODUCT CODE")}
                                {renderValue(value.datetransaction, "TRANSACTION DATE")}
                                {renderValue(value.reportdate, "REPORT DATE")}
                                {renderValue(value.detail, "DETAIL CASE")}
                            </div>
                        </div>

                        <div className='row'>
                            <img src={value.imgcorp} style={{ width: "23%" }} />
                            {this.props.role === 'superadmin' && (

                                <AiTwotoneDelete style={{ fontSize: "20 px", marginLeft: "auto", maxWidth: "5%" }} onClick={() => this.btnDelete(value.id)} />

                            )}
                            {/* {
                                this.props.role === "superadmin" && (
                                    <Button style={{width: 110, justifyContent: "center", alignContent: "center"}}>Delete</Button>
                                )
                            } */}
                            {/* <Button>Delete</Button>               */}
                        </div>

                    </div>

                    <div style={{ float: "right", marginTop: -30, marginRight: 5, display: "flex", alignItems: "center" }}>

                        {["On Check🔎"].includes(value.status) && (
                            <div>
                                {/* <Button color="warning" style={{ width: 110, color: "black" }} onClick={() => this.btnProcess(value.id)}><CgSandClock />Process</Button> */}
                                <Button color="warning" style={{ width: 110, color: "black", borderRadius: 50 }} onClick={() => this.btnProcess(value.id)}>Process <CgSandClock /></Button>
                                <Button color="success" style={{ width: 110, color: "black", borderRadius: 50 }} onClick={() => this.toggle(value.id)}>Solved <FaCheck /></Button>
                                {/* <AiTwotoneDelete style={{ fontSize: "22px", marginLeft: 10 }} onClick={() => this.btnDelete(value.id)} /> */}
                            </div>
                        )}
                        {["On Progress⏳"].includes(value.status) && (
                            <Button color="success" style={{ width: 110, color: "black", borderRadius: 50 }} onClick={() => this.toggle(value.id)}>Solved <FaCheck /></Button>
                        )}
                        {["Solved✔"].includes(value.status) && (
                            <div></div>
                        )}

                        {/* {this.props.role === 'superadmin' && (
                            <Button
                                color='danger'
                                style={{ width: 110, color: 'black' }}
                                onClick={() => this.btnDelete(value.id)}
                            >
                               Delete
                            </Button>
                        )
                        } */}

                        {this.modalInput()}
                    </div>
                    <div>

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
                    {this.printReport()}
                </div>

            </div>

        );
    }
}

const mapToProps = ({ userReducer }) => {
    // console.log("tes report", userReducer.reportList)
    // console.log("tes user", userReducer.userList.username)
    // console.log("tes data", props.report)
    return {
        report: userReducer.reportList,
        username: userReducer.userList.username,
        role: userReducer.userList.role

    }
}


export default connect(mapToProps, { reportAction })(ReportPage);