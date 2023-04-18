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



class RegisPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passShow: <AiOutlineEyeInvisible />,
            passType: "password"
        }
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
        if (this.usernameRegis.value === "" || this.passRegis.value === "" || this.deptRegis.value === "") {
            alert("ISI SEMUA DATA")
        } else {
            axios.post(`${API_URL}/dataUser`, {
                username: this.usernameRegis.value,
                password: this.passRegis.value,
                role: "user",
                dept: this.deptRegis.value,
                report: []
            }).then((res) => {
                console.log(res.data)
                alert(`${this.usernameRegis.value}, Registration Complete`)
                if (res.data.length > 0) {
                    return <Navigate to="/login-page" />
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    }



    render() {
        return (
            <div>
                <h5>Regis</h5>


                <Col lg={10} >
                    <div className='shadow' style={{justifyContent: "center", alignItems: "center"}}>
                        <Card style={{alignItems: "center"}}>
                            <Card.Body>
                                <div>
                                    <Col lg={12}>
                                        <FormGroup>
                                            <Form.Label>Username</Form.Label>
                                            <InputGroup>
                                                {/* <Form.Control type="text" placeholder="Input Username" 
                                             innerRef={(element) => this.usernameLogin = element}/> */}
                                                <Input type="text" placeholder="Input Username"
                                                    innerRef={(element) => this.usernameRegis = element} />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>

                                    <Col md={12}>
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
                                    </Col>

                                    <Col md={12}>
                                        <FormGroup>
                                            <Form.Label>Department</Form.Label>
                                            <InputGroup>
                                                {/* <Form.Control type="text" placeholder="Input Password"
                                                innerRef={(element) => this.passLogin = element} /> */}
                                                <Input type="text" placeholder="Input Department"
                                                    innerRef={(element) => this.deptRegis = element} />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>

                                    <Col md={12}>
                                        <Button onClick={this.btnRegis}>REGISTER</Button>
                                    </Col>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </div>


        );
    }
}

export default RegisPage;