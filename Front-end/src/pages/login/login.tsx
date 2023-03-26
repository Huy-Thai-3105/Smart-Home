import React, { Component } from 'react'
import BlueButton from '../../components/Button/BlueButton'
import Button from '../../components/Button/BlueButton'
import RedButton from '../../components/Button/RedButton'
import InputBlue from '../../components/InputBox/InputBlue'
import InputPink from '../../components/InputBox/InputPink'
import '../../style/login.css'

export default class Login extends Component {
  render() {
    return (
      <div className="container">
        <div className="login__container">
          {/* <div className="logo">
            <img src="../logo.png" className="img_size"></img>
            <h1 className="h1_font">My Home</h1>
          </div> */}
          <p className="p__size">Login</p>
          <p className="title__">
            Welcome to My house! Please enter your details.
          </p>
          <InputBlue label="Username"></InputBlue>
          <InputBlue label="Password"></InputBlue>
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
