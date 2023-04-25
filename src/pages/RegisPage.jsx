import React from 'react';
import { Input, InputGroupText, Toast, ToastBody, ToastHeader } from "reactstrap";
import { Table, Pagination, Image, Button, Form, Col, Row, InputGroup, Card, FormGroup, Label } from 'react-bootstrap';
import { loginAction } from '../redux/actions';
import { connect } from 'react-redux';
import { API_URL } from '../helper';
import axios from "axios";
// import { Navigate, useNavigate, NavLink} from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdDriveFileRenameOutline } from "react-icons/md";



class RegisPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passShow: <AiOutlineEyeInvisible />,
            passType: "password",
            passValue: "",
            selectedValue: ''
            
        }

        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleSelectChange(event) {
        this.setState({ selectedValue: event.target.value });
      }



    showPass = () => {
        if (this.state.passType == "password") {
            this.setState({
                passShow: <AiOutlineEye />,
                passType: "text"
            })
        } else {
            this.setState({
                passShow: <AiOutlineEyeInvisible />,
                passType: "password"
            })
        }
    }

    btnRegis = () => {
        if (this.usernameRegis.value === "" || this.passRegis.value === "" || this.state.selectedValue === "") {
            alert("ISI SEMUA DATA")
        } else {
            axios.post(`${API_URL}/dataUser`, {
                username: this.usernameRegis.value,
                password: this.passRegis.value,
                role: "user",
                dept: this.state.selectedValue,
                report: []
            }).then((res) => {
                console.log(res.data)
                alert(`${this.usernameRegis.value}, Registration Complete`)
                // if (res.data.length > 0) {
                //     return <Navigate to="/login-page" />
                // }
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            //   this.handleClick();
            // this.btnRegis()
        }
    };



    render() {
        return (
            <div className='p-5 mt-5'>
                <h2 style={{ textAlign: "center" }}>ADD USER</h2>


                {/* <Col lg={10} > */}
                <div className='shadow' >
                    <Card >
                        <Card.Body>
                            <div>
                                {/* <Col lg={12}> */}
                                <FormGroup>
                                    <Form.Label>Username</Form.Label>
                                    <InputGroup>
                                        {/* <Form.Control type="text" placeholder="Input Username" 
                                             innerRef={(element) => this.usernameLogin = element}/> */}
                                        <Input type="text" placeholder="Input Username"
                                            innerRef={(element) => this.usernameRegis = element} />
                                        <InputGroupText><MdDriveFileRenameOutline /></InputGroupText>
                                    </InputGroup>
                                </FormGroup>
                                {/* </Col> */}

                                {/* <Col md={12}> */}
                                <FormGroup>
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup>
                                        {/* <Form.Control type="text" placeholder="Input Password"
                                                innerRef={(element) => this.passLogin = element} /> */}
                                        <Input placeholder="Input Password"
                                            innerRef={(element) => this.passRegis = element} type={this.state.passType} />
                                        <InputGroupText style={{ cursor: "pointer" }} onClick={this.showPass}>
                                            {this.state.passShow}
                                        </InputGroupText>
                                    </InputGroup>
                                </FormGroup>
                                {/* </Col> */}

                                {/* <Col md={12}> */}
                                <FormGroup>
                                    <Form.Label>Department</Form.Label>
                                    <InputGroup>
                                        {/* <Form.Control type="text" placeholder="Input Password"
                                                innerRef={(element) => this.passLogin = element} /> */}
                                        <Input type="select" placeholder="Input Department" value={this.state.selectedValue} onChange={this.handleSelectChange}>
                                            <option value="">Select an option</option>
                                            <option value="operation">Operation</option>
                                            <option value="admin">Admin</option>
                                        </Input>
                                    </InputGroup>
                                </FormGroup>
                                {/* </Col> */}

                                {/* <Col md={12}> */}
                                {/* <Button onClick={this.btnRegis}>REGISTER</Button> */}
                                {/* </Col> */}

                                <div>
                                    <Col xs={6}>
                                        <Button style={{ width: 200, borderRadius: 50, marginTop: 15, alignContent: "center", backgroundColor: "green" }} onClick={this.btnRegis}>SUBMIT</Button>
                                    </Col>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                {/* </Col> */}
            </div>


        );
    }
}

export default RegisPage;