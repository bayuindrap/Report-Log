import React from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import { FiDownload } from 'react-icons/fi';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { saveAs } from 'file-saver';
import XLSX from 'xlsx';

const API_URL = '<YOUR_API_URL>';

class TableHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      report: [],
      status: ["All Report", "On Check🔎", "On Progress⏳", "Solved✔"],
      isLoading: false,
      statusIdx: 0,
      selectedValue: '',
      process: false,
      startDate: null,
      endDate: null,
    };
  }

  handleStartDateChange = (date) => {
    this.setState({ startDate: date });
  };

  handleEndDateChange = (date) => {
    this.setState({ endDate: date });
  };

  getReportFilter = (status, statusActive, startDate, endDate) => {
    const apiUrl = `${API_URL}/report${statusActive > 0 ? `?status=${status}` : ""}`;

    axios.get(apiUrl, { params: { startDate, endDate } })
      .then((res) => {
        console.log("report filt", res.data, statusActive);
        this.setState({ report: res.data, statusIdx: statusActive });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  printTable = () => {
    return (
      <div>
        <div>
          <ToastContainer />
          <Card>
            <Card.Body>
              <Row className="mt-3 mb-3">
                <br />
                <br />
                <Col xs={8}></Col>
              </Row>
              <div style={{ overflowX: "auto", maxWidth: "97vw", maxHeight: "65vh" }}>
                <Table striped bordered hover>
                  <thead style={{ backgroundColor: '#FFFFFF', textAlign: "center", position: "sticky", top: 0, zIndex: 1 }}>
                    <th>Status</th>
                    <th>User Name</th>
                    <th>Order Id</th>
                    <th>Corp</th>
                    <th>Transaction Date</th>
                    <th>Report Date</th>
                    <th>Product Code</th>
                    <th>Detail Case</th>
                    <th>Solved Date</th>
                  </thead>
                  <tbody>
                    {this.state.report.map((value, index) => (
                      <tr key={index}>
                        <td>{value.status}</td>
                        <td>{value.name}</td>
                        <td>{value.orderid}</td>
                        <td><img src={value.imgcorp} style={{ width: 150 }} /></td>
                        <td>{value.datetransaction}</td>
                        <td>{value.date}</td>
                        <td>{value.productcd}</td>
                        <td>{value.detail}</td>
                        <td>{value.solvedate}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  };

  convertJsonToExcel = () => {
    const { report } = this.state;

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert the JSON array to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(report);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generate an Excel file buffer
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Convert the buffer to a Blob
    const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Save the Blob as a file
    saveAs(excelBlob, 'data.xlsx');
  };

  handleDownload = () => {
    const { report } = this.state;
    console.log("json", report);
    this.convertJsonToExcel(report);
  };

  render() {
    const { report, process } = this.state;
    const isReportEmpty = report.length === 0;

    return (
      <div className='p-5'>
        <h1 style={{ textAlign: "center", marginTop: 15 }}>Table Log History</h1>
        <div>
          <div className="d-flex justify-content-evenly mb-3">
            {this.state.status.map((value, index) => (
              <Button
                outline
                color={this.state.statusIdx === index ? "danger" : "secondary"}
                style={{ border: 'none', width: "100%", borderBottom: this.state.statusIdx === index && "3px solid #ED3338" }}
                type='button'
                onClick={() => this.getReportFilter(value, index, this.state.startDate, this.state.endDate)}
              >
                <h6 style={{ fontWeight: "bold" }}>{value}</h6>
              </Button>
            ))}
          </div>
          <div>
            <label>From Date: </label>
            <DatePicker selected={this.state.startDate} onChange={this.handleStartDateChange} />
          </div>
          <div>
            <label>To Date: </label>
            <DatePicker selected={this.state.endDate} onChange={this.handleEndDateChange} />
          </div>
          {!isReportEmpty && !process && (
            <Button color="success" onClick={this.handleDownload}>
              Download <FiDownload/>
            </Button>
          )}
          {this.printTable()}
        </div>
      </div>
    );
  }
}

export default TableHistory;