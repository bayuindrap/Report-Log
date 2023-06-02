import React from 'react';
import { API_URL } from "../helper";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button, FormText, InputGroup } from "reactstrap"
import { Image } from "react-bootstrap"
import { Col } from "react-bootstrap"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import { userAction } from '../redux/actions';
import { Navigate } from "react-router-dom";
import lotteLoading from "../assets/Logo-Lotte.gif"
import Swal from 'sweetalert2'



class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            startDate2: new Date(),
            userList: [],
            fileData: "",
            selectedValue: "",
            selectedCorp: "",
            isLoading: false,
            selectedDate: null
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

    handleSubmit = (event) => {
        event.preventDefault();

        // If datepicker is not selected, send empty string

        // Send data to the database
        // sendDataToDatabase(dateToSend);

    };

    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
    };


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

    // setTimeout(reload ()  {
    //     window.location.reload();
    //   }, 5000);



    btnSubmit = () => {
        const dateToSend = this.state.selectedDate ? this.state.selectedDate.toLocaleDateString() : "";
        if (this.state.selectedValue === "") {
            // alert("isi semua data report")
            return Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Fill all the form.',
                showConfirmButton: false,
                timer: 875,
                width: "223px"
            })
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
                datetransaction: dateToSend,
                // date: this.state.startDate2.toISOString().substring(0, 10),
                reportdate: this.state.startDate2.toLocaleDateString(),
                detail: this.caseDesc.value,
                status: "On Check🔎"
            }).then((res) => {
                // console.log("post report", res)
                // console.log(res.data.detail.length > 1)
                console.log("data res", res)
                if (res.data.detail !== "") {
                    // alert("data berhasil ditambahkan")
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Report has been saved.',
                        showConfirmButton: false,
                        timer: 1500,
                        width: "223px"
                    }).then((result) => {
                        console.log("res swal", result)
                        if(result.isConfirmed === false) {
                            window.location.reload()
                        }
                    })
                    
                }
                // window.location.reload()
            }).catch((err) => {
                console.log(err)
            })

        }
    }


    render() {
        return (

            this.state.isLoading ? <Image fluid src={lotteLoading} width={50} height={50} />
                :

                <div className='p-5 mt-5' style={{}} >

                    <h1 style={{ textAlign: "center" }}>REPORT PAGE</h1>
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

                            <FormGroup onSubmit={this.handleSubmit}>
                                <Label>Transaction Date</Label>
                                <InputGroup>
                                    <DatePicker
                                        className="mb-4 w-100"
                                        selected={this.state.selectedDate}
                                        onChange={this.handleDateChange}
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
