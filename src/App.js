import logo from './logo.svg'
import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisPage from './pages/RegisPage'
import { loginAction, reportAction, userAction, historyAction, keepLogin, logoutAction } from './redux/actions/userAction'
import { connect } from 'react-redux'
import NavbarComp from './components/NavbarComp'
import FooterComp from './components/FooterComp'
import ReportPage from './pages/ReportPage'
import StatusPage from './pages/StatusPage'
import TrackingPage from './pages/TrackingPage'
import TableHistory from './pages/TableHistory'
import CryptoJS from 'crypto-js';
import ProcessHistory from './pages/ProcessHistory'


const encryptionKey = 'myEncryptionKey'
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }
  

  componentDidMount () {
    // this.props.userAction()
    // this.keeplogin()
    this.props.reportAction()
    this.props.historyAction()
    this.props.keepLogin()
    // this.checkSession()
  }

   checkSession = () => {
    const SESSION_EXPIRATION_TIME = 60 * 60 * 1000; // Set the session expiration time (30 minutes)
  
    const sessionTimestamp = localStorage.getItem('sessionTimestamp');
    if (sessionTimestamp) {
      const currentTimestamp = Date.now();
      if (currentTimestamp - sessionTimestamp > SESSION_EXPIRATION_TIME) {
        // Session has expired, perform logout action or method
        // Example with Redux:
        // dispatch(logout());
        localStorage.removeItem("data")
        // Example without Redux:
        // logout();
        localStorage.clear(); // Optionally, clear user data from local storage
      } else {
        // Session is still valid, update session timestamp
        localStorage.setItem('sessionTimestamp', currentTimestamp);
      }
    } else {
      // No session found, initialize a new session
      localStorage.setItem('sessionTimestamp', Date.now());
    }
  };

  

  render () {
    return (
      <div>
        <NavbarComp loading={this.state.loading}/>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/home-page' element={<HomePage />} />
            <Route path='/regis-page' element={<RegisPage />} />
            <Route path='/status-page' element={<StatusPage/>} />
            <Route path='/track-page' element={<TrackingPage/>} />
            <Route path='/report-page' element={<ReportPage />} />
            <Route path='/table-page' element={<TableHistory />} />
            <Route path='/process-page' element={<ProcessHistory />} />
          </Routes>
          <FooterComp/>
        
      </div>
    )
  }
}

// const mapToProps = ({ userReducer }) => {
//   console.log("tes",userReducer.userList.username)
//   return {
//       // iduser: userReducer.userList.id,
//       // username: userReducer.userList.username
//   }
// }

const mapToProps = (state) => {
  return {
    role: state.userReducer.role
  }
}

export default connect(mapToProps, { loginAction, reportAction, historyAction, keepLogin, logoutAction})(App);