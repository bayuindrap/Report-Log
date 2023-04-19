import React from 'react';
import { API_URL } from "../helper";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button, FormText, InputGroup } from "reactstrap"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import { userAction } from '../redux/actions';





class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            userList: []
        }
    }

    handleChange(date) {
        this.setState({
          startDate: date
        })
      } 

    componentDidMount() {
        // this.getData()
    }

    // getData = () => {
    //     axios.get(`${API_URL}/dataUser`)
    //         .then((res) => {
    //             console.log("res", res.data)
    //             this.setState({userList: res.data})
    //         }).catch((err) => {
    //             console.log(err)
    //         })
    // }


    render() {
        return (
            <div className='p-5 mt-5'>
    

                <div className='shadow p-3'>
                    <Form>
                        <FormGroup>
                            <Label for="username">
                                Nama
                            </Label>
                           <p>{this.props.username}</p>
                        </FormGroup>

                        <FormGroup>
                            <Label for="report">
                                Input Report
                            </Label>
                            <Input
                                id="report"
                                name="text"
                                type="textarea"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Tanggal</Label>
                            <InputGroup>
                                <DatePicker
                                    className="mb-4 w-100"
                                    // selected={this.state.startDate}
                                    // onChange={this.handleChange}
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
                                type="file" />
                        </FormGroup>
                        <Button>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>

        );
    }
}


const mapToProps = ({ userReducer }) => {
    console.log("tes id",userReducer.userList.username)
    return {
        // iduser: userReducer.userList.id,
        username: userReducer.userList.username
    }
}



export default connect (mapToProps, {userAction})(HomePage);
