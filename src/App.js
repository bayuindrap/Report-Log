import logo from './logo.svg'
import React from 'react';
import './App.css'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage';
import RegisPage from './pages/RegisPage';

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div>
        <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login-page' element={<LoginPage/>} />
        <Route path='/regis-page' element={<RegisPage/>} />
        </Routes>
      </div>
    )
  }
}

export default App
