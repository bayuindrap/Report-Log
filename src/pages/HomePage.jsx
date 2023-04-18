import React from 'react';
import { API_URL } from "../helper";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button, FormText, InputGroup } from "reactstrap"
import DatePicker from "react-datepicker"



class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(`${API_URL}/dataUser`)
            .then((res) => {
                console.log("res", res.data)
            }).catch((err) => {
                console.log(err)
            })
    }


    render() {
        return (
            <div>
                <h2>HOME PAGE</h2>

                <div className='shadow p-3'>
                    <Form>
                        <FormGroup>
                            <Label for="username">
                                Username
                            </Label>
                            <Input
                                id="username"
                                name="username"
                                placeholder="username"
                                type="text"
                            />
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
                                // popperPlacement="bottom-fixed"
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



export default HomePage;