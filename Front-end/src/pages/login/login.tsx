import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlueButton from '../../components/Button/BlueButton'
import InputBlue from '../../components/InputBox/InputBlue'
import '../../style/login.css'

export default function login() {
  const [userName, setUserName] = React.useState("")
  const [password,setPassword] = React.useState("")
  const [click,setClick] = React.useState(false)

  React.useEffect(() => {
    const handleLogin = async () => {
      const data = JSON.stringify({
        ID: id,
        Devicename: name,
        Device_Status: 'off',
        Mode: 'manual',
        Day_add: date,
        RoomID: roomID,
      })
      console.log(data)

      const config = {
        method: 'post',
        url: 'http://localhost:3000/light/create',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      }

      const respone = await axios(config)
    }
  }, [click])
  const navigate = useNavigate()
  const navigateToHome = () => {
    navigate('/room')
  }
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
        <InputBlue
          label="Username"
          type="text"
          onChange = {(e:any) => setUserName(e.target.value)}
        ></InputBlue>
        <InputBlue label="Password" type="password"
          onChange = {(e:any) => setPassword(e.target.value)}
        ></InputBlue>
        <a className="a__" href="./login">
          Forgot Password
        </a>
        <div className="contain__button">
          <BlueButton onClick={setClick(true)}>Login</BlueButton>
        </div>
      </div>
    </div>
  )
}
