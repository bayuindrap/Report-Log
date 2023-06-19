import axios from 'axios';
import React from 'react';
import { Badge, Button, Input, InputGroupText } from 'reactstrap'
import { Table, Pagination, Image, Form, Col, Row, InputGroup, Card, FormGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify'
import { reportAction } from '../redux/actions';
import { FiDownload } from "react-icons/fi";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { API_URL } from '../helper';
import lotteLoading from "../assets/Logo-Lotte.gif"
import { BiReset } from "react-icons/bi";


class TableHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            report: [],
            status: ["All Report", "On Check🔎", "On Progress⏳", "Solved✔"],
            isLoading: false,
            statusIdx: 0,
            selectedValue: '',
            process: false,
            startDate: null,
            endDate: null,

        }
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);

    };

    // handleStartDateChange = (date) => {
    //     this.setState({ startDate: date });
    // };

    // handleEndDateChange = (date) => {
    //     this.setState({ endDate: date });
    // };

    handleStartDateChange = (date) => {
        this.setState({ startDate: date }, () => {
            this.getReportFilter(this.state.status[this.state.statusIdx], this.state.statusIdx, this.state.startDate, this.state.endDate);
        });
    };

    handleEndDateChange = (date) => {
        this.setState({ endDate: date }, () => {
            this.getReportFilter(this.state.status[this.state.statusIdx], this.state.statusIdx, this.state.startDate, this.state.endDate);
        });
    };



    // getReportFilter = (status, statusActive) => {

    //     axios.get(`${API_URL}/report${statusActive > 0 ? `?status=${status}` : ""}`)
    //         // console.log("cek", statusActive)
    //         .then((res) => {
    //             console.log("report filt", res.data, statusActive)
    //             this.setState({ report: res.data, statusIdx: statusActive })
    //             // this.printReport()
    //         }).catch((err) => {
    //             console.log(err)
    //         })
    // }

    getReportFilter = (status, statusActive, startDate, endDate) => {
        this.setState({ isLoading: true })
        console.log("start date", startDate?.toLocaleDateString());
        const formattedStartDate = startDate?.toLocaleDateString();
        const formattedEndDate = endDate?.toLocaleDateString();
        const apiUrl = `${API_URL}/report${statusActive > 0 ? `?status=${status}` : ""}`;

        axios.get(apiUrl)
            .then((res) => {
                const filteredReport = res.data.filter((report) => {
                    const reportDate = new Date(report.reportdate);
                    if (formattedStartDate && formattedEndDate) {
                        return reportDate >= startDate && reportDate <= endDate;
                    }
                    if (formattedStartDate) {
                        return reportDate >= startDate;
                    }
                    if (formattedEndDate) {
                        return reportDate <= endDate;
                    }
                    return true;
                });
                console.log("data filter report", filteredReport, statusActive);
                this.setState({ report: filteredReport, statusIdx: statusActive, isLoading: false });
            })
            .catch((err) => {
                console.log(err);
            });
    };


    printTable = () => {
        return (

            <div>

                <div>
                    <ToastContainer />
                    <Card>

                        <Card.Body>
                            <Row className="mt-3 mb-3">
                                {/* <Col xs={8}>
                                        <Form.Label>No Invoice</Form.Label>
                                        <InputGroup>
                                            <Form.Control type="number" placeholder="Input No Invoice"
                                                ref={this.state.invRef} />
                                        </InputGroup>
                                    </Col> */}
                                <br />
                                <br />
                                <Col xs={8}>
                                    {/* {this.state.isLoading ? <Image fluid src={lotteLoading} width={50} height={50} /> :
                                            <Button color="success" style={{ color: "white" }} onClick={this.getData}>Check</Button>
                                        } */}
                                </Col>
                            </Row>
                            <div style={{ overflowX: "auto", maxWidth: "97vw", maxHeight: "65vh" }}>


                                <Table striped bordered hover>

                                    <thead style={{ backgroundColor: '#FFFFFF', textAlign: "center", position: "sticky", top: 0, zIndex: 1 }}>

                                        <th>Status</th>
                                        <th>User Name</th>
                                        <th>Order Id</th>
                                        <th>Corp</th>
                                        <th>Transaction Date</th>
                                        <th>Report Date</th>
                                        <th>Product Code</th>
                                        <th>Detail Case</th>
                                        <th>Solved Date</th>

                                    </thead>


                                    <tbody>
                                        {
                                            this.state.report.map((value, index) => (
                                                // let badgeColor = value.status.includes("On Progress⏳") ? "warning" : value.status.includes("Solved✔") ? "success" : "primary"

                                                <tr key={index}>

                                                    <td>{value.status}</td>
                                                    <td>{value.name}</td>
                                                    <td>{value.orderid}</td>
                                                    <td><img src={value.imgcorp} style={{ width: 150 }} /></td>
                                                    <td>{value.datetransaction}</td>
                                                    <td>{value.reportdate}</td>
                                                    <td>{value.productcd}</td>
                                                    <td>{value.detail}</td>
                                                    <td>{value.solvedate}</td>

                                                </tr>
                                            ))}
                                    </tbody>

                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )

    }

    convertJsonToExcel = () => {
        const { report } = this.state;

        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Convert the JSON array to a worksheet
        const worksheet = XLSX.utils.json_to_sheet(report);

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Generate an Excel file buffer
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        // Convert the buffer to a Blob
        const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // Save the Blob as a file
        saveAs(excelBlob, 'data.xlsx');
    };

    handleDownload = () => {
        const { jsonData } = this.state;
        console.log("json", jsonData)
        this.convertJsonToExcel(jsonData);
    }

    btnReset = () => {
        this.setState({
            report:[],
            isLoading: false,
            statusIdx: 0,
            selectedValue: '',
            process: false,
            startDate: null,
            endDate: null,
        })
    }




    render() {
        const { report, process } = this.state
        const isReportEmpty = report.length === 0
        const showDatePickers = !isReportEmpty || process;
        return (

            <div className=' p-5 mt-1'>
                <h1 style={{ textAlign: "center", marginTop: 15 }}>Table Log History</h1>


                <div>
                    <div className="d-flex justify-content-evenly mb-2">
                        {

                            this.state.status.map((value, index) => {
                                return <Button outline
                                    color={this.state.statusIdx == index ? "danger" : "secondary"}
                                    style={{ border: 'none', width: "100%", borderBottom: this.state.statusIdx == index && "3px solid #ED3338" }}
                                    type='button'
                                    onClick={() => this.getReportFilter(value, index)}>
                                    <h6 style={{ fontWeight: "bold" }}>{value}</h6>
                                </Button>
                            })

                        }
                    </div>
                    {/* <div className='row'>
                        <div className="col" style={{ zIndex: 30 }}>
                            <label>From Date: </label>
                            <DatePicker selected={this.state.startDate}
                                onChange={this.handleStartDateChange}
                                style={{ width: '100%' }}
                                popperPlacement="bottom-start"
                                placeholderText="Choose a start date" />
                        </div>
                        <div className="col text-end" style={{ position: 'relative', zIndex: 20, marginLeft: 'auto' }}>
                            <div className='auto'>
                                <label>To Date: </label>
                            </div>
                            <DatePicker selected={this.state.endDate}
                                onChange={this.handleEndDateChange}
                                style={{ width: '100%' }}
                                popperPlacement="bottom-start"
                                placeholderText="Choose a end date" />
                        </div>
                    </div> */}
                    {showDatePickers && (
                        <div className="row">
                            <div className="col" style={{ zIndex: 30 }}>
                                <label>From Date: </label>
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleStartDateChange}
                                    style={{ width: "100%" }}
                                    popperPlacement="bottom-start"
                                    placeholderText="Choose a start date"
                                />
                            </div>
                            <div
                                className="col text-end"
                                style={{ position: "relative", zIndex: 20, marginLeft: "auto", textAlign: "left" }}
                            >
                                <div className="auto">
                                    <label>To Date: </label>
                                </div>
                                <DatePicker
                                    selected={this.state.endDate}
                                    onChange={this.handleEndDateChange}
                                    style={{ width: "100%" }}
                                    popperPlacement="bottom-end"
                                    placeholderText="Choose an end date"
                                />
                            </div>
                        </div>
                    )}
                    {!isReportEmpty && !process && 
                    <div className='d-flex justify-content-center'>
                        <Button color="warning" style={{ marginTop: 15, marginRight: 5, width: 127 }} onClick={this.btnReset}>Reset<BiReset/></Button>
                        <Button color="success" style={{ marginTop: 15, width: 127 }} onClick={this.handleDownload}>Download <FiDownload /></Button>

                    </div>
                    }
                    <div style={{ marginTop: "20px" }}>
                        {this.state.isLoading ? (
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Image src={lotteLoading} width={100} height={100} style={{ display: "flex", justifyContent: "center" }} />
                            </div>
                        ) : (
                            <div>
                                {
                                    this.state.report.length == 0 ? (
                                        <h4 style={{ textAlign: "center", marginTop: "200px", paddingBottom: "170px" }}>Select category to show data.</h4>
                                    ) : this.printTable()

                                }

                            </div>

                            // this.printTable()

                        )
                        }
                    </div>
                </div>

            </div>
        );
    }
}


const mapToProps = ({ userReducer }) => {
    console.log("tes report", userReducer.reportList)
    // console.log("tes data", props.report)
    return {
        report: userReducer.reportList

    }
}

export default connect(mapToProps, { reportAction })(TableHistory);