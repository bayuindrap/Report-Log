import React from 'react';
import { Input, InputGroupText, Toast, ToastBody, ToastHeader } from "reactstrap";
import { Table, Pagination, Image, Button, Form, Col, Row, InputGroup, Card, FormGroup, Label } from 'react-bootstrap';
import { loginAction } from '../redux/actions';
import { connect } from 'react-redux';
import { API_URL } from '../helper';
import axios from "axios";
import { Navigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";





class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUser: [],
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

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(`${API_URL}/dataUser`)
            .then((res) => {
                console.log("test data login", res.data)
                this.setState({ datauser: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }



    btnLogin = () => {
        if (this.usernameLogin.value === "" || this.passLogin.value === "") {
            alert("USERNAME & PASSWORD CAN'T BE EMPTY")
        } else {
            this.props.loginAction(this.usernameLogin.value, this.passLogin.value)
            // Swal.fire(
            //     'Login Success',
            //     `Welcome ${this.props.username}`,
            //     'success'
            //   )
        }
    }




    render() {
        if (this.props.iduser) {
            alert(`Login Success, Welcome ${this.props.username}`)
            // Swal.fire(
            //     'Login Success',
            //     `Welcome ${this.props.username}`,
            //     'success'
            //   )
            return <Navigate to="/" />
        }
        return (
            <div>
                <h1>
                    LOGIN PAGE
                </h1>

                <Col md={6}>
                    <div className='shadow'>
                        <Card>
                            <Card.Body>
                                <div>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <Form.Label>Username</Form.Label>
                                            <InputGroup>
                                                {/* <Form.Control type="text" placeholder="Input Username" 
                                             innerRef={(element) => this.usernameLogin = element}/> */}
                                                <Input type="text" placeholder="Input Username"
                                                    innerRef={(element) => this.usernameLogin = element} />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>

                                    <Col sm={6}>
                                        <FormGroup>
                                            <Form.Label>Password</Form.Label>
                                            <InputGroup>
                                                {/* <Form.Control type="text" placeholder="Input Password"
                                                innerRef={(element) => this.passLogin = element} /> */}
                                                <Input placeholder="Input Password"
                                                    innerRef={(element) => this.passLogin = element} type={this.state.passType} />
                                                <InputGroupText style={{ cursor: "pointer" }} onClick={this.showPass}>
                                                    {this.state.passShow}
                                                </InputGroupText>

                                            </InputGroup>
                                        </FormGroup>
                                    </Col>

                                    <Col sm={6}>
                                        <Button onClick={this.btnLogin}>LOGIN</Button>
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

const mapToProps = ({ userReducer }) => {
    // console.log("tes id",userReducer.userList.id)
    return {
        iduser: userReducer.userList.id,
        username: userReducer.userList.username
    }
}

export default connect(mapToProps, { loginAction })(LoginPage);