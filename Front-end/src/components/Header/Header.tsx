import { useNavigate } from 'react-router-dom'
import './Header.css'
import React from 'react'
import { getCookie } from '../../utilities/GetRoleCookie'

export default function Header() {

  const navigate = useNavigate()

  const navigateToHome = () => {
    navigate('/room')
  }
  const [userID, setUserID] = React.useState(getCookie("userID"))
  const [name, setName] = React.useState('Truong Huy Thai')
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
        <div className="logo_contain  " onClick={navigateToHome}>
          <img className="img__1" src="./logo.png"></img>
          <h2>My Home</h2>
        </div>
        <div className="user_contain">
          <img className="img__1" src="./user.png"></img>
          <p>{name}</p>
        </div>
      </div>
    </div>
  )
}
