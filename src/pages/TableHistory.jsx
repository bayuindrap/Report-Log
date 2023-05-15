import axios from 'axios';
import React from 'react';
import { Badge, Button } from 'reactstrap'
import { Table, Pagination, Image, Form, Col, Row, InputGroup, Card, } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify'
import { reportAction } from '../redux/actions';
import { API_URL } from '../helper';





class TableHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            report: [],
            status: ["All Report","On Check🔎", "On Progress⏳", "Solved✔"],
            isLoading: false,
            statusIdx: 0
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
                                                    {/* <td>{value.imgcorp}</td> */}
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



    render() {
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
                     {this.printTable()}
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