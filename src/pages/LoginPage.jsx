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
import { MdDriveFileRenameOutline } from "react-icons/md";


class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUser: [],
            passShow: <AiOutlineEyeInvisible />,
            passType: "password",
            passValue: ""
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(`${API_URL}/dataUser`)
            .then((res) => {
                // console.log("test data login", res.data)
                this.setState({ dataUser: res.data })
                // console.log("ini state data", this.state.dataUser)
            }).catch((err) => {
                console.log(err)
            })
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

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
        //   this.handleClick();
        this.btnLogin()
        }
      };

    //   handleClick = () => {
    //     this.btnLogin()
    //   };


    checkLogin = (usernameLogin, passValue) => {
        for (let i = 0; i < this.state.dataUser.length; i++) {
            if (this.state.dataUser[i].username === usernameLogin && this.state.dataUser[i].password === passValue) {
                return true
            }
        }
        return false
    }

    btnLogin = () => {
        if (!this.checkLogin(this.usernameLogin.value, this.state.passValue)) {
            // return alert("USERNAME ATAU PASSWORD SALAH")
            return Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Wrong Username or Password',
                showConfirmButton: false,
                timer: 800,
                width: "223px"
              })
        } else {
            this.props.loginAction(this.usernameLogin.value, this.state.passValue)
            
        }
    }

    // btnLogin = () => {
    //     if (this.usernameLogin.value === "" || this.passLogin.value === "") {
    //         alert("USERNAME & PASSWORD CAN'T BE EMPTY")
    //     } else if (!this.checkLogin(this.usernameLogin.value, this.passLogin.value)) {
    //         alert("USERNAME ATAU PASSWORD SALAH")
    //     }else{
    //         this.props.loginAction(this.usernameLogin.value, this.passLogin.value)

    //     }
    // }

    // btnLogin = () => {
    //     if (this.usernameLogin.value === "" || this.passLogin.value === "") {
    //         alert("USERNAME & PASSWORD CAN'T BE EMPTY")
    //     } else {
    //         this.props.loginAction(this.usernameLogin.value, this.passLogin.value)
    //         // Swal.fire(
    //         //     'Login Success',
    //         //     `Welcome ${this.props.username}`,
    //         //     'success'
    //         //   )
    //     }
    // }




    render() {
        if (this.props.iduser) {
                 Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Login Success',
                showConfirmButton: false,
                timer: 1260,
                width: "223px"
              })
            if (this.props.role == "user") {
                return <Navigate to="/home-page" />
            }
            return <Navigate to="report-page" />
        }
        
        return (
            <div className='p-5 mt-4'>
                <h1 style={{ textAlign: "center" }}>
                    LOGIN
                </h1>

                {/* <Col md={6}> */}
                <div className='shadow'>
                    <Card>
                        <Card.Body>
                            <div>
                                {/* <Col sm={6}> */}
                                <FormGroup>
                                    <Form.Label>Username</Form.Label>
                                    <InputGroup>
                                        {/* <Form.Control type="text" placeholder="Input Username" 
                                             innerRef={(element) => this.usernameLogin = element}/> */}
                                        <Input type="text" placeholder="Input Username"
                                            innerRef={(element) => this.usernameLogin = element} />
                                             <InputGroupText><MdDriveFileRenameOutline/></InputGroupText>
                                    </InputGroup>
                                </FormGroup>
                                {/* </Col> */}

                                {/* <Col sm={6}> */}
                                <FormGroup>
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup>
                                        
                                            <Input
                                            placeholder="Input Password"
                                            type={this.state.passType}
                                            value={this.state.passValue}
                                            onChange={(e) => this.setState({ passValue: e.target.value })}
                                            onKeyDown={this.handleKeyPress}
                                            />

                                            
                                        <InputGroupText style={{ cursor: "pointer" }} onClick={this.showPass}>
                                            {this.state.passShow}
                                        </InputGroupText>

                                    </InputGroup>
                                </FormGroup>
                                {/* </Col> */}

                                
                            </div>
                            <div>
                                <Col xs={6}>
                                    <Button style={{ width: 200, borderRadius: 50, marginTop: 15, alignContent: "center", backgroundColor: "green" }} onClick={this.btnLogin}>LOGIN</Button>
                                </Col>
                            </div>

                        </Card.Body>
                    </Card>
                </div>
                {/* </Col> */}
            </div>
        );
    }
}

const mapToProps = ({ userReducer }) => {
    // console.log("tes id",userReducer.userList.id)
    return {
        iduser: userReducer.userList.id,
        username: userReducer.userList.username,
        role: userReducer.userList.role
    }
}

export default connect(mapToProps, { loginAction })(LoginPage);