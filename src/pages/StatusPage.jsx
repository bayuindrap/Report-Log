import React from "react";
import { API_URL } from "../helper";
import { userAction } from "../redux/actions";
import axios from "axios";
import { connect } from "react-redux";
import { Badge } from 'reactstrap'




class StatusPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            report: []
         }
    }

    // const getDataById = (data, id) => {
    //     return data.find(item => item.id === id);
    //   }


    componentDidMount() {
        this.getData()
    }


    getData = () => {
        axios.get(`${API_URL}/report?iduser=${this.props.iduser}`)
            .then((res) => {
                // console.log(res.data)
                this.setState({report: res.data})
            }).catch((error) => {
                console.log(error)
            })
    }


    printReport = () => {
        const { historyReport } = this.props;
        return this.state.report.map((value, index) => {
             let badgeColor = value.status.includes("On Progress") ? "warning" : value.status.includes("Solved") ? "success" : "primary"

             return <div className='shadow pb-3 rounded mb-5'>
                <div className='shadow p-2 rounded mb-1' style={{color: "black", backgroundColor: "#C9DBB2" }}>
                  <b> Your Report</b>
                  <b> | {value.orderid}</b>
                  <b> | {value.corp} Corp</b>
                  <b style={{float: "right"}}><Badge color={badgeColor}>{value.status}</Badge></b>  
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
                        
                        <img src={value.imgcorp} style={{ width: "20%" }}/>
                    </div>

                </div>

            </div>
        })
    }


    render() { 
        
        return ( 
            <div className="container p-5 mt-4">
                <h1 className="text-center">HISTORY & STATUS REPORT</h1>
                
                <div>
                    {this.printReport()}
                </div>
            </div>
         );
    }
}

const mapToProps = ({ userReducer }) => {
    return {
        iduser: userReducer.userList.id,
    }
}
 
export default connect(mapToProps, { userAction })(StatusPage);