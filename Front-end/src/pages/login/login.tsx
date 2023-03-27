import React, { Component } from 'react'
import BlueButton from '../../components/Button/BlueButton'
import InputBlue from '../../components/InputBox/InputBlue'
import '../../style/login.css'

export default class Login extends Component {
  render() {
    return (
      <div className="container_body">
        <div className="login__container">
          {/* <div className="logo">
            <img src="../logo.png" className="img_size"></img>
            <h1 className="h1_font">My Home</h1>
          </div> */}
          <p className="p__size">Login</p>
          <p className="title__">
            Welcome to My house! Please enter your details.
          </p>
          <InputBlue label="Username" type="text"></InputBlue>
          <InputBlue label="Password" type="password"></InputBlue>
          <a className="a__" href="./login">
            Forgot Password
          </a>
          <div className="contain__button">
            <BlueButton>Login</BlueButton>
          </div>
        </div>
      </div>
    )
  }
}
