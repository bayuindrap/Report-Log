import logo from './logo.svg'
import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisPage from './pages/RegisPage'
import { userAction } from './redux/actions/userAction'
import { connect } from 'react-redux'
import NavbarComp from './components/NavbarComp'
import FooterComp from './components/FooterComp'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentDidMount () {
    // this.props.userAction()
  }

  render () {
    return (
      <div>
        <NavbarComp loading={this.state.loading}/>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login-page' element={<LoginPage />} />
            <Route path='/regis-page' element={<RegisPage />} />
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

export default App
