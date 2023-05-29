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
        // this.handleChange = this.handleChange.bind(this);
        // this.handleChangeReport = this.handleChangeReport.bind(this);
        // this.handleStartDateChange = this.handleStartDateChange.bind(this);
        // this.handleEndDateChange = this.handleEndDateChange.bind(this);
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
        console.log("start date", startDate?.toLocaleDateString());
        const formattedStartDate = startDate?.toLocaleDateString();
        const formattedEndDate = endDate?.toLocaleDateString();
        const apiUrl = `${API_URL}/report${statusActive > 0 ? `?status=${status}` : ""}`;
    
        axios.get(apiUrl)
            .then((res) => {
                const filteredReport = res.data.filter((report) => {
                    const reportDate = new Date(report.date);
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
                this.setState({ report: filteredReport, statusIdx: statusActive });
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
                                                    <td>{value.date}</td>
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




    render() {
        const { report, process } = this.state
        const isReportEmpty = report.length === 0

        return (
            <div className=' p-5'>
                <h1 style={{ textAlign: "center", marginTop: 15 }}>Table Log History</h1>


                <div>
                    <div className="d-flex justify-content-evenly mb-3">
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
                    {/* {
                        !this.state.process ? <Button onClick={this.handleDownload}>Download</Button> : <div></div>
                    } */}
                    {/* <div>
                        <label>From Date: </label>
                        <DatePicker selected={this.state.startDate} onChange={this.handleStartDateChange} />
                    </div> */}
                    <div style={{ position: 'relative', zIndex: 20 }}>
                        <label>From Date: </label>
                        <DatePicker selected={this.state.startDate} 
                        onChange={this.handleStartDateChange} 
                        popperPlacement="top"
                        placeholderText="Choose a start date" />
                    </div>
                    <div style={{ position: 'relative', zIndex: 20, marginTop: 10 }}>
                        <label>To Date: </label>
                        <DatePicker selected={this.state.endDate} 
                        onChange={this.handleEndDateChange} 
                        popperPlacement="bottom-start"
                        placeholderText="Choose a end date" />
                    </div>
                    {!isReportEmpty && !process && <Button color="success" onClick={this.handleDownload}>Download <FiDownload /></Button>}
                    <div style={{marginTop:"20px"}}>
                        {this.printTable()}
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