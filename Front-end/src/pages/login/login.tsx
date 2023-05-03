import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlueButton from '../../components/Button/BlueButton'
import InputBlue from '../../components/InputBox/InputBlue'
import '../../style/login.css'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { CredentialsInterface, UserContext } from '../../context/UserContext'
import alertGradient from '@material-tailwind/react/theme/components/alert/alertGradient'
import { getCookie } from '../../utilities/GetRoleCookie'
import { invalid } from 'moment'

export default function login() {
  const [userName, setUserName] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [click, setClick] = React.useState(false)
  const [userID, setUserID] = React.useState(getCookie('userID'))

  const { userRole, setUserId, setUserRole, setAccessToken, setRefreshToken } =
    React.useContext<CredentialsInterface>(UserContext)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (userName != '' && password != '') {
      const handleLogin = async () => {
        const data = JSON.stringify({
          username: userName,
          password: password,
        })

        const config = {
          method: 'post',
          url: 'http://localhost:3000/auth/login',
          headers: {
            'Content-Type': 'application/json',
          },
          data: data,
        }

        const respone = await axios(config)
        if (respone.status != 200) {
          alert('invalid Input')
        } else {
          setAccessToken(respone.data['accessToken'])
          setUserRole(respone.data['role'])
          setRefreshToken(respone.data['refreshToken'])
          setUserId(respone.data['UserID'])
          console.log(respone.data['UserID'])
          if (respone.data['role'] == 'CU') {
            navigate('/room')
          } else {
            navigate('/admin')
          }
        }
      }
      handleLogin()
      setClick(false)
    }
  }, [click])

  return (
    <div className="container_body">
      <div className="login__container">
        <p className="p__size">Login</p>
        <p className="title__">
          Welcome to My house! Please enter your details.
        </p>
        <InputBlue
          label="Username"
          type="text"
          onChange={(e: any) => setUserName(e.target.value)}
        ></InputBlue>
        <InputBlue
          label="Password"
          type="password"
          onChange={(e: any) => setPassword(e.target.value)}
        ></InputBlue>
        <a className="a__" href="./login">
          Forgot Password
        </a>
        <div className="contain__button">
          <BlueButton
            onClick={() => {
              setClick(true)
            }}
          >
            Login
          </BlueButton>
        </div>
      </div>
    </div>
  )
}
