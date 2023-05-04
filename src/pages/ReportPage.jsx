import React from 'react';
import { API_URL } from '../helper';
import axios from 'axios';
import { Badge, Button } from 'reactstrap'
import { CgSandClock } from "react-icons/cg";
import { AiOutlineCheck } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { connect } from 'react-redux';
import { reportAction, userAction } from '../redux/actions';



class ReportPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: ["On Check🔎", "On Progress⏳", "Solved✔"],
            
        }
    }


    btnProcess = (id) => {
        axios.patch(`${API_URL}/report/${id}`, {
            status: "On Progress⏳"
        })
            .then((res) => {
                this.props.reportAction()
            }).catch((err) => {
                console.log(err)
            })
    }

    btnSolved = (id) => {
        axios.patch(`${API_URL}/report/${id}`, {
            status: "Solved✔"
        })
            .then((res) => {
                this.props.reportAction()
            }).catch((error) => {
                console.log(error)
            })
    }

    // componentDidMount() {
    //     this.getData()
    //     this.setState({ data: this.props.data })
    //     console.log("state data", this.state.data)
    // }

    getData = () => {
    }


    // btnShow = () => {
    //     this.state.buttonProgress
    //     this.state.buttonSolved
    // }

    // statusCheck = () => {
    //     if (this.props.report.status === "On Progress⏳") {
    //         this.setState({isButtonDisabled: true })
    //     } else if (this.props.report.status === "Solved✔") {
    //         this.setState({isButtonDisabled: true })
    //     }   
    //     this.state.isButtonDisabled
    // }

    // handleButtonClick = () => {
    //     // update state based on some condition
    //     this.setState({
    //         isButtonDisabled: true
    //     });
    // }


    printReport = () => {
        return this.props.report.map((value, index) => {
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
                        </div>
                    </div>

                    <div className='row'>

                        <img src={value.imgcorp} style={{ width: "20%" }} />
                    </div>

                </div>

                <div style={{ float: "right", marginTop: -30, marginRight: 5 }}>
                    {/* <Button color="warning" style={{ width: 110, color: "black" }} onClick={() => this.btnProcess(value.id)} > <CgSandClock /> Process</Button> */}
                    <Button color="warning" disabled={this.state.isButtonDisabled} style={{ width: 110, color: "black" }} onClick={() => this.btnProcess(value.id)}
                        {...(() => {
                            if (value.status === "On Progress⏳") {
                                return '';
                            } else {
                                return 'disabled';
                            }
                        })()}> <CgSandClock /> Process</Button>
                    {/* <Button color="success" style={{ width: 110, color: "black" }} onClick={() => this.btnSolved(value.id)} > <FaCheck /> Solved</Button> */}

                    <Button color="success" disabled={this.state.isButtonDisabled} style={{ width: 110, color: "black" }} onClick={() => this.btnSolved(value.id)} 
                        {...(() => {
                            if (value.status === "Solved✔") {
                                console.log("value", value.status)
                                return 'disabled';
                            } else {
                                return '';
                            }
                        })()}> <FaCheck /> Solved</Button>
                    {/* {btnShow} */}
                </div>
            </div>
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
    console.log("tes report", userReducer.reportList)
    // console.log("tes data", props.report)
    return {
        report: userReducer.reportList

    }
}


export default connect(mapToProps, { reportAction })(ReportPage);