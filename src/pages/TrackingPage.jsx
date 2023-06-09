import React from 'react';
import { API_URL } from '../helper';
import axios from 'axios';
import { Badge, Button } from 'reactstrap'
import { connect } from 'react-redux';
import { reportAction, userAction } from '../redux/actions';
import lotteLoading from "../assets/Logo-Lotte.gif"
import { Image } from 'react-bootstrap';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { BiReset } from "react-icons/bi";

class TrackingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: ["All Report", "On Check", "On Progress", "Solved"],
            report: [],
            statusIdx: 0,
            isLoading: false
        }
    }

    componentDidMount() {
        // this.getData()
    }

    getData = () => {
        axios.get(`${API_URL}/report`)
            .then((result) => {
                this.setState({ report: result.data })
            }).catch((error) => {
                console.log(error)
            })
    }

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
    //     this.setState({isLoading: true})
    //     axios.get(`${API_URL}/report${statusActive > 0 ? `?status=${status}` : ""}`)
    //     // console.log("cek", statusActive)
    //         .then((res) => {
    //             console.log("report filt", res.data, statusActive)
    //             this.setState({ report: res.data, statusIdx: statusActive,  isLoading: false })
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
                        return reportDate >= new Date(formattedStartDate) && reportDate <= new Date(formattedEndDate);
                    }
                    else if (formattedStartDate) {
                        return reportDate >= new Date(formattedStartDate);
                    }
                    else if (formattedEndDate) {
                        return reportDate <= new Date(formattedEndDate);
                    }
                    return true;
                });
                console.log("data filter report", filteredReport, statusActive);
                // this.setState({ report: filteredReport, statusIdx: statusActive, isLoading: false });
                setTimeout(() => {
                    this.setState({ isLoading: false, report: filteredReport, statusIdx: statusActive });
                }, 1150);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    btnReset = () => {
        this.setState({
            report: [],
            statusIdx: 0,
            isLoading: false,
            process: false,
            startDate: null,
            endDate: null
        })
    }

    printReport = () => {
        const renderValue = (field, label) => {
            if (field && field.trim() !== "") {
                return <p>{label} : {field}</p>;
            }
            return null;
        };

        return this.state.report.map((value, index) => {
            if (value.name) {

                let badgeColor = value.status.includes("On Progress") ? "warning" : value.status.includes("Solved") ? "success" : "primary"

                return (
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
                                    {/* <p> TRANSACTION DATE : {value.datetransaction}</p>
                                    <p> REPORT DATE : {value.reportdate}</p>
                                    <p> PRODUCT CODE : {value.productcd}</p>
                                    <p> DETAIL CASE : {value.detail}</p> */}
                                    {renderValue(value.datetransaction, "TRANSACTION DATE")}
                                    {renderValue(value.reportdate, "REPORT DATE")}
                                    {renderValue(value.invoice, "INVOICE NO")}
                                    {renderValue(value.productcd, "PRODUCT CODE")}
                                    {renderValue(value.detail, "DETAIL CASE")}
                                    {
                                        value.status == "Solved" && (
                                            <div>
                                                <p> ROOT CAUSE : {value.cause}</p>
                                                <p> SOLUTION : {value.solution}</p>
                                                <p> SOLVED DATE : {value.solvedate}</p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>

                            <div className='row'>
                                <img src={value.imgcorp} style={{ width: "23%" }} />
                            </div>

                        </div>

                    </div>
                )
            } else {
                return null
            }
        })
    }


    render() {

        const { report, process } = this.state
        const isReportEmpty = report.length === 0
        const showDatePickers = !isReportEmpty || process;

        return (
            <div className='container p-5 mt-4'>
                <h1 className='text-center'>REPORT LOG HISTORY</h1>

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
                    {showDatePickers && (
                        <div className="row">
                            <div className="col" style={{ zIndex: 30 }}>
                                <label>From Date: </label>
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleStartDateChange}
                                    style={{ width: "100%" }}
                                    popperPlacement="bottom-start"
                                    placeholderText="Select start date"
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
                                    placeholderText="Select end date"
                                />
                            </div>
                        </div>
                    )}
                    {!isReportEmpty && !process &&
                        <div className='d-flex justify-content-center'>
                            <Button className="hvr-grow" color="warning" style={{ marginTop: 15, width: 127, borderRadius: "18px" }} onClick={this.btnReset}>Reset<BiReset /></Button>
                        </div>
                    }
                    <div style={{ marginTop: "20px" }}>
                        {this.state.isLoading ? (
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Image src={lotteLoading} width={105} height={105} style={{ display: "flex", justifyContent: "center" }} />
                            </div>
                        ) : (
                            <div>
                                {
                                    this.state.report.length == 0 ? (
                                        <h5 style={{ textAlign: "center", marginTop: "200px", paddingBottom: "165px" }}>Select category to show data.</h5>
                                    ) : this.printReport()

                                }

                            </div>

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

export default connect(mapToProps, { reportAction })(TrackingPage);