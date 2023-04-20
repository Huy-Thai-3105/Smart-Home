import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlueButton from '../../components/Button/BlueButton'
import InputBlue from '../../components/InputBox/InputBlue'
import '../../style/login.css'
import axios from 'axios'
import { useCookies } from "react-cookie";
import { CredentialsInterface, UserContext } from "../../context/UserContext";
import alertGradient from '@material-tailwind/react/theme/components/alert/alertGradient'

export default function login() {
  const [userName, setUserName] = React.useState("")
  const [password,setPassword] = React.useState("")
  const [click,setClick] = React.useState(false)
  const [cookies, setCookies, removeCookies] = useCookies(["user"]);

  const {
    setPhone,
    setUserId,
    setUsername,
    setUserEmail,
    setUserRole,
    setAccessToken,
    setRefreshToken,
  } = React.useContext<CredentialsInterface>(UserContext);

  React.useEffect(() => {
    if (userName != "" && password != "" ){
      const handleLogin = async () => {
        const data = JSON.stringify({
          "username" : userName,
          "password" : password
        })
        console.log(data)
  
        const config = {
          method: 'post',
          url:  'http://localhost:3000/auth/login',
          headers: {
            'Content-Type': 'application/json',
          },
          data: data,
        }
  
        const respone = await axios(config)
        if (respone.status != 200){
          alert("Incorrect login information")
        }
        else {
          setAccessToken(respone["accessToken"])
          setUserRole(respone["role"])
          setRefreshToken(respone["refreshToken"])
          setUserId(3)
          navigate_home()
        }
      }
      handleLogin()
      setClick(false)
    }
  }, [click])

  const navigate = useNavigate()
  const navigate_home = () => {
    navigate("/light");
  }

  // React.useEffect(() => {
  //   if (cookies.user) {
  //     const navigateToHome = () => {
  //       navigate('/room')
  //     }
  //   }
  // }, [cookies]);

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
          <BlueButton onClick={() => {
            setClick(true)
          }}>Login</BlueButton>
        </div>
      </div>
    </div>
  )
}
function navi(arg0: string) {
  throw new Error('Function not implemented.')
}

