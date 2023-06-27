import React from 'react';
import { API_URL } from '../helper';
import axios from 'axios';
import { Badge, Button, ModalHeader, ModalBody, ModalFooter, Input, InputGroupText, Label, ButtonGroup } from 'reactstrap'
import { Form, InputGroup, FormGroup, Modal, FormControl, Image } from 'react-bootstrap';
import Swal from 'sweetalert2'
import { CgSandClock } from "react-icons/cg";
import { AiOutlineCheck } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { FaCheck, FaSearch } from "react-icons/fa";
import { connect } from 'react-redux';
import { reportAction, userAction } from '../redux/actions';
import lotteLoading from "../assets/Logo-Lotte.gif"
import { AiTwotoneDelete } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { GiBroom } from "react-icons/gi";
import '../product.css'


class ReportPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: ["On Check", "On Progress", "Solved"],
            dateNow: new Date(),
            modal: false,
            reportId: null,
            processedBy: null,
            isLoading: false,
            dataAvailable: true,
            page: 1
        }
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevState.modal && !this.state.modal) {
            // Modal was closed, clear the input fields
            this.rootCause.value = "";
            this.solution.value = "";
        }
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
        //   this.handleClick();
        this.btnSearch()
        }
      }


    // btnProcess = (id) => {
    //     axios.patch(`${API_URL}/report/${id}`, {
    //         status: "On Progress",
    //         // cause: this.rootCause.value,
    //         // solution: this.solution.value
    //         handledby: this.props.username
    //     })
    //         .then((res) => {
    //             this.props.reportAction()
    //             Swal.fire({
    //                 position: 'center',
    //                 icon: 'success',
    //                 title: 'Data has been updated.',
    //                 showConfirmButton: false,
    //                 timer: 1250,
    //                 width: "223px"
    //             })
    //             this.setState({ modal: false, processedBy: this.props.username })
    //         }).catch((err) => {
    //             console.log(err)
    //         })
    // }

    btnProcess = async (id) => {
        const result = await Swal.fire({
            title: 'Do you want to process this report?',
            confirmButtonText: '<span style="color: black">Process</span>',
            showCancelButton: true,
            reverseButtons: true,
            buttonsStyling: true,
            confirmButtonColor: '#FFCA2C',
            cancelButtonColor: 'blue',
        });
        if(result.isConfirmed) {
            axios.patch(`${API_URL}/report/${id}`, {
                status: "On Progress",
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

    }

    btnSolved = (id) => {
        const report = this.props.report.find((value) => value.id === id);

        if (report.status === "On Check") {
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
            status: "Solved",
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

    btnSearch = () => {
        this.setState({ isLoading: true })
        this.props.reportAction(this.searchName.value)
            .then(() => {
                setTimeout(() => {
                    this.setState({ isLoading: false, isFiltered: true });
                    if(this.props.report.length !== 0) {
                        this.setState({dataAvailable: true})
                    }else{
                        this.setState({dataAvailable: false})
                    }
                }, 1100);
            })
        console.log("datanama", this.searchName.value)
    }

    btnClear = () => {
        // this.clearFilter()
        this.setState({ isFiltered: false, dataAvailable: true })
        this.props.reportAction()
        this.searchName.value = ""
    }

    // btnDelete = (id) => {
    //     axios.delete(`${API_URL}/report/${id}`)
    //         .then((res) => {
    //             this.props.reportAction();
    //             Swal.fire({
    //                 position: 'center',
    //                 icon: 'success',
    //                 title: 'Report has been deleted.',
    //                 showConfirmButton: false,
    //                 timer: 1250,
    //                 width: '223px'
    //             });
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
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

    toggle = (id) => {
        const { report, username } = this.props;
        const selectedReport = report.find((value) => value.id === id);

        if (selectedReport.status === "On Check") {
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

    // inputModal = () => {
        
    //         const { value: text } = Swal.fire({
    //             input: 'textarea',
    //             inputLabel: 'Message',
    //             inputPlaceholder: 'Type your message here...',
    //             inputAttributes: {
    //               'aria-label': 'Type your message here'
    //             },
    //             showCancelButton: true
    //           })
              
    //           if (text) {
    //             Swal.fire(text)
    //           }
    
    // }

    printReport = () => {
        let {page} =  this.state

        const renderValue = (field, label) => {
            if (field && field.trim() !== "") {
                return <p>{label} : {field}</p>;
            }
            return null;
        };
        
        return this.props.report.map((value, index) => {

            if (value.status === "Solved") {
                return <div></div>
            }


            let badgeColor = value.status.includes("On Progress") ? "warning" : value.status.includes("Solved") ? "success" : "primary"

            return (
                // #ADADAD
                <div className='shadow pb-3 rounded mb-5'>
                    <div className='shadow p-2 rounded mb-1' style={{ color: "black", backgroundColor: "#ADADAD" }}>
                        <b>{value.name}'s Report</b>
                        {
                            value.orderid !== "" ? <b> / {value.orderid}</b> : null
                        }
                        <b> / {value.corp} Corp</b>
                        <b style={{ float: "right" }}><Badge color={badgeColor}>{value.status}</Badge></b>
                    </div>

                    <div className='col'>
                        <div className='p-2'>
                            <div>
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

                                <AiTwotoneDelete className="hvr-grow" style={{ fontSize: "20 px", marginLeft: "auto", maxWidth: "5%" }} onClick={() => this.btnDelete(value.id)} />

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

                        {["On Check"].includes(value.status) && (
                            <div>
                                <Button className="hvr-grow" color="warning" style={{ width: 110, color: "black", borderRadius: "18px", marginRight: 5 }} onClick={() => this.btnProcess(value.id)}>Process <CgSandClock /></Button>
                                <Button className="hvr-grow" color="success" style={{ width: 110, color: "black", borderRadius: "18px"}} onClick={() => this.toggle(value.id)}>Solved <FaCheck /></Button>
                            </div>
                        )}
                        {["On Progress"].includes(value.status) && (
                            <Button className="hvr-grow" color="success" style={{ width: 110, color: "black", borderRadius: "18px"}} onClick={() => this.toggle(value.id)}>Solved <FaCheck /></Button>
                        )}
                        {["Solved"].includes(value.status) && (
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

    printFilter = () => {
        <div>
            <FormGroup>
                <Label>Search</Label>
                <Input type="text" id="text" placeholder="Input user report" />
            </FormGroup>
        </div>
    }

    btnPagination = () => {
        let btn = [] 
        for (let i = 0; i < Math.ceil(this.props.report.length / 6); i++){
            btn.push(<Button 
                outline color="" disabled={this.state.page == i + 1 ? true : false}
                onClick={() => this.setState({ page: i + 1 })}>
                {i+1}
            </Button>)
        }
        return btn
    }





    render() {
        const { isFiltered, isLoading, dataAvailable } = this.state;
        const noData = isFiltered && !isLoading && this.searchName.value !== '';

        return (
            <div className='container p-5 mt-4'>
                <h1 className='text-center'>Report Page</h1>
                <div className='mb-3'>
                    <FormGroup>
                        <Label>Search</Label>
                        <Input type="text" id="text" placeholder="Input user name"
                            style={{ width: 250, marginBottom: 5}}
                            innerRef={(element) => this.searchName = element}
                            onKeyDown={this.handleKeyPress}
                        />
                        {isFiltered && (
                            <Button className="hvr-grow" color="danger" onClick={this.btnClear} style={{width: 103, borderRadius: "18px", marginRight: 5}}>Clear<GiBroom /></Button>
                        )}
                        <Button className="hvr-grow" color="info" onClick={this.btnSearch} style={{borderRadius: "18px"}}>Search <AiOutlineSearch /></Button>
                    </FormGroup>
                </div>
                <div>
                    {isLoading ? (
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Image src={lotteLoading} width={110} height={110} style={{ display: "flex", justifyContent: "center" }} />
                        </div>
                    ) : (
                        <div>
                            {
                                dataAvailable ? (
                                    this.printReport()
                                ) : (

                                     <h5 style={{ textAlign: "center", marginTop: "200px", paddingBottom: "165px" }}>Data not found.</h5>
                                )
                            }
                        </div>
                        //  noData ? (

                        //      ) : (
                        //          this.printReport()
                        //     )
                        // this.printReport()
                    )
                    }
                </div>

                {/* <div style={{textAlign: "center"}}>
                    <ButtonGroup>
                        {this.btnPagination()}
                    </ButtonGroup>
                </div> */}

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