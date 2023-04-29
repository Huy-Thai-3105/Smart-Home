import { useNavigate } from 'react-router-dom'
import './Header.css'
import React from 'react'
import { getCookie } from '../../utilities/GetRoleCookie'
import { CredentialsInterface, UserContext } from '../../context/UserContext'

export default function HeaderAdmin() {
  const [userID, setUserID] = React.useState(getCookie('userID'))
  const [name, setName] = React.useState('Hoan Hao')
  const { userRole, setUserId, setUserRole, setAccessToken, setRefreshToken } =
    React.useContext<CredentialsInterface>(UserContext)

    const [role, setRole] = React.useState(getCookie('role'))
    const navi = useNavigate()
    if (role != 'AD') {
      navi('/login')
    }
  // React.useEffect(() => {
  //   if (userID != ""){
  //     const getInfomation = async () => {
  //         const resp = await fetch(`http://localhost:3000/user/${userID}`)

  //         const json = await resp.json()
  //         let info = json['user']
  //         setName(info['FName'] +" "+ info['LName'])
  //       }
  //       getInfomation()
  //   }
  // }, [])

  return (
    <div className="page">
      <div className="container_header">
        <div className="logo_contain  ">
          <img className="img__1" src="./logo.png"></img>
          <h2>My Home</h2>
        </div>
        <div className="user_contain">
          <img className="img__1" src="./user.png"></img>
          <p>{name}</p>
          <img className='img__1' src="./power.png" onClick={() => {
          setUserRole('role')
          setAccessToken('')
          setRefreshToken('')
          navi('/login')
        }}></img>
        </div>
      </div>
    </div>
  )
}
