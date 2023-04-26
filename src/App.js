import logo from './logo.svg'
import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisPage from './pages/RegisPage'
import { loginAction, userAction } from './redux/actions/userAction'
import { connect } from 'react-redux'
import NavbarComp from './components/NavbarComp'
import FooterComp from './components/FooterComp'
import ReportPage from './pages/ReportPage'
import ReportLog from './pages/ReportLog'



class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentDidMount () {
    // this.props.userAction()
    this.keeplogin()
  }

  keeplogin = async () => {
    try {
      let local = JSON.parse(localStorage.getItem("data"))
      if (local) {
        let res = await this.props.loginAction(local.username, local.password)

        if (res.success) {
          this.setState({ loading : false })
        }
      } else {
        this.setState({ loading : false })
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  render () {
    return (
      <div>
        <NavbarComp loading={this.state.loading}/>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/home-page' element={<HomePage />} />
            <Route path='/regis-page' element={<RegisPage />} />
            <Route path='/report-page' element={<ReportPage />} />
            <Route path='/report-log' element={<ReportLog/>} />
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

export default connect(mapToProps, { loginAction})(App);