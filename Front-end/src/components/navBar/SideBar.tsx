import React from 'react'
import Navbar from './Navbar'
import './SideBar.css'
import { CredentialsInterface, UserContext } from '../../context/UserContext'



export default function SideBar() {
  const {
    userRole,
    setUserId,
    setUserRole,
    setAccessToken,
    setRefreshToken,
  } = React.useContext<CredentialsInterface>(UserContext)
  return (
    <div className="contain_nav">
      <Navbar name="Room" src="./home.png" link="/room" />
      <Navbar name="Light" src="./light.png" link="/light" />
      <Navbar name="Air condition" src="./airCondition.png" link="/air" />
      <Navbar name="Door" src="./door.png" link="/door" />
      <Navbar name="Water tree" src="./pump.png" link="/pump" />
      <Navbar name="Account" src="./setting.png" link="/account" />
      <div onClick={()=>{
        setUserRole("role")
        setAccessToken('')
        setRefreshToken('')
    }}>
        <Navbar name="Logout" src="./logout.png" link="/login" />
      </div>
    </div>
  )
}
