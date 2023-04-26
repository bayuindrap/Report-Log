import React from "react";
import { Link, Navigate } from "react-router-dom";
import { Button, Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, NavLink, UncontrolledDropdown, DropdownMenu, DropdownItem, NavbarText, DropdownToggle, Spinner } from "reactstrap";
import { connect } from "react-redux";
import { logoutAction } from "../redux/actions";
import { MdOutlineReportProblem } from "react-icons/md";
import { FiUsers, FiLogOut } from "react-icons/fi";
import { HiOutlineDocumentReport } from "react-icons/hi";




class NavbarComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <Navbar expand="md" fixed="top" color="light">
                <NavbarBrand>
                    <Link to="/home-page">
                        <img src="https://i.postimg.cc/X7sXFBSM/icon-lotte-logoshape.png" alt="logo-brand" width="40px" />
                    </Link>
                </NavbarBrand>
                <NavbarToggler onClick={() => this.setState({ openCollapse: !this.state.openCollapse })} />
                <Collapse isOpen={this.state.openCollapse} navbar>
                    <Nav>
                        <NavItem>
                            <Link className="nav-link" to="/home-page" style={{ color: "#ED1C24" }}>
                                Home Page
                            </Link>
                        </NavItem>
                    </Nav>
                    {
                        // this.props.loading ?
                        //     <Spinner animation="border" style={{ marginLeft: "auto", marginRight: 10 }}>
                        //         Loading...
                        //     </Spinner>
                            // :

                            this.props.username ?
                                <UncontrolledDropdown style={{ marginLeft: "auto" }}>
                                    <DropdownToggle caret nav size="sm" className="d-flex align-items-center" style={{ color: "#ED1C24" }}>
                                        Hello, {this.props.username}
                                    </DropdownToggle>
                                    {
                                        this.props.role == "user"
                                            ?

                                            <DropdownMenu right>
                                                <Link to="/home-page" style={{ color: "#159953", textDecoration: "none" }}>
                                                    <DropdownItem style={{color: "#black"}}>
                                                    <MdOutlineReportProblem/> Report Page  
                                                    </DropdownItem>
                                                </Link>
                                                <Link to="/" style={{ color: "#159953", textDecoration: "none" }}>
                                                    <DropdownItem style={{color: "#black"}}>
                                                        ====/////======
                                                    </DropdownItem>
                                                </Link>
                                                <DropdownItem divider/>
                                                <DropdownItem onClick={() => {
                                                    localStorage.removeItem("data");
                                                    this.props.logoutAction();
                                                    <Navigate to="/"/>
                                                    window.location.href = "/"
                                                }} style={{color: "red"}}>
                                                    <FiLogOut/> Logout 
                                                </DropdownItem>
                                            </DropdownMenu>

                                            :

                                            <DropdownMenu right >
                                                <Link to="/report-page" style={{ color: "#159953", textDecoration: "none" }} className="nav-link">
                                                    <DropdownItem style={{color: "#black"}}>
                                                        <MdOutlineReportProblem/> Report List
                                                    </DropdownItem>
                                                </Link>
                                                <Link to="/report-log" style={{ color: "#159953", textDecoration: "none" }} className="nav-link">
                                                    <DropdownItem style={{color: "#black"}}>
                                                      <HiOutlineDocumentReport/> Report Log History
                                                    </DropdownItem>
                                                </Link>
                                                <Link to="/regis-page" style={{ color: "#159953", textDecoration: "none" }} className="nav-link">
                                                    <DropdownItem style={{color: "#black"}}>
                                                       <FiUsers/> User Management
                                                    </DropdownItem>
                                                </Link>
                                                <DropdownItem divider />
                                                <DropdownItem onClick={() => {
                                                    localStorage.removeItem("data");
                                                    this.props.logoutAction();
                                                    <Navigate to="/"/>
                                                    window.location.href = "/"
                                                }} style={{color: "red"}}>
                                                   <FiLogOut/> Logout
                                                </DropdownItem>
                                            </DropdownMenu>

                                    }

                                </UncontrolledDropdown>
                                :

                                <Nav style={{ marginLeft: "auto" }}>
                                    {/* <NavItem>
                                        <Link className="nav-link" to="/register-page" style={{ color: "#ED1C24" }}>
                                            Register
                                        </Link>
                                    </NavItem> */}
                                    <NavItem>
                                        <Link className="nav-link" to="/" style={{ color: "#ED1C24" }}>
                                            Login
                                        </Link>
                                    </NavItem>
                                </Nav>

                    }

                    
                    {/* <Link to="/login-page" style={{ marginLeft: "auto" }}>
                        <Button type="button" color="danger">Sign In</Button>
                    </Link>
                    <div style={{ float: "right" }}>

                        <Nav >
                            <NavItem>
                                <Link className="nav-link" to="/regis-page" style={{ color: "#ED1C24" }}>
                                    Register
                                </Link>
                            </NavItem>
                        </Nav>
                    </div> */}



                </Collapse>
            </Navbar>
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
 
export default connect (mapToProps, {logoutAction}) (NavbarComp);