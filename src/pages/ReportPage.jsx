import React from 'react';
import { API_URL } from '../helper';
import axios from 'axios';


class ReportPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            report: []
         }
    }

    componentDidMount() {
        this.getData()
    }


    getData = () => {
        axios.get(`${API_URL}/report`)
        .then((res) => {
            console.log("data report", res.data)
            this.setState({report: res.data})
        }).catch((error) => {
            console.log(error)
        })
    }

    render() { 
        return ( 
            <div>
                <h1>Report Page Admin</h1>
                <h1>Report Page Admin</h1>
            </div>
         );
    }
}
 
export default ReportPage;