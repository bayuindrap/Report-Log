import React from 'react';
import { reportAction } from '../redux/actions';
import {Badge} from 'reactstrap'
import { connect } from 'react-redux';
import { API_URL } from '../helper';
import axios from "axios"



// componentDidMount() {
//     const { handleby } = this.props.loggedInUser; // Assuming you have the logged-in user details in the props
//     this.props.reportAction(handleby); // Call reportAction with the logged-in user's handleby value
//   }


class ProcessHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            report: [],
            statusIdx: 0,
            isLoading: false,
            process: false
        }
    }

    componentDidMount() {
        this.getData()
    }


    getData = () => {
        axios.get(`${API_URL}/report?handleby=${this.props.username}`)
        .then((res) => {
            console.log("asasd",res.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    
    componentDidMount() {
      const { handleby } = this.props.username
      this.props.reportAction(handleby)
    }

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

                       

                    </div>

                   
                    <div>

                    </div>
                </div>

            )
        })
    }

    // printReport = () => {
    //     return this.props.report.map((val, idx) => {
    //         return(
    //             <h1>{val.invoice}</h1>
    //         )
    //     })
    // }


    render() { 
        return (  
            <div className='container p-5 mt-4'>
                <div className='text-center'>
                <h1>Admin History Page</h1>
                </div>
                <div>
                    {this.printReport()}
                </div>
            </div>
        );
    }
}

const mapToProps = ({ userReducer }) => {
    
    return {
        report: userReducer.reportList,
        username: userReducer.userList.username,
    }
}
 
export default connect(mapToProps, {reportAction})(ProcessHistory);

// const ProcessHistory = () => {

//     async function printReport () {

//     }

//     return (
//         <div className='text-center'>
//             <h1>Admin History Page</h1>
//             <h1>Admin History Page</h1>
//         </div>
//     )
// }
  
//  export default ProcessHistory;