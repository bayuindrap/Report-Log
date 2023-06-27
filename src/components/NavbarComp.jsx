import React from "react";
import { Link, Navigate } from "react-router-dom";
import { Button, Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, NavLink, UncontrolledDropdown, DropdownMenu, DropdownItem, NavbarText, DropdownToggle } from "reactstrap";
import { connect } from "react-redux";
import { logoutAction } from "../redux/actions";
import { MdOutlineReportProblem } from "react-icons/md";
import { FiUsers, FiLogOut } from "react-icons/fi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { GrStatusInfo } from "react-icons/gr";
import { BsTable, BsCardChecklist } from "react-icons/bs";
import lotteLoading from "../assets/Logo-Lotte.gif"
import avaSuper from "../assets/superadmin.png"
import avaUser from "../assets/users.png"
import { Image } from 'react-bootstrap';
import '../product.css'




class NavbarComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            openCollapse: false
        }
    }

    refreshPage = () => {
        window.location.reload()
    }

    handlePageClick = () => {
        this.setState({ isLoading: true }); // Set loading state to true when a page is clicked

        // Perform any necessary loading operations here (e.g., API requests)

        // Once the loading is complete, you can navigate to the desired page
        // You can use the 'setTimeout' function as an example here to simulate a loading delay
        setTimeout(() => {
            // Navigate to the page here
            // ...
            this.setState({ isLoading: false }); // Set loading state back to false once loading is complete
        }, 1500); // Example: Loading delay of 2 seconds

        // Alternatively, you can use Promises or async/await to handle asynchronous operations
    };

    render() {
        const isAdmin = this.props.role === "superadmin"
        const isLogin = this.props.iduser === "" || this.props.username === undefined
        const homePageLink = isLogin ? "/" : (isAdmin ? "/report-page" : "/home-page")
        const avatar = this.props.role === "superadmin" ? avaSuper : avaUser
        const isLoading = this.state
        // if(isLogin && homePageLink === "/home-page"){
        //     return <Redirect to="/"/>
        // }

        return (

            <div>
                <Navbar className="shadow" expand="md" fixed="top" color="light">
                    <NavbarBrand>
                        <Link to={homePageLink}>
                            <img src="https://i.postimg.cc/X7sXFBSM/icon-lotte-logoshape.png" alt="logo-brand" width="40px" />
                        </Link>
                    </NavbarBrand>
                    <NavbarToggler onClick={() => this.setState({ openCollapse: !this.state.openCollapse })} />
                    <Collapse isOpen={this.state.openCollapse} navbar>
                        <Nav>
                            <NavItem>
                                <Link className="nav-link" to={homePageLink} style={{ color: "#ED1C24" }} onClick={this.handlePageClick}>
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
                                        <img
                                            className="avatar-icon"
                                            src={avatar}
                                            alt="Profile Picture"
                                            style={{ marginLeft: "5px", width: "35px", height: "35px", borderRadius: "50%" }}
                                        />
                                    </DropdownToggle>
                                    {
                                        this.props.role == "user"
                                            ?

                                            <DropdownMenu right>
                                                <Link to="/home-page" style={{ color: "#159953", textDecoration: "none" }} onClick={this.handlePageClick}>
                                                    <DropdownItem style={{ color: "#black" }}>
                                                        <MdOutlineReportProblem /> Report Page
                                                    </DropdownItem>
                                                </Link>
                                                <Link to="/status-page" style={{ color: "#159953", textDecoration: "none" }} onClick={this.handlePageClick}>
                                                    <DropdownItem style={{ color: "#black" }}>
                                                        <GrStatusInfo />   Status Page
                                                    </DropdownItem>
                                                </Link>
                                                <DropdownItem divider />
                                                <DropdownItem onClick={() => {
                                                    localStorage.removeItem("data");
                                                    this.props.logoutAction();
                                                    <Navigate to="/" />
                                                    window.location.href = "/"
                                                }} style={{ color: "red" }}>
                                                    <FiLogOut /> Logout
                                                </DropdownItem>
                                            </DropdownMenu>

                                            : this.props.role == "superadmin" ? (

                                                <DropdownMenu right >
                                                    <Link to="/report-page" style={{ color: "#159953", textDecoration: "none" }} className="nav-link" onClick={this.handlePageClick}>
                                                        <DropdownItem style={{ color: "#black" }}>
                                                            <MdOutlineReportProblem /> Report List
                                                        </DropdownItem>
                                                    </Link>
                                                    <Link to="/track-page" style={{ color: "#159953", textDecoration: "none" }} className="nav-link">
                                                        <DropdownItem style={{ color: "#black" }}>
                                                            <HiOutlineDocumentReport /> Report Log History
                                                        </DropdownItem>
                                                    </Link>
                                                    <Link to="/table-page" style={{ color: "#159953", textDecoration: "none" }} className="nav-link">
                                                        <DropdownItem style={{ color: "#black" }}>
                                                            <BsTable /> Table Log History
                                                        </DropdownItem>
                                                    </Link>
                                                    <Link to="/process-page" style={{ color: "#159953", textDecoration: "none" }} className="nav-link">
                                                        <DropdownItem style={{ color: "#black" }}>
                                                            <BsCardChecklist /> History Process Admin
                                                        </DropdownItem>
                                                    </Link>
                                                    <Link to="/regis-page" style={{ color: "#159953", textDecoration: "none" }} className="nav-link">
                                                        <DropdownItem style={{ color: "#black" }}>
                                                            <FiUsers /> User Management
                                                        </DropdownItem>
                                                    </Link>
                                                    <DropdownItem divider />
                                                    <DropdownItem onClick={() => {
                                                        localStorage.removeItem("data");
                                                        this.props.logoutAction();
                                                        <Navigate to="/" />
                                                        window.location.href = "/"
                                                    }} style={{ color: "red" }}>
                                                        <FiLogOut /> Logout
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            ) :

                                                <DropdownMenu right >
                                                    <Link to="/report-page" style={{ color: "#159953", textDecoration: "none" }} className="nav-link">
                                                        <DropdownItem style={{ color: "#black" }}>
                                                            <MdOutlineReportProblem /> Report List
                                                        </DropdownItem>
                                                    </Link>
                                                    <Link to="/track-page" style={{ color: "#159953", textDecoration: "none" }} className="nav-link">
                                                        <DropdownItem style={{ color: "#black" }}>
                                                            <HiOutlineDocumentReport /> Report Log History
                                                        </DropdownItem>
                                                    </Link>
                                                    <Link to="/table-page" style={{ color: "#159953", textDecoration: "none" }} className="nav-link">
                                                        <DropdownItem style={{ color: "#black" }}>
                                                            <BsTable /> Table Log History
                                                        </DropdownItem>
                                                    </Link>
                                                    <Link to="/process-page" style={{ color: "#159953", textDecoration: "none" }} className="nav-link">
                                                        <DropdownItem style={{ color: "#black" }}>
                                                            <BsCardChecklist /> History Process Admin
                                                        </DropdownItem>
                                                    </Link>
                                                    <DropdownItem divider />
                                                    <DropdownItem onClick={() => {
                                                        localStorage.removeItem("data");
                                                        this.props.logoutAction();
                                                        <Navigate to="/" />
                                                        window.location.href = "/"
                                                    }} style={{ color: "red" }}>
                                                        <FiLogOut /> Logout
                                                    </DropdownItem>
                                                </DropdownMenu>


                                    }

                                </UncontrolledDropdown>
                                :

                                <Nav style={{ marginLeft: "auto" }}>
                                    <NavItem>
                                        <Link className="nav-link" to="/" style={{ color: "#ED1C24" }}>
                                            Login
                                        </Link>
                                    </NavItem>
                                </Nav>
                        }

                    </Collapse>
                </Navbar>
                {/* {this.state.isLoading && (
                    <div className="load">
                        <div className="load">
                            <Image src={lotteLoading} 
                           
                            alt="Loading..." />
                        </div>
                    </div>
                )} */}
            </div>
        );
    }
}

const mapToProps = ({ userReducer }) => {
    // console.log("tes id",userReducer.userList.id)
    return {
        iduser: userReducer.userList.id,
        username: userReducer.userList.username,
        role: userReducer.userList.role,
        avatar: userReducer.userList.avatar
    }
}

export default connect(mapToProps, { logoutAction })(NavbarComp);