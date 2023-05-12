import React from 'react';
import { API_URL } from '../helper';
import axios from 'axios';
import { Badge, Button } from 'reactstrap'
import { connect } from 'react-redux';
import { reportAction, userAction } from '../redux/actions';

class TrackingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: ["All Report","On Check🔎", "On Progress⏳", "Solved✔"],
            report: [],
            statusIdx: 0
        }
    }

    componentDidMount() {
        // this.getData()
    }

    getData = () => {
        axios.get(`${API_URL}/report`)
        .then((result) => {
            this.setState({ report: result.data})
        }).catch((error) => {
            console.log(error)
        })
    }

    getReportFilter = (status, statusActive) => {
        
        axios.get(`${API_URL}/report${statusActive > 0 ? `?status=${status}` : ""}`)
        // console.log("cek", statusActive)
            .then((res) => {
                console.log("report filt", res.data, statusActive)
                this.setState({ report: res.data, statusIdx: statusActive })
                // this.printReport()
            }).catch((err) => {
                console.log(err)
            })
    }

    printReport = () => {
        return this.state.report.map((value, index) => {
            let badgeColor = value.status.includes("On Progress⏳") ? "warning" : value.status.includes("Solved✔") ? "success" : "primary"

            return <div className='shadow pb-3 rounded mb-5'>
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
                            <p> REPORT DATE : {value.date}</p>
                            <p> PRODUCT CODE : {value.productcd}</p>
                            <p> DETAIL CASE : {value.detail}</p>
                            <p> SOLVED DATE : {value.solvedate}</p>
                        </div>
                    </div>

                    <div className='row'>
                        <img src={value.imgcorp} style={{ width: "20%" }} />
                    </div>

                </div>

            </div>
        })
    }


    render() {
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
                    {this.printReport()}
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