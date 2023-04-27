import React from 'react';
import { API_URL } from '../helper';
import axios from 'axios';
import { Badge, Button } from 'reactstrap'
import { CgSandClock } from "react-icons/cg";
import { AiOutlineCheck } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";  


class ReportPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            report: [],
            status: ["On Check", "On Progress", "Solved"]
         }
    }

    componentDidMount() {
        this.getData()
    }


    getData = () => {
        axios.get(`${API_URL}/report`)
        .then((res) => {
            console.log("data report", res.data)
            this.setState({report: res.data})
        }).catch((error) => {
            console.log(error)
        })
    }

    btnProcess = (id) => {
        axios.patch(`${API_URL}/report/${id}`, {
            status: "On Progress"
        })
        .then((res) => {
            this.getData()
        }).catch((err) => {
            console.log(err)
        })
    }

    btnSolved = (id) => {
        axios.patch(`${API_URL}/report/${id}`, {
            status: "Solved"
        })
        .then((res) => {
            this.getData()
        }).catch((error) => {
            console.log(error)
        })
    }


    printReport = () => {
        return this.state.report.map((value, index) => {
            let badgeColor = value.status.includes("On Progress") ? "warning" : value.status.includes("Solved") ? "success" : "primary"

            return <div className='shadow pb-3 rounded mb-5'>
                <div className='shadow p-2 rounded mb-1' style={{color: "black", backgroundColor: "#C9DBB2" }}>
                  <b>{value.name}'s Report</b>
                  <b> | {value.corp} Corp</b>
                  <b> | {value.orderid}</b>
                  <b> | {value.date}</b>
                  <b style={{float: "right"}}><Badge color={badgeColor}>{value.status}</Badge></b>  
                </div>

                <div className='p-2'>
                    <div>
                        <p> TRANSACTION DATE : {value.datetransaction}</p>
                        <p> DETAIL CASE : {value.detail[0]}</p>
                        <p> PRODUCT CODE : {value.productcd}</p>
                    </div>
                </div>

                <div style={{float: "right", marginTop: -30, marginRight: 5}}>
                <Button color ="warning" style={{ width: 110, color: "black" }} onClick={() => this.btnProcess(value.id)} > <CgSandClock/> Process</Button>
                <Button color="success" style={{ width: 110, color: "black" }} onClick={() => this.btnSolved(value.id)} > <FaCheck/> Solved</Button>
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

const mapToProps = (state) => {
    return {

    }
}
 
export default ReportPage;