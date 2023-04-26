import React from 'react';
import { API_URL } from "../helper";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button, FormText, InputGroup } from "reactstrap"
import { Col } from "react-bootstrap"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import { userAction } from '../redux/actions';
import { Navigate } from "react-router-dom";





class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            startDate2: new Date(),
            userList: [],
            fileData: "",
            selectedValue: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeReport = this.handleChangeReport.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleSelectChange(event) {
        this.setState({ selectedValue: event.target.value });
    }

    handleChange(date) {
        this.setState({
            startDate: date,
        })
    }

    handleChangeReport(date) {
        this.setState({
            startDate2: date
        })
    }

    handleFileChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            this.setState({ fileData: event.target.result });
        };
        reader.readAsText(file);
    }

    handleFileInputChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                imageUrl: reader.result,
            });
        };

        reader.readAsDataURL(file);
    }


    // componentDidMount() {
    //     // this.getData()
    // }

    // getData = () => {
    //     axios.get(`${API_URL}/dataUser`)
    //         .then((res) => {
    //             console.log("res", res.data)
    //             this.setState({userList: res.data})
    //         }).catch((err) => {
    //             console.log(err)
    //         })
    // }


    btnSubmit = () => {
        if (this.state.selectedValue === "" || this.orderId.value === "" || 
            this.caseDesc.value === "" || this.productCode === "") {
            alert("isi semua data report")
        } else {
            axios.post(`${API_URL}/report`, {
                iduser: this.props.id,
                name: this.props.username,
                corp: this.state.selectedValue,
                orderid: this.orderId.value,
                datetransaction: this.state.startDate.toLocaleDateString(),
                date: this.state.startDate2.toLocaleDateString(),
                detail: [this.caseDesc.value],
                status: "On Check"
            }).then((res) => {
                // console.log("post report", res)
                // console.log(res.data.detail.length > 1)
                if (res.data.detail !== "") {
                    alert("data berhasil ditambahkan")
                    window.location.reload()
                }
            }).catch((err) => {
                console.log(err)
            })

        }
    }


    render() {
        return (
            // <Col sm={11}>
                <div className='p-5 mt-5' style={{}} >


                    <div className='shadow p-3'>
                        <Form>
                            <FormGroup>
                                <Label for="username">
                                    Nama
                                </Label>
                                <p>{this.props.username}</p>
                            </FormGroup>

                            <FormGroup>
                                <Label>Corp</Label>
                                <InputGroup>
                                    {/* <Form.Control type="text" placeholder="Input Password"
                                                innerRef={(element) => this.passLogin = element} /> */}
                                    <Input type="select" placeholder="Pilih Corp" value={this.state.selectedValue} onChange={this.handleSelectChange}>
                                        <option value="">Select corp</option>
                                        <option value="LMI">LMI</option>
                                        <option value="LSI">LSI</option>
                                    </Input>
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="report">
                                    Order Id
                                </Label>
                                <Input
                                    placeholder='fill order id'
                                    id="order"
                                    type="number"
                                    innerRef={(element) => this.orderId = element}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="report">
                                    Case Description
                                </Label>
                                <Input
                                    placeholder='fill case description report'
                                    id="report"
                                    name="text"
                                    type="textarea"
                                    innerRef={(element) => this.caseDesc = element}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="report">
                                    Product Code
                                </Label>
                                <Input
                                    placeholder='fill code product'
                                    id="order"
                                    type="number"
                                    innerRef={(element) => this.productCode = element}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Transaction Date</Label>
                                <InputGroup>
                                    <DatePicker
                                        className="mb-4 w-100"
                                        selected={this.state.startDate}
                                        onChange={this.handleChange}
                                        dateFormat="dd/MM/yyyy"
                                        popperPlacement="bottom-fixed"
                                    />
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label>Report Date</Label>
                                <InputGroup>
                                    <DatePicker
                                        className="mb-4 w-100"
                                        selected={this.state.startDate2}
                                        onChange={this.handleChangeReport}
                                        dateFormat="dd/MM/yyyy"
                                        popperPlacement="bottom-fixed"
                                    />
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="file">
                                    Input Screenshot
                                </Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    onChange={this.handleFileChange} />
                            </FormGroup>

                            <div>
                                <Col xs={6}>
                                    <Button color="success" style={{ width: 200, borderRadius: 50, marginTop: 15 }} onClick={this.btnSubmit}>SUBMIT</Button>
                                </Col>
                            </div>
                            {/* <Button>
                            Submit
                        </Button> */}
                        </Form>
                    </div>
                </div>
            // </Col>

        );
    }
}


const mapToProps = ({ userReducer }) => {
    console.log("tes id", userReducer.userList.username)
    return {
        // iduser: userReducer.userList.id,
        username: userReducer.userList.username,
        id: userReducer.userList.id
    }
}



export default connect(mapToProps, { userAction })(HomePage);
