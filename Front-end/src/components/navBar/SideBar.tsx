import React from 'react'
import Navbar from './Navbar'
import './SideBar.css'
import { CredentialsInterface, UserContext } from '../../context/UserContext'

export default function SideBar() {
  const { userRole, setUserId, setUserRole, setAccessToken, setRefreshToken } =
    React.useContext<CredentialsInterface>(UserContext)
  const tmp = window.location.pathname
  const a = {
    '/room': 0,
    '/light': 0,
    '/air': 0,
    '/door':0,
    '/pump': 0,
    '/account': 0
  }
  a[tmp] = 1;
  const [active, setActive] = React.useState(a)
  return (
    <div className="contain_nav">
      <Navbar name="Room" src="./home.png" link="/room" active={active} setActive={setActive}/>
      <Navbar name="Light" src="./light.png" link="/light" active={active} setActive={setActive}/>
      <Navbar name="Air condition" src="./airCondition.png" link="/air" active={active} setActive={setActive}/>
      <Navbar name="Door" src="./door.png" link="/door" active={active} setActive={setActive}/>
      <Navbar name="Water tree" src="./pump.png" link="/pump" active={active} setActive={setActive}/>
      <Navbar name="Account" src="./setting.png" link="/account" active={active} setActive={setActive}/>
      <div
        onClick={() => {
          setUserRole('role')
          setAccessToken('')
          setRefreshToken('')
        }}
      >
        <Navbar name="Logout" src="./logout.png" link="/login" active={active} setActive={setActive} />
      </div>
    </div>
  )
}
