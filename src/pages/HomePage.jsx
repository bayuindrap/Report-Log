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
            selectedValue: "",
            selectedCorp: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeReport = this.handleChangeReport.bind(this);
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

    // handleFileChange(event) {
    //     const file = event.target.files[0];
    //     const reader = new FileReader();
    //     reader.onload = (event) => {
    //         this.setState({ fileData: event.target.result });
    //     };
    //     reader.readAsText(file);
    // }

    // handleFileInputChange(event) {
    //     const file = event.target.files[0];
    //     const reader = new FileReader();

    //     reader.onloadend = () => {
    //         this.setState({
    //             imageUrl: reader.result,
    //         });
    //     };

    //     reader.readAsDataURL(file);
    // }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
        //   this.handleClick();
        this.btnSubmit()
        }
      };



    btnSubmit = () => {
        if (this.state.selectedValue === "" || this.orderId.value === "" || 
            this.caseDesc.value === "" || this.productCode === "") {
            alert("isi semua data report")
        } else {
            const [corp, url] = this.state.selectedValue.split(",")
            // console.log("ini corp", corp)
            // console.log("ini url", url)
            axios.post(`${API_URL}/report`, {
                iduser: this.props.id,
                name: this.props.username,
                corp: corp,
                imgcorp: url,
                orderid: this.orderId.value,
                productcd: this.productCode.value,
                datetransaction: this.state.startDate.toLocaleDateString(),
                date: this.state.startDate2.toLocaleDateString(),
                detail: this.caseDesc.value,
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

                        <h1 style={{textAlign: "center"}}>REPORT PAGE</h1>
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
                                    <Input type="select" placeholder="Pilih Corp" value={this.state.selectedValue} onChange={this.handleSelectChange}>
                                        <option value="">Select corp</option>
                                        <option value="LMI,https://i.postimg.cc/wvqr8n0q/logo-LMM-01.png">LMI</option>
                                        {/* <option value="LSI,https://i.postimg.cc/7LVBVmDp/LOGO-LSI.png">LSI</option> */}
                                        <option value="LSI,https://i.postimg.cc/DfqYgnh5/LSI-LOGO.png">LSI</option>
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
                                    type="text"
                                    innerRef={(element) => this.orderId = element}
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
                                <Label for="report">
                                    Case Description
                                </Label>
                                <Input
                                    placeholder='fill case description report'
                                    id="report"
                                    name="text"
                                    type="textarea"
                                    innerRef={(element) => this.caseDesc = element}
                                    onKeyDown={this.handleKeyPress}
                                />
                            </FormGroup>


                            {/* <FormGroup>
                                <Label for="file">
                                    Input Screenshot
                                </Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    onChange={this.handleFileChange} />
                            </FormGroup> */}

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
