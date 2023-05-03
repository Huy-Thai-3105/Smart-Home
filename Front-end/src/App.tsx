import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import SideBar from './components/navBar/SideBar'

import { useNavigate } from 'react-router-dom'
import { getCookie } from '../src/utilities/GetRoleCookie'

export default function App() {
  const [role, setRole] = React.useState(getCookie('role'))
  const navi = useNavigate()
  if (role != 'CU') {
    navi('/login')
  }
  return (
    <div>
      <div>
        <Header />
        <div className="display__flex">
          <SideBar />
          <Outlet />
        </div>
      </div>
    </div>
  )
}
